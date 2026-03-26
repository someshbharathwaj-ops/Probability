"use client";

import { SimulationDefinition, TopicId } from "@/features/learning/domain/types";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export function SimulationLab({
  simulations,
  activeTopicId,
}: {
  simulations: SimulationDefinition[];
  activeTopicId: TopicId;
}) {
  const [statusFilter, setStatusFilter] = useState<"all" | "ready" | "scaffolded">(
    "all"
  );

  const filteredSimulations = useMemo(
    () =>
      simulations.filter((simulation) => {
        const matchesStatus =
          statusFilter === "all" ? true : simulation.status === statusFilter;
        const matchesTopic = simulation.topicIds.includes(activeTopicId);

        return matchesStatus && matchesTopic;
      }),
    [activeTopicId, simulations, statusFilter]
  );

  if (simulations.length === 0) {
    return (
      <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
        No simulations are available for the current topic yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {(["all", "ready", "scaffolded"] as const).map((filter) => (
          <button
            key={filter}
            className={`pill ${statusFilter === filter ? "text-text" : ""}`}
            onClick={() => setStatusFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {filteredSimulations.map((simulation) => (
        <motion.article
          key={simulation.id}
          whileHover={{ y: -4 }}
          className="glass-panel rounded-[var(--radius-lg)] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow mb-3">Simulation Engine</div>
              <h3 className="font-display text-3xl">{simulation.title}</h3>
            </div>
            <span className="pill">{simulation.status}</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-textMuted">
            {simulation.summary}
          </p>
          <div className="mt-5 rounded-[var(--radius-md)] border border-border bg-black/20 p-4">
            <div className="flex h-48 items-end gap-3 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_top,rgba(98,168,255,0.18),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-4">
              {simulation.metrics.map((metric, index) => (
                <div
                  key={metric}
                  className="flex flex-1 flex-col justify-end gap-3"
                >
                  <div
                    className="rounded-t-full bg-gradient-to-t from-accent/80 to-mint/70"
                    style={{ height: `${35 + index * 22}%` }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-textMuted">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {simulation.topicIds.map((topicId) => (
              <span key={topicId} className="pill">
                {topicId}
              </span>
            ))}
          </div>
        </motion.article>
        ))}
      </div>
      {filteredSimulations.length === 0 ? (
        <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
          No simulations match this topic and status filter yet.
        </div>
      ) : null}
    </div>
  );
}
