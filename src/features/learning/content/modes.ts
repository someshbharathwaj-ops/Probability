import { LearningMode } from "@/features/learning/domain/types";

export const learningModes: {
  id: LearningMode;
  label: string;
  detail: string;
}[] = [
  {
    id: "flashcards",
    label: "Flashcards",
    detail: "Fast recall loops for formulas and definitions.",
  },
  {
    id: "deep",
    label: "Deep Theory",
    detail:
      "Long-form reasoning with intuition, proofs, and engineering context.",
  },
  {
    id: "problem",
    label: "Problem Solving",
    detail: "Hints, scaffolds, and step reveal logic.",
  },
  {
    id: "revision",
    label: "Exam Revision",
    detail: "Compressed review mode with weak-area prioritisation.",
  },
];
