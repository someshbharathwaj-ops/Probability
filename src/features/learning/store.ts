"use client";

import { problems, topics } from "@/features/learning/content/catalog";
import {
  createInitialProfile,
  updateFormulaRecall,
  updateProblemOutcome,
  updateTopicView,
} from "@/features/learning/domain/progress";
import {
  LearningActivity,
  LearnerProfile,
  LearningMode,
  TopicId,
} from "@/features/learning/domain/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LearningState {
  profile: LearnerProfile;
  activityFeed: LearningActivity[];
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

function createActivity(
  kind: LearningActivity["kind"],
  topicId: TopicId,
  label: string,
  detail: string
): LearningActivity {
  return {
    id: crypto.randomUUID(),
    kind,
    topicId,
    label,
    detail,
    timestamp: new Date().toISOString(),
  };
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      activityFeed: [],
      activeTopicId: initialProfile.activeTopicId,
      mode: initialProfile.currentMode,
      revealedHints: {},
      solvedProblems: {},
      formulaConfidence: {},
      setMode: (mode) =>
        set((state) => ({
          mode,
          activityFeed: [
            createActivity(
              "mode_change",
              state.activeTopicId,
              "Mode switched",
              `Changed study mode to ${mode}.`
            ),
            ...state.activityFeed,
          ].slice(0, 25),
          profile: {
            ...state.profile,
            currentMode: mode,
          },
        })),
      setActiveTopic: (activeTopicId) =>
        set((state) => ({
          activeTopicId,
          activityFeed: [
            createActivity(
              "topic_view",
              activeTopicId,
              "Topic opened",
              `Focused ${activeTopicId} in the learning workspace.`
            ),
            ...state.activityFeed,
          ].slice(0, 25),
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
          activityFeed: [
            createActivity(
              "problem_result",
              problem.topicId,
              solved ? "Problem solved" : "Problem struggled",
              `${problem.title} was marked as ${solved ? "solved" : "needs reinforcement"}.`
            ),
            ...state.activityFeed,
          ].slice(0, 25),
          profile: updateProblemOutcome(state.profile, problem, solved),
        }));
      },
      markFormulaRecall: (formulaId, topicId, correct) =>
        set((state) => ({
          formulaConfidence: {
            ...state.formulaConfidence,
            [formulaId]: correct,
          },
          activityFeed: [
            createActivity(
              "formula_review",
              topicId,
              correct ? "Formula recalled" : "Formula flagged",
              `${formulaId} was marked as ${correct ? "recalled" : "needs review"}.`
            ),
            ...state.activityFeed,
          ].slice(0, 25),
          profile: updateFormulaRecall(state.profile, topicId, correct),
        })),
    }),
    {
      name: "stochastic-command-centre",
    }
  )
);
