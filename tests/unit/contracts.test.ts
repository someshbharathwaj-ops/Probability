import { describe, expect, it } from "vitest";
import {
  parseAnalyticsEventInput,
  parseProgressMutation,
  parseTopicId,
} from "@/features/learning/server/contracts";

describe("learning contracts", () => {
  it("parses a valid topic id", () => {
    expect(parseTopicId("poisson")).toBe("poisson");
  });

  it("requires topic ids for topic view mutations", () => {
    expect(() =>
      parseProgressMutation({
        type: "topic_view",
      })
    ).toThrow("topicId must be provided");
  });

  it("parses formula recall mutations", () => {
    expect(
      parseProgressMutation({
        type: "formula_recall",
        topicId: "acf",
        correct: true,
      })
    ).toEqual({
      type: "formula_recall",
      topicId: "acf",
      correct: true,
    });
  });

  it("parses analytics payloads", () => {
    expect(
      parseAnalyticsEventInput({
        type: "mode_change",
        topicId: "rv",
        payload: {
          mode: "revision",
        },
      })
    ).toEqual({
      type: "mode_change",
      topicId: "rv",
      payload: {
        mode: "revision",
      },
    });
  });
});
