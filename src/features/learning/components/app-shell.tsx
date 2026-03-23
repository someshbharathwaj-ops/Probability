"use client";

import { LearningModeSwitcher } from "@/features/learning/components/learning/learning-mode-switcher";
import { ProblemEngine } from "@/features/learning/components/learning/problem-engine";
import { ProgressOverview } from "@/features/learning/components/learning/progress-overview";
import { TopicPage } from "@/features/learning/components/learning/topic-page";
import {
  ConceptGraphNode,
  FormulaCardItem,
  Problem,
  SimulationDefinition,
  Topic,
} from "@/features/learning/domain/types";
import { recommendNextTopic } from "@/features/learning/domain/recommendation";
import { useLearningStore } from "@/features/learning/store";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ConceptGraph = dynamic(
  () =>
    import("@/features/learning/components/visuals/concept-graph").then(
      (mod) => mod.ConceptGraph
    ),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel h-[520px] animate-pulse rounded-[var(--radius-lg)]" />
    ),
  }
);

const SimulationLab = dynamic(
  () =>
    import("@/features/learning/components/visuals/simulation-lab").then(
      (mod) => mod.SimulationLab
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="glass-panel h-[360px] animate-pulse rounded-[var(--radius-lg)]" />
        <div className="glass-panel h-[360px] animate-pulse rounded-[var(--radius-lg)]" />
      </div>
    ),
  }
);

interface AppShellProps {
  topics: Topic[];
  formulas: FormulaCardItem[];
  problems: Problem[];
  graphNodes: ConceptGraphNode[];
  simulations: SimulationDefinition[];
}

export function AppShell({
  topics,
  formulas,
  problems,
  graphNodes,
  simulations,
}: AppShellProps) {
  const profile = useLearningStore((state) => state.profile);
  const activeTopicId = useLearningStore((state) => state.activeTopicId);
  const setActiveTopic = useLearningStore((state) => state.setActiveTopic);
  const mode = useLearningStore((state) => state.mode);

  const activeTopic = useMemo(
    () => topics.find((topic) => topic.id === activeTopicId) ?? topics[0],
    [activeTopicId, topics]
  );
  const topicFormulas = useMemo(
    () =>
      formulas.filter((formula) => activeTopic.formulas.includes(formula.id)),
    [activeTopic, formulas]
  );
  const topicProblems = useMemo(
    () => problems.filter((problem) => problem.topicId === activeTopic.id),
    [activeTopic.id, problems]
  );
  const recommendation = useMemo(
    () => recommendNextTopic(activeTopic.id, topics, profile.weakAreas),
    [activeTopic.id, profile.weakAreas, topics]
  );

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b border-border/70 bg-black/10 px-5 py-6 xl:sticky xl:top-0 xl:h-screen xl:border-b-0 xl:border-r xl:px-6 xl:py-8">
          <div className="glass-panel rounded-[var(--radius-lg)] p-5">
            <div className="eyebrow">SP//OS</div>
            <h1 className="mt-4 font-display text-4xl leading-tight">
              Stochastic Processes Operating System
            </h1>
            <p className="mt-4 text-sm leading-7 text-textMuted">
              Re-engineered from the static command centre into a product-grade
              learning platform with modular lessons, analytics, and simulation
              surfaces.
            </p>
          </div>
          <nav className="mt-6 space-y-2">
            {topics.map((topic) => {
              const active = topic.id === activeTopic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={`glass-panel flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${active ? "border-accent bg-accentSoft" : ""}`}
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
                      {topic.section}
                    </div>
                    <div className="mt-1 text-sm text-text">
                      {topic.shortTitle}
                    </div>
                  </div>
                  <span className="pill">{topic.order}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="space-y-8 px-5 py-6 sm:px-8 xl:px-10 xl:py-8">
          <section className="glass-panel overflow-hidden rounded-[32px] p-7 sm:p-9">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-end">
              <div>
                <div className="eyebrow">
                  Startup-grade mathematical learning platform
                </div>
                <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl">
                  Engineer stochastic intuition like a product system.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-textMuted">
                  The platform now separates theory, formula memory, problem
                  solving, concept dependencies, and simulation surfaces into
                  composable modules. Learning mode controls the UI, analytics
                  track mastery, and the backend surface is ready for
                  persistence, AI tutoring, and collaboration.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="pill">Next.js App Router</span>
                  <span className="pill">Node API routes</span>
                  <span className="pill">Zustand state</span>
                  <span className="pill">D3 concept graph</span>
                  <span className="pill">Framer Motion</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Modes", "Analytics", "Problems", "Simulations"].map(
                  (label, index) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -4 }}
                      className="rounded-[var(--radius-md)] border border-border bg-white/5 p-5"
                    >
                      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-textMuted">
                        {label}
                      </div>
                      <div className="mt-3 font-display text-4xl text-accent">
                        0{index + 1}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-textMuted">
                        {
                          [
                            "Mode-aware pedagogical rendering.",
                            "Weak-area detection and recall signals.",
                            "Hints, steps, and difficulty routing.",
                            "Structured labs ready for D3 and Three.js.",
                          ][index]
                        }
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </section>

          <LearningModeSwitcher />
          <ProgressOverview profile={profile} />

          <section className="glass-panel rounded-[var(--radius-lg)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="eyebrow">Active Topic</div>
                <h2 className="section-heading mt-3">{activeTopic.title}</h2>
              </div>
              <div className="pill">Mode: {mode}</div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-textMuted">
              Recommended next topic:{" "}
              <span className="text-text">{recommendation.title}</span>. This
              recommendation is driven by weak-area prioritisation and
              prerequisite-aware progression.
            </p>
          </section>

          <TopicPage topic={activeTopic} formulas={topicFormulas} />

          <section className="space-y-5">
            <div>
              <div className="eyebrow">Dependency Graph</div>
              <h2 className="section-heading mt-3">
                Interactive concept map from RVs to Poisson processes
              </h2>
            </div>
            <ConceptGraph nodes={graphNodes} />
          </section>

          <section className="space-y-5">
            <div>
              <div className="eyebrow">Problem Engine</div>
              <h2 className="section-heading mt-3">
                Hint-aware, step-based problem solving
              </h2>
            </div>
            <ProblemEngine
              problems={topicProblems.length > 0 ? topicProblems : problems}
            />
          </section>

          <section className="space-y-5">
            <div>
              <div className="eyebrow">Simulation Framework</div>
              <h2 className="section-heading mt-3">
                Visualization modules prepared for D3 and Three.js expansion
              </h2>
            </div>
            <SimulationLab simulations={simulations} />
          </section>

          <section className="glass-panel rounded-[var(--radius-lg)] p-6">
            <div className="eyebrow">Future-ready platform surfaces</div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                "Authentication and cloud sync",
                "AI tutor orchestration layer",
                "Real-time collaborative solving",
                "Offline PWA packaging",
                "Mobile app conversion via shared modules",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white/5 p-4 text-sm leading-6 text-textMuted"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
