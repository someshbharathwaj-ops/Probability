import {
  LearnerProfile,
  Problem,
  Topic,
  TopicId,
} from "@/features/learning/domain/types";

export function recommendNextTopic(
  activeTopicId: TopicId,
  topics: Topic[],
  weakAreas: TopicId[],
  completedTopics: TopicId[] = []
) {
  const eligibleWeakArea = weakAreas.find(
    (topicId) => topicId !== activeTopicId && !completedTopics.includes(topicId)
  );

  if (eligibleWeakArea) {
    return topics.find((topic) => topic.id === eligibleWeakArea) ?? topics[0];
  }

  const currentIndex = topics.findIndex((topic) => topic.id === activeTopicId);
  const nextLinearTopic = topics
    .slice(currentIndex + 1)
    .find((topic) => !completedTopics.includes(topic.id));

  return nextLinearTopic ?? topics[currentIndex] ?? topics[0];
}

export function groupProblemsByDifficulty(problemBank: Problem[]) {
  return {
    easy: problemBank.filter((problem) => problem.level === "easy"),
    medium: problemBank.filter((problem) => problem.level === "medium"),
    hard: problemBank.filter((problem) => problem.level === "hard"),
    monster: problemBank.filter((problem) => problem.level === "monster"),
  };
}

export function buildStudyQueue(profile: LearnerProfile, topics: Topic[]) {
  const queueIds = [
    ...profile.reviewQueue,
    ...profile.bookmarkedTopics,
    ...topics
      .filter(
        (topic) =>
          topic.prerequisites.every((prereq) =>
            profile.completedTopics.includes(prereq)
          ) && !profile.completedTopics.includes(topic.id)
      )
      .map((topic) => topic.id),
  ].filter((topicId, index, items) => items.indexOf(topicId) === index);

  return queueIds
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic))
    .slice(0, 5);
}
