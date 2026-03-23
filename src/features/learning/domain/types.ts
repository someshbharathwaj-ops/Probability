export type LearningMode = "flashcards" | "deep" | "problem" | "revision";

export const TOPIC_IDS = [
  "rv",
  "cdf",
  "expect",
  "cheby",
  "joint",
  "process",
  "distproc",
  "stationary",
  "acf",
  "psd",
  "poisson",
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export interface FormulaCardItem {
  id: string;
  title: string;
  expression: string;
  summary: string;
  topicId: TopicId;
  tags: string[];
}

export interface ConceptModuleBlock {
  label:
    | "intuition"
    | "reasoning"
    | "engineering"
    | "research"
    | "exam"
    | "danger";
  body: string;
}

export interface Topic {
  id: TopicId;
  order: number;
  section: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  prerequisites: TopicId[];
  formulas: string[];
  blocks: ConceptModuleBlock[];
}

export interface ProblemStep {
  text: string;
}

export interface Problem {
  id: string;
  topicId: TopicId;
  level: "easy" | "medium" | "hard" | "monster";
  title: string;
  statement: string;
  hints: string[];
  steps: ProblemStep[];
  answer: string;
}

export interface ConceptGraphNode {
  id: TopicId;
  label: string;
  x: number;
  y: number;
  description: string;
  prereqs: TopicId[];
}

export interface SimulationDefinition {
  id: string;
  title: string;
  summary: string;
  status: "ready" | "scaffolded" | "planned";
  metrics: string[];
  topicIds: TopicId[];
}

export interface TopicMastery {
  topicId: TopicId;
  confidence: number;
  formulaRecall: number;
  problemAccuracy: number;
  lastVisitedAt: string;
}

export interface LearnerProfile {
  id: string;
  currentMode: LearningMode;
  activeTopicId: TopicId;
  topicMastery: TopicMastery[];
  weakAreas: TopicId[];
}

export interface AnalyticsEvent {
  id: string;
  type: "topic_view" | "formula_flip" | "problem_attempt" | "mode_change";
  topicId?: TopicId;
  payload?: Record<string, unknown>;
  timestamp: string;
}

export type ProgressMutation =
  | { type: "topic_view"; topicId: TopicId }
  | { type: "formula_recall"; topicId: TopicId; correct: boolean }
  | { type: "problem_outcome"; problemId: string; solved: boolean };
