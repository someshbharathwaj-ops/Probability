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
  }));

  return {
    id: "local-learner",
    currentMode: "deep",
    activeTopicId: topics[0].id,
    topicMastery: mastery,
    weakAreas: topics.slice(0, 3).map((topic) => topic.id),
  };
}

export function updateTopicView(
  profile: LearnerProfile,
  topicId: TopicId
): LearnerProfile {
  return {
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
  };
}

export function updateProblemOutcome(
  profile: LearnerProfile,
  problem: Problem,
  solved: boolean
): LearnerProfile {
  const nextProfile = {
    ...profile,
    topicMastery: profile.topicMastery.map((entry) =>
      entry.topicId === problem.topicId
        ? {
            ...entry,
            problemAccuracy: clamp(
              entry.problemAccuracy + (solved ? 0.12 : -0.05)
            ),
            confidence: clamp(entry.confidence + (solved ? 0.06 : -0.03)),
            lastVisitedAt: new Date().toISOString(),
          }
        : entry
    ),
  };

  return {
    ...nextProfile,
    weakAreas: detectWeakAreas(nextProfile.topicMastery),
  };
}

export function updateFormulaRecall(
  profile: LearnerProfile,
  topicId: TopicId,
  correct: boolean
): LearnerProfile {
  const topicMastery = profile.topicMastery.map((entry) =>
    entry.topicId === topicId
      ? {
          ...entry,
          formulaRecall: clamp(entry.formulaRecall + (correct ? 0.1 : -0.04)),
          lastVisitedAt: new Date().toISOString(),
        }
      : entry
  );

  return {
    ...profile,
    topicMastery,
    weakAreas: detectWeakAreas(topicMastery),
  };
}

export function detectWeakAreas(topicMastery: TopicMastery[]): TopicId[] {
  return [...topicMastery]
    .sort((a, b) => scoreTopic(a) - scoreTopic(b))
    .slice(0, 3)
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

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}
