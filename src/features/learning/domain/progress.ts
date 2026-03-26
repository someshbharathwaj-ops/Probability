import {
  LearnerProfile,
  Problem,
  Topic,
  TopicId,
  TopicMastery,
} from "@/features/learning/domain/types";

export function createInitialProfile(topics: Topic[]): LearnerProfile {
  const mastery: TopicMastery[] = topics.map((topic) => ({
    topicId: topic.id,
    confidence: 0.24,
    formulaRecall: 0.18,
    problemAccuracy: 0.14,
    lastVisitedAt: new Date(0).toISOString(),
    completedCycles: 0,
  }));

  return {
    id: "local-learner",
    currentMode: "deep",
    activeTopicId: topics[0].id,
    topicMastery: mastery,
    weakAreas: topics.slice(0, 3).map((topic) => topic.id),
    reviewQueue: topics.slice(0, 4).map((topic) => topic.id),
    bookmarkedTopics: [topics[0].id],
    completedTopics: [],
    dailyGoalMinutes: 40,
    weeklyGoalSessions: 5,
    todayMinutes: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastSessionOn: null,
  };
}

export function updateTopicView(
  profile: LearnerProfile,
  topicId: TopicId
): LearnerProfile {
  const nextProfile = advanceStudyMetrics({
    ...profile,
    activeTopicId: topicId,
    topicMastery: profile.topicMastery.map((entry) =>
      entry.topicId === topicId
        ? {
            ...entry,
            confidence: Math.min(1, entry.confidence + 0.04),
            lastVisitedAt: new Date().toISOString(),
          }
        : entry
    ),
  }, 8);

  return refreshDerivedState(nextProfile);
}

export function updateProblemOutcome(
  profile: LearnerProfile,
  problem: Problem,
  solved: boolean
): LearnerProfile {
  const nextProfile = advanceStudyMetrics(
    {
      ...profile,
      topicMastery: profile.topicMastery.map((entry) =>
        entry.topicId === problem.topicId
          ? {
              ...entry,
              problemAccuracy: clamp(
                entry.problemAccuracy + (solved ? 0.12 : -0.05)
              ),
              confidence: clamp(entry.confidence + (solved ? 0.06 : -0.03)),
              completedCycles: solved
                ? entry.completedCycles + 1
                : entry.completedCycles,
              lastVisitedAt: new Date().toISOString(),
            }
          : entry
      ),
    },
    solved ? 18 : 12
  );

  return refreshDerivedState(nextProfile);
}

export function updateFormulaRecall(
  profile: LearnerProfile,
  topicId: TopicId,
  correct: boolean
): LearnerProfile {
  const nextProfile = advanceStudyMetrics(
    {
      ...profile,
      topicMastery: profile.topicMastery.map((entry) =>
        entry.topicId === topicId
          ? {
              ...entry,
              formulaRecall: clamp(
                entry.formulaRecall + (correct ? 0.1 : -0.04)
              ),
              completedCycles: correct
                ? entry.completedCycles + 1
                : entry.completedCycles,
              lastVisitedAt: new Date().toISOString(),
            }
          : entry
      ),
    },
    correct ? 10 : 6
  );

  return refreshDerivedState(nextProfile);
}

export function toggleBookmarkedTopic(
  profile: LearnerProfile,
  topicId: TopicId
): LearnerProfile {
  const bookmarkedTopics = profile.bookmarkedTopics.includes(topicId)
    ? profile.bookmarkedTopics.filter((entry) => entry !== topicId)
    : [...profile.bookmarkedTopics, topicId];

  return {
    ...profile,
    bookmarkedTopics,
  };
}

export function updateDailyGoal(
  profile: LearnerProfile,
  dailyGoalMinutes: number
): LearnerProfile {
  return {
    ...profile,
    dailyGoalMinutes,
  };
}

export function detectWeakAreas(topicMastery: TopicMastery[]): TopicId[] {
  return [...topicMastery]
    .sort((a, b) => scoreTopic(a) - scoreTopic(b))
    .slice(0, 3)
    .map((entry) => entry.topicId);
}

export function detectCompletedTopics(topicMastery: TopicMastery[]): TopicId[] {
  return topicMastery
    .filter(
      (entry) =>
        scoreTopic(entry) >= 0.68 &&
        entry.formulaRecall >= 0.55 &&
        entry.problemAccuracy >= 0.45
    )
    .map((entry) => entry.topicId);
}

export function buildReviewQueue(topicMastery: TopicMastery[]): TopicId[] {
  return [...topicMastery]
    .sort((left, right) => {
      const scoreDelta = scoreTopic(left) - scoreTopic(right);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return (
        new Date(left.lastVisitedAt).getTime() -
        new Date(right.lastVisitedAt).getTime()
      );
    })
    .slice(0, 4)
    .map((entry) => entry.topicId);
}

export function buildMasterySummary(topicMastery: TopicMastery[]) {
  const averages = topicMastery.reduce(
    (acc, entry) => {
      acc.confidence += entry.confidence;
      acc.formulaRecall += entry.formulaRecall;
      acc.problemAccuracy += entry.problemAccuracy;
      return acc;
    },
    { confidence: 0, formulaRecall: 0, problemAccuracy: 0 }
  );

  const count = Math.max(topicMastery.length, 1);
  return {
    confidence: averages.confidence / count,
    formulaRecall: averages.formulaRecall / count,
    problemAccuracy: averages.problemAccuracy / count,
  };
}

function scoreTopic(entry: TopicMastery) {
  return (
    entry.confidence * 0.45 +
    entry.formulaRecall * 0.25 +
    entry.problemAccuracy * 0.3
  );
}

function refreshDerivedState(profile: LearnerProfile): LearnerProfile {
  return {
    ...profile,
    weakAreas: detectWeakAreas(profile.topicMastery),
    reviewQueue: buildReviewQueue(profile.topicMastery),
    completedTopics: detectCompletedTopics(profile.topicMastery),
  };
}

function advanceStudyMetrics(profile: LearnerProfile, minutes: number) {
  const today = getStudyDayKey();
  const isNewStudyDay = profile.lastSessionOn !== today;
  const previousDay = profile.lastSessionOn
    ? new Date(`${profile.lastSessionOn}T00:00:00.000Z`)
    : null;
  const currentDay = new Date(`${today}T00:00:00.000Z`);
  const daysSincePrevious = previousDay
    ? Math.round(
        (currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;
  const nextStreak = !isNewStudyDay
    ? profile.currentStreak
    : daysSincePrevious === 1
      ? profile.currentStreak + 1
      : 1;
  const nextTodayMinutes = isNewStudyDay
    ? minutes
    : profile.todayMinutes + minutes;

  return {
    ...profile,
    todayMinutes: nextTodayMinutes,
    totalSessions: isNewStudyDay ? profile.totalSessions + 1 : profile.totalSessions,
    currentStreak: nextStreak,
    longestStreak: Math.max(profile.longestStreak, nextStreak),
    lastSessionOn: today,
  };
}

function getStudyDayKey() {
  return new Date().toISOString().slice(0, 10);
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}
