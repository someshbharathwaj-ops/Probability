"use client";

import { useMemo, useState } from "react";
import { Problem } from "@/features/learning/domain/types";
import { useLearningStore } from "@/features/learning/store";
export function ProblemEngine({ problems }: { problems: Problem[] }) {
  const revealedHints = useLearningStore((state) => state.revealedHints);
  const revealHint = useLearningStore((state) => state.revealHint);
  const solvedProblems = useLearningStore((state) => state.solvedProblems);
  const markProblemSolved = useLearningStore(
    (state) => state.markProblemSolved
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "unattempted" | "solved" | "needs reinforcement"
  >("all");

  const grouped = useMemo(() => {
    const filteredProblems = problems.filter((problem) => {
      const solved = solvedProblems[problem.id];

      if (statusFilter === "all") {
        return true;
      }

      if (statusFilter === "unattempted") {
        return solved === undefined;
      }

      if (statusFilter === "solved") {
        return solved === true;
      }

      return solved === false;
    });

    return filteredProblems.reduce<Record<string, Problem[]>>((acc, problem) => {
      acc[problem.level] = [...(acc[problem.level] ?? []), problem];
      return acc;
    }, {});
  }, [problems, solvedProblems, statusFilter]);

  if (problems.length === 0) {
    return (
      <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
        No practice prompts are attached to this topic yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {(["all", "unattempted", "solved", "needs reinforcement"] as const).map(
          (filter) => (
            <button
              key={filter}
              className={`pill ${statusFilter === filter ? "text-text" : ""}`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter}
            </button>
          )
        )}
      </div>
      {Object.entries(grouped).map(([level, entries]) => (
        <section
          key={level}
          className="glass-panel rounded-[var(--radius-lg)] p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">{level}</div>
              <h3 className="font-display text-3xl">
                {level === "monster" ? "Boss Problems" : "Practice Stack"}
              </h3>
            </div>
            <span className="pill">{entries.length} prompts</span>
          </div>
          <div className="mt-5 grid gap-4">
            {entries.map((problem) => {
              const hintCount = revealedHints[problem.id] ?? 0;
              const solved = solvedProblems[problem.id];
              return (
                <article
                  key={problem.id}
                  className="rounded-[var(--radius-md)] border border-border bg-black/15 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
                        {problem.topicId}
                      </div>
                      <h4 className="mt-2 text-xl font-semibold text-text">
                        {problem.title}
                      </h4>
                    </div>
                    <span className="pill">{problem.level}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-textMuted">
                    {problem.statement}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      className="pill text-text"
                      onClick={() => revealHint(problem.id)}
                    >
                      Reveal hint
                    </button>
                    <button
                      className="pill text-text"
                      onClick={() => markProblemSolved(problem.id, true)}
                    >
                      Mark solved
                    </button>
                    <button
                      className="pill text-text"
                      onClick={() => markProblemSolved(problem.id, false)}
                    >
                      Mark struggle
                    </button>
                  </div>
                  {problem.hints.slice(0, hintCount).map((hint, index) => (
                    <p
                      key={index}
                      className="mt-3 rounded-xl border border-gold/20 bg-gold/10 p-3 text-sm text-text"
                    >
                      Hint {index + 1}: {hint}
                    </p>
                  ))}
                  <div className="mt-4 grid gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    {problem.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-textMuted"
                      >
                        <span className="font-mono text-accent">
                          0{index + 1}
                        </span>
                        <span>{step.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-mint/20 bg-mint/10 p-3 text-sm text-text">
                    Answer: {problem.answer}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.24em] text-textMuted">
                    Status:{" "}
                    {solved === undefined
                      ? "unattempted"
                      : solved
                        ? "solved"
                        : "needs reinforcement"}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      {Object.keys(grouped).length === 0 ? (
        <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
          No problems match the current status filter.
        </div>
      ) : null}
    </div>
  );
}
