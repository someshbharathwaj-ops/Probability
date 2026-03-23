import { summarizeAnalytics } from "@/features/learning/domain/analytics";
import { ProgressMutation, TopicId } from "@/features/learning/domain/types";
import {
  getAnalytics,
  getProblems,
  getProfile,
  getSimulations,
  setFormulaRecall,
  setProblemOutcome,
  setTopicViewed,
  trackEvent,
} from "@/features/learning/server/repository";

export const learningService = {
  getProfile() {
    return getProfile();
  },
  listProblems(topicId?: TopicId) {
    return getProblems(topicId);
  },
  listSimulations(topicId?: TopicId) {
    return getSimulations(topicId);
  },
  getAnalyticsSummary() {
    return summarizeAnalytics(getAnalytics(), getProfile());
  },
  mutateProgress(mutation: ProgressMutation) {
    switch (mutation.type) {
      case "topic_view":
        return setTopicViewed(mutation.topicId);
      case "formula_recall":
        return setFormulaRecall(mutation.topicId, mutation.correct);
      case "problem_outcome":
        return setProblemOutcome(mutation.problemId, mutation.solved);
    }
  },
  recordAnalyticsEvent(event: {
    type: "topic_view" | "formula_flip" | "problem_attempt" | "mode_change";
    topicId?: TopicId;
    payload?: Record<string, unknown>;
  }) {
    return trackEvent({
      id: crypto.randomUUID(),
      type: event.type,
      topicId: event.topicId,
      payload: event.payload,
      timestamp: new Date().toISOString(),
    });
  },
};
