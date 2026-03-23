import { Problem, Topic, TopicId } from "@/features/learning/domain/types";

export function recommendNextTopic(
  activeTopicId: TopicId,
  topics: Topic[],
  weakAreas: TopicId[]
) {
  if (weakAreas.length > 0 && weakAreas[0] !== activeTopicId) {
    return topics.find((topic) => topic.id === weakAreas[0]) ?? topics[0];
  }

  const currentIndex = topics.findIndex((topic) => topic.id === activeTopicId);
  return topics[currentIndex + 1] ?? topics[currentIndex] ?? topics[0];
}

export function groupProblemsByDifficulty(problemBank: Problem[]) {
  return {
    easy: problemBank.filter((problem) => problem.level === "easy"),
    medium: problemBank.filter((problem) => problem.level === "medium"),
    hard: problemBank.filter((problem) => problem.level === "hard"),
    monster: problemBank.filter((problem) => problem.level === "monster"),
  };
}
