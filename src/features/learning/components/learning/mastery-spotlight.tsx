import { Topic } from "@/features/learning/domain/types";

export function MasterySpotlight({
  strongest,
  weakest,
}: {
  strongest?: Topic;
  weakest?: Topic;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {[
        {
          label: "Strongest Topic",
          topic: strongest,
          tone: "border-mint/30 bg-mint/10",
        },
        {
          label: "Needs Reinforcement",
          topic: weakest,
          tone: "border-rose/30 bg-rose/10",
        },
      ].map((entry) => (
        <article
          key={entry.label}
          className={`glass-panel rounded-[var(--radius-lg)] p-6 ${entry.tone}`}
        >
          <div className="eyebrow">{entry.label}</div>
          <h3 className="mt-4 font-display text-3xl">
            {entry.topic?.title ?? "Not enough activity yet"}
          </h3>
          <p className="mt-4 text-sm leading-7 text-textMuted">
            {entry.topic?.description ??
              "Start interacting with the workspace to generate mastery signals."}
          </p>
        </article>
      ))}
    </div>
  );
}
