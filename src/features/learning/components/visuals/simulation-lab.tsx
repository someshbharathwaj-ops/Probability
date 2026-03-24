"use client";

import { SimulationDefinition } from "@/features/learning/domain/types";
import { motion } from "framer-motion";

export function SimulationLab({
  simulations,
}: {
  simulations: SimulationDefinition[];
}) {
  if (simulations.length === 0) {
    return (
      <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
        No simulations are available for the current topic yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {simulations.map((simulation) => (
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
  );
}
