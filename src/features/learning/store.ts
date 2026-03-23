"use client";

import { problems, topics } from "@/features/learning/content/catalog";
import {
  createInitialProfile,
  updateFormulaRecall,
  updateProblemOutcome,
  updateTopicView,
} from "@/features/learning/domain/progress";
import {
  LearnerProfile,
  LearningMode,
  TopicId,
} from "@/features/learning/domain/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LearningState {
  profile: LearnerProfile;
  activeTopicId: TopicId;
  mode: LearningMode;
  revealedHints: Record<string, number>;
  solvedProblems: Record<string, boolean>;
  formulaConfidence: Record<string, boolean>;
  setMode: (mode: LearningMode) => void;
  setActiveTopic: (topicId: TopicId) => void;
  revealHint: (problemId: string) => void;
  markProblemSolved: (problemId: string, solved: boolean) => void;
  markFormulaRecall: (
    formulaId: string,
    topicId: TopicId,
    correct: boolean
  ) => void;
}

const initialProfile = createInitialProfile(topics);

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      activeTopicId: initialProfile.activeTopicId,
      mode: initialProfile.currentMode,
      revealedHints: {},
      solvedProblems: {},
      formulaConfidence: {},
      setMode: (mode) =>
        set((state) => ({
          mode,
          profile: {
            ...state.profile,
            currentMode: mode,
          },
        })),
      setActiveTopic: (activeTopicId) =>
        set((state) => ({
          activeTopicId,
          profile: updateTopicView(state.profile, activeTopicId),
        })),
      revealHint: (problemId) =>
        set((state) => ({
          revealedHints: {
            ...state.revealedHints,
            [problemId]: (state.revealedHints[problemId] ?? 0) + 1,
          },
        })),
      markProblemSolved: (problemId, solved) => {
        const problem = problems.find((entry) => entry.id === problemId);

        if (!problem) {
          return;
        }

        set((state) => ({
          solvedProblems: {
            ...state.solvedProblems,
            [problemId]: solved,
          },
          profile: updateProblemOutcome(state.profile, problem, solved),
        }));
      },
      markFormulaRecall: (formulaId, topicId, correct) =>
        set((state) => ({
          formulaConfidence: {
            ...state.formulaConfidence,
            [formulaId]: correct,
          },
          profile: updateFormulaRecall(state.profile, topicId, correct),
        })),
    }),
    {
      name: "stochastic-command-centre",
    }
  )
);
