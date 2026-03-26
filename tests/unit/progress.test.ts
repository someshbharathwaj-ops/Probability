import { describe, expect, it } from "vitest";
import { problems, topics } from "@/features/learning/content/catalog";
import {
  buildReviewQueue,
  createInitialProfile,
  detectWeakAreas,
  toggleBookmarkedTopic,
  updateDailyGoal,
  updateFormulaRecall,
  updateProblemOutcome,
  updateTopicView,
} from "@/features/learning/domain/progress";

describe("progress engine", () => {
  it("creates a profile seeded from topics", () => {
    const profile = createInitialProfile(topics);

    expect(profile.activeTopicId).toBe(topics[0].id);
    expect(profile.topicMastery).toHaveLength(topics.length);
  });

  it("updates active topic and last visited timestamp", () => {
    const profile = createInitialProfile(topics);
    const updated = updateTopicView(profile, "poisson");

    expect(updated.activeTopicId).toBe("poisson");
    expect(
      updated.topicMastery.find((entry) => entry.topicId === "poisson")
        ?.lastVisitedAt
    ).not.toBe(new Date(0).toISOString());
  });

  it("improves formula recall for the selected topic", () => {
    const profile = createInitialProfile(topics);
    const updated = updateFormulaRecall(profile, "acf", true);

    expect(
      updated.topicMastery.find((entry) => entry.topicId === "acf")
        ?.formulaRecall
    ).toBeGreaterThan(
      profile.topicMastery.find((entry) => entry.topicId === "acf")
        ?.formulaRecall ?? 0
    );
  });

  it("updates weak areas when a problem is solved", () => {
    const profile = createInitialProfile(topics);
    const updated = updateProblemOutcome(profile, problems[0], true);

    expect(updated.weakAreas).toHaveLength(3);
    expect(detectWeakAreas(updated.topicMastery)).toEqual(updated.weakAreas);
  });

  it("toggles bookmarks for quick review", () => {
    const profile = createInitialProfile(topics);
    const withBookmark = toggleBookmarkedTopic(profile, "poisson");
    const withoutBookmark = toggleBookmarkedTopic(withBookmark, "poisson");

    expect(withBookmark.bookmarkedTopics).toContain("poisson");
    expect(withoutBookmark.bookmarkedTopics).not.toContain("poisson");
  });

  it("updates the learner daily goal", () => {
    const profile = createInitialProfile(topics);
    const updated = updateDailyGoal(profile, 60);

    expect(updated.dailyGoalMinutes).toBe(60);
  });

  it("builds a four-topic review queue", () => {
    const profile = createInitialProfile(topics);
    const queue = buildReviewQueue(profile.topicMastery);

    expect(queue).toHaveLength(4);
  });
});
