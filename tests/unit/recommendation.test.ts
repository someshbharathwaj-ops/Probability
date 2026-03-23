import { describe, expect, it } from "vitest";
import { problems, topics } from "@/features/learning/content/catalog";
import {
  groupProblemsByDifficulty,
  recommendNextTopic,
} from "@/features/learning/domain/recommendation";

describe("recommendation engine", () => {
  it("prioritizes weak areas before the next sequential topic", () => {
    const recommendation = recommendNextTopic("rv", topics, ["psd"]);

    expect(recommendation.id).toBe("psd");
  });

  it("falls back to the next topic in sequence", () => {
    const recommendation = recommendNextTopic("rv", topics, []);

    expect(recommendation.id).toBe("cdf");
  });

  it("groups problems by difficulty", () => {
    const grouped = groupProblemsByDifficulty(problems);

    expect(grouped.easy).toHaveLength(1);
    expect(grouped.medium).toHaveLength(1);
    expect(grouped.hard).toHaveLength(1);
    expect(grouped.monster).toHaveLength(1);
  });
});
