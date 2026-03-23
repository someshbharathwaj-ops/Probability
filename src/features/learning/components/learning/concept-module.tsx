import { Topic } from "@/features/learning/domain/types";

const labelTone: Record<string, string> = {
  intuition: "text-accent",
  reasoning: "text-gold",
  engineering: "text-mint",
  research: "text-violet",
  exam: "text-rose",
  danger: "text-rose",
};

export function ConceptModule({ topic }: { topic: Topic }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {topic.blocks.map((block) => (
        <article
          key={`${topic.id}-${block.label}`}
          className="glass-panel rounded-[var(--radius-md)] p-5"
        >
          <div
            className={`font-mono text-[11px] uppercase tracking-[0.3em] ${labelTone[block.label]}`}
          >
            {block.label}
          </div>
          <p className="mt-4 text-sm leading-7 text-textMuted">{block.body}</p>
        </article>
      ))}
    </div>
  );
}
