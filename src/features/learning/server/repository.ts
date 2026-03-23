import {
  problems,
  simulations,
  topics,
} from "@/features/learning/content/catalog";
import {
  createInitialProfile,
  updateFormulaRecall,
  updateProblemOutcome,
  updateTopicView,
} from "@/features/learning/domain/progress";
import {
  AnalyticsEvent,
  LearnerProfile,
  Problem,
  SimulationDefinition,
} from "@/features/learning/domain/types";

const store = {
  profile: createInitialProfile(topics),
  analytics: [] as AnalyticsEvent[],
  problems,
  simulations,
};

export function getProfile() {
  return store.profile;
}

export function getAnalytics() {
  return store.analytics;
}

export function trackEvent(event: AnalyticsEvent) {
  store.analytics.push(event);
  return event;
}

export function setTopicViewed(topicId: LearnerProfile["activeTopicId"]) {
  store.profile = updateTopicView(store.profile, topicId);
  return store.profile;
}

export function setFormulaRecall(
  topicId: LearnerProfile["activeTopicId"],
  correct: boolean
) {
  store.profile = updateFormulaRecall(store.profile, topicId, correct);
  return store.profile;
}

export function setProblemOutcome(problemId: Problem["id"], solved: boolean) {
  const problem = store.problems.find((entry) => entry.id === problemId);
  if (!problem) {
    return store.profile;
  }

  store.profile = updateProblemOutcome(store.profile, problem, solved);
  return store.profile;
}

export function getProblems(topicId?: string) {
  return topicId
    ? store.problems.filter((problem) => problem.topicId === topicId)
    : store.problems;
}

export function getSimulations(topicId?: string): SimulationDefinition[] {
  return topicId
    ? store.simulations.filter((simulation) =>
        simulation.topicIds.some((id) => id === topicId)
      )
    : store.simulations;
}
