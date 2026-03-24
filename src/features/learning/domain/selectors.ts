import {
  type LearnerProfile,
  type LearningActivity,
  type Problem,
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
      label: "Weak Areas",
      value: String(profile.weakAreas.length),
      detail: "Topics currently prioritized for reinforcement.",
    },
    {
      label: "Problems",
      value: String(problems.length),
      detail: "Prompt bank available for guided practice.",
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
