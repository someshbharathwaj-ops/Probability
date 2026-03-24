"use client";

import { motion } from "framer-motion";
import { learningModes } from "@/features/learning/content/modes";
import { useLearningStore } from "@/features/learning/store";

export function LearningModeSwitcher() {
  const mode = useLearningStore((state) => state.mode);
  const setMode = useLearningStore((state) => state.setMode);

  return (
    <div className="glass-panel rounded-[var(--radius-lg)] p-4">
      <div className="eyebrow mb-4">Learning Modes</div>
      <div className="grid gap-3 lg:grid-cols-4">
        {learningModes.map((entry) => {
          const active = entry.id === mode;
          return (
            <motion.button
              key={entry.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setMode(entry.id)}
              className={`relative rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-accent bg-accentSoft text-text"
                  : "border-border bg-white/5 text-textMuted"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="mode-highlight"
                  className="absolute inset-0 rounded-2xl border border-accent/40"
                />
              ) : null}
              <div className="font-mono text-[11px] uppercase tracking-[0.28em]">
                {entry.label}
              </div>
              <p className="mt-3 text-sm leading-6">{entry.detail}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
