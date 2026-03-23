"use client";

import { motion } from "framer-motion";
import { BlockMath } from "react-katex";
import { FormulaCardItem } from "@/features/learning/domain/types";
import { useLearningStore } from "@/features/learning/store";

export function FormulaCard({ formula }: { formula: FormulaCardItem }) {
  const confidence = useLearningStore(
    (state) => state.formulaConfidence[formula.id]
  );
  const markFormulaRecall = useLearningStore(
    (state) => state.markFormulaRecall
  );

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="glass-panel rounded-[var(--radius-md)] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {formula.tags.join(" / ")}
          </div>
          <h3 className="mt-3 font-display text-2xl text-text">
            {formula.title}
          </h3>
        </div>
        <span className="pill">{formula.topicId}</span>
      </div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-white/5 bg-black/20 p-4">
        <BlockMath math={formula.expression} />
      </div>
      <p className="mt-4 text-sm leading-6 text-textMuted">{formula.summary}</p>
      <div className="mt-5 flex gap-3">
        <button
          className="pill text-text"
          onClick={() => markFormulaRecall(formula.id, formula.topicId, true)}
        >
          I recall this
        </button>
        <button
          className="pill text-text"
          onClick={() => markFormulaRecall(formula.id, formula.topicId, false)}
        >
          Needs review
        </button>
      </div>
      <div className="mt-3 text-xs text-textMuted">
        Status:{" "}
        {confidence === undefined
          ? "unrated"
          : confidence
            ? "strong recall"
            : "review queue"}
      </div>
    </motion.article>
  );
}
