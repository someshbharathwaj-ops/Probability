import {
  TOPIC_IDS,
  type AnalyticsEvent,
  type ProgressMutation,
  type TopicId,
} from "@/features/learning/domain/types";
import { AppError } from "@/shared/errors/app-error";

const topicIdSet = new Set<string>(TOPIC_IDS);
const analyticsEventTypes: AnalyticsEvent["type"][] = [
  "topic_view",
  "formula_flip",
  "problem_attempt",
  "mode_change",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseBoolean(value: unknown, field: string) {
  if (typeof value !== "boolean") {
    throw new AppError(400, "INVALID_REQUEST", `${field} must be a boolean.`);
  }

  return value;
}

export function parseTopicId(
  value: string | null | undefined
): TopicId | undefined {
  if (!value) {
    return undefined;
  }

  if (!topicIdSet.has(value)) {
    throw new AppError(400, "INVALID_TOPIC", `Unknown topic id: ${value}.`);
  }

  return value as TopicId;
}

export function parseProgressMutation(input: unknown): ProgressMutation {
  if (!isRecord(input) || typeof input.type !== "string") {
    throw new AppError(
      400,
      "INVALID_REQUEST",
      "A progress mutation payload is required."
    );
  }

  if (input.type === "topic_view") {
    return {
      type: "topic_view",
      topicId:
        parseTopicId(
          typeof input.topicId === "string" ? input.topicId : null
        ) ?? TOPIC_IDS[0],
    };
  }

  if (input.type === "formula_recall") {
    return {
      type: "formula_recall",
      topicId:
        parseTopicId(
          typeof input.topicId === "string" ? input.topicId : null
        ) ?? TOPIC_IDS[0],
      correct: parseBoolean(input.correct, "correct"),
    };
  }

  if (input.type === "problem_outcome") {
    if (typeof input.problemId !== "string" || input.problemId.length === 0) {
      throw new AppError(
        400,
        "INVALID_REQUEST",
        "problemId must be a non-empty string."
      );
    }

    return {
      type: "problem_outcome",
      problemId: input.problemId,
      solved: parseBoolean(input.solved, "solved"),
    };
  }

  throw new AppError(
    400,
    "UNSUPPORTED_MUTATION",
    `Unsupported progress mutation: ${input.type}.`
  );
}

export function parseAnalyticsEventInput(
  input: unknown
): Omit<AnalyticsEvent, "id" | "timestamp"> {
  if (!isRecord(input) || typeof input.type !== "string") {
    throw new AppError(
      400,
      "INVALID_REQUEST",
      "An analytics event payload is required."
    );
  }

  if (!analyticsEventTypes.includes(input.type as AnalyticsEvent["type"])) {
    throw new AppError(
      400,
      "INVALID_EVENT_TYPE",
      `Unsupported analytics event type: ${input.type}.`
    );
  }

  return {
    type: input.type as AnalyticsEvent["type"],
    topicId:
      typeof input.topicId === "string"
        ? parseTopicId(input.topicId)
        : undefined,
    payload: isRecord(input.payload) ? input.payload : undefined,
  };
}
