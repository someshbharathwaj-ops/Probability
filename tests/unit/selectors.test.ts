import { describe, expect, it } from "vitest";
import {
  problems,
  simulations,
  topics,
} from "@/features/learning/content/catalog";
import { createInitialProfile } from "@/features/learning/domain/progress";
import {
  buildGoalSummary,
  buildHeroStats,
  buildRecentActivity,
  buildSimulationStatusCounts,
  buildTopicSections,
  buildTopicSpotlight,
} from "@/features/learning/domain/selectors";

describe("learning selectors", () => {
  it("builds hero stats from profile and content", () => {
    const profile = createInitialProfile(topics);
    const stats = buildHeroStats(profile, problems, simulations);

    expect(stats).toHaveLength(4);
    expect(stats[2]?.value).toBe("0/40m");
    expect(stats[3]?.value).toBe(
      String(simulations.filter((simulation) => simulation.status === "ready").length)
    );
  });

  it("groups filtered topics by section", () => {
    const sections = buildTopicSections(topics, "poisson");

    expect(Object.values(sections).flat()).toHaveLength(1);
    expect(Object.values(sections).flat()[0]?.id).toBe("poisson");
  });

  it("returns strongest and weakest topic spotlight entries", () => {
    const profile = createInitialProfile(topics);
    const spotlight = buildTopicSpotlight(profile, topics);

    expect(spotlight.strongest).toBeDefined();
    expect(spotlight.weakest).toBeDefined();
  });

  it("limits recent activity to the newest six entries", () => {
    const recent = buildRecentActivity(
      Array.from({ length: 8 }, (_, index) => ({
        id: `activity-${index}`,
        kind: "topic_view" as const,
        topicId: "rv" as const,
        label: `Item ${index}`,
        detail: "detail",
        timestamp: new Date(2026, 0, index + 1).toISOString(),
      }))
    );

    expect(recent).toHaveLength(6);
    expect(recent[0]?.label).toBe("Item 7");
  });

  it("summarizes the learner goal progress", () => {
    const profile = {
      ...createInitialProfile(topics),
      todayMinutes: 25,
      dailyGoalMinutes: 40,
    };
    const summary = buildGoalSummary(profile);

    expect(summary.progress).toBe(0.625);
    expect(summary.remainingMinutes).toBe(15);
  });

  it("counts simulation statuses for dashboard copy", () => {
    const counts = buildSimulationStatusCounts(simulations);

    expect(counts.ready).toBe(2);
    expect(counts.scaffolded).toBe(2);
    expect(counts.planned).toBe(0);
  });
});
