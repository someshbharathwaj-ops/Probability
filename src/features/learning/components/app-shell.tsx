"use client";

import { ActivityTimeline } from "@/features/learning/components/learning/activity-timeline";
import { LearningModeSwitcher } from "@/features/learning/components/learning/learning-mode-switcher";
import { MasterySpotlight } from "@/features/learning/components/learning/mastery-spotlight";
import { ProblemEngine } from "@/features/learning/components/learning/problem-engine";
import { ProgressOverview } from "@/features/learning/components/learning/progress-overview";
import { TopicFilter } from "@/features/learning/components/learning/topic-filter";
import { TopicPage } from "@/features/learning/components/learning/topic-page";
import {
  ConceptGraphNode,
  FormulaCardItem,
  Problem,
  SimulationDefinition,
  Topic,
} from "@/features/learning/domain/types";
import {
  buildHeroStats,
  buildRecentActivity,
  buildTopicSections,
  buildTopicSpotlight,
} from "@/features/learning/domain/selectors";
import { recommendNextTopic } from "@/features/learning/domain/recommendation";
import { useLearningStore } from "@/features/learning/store";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

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
  const [topicQuery, setTopicQuery] = useState("");
  const profile = useLearningStore((state) => state.profile);
  const activityFeed = useLearningStore((state) => state.activityFeed);
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
  const heroStats = useMemo(
    () => buildHeroStats(profile, problems, simulations),
    [profile, problems, simulations]
  );
  const topicSections = useMemo(
    () => buildTopicSections(topics, topicQuery),
    [topics, topicQuery]
  );
  const spotlight = useMemo(
    () => buildTopicSpotlight(profile, topics),
    [profile, topics]
  );
  const recentActivity = useMemo(
    () => buildRecentActivity(activityFeed),
    [activityFeed]
  );

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-border/70 bg-black/10 px-5 py-6 xl:sticky xl:top-0 xl:h-screen xl:border-b-0 xl:border-r xl:px-6 xl:py-8">
          <div className="glass-panel rounded-[var(--radius-lg)] p-5">
            <div className="eyebrow">SP//OS</div>
            <h1 className="mt-4 font-display text-4xl leading-tight">
              Stochastic Processes Operating System
            </h1>
            <p className="mt-4 text-sm leading-7 text-textMuted">
              A cleaner command center for theory, formula recall, guided
              problem solving, and simulation-backed intuition.
            </p>
          </div>

          <TopicFilter value={topicQuery} onChange={setTopicQuery} />

          <nav className="mt-6 space-y-5">
            {Object.entries(topicSections).map(([section, sectionTopics]) => (
              <div key={section} className="space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
                  {section}
                </div>
                {sectionTopics.map((topic) => {
                  const active = topic.id === activeTopic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveTopic(topic.id)}
                      className={`glass-panel flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${active ? "border-accent bg-accentSoft" : ""}`}
                    >
                      <div>
                        <div className="text-sm text-text">
                          {topic.shortTitle}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-textMuted">
                          {topic.description}
                        </div>
                      </div>
                      <span className="pill">{topic.order}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {Object.keys(topicSections).length === 0 ? (
              <div className="glass-panel rounded-2xl p-4 text-sm leading-7 text-textMuted">
                No topics matched the current search.
              </div>
            ) : null}
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
                  The workspace now prioritizes live mastery signals, recent
                  study activity, focused topic navigation, and recommendation
                  flows that help you move faster through difficult material.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="pill">Feature-first architecture</span>
                  <span className="pill">Live progress model</span>
                  <span className="pill">Searchable syllabus</span>
                  <span className="pill">Problem telemetry</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroStats.map((card) => (
                  <motion.div
                    key={card.label}
                    whileHover={{ y: -4 }}
                    className="rounded-[var(--radius-md)] border border-border bg-white/5 p-5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-textMuted">
                      {card.label}
                    </div>
                    <div className="mt-3 font-display text-4xl text-accent">
                      {card.value}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-textMuted">
                      {card.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <LearningModeSwitcher />
          <ProgressOverview profile={profile} />
          <MasterySpotlight
            strongest={spotlight.strongest}
            weakest={spotlight.weakest}
          />

          <section className="glass-panel rounded-[var(--radius-lg)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="eyebrow">Active Topic</div>
                <h2 className="section-heading mt-3">{activeTopic.title}</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="pill">Mode: {mode}</div>
                <button
                  className="pill text-text"
                  onClick={() => setActiveTopic(recommendation.id)}
                >
                  Jump to recommended topic
                </button>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-textMuted">
              Recommended next topic:{" "}
              <span className="text-text">{recommendation.title}</span>. This
              recommendation is driven by weak-area prioritisation and
              prerequisite-aware progression.
            </p>
          </section>

          <TopicPage topic={activeTopic} formulas={topicFormulas} />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section className="space-y-5">
              <div>
                <div className="eyebrow">Dependency Graph</div>
                <h2 className="section-heading mt-3">
                  Interactive concept map from RVs to Poisson processes
                </h2>
              </div>
              <ConceptGraph nodes={graphNodes} />
            </section>
            <ActivityTimeline activityFeed={recentActivity} />
          </div>

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
        </main>
      </div>
    </div>
  );
}
