import {
  type LearnerProfile,
  type LearningActivity,
  type Problem,
  type SimulationStatus,
  type SimulationDefinition,
  type Topic,
  type TopicMastery,
} from "@/features/learning/domain/types";
import { buildMasterySummary } from "@/features/learning/domain/progress";

function sortByStrength(topicMastery: TopicMastery[]) {
  return [...topicMastery].sort(
    (left, right) =>
      right.confidence +
      right.formulaRecall +
      right.problemAccuracy -
      (left.confidence + left.formulaRecall + left.problemAccuracy)
  );
}

export function buildHeroStats(
  profile: LearnerProfile,
  problems: Problem[],
  simulations: SimulationDefinition[]
) {
  const summary = buildMasterySummary(profile.topicMastery);
  const readySimulations = simulations.filter(
    (simulation) => simulation.status === "ready"
  ).length;

  return [
    {
      label: "Mastery",
      value: `${Math.round(summary.confidence * 100)}%`,
      detail: "Average confidence across the learning graph.",
    },
    {
      label: "Streak",
      value: `${profile.currentStreak}d`,
      detail: "Consecutive study days recorded in the local workspace.",
    },
    {
      label: "Daily Goal",
      value: `${profile.todayMinutes}/${profile.dailyGoalMinutes}m`,
      detail: "Minutes logged against the current daily study target.",
    },
    {
      label: "Ready Labs",
      value: String(readySimulations),
      detail: "Simulation surfaces ready for exploration.",
    },
  ];
}

export function buildTopicSpotlight(profile: LearnerProfile, topics: Topic[]) {
  const ranked = sortByStrength(profile.topicMastery);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];

  return {
    strongest: topics.find((topic) => topic.id === strongest?.topicId),
    weakest: topics.find((topic) => topic.id === weakest?.topicId),
  };
}

export function buildTopicSections(topics: Topic[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTopics = normalizedQuery
    ? topics.filter((topic) =>
        `${topic.title} ${topic.shortTitle} ${topic.section} ${topic.description}`
          .toLowerCase()
          .includes(normalizedQuery)
      )
    : topics;

  return filteredTopics.reduce<Record<string, Topic[]>>((acc, topic) => {
    acc[topic.section] = [...(acc[topic.section] ?? []), topic];
    return acc;
  }, {});
}

export function buildRecentActivity(activityFeed: LearningActivity[]) {
  return [...activityFeed]
    .sort(
      (left, right) =>
        new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()
    )
    .slice(0, 6);
}

export function buildBookmarkedTopics(profile: LearnerProfile, topics: Topic[]) {
  return profile.bookmarkedTopics
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic));
}

export function buildReviewTopics(profile: LearnerProfile, topics: Topic[]) {
  return profile.reviewQueue
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic));
}

export function buildGoalSummary(profile: LearnerProfile) {
  const progress = Math.min(
    1,
    profile.dailyGoalMinutes === 0
      ? 0
      : profile.todayMinutes / profile.dailyGoalMinutes
  );

  return {
    progress,
    remainingMinutes: Math.max(0, profile.dailyGoalMinutes - profile.todayMinutes),
    sessionsToWeeklyTarget: Math.max(
      0,
      profile.weeklyGoalSessions - Math.min(profile.totalSessions, profile.weeklyGoalSessions)
    ),
  };
}

export function buildSimulationStatusCounts(
  simulations: SimulationDefinition[]
): Record<SimulationStatus, number> {
  return simulations.reduce<Record<SimulationStatus, number>>(
    (acc, simulation) => {
      acc[simulation.status] += 1;
      return acc;
    },
    {
      ready: 0,
      scaffolded: 0,
      planned: 0,
    }
  );
}
