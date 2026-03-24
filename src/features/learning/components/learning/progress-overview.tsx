import { buildMasterySummary } from "@/features/learning/domain/progress";
import { LearnerProfile } from "@/features/learning/domain/types";

export function ProgressOverview({ profile }: { profile: LearnerProfile }) {
  const summary = buildMasterySummary(profile.topicMastery);
  const cards = [
    {
      label: "Mastery",
      value: `${Math.round(summary.confidence * 100)}%`,
      tone: "text-accent",
    },
    {
      label: "Formula Recall",
      value: `${Math.round(summary.formulaRecall * 100)}%`,
      tone: "text-gold",
    },
    {
      label: "Problem Accuracy",
      value: `${Math.round(summary.problemAccuracy * 100)}%`,
      tone: "text-mint",
    },
    {
      label: "Weak Areas",
      value: profile.weakAreas.join(" / "),
      tone: "text-rose",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="glass-panel rounded-[var(--radius-md)] p-5"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
            {card.label}
          </div>
          <div className={`mt-4 font-display text-3xl ${card.tone}`}>
            {card.value}
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-textMuted">
            Last active topic: {profile.activeTopicId}
          </p>
        </article>
      ))}
    </div>
  );
}
