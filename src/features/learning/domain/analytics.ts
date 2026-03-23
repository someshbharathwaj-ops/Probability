import {
  AnalyticsEvent,
  LearnerProfile,
} from "@/features/learning/domain/types";
import { buildMasterySummary } from "@/features/learning/domain/progress";

export function summarizeAnalytics(
  events: AnalyticsEvent[],
  profile: LearnerProfile
) {
  const byType = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.type] = (acc[event.type] ?? 0) + 1;
    return acc;
  }, {});

  const mastery = buildMasterySummary(profile.topicMastery);

  return {
    totalEvents: events.length,
    byType,
    weakAreas: profile.weakAreas,
    mastery,
    nextRecommendation: profile.weakAreas[0] ?? profile.activeTopicId,
  };
}
