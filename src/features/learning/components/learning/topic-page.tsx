import { ConceptModule } from "@/features/learning/components/learning/concept-module";
import { FormulaCard } from "@/features/learning/components/learning/formula-card";
import { FormulaCardItem, Topic } from "@/features/learning/domain/types";

export function TopicPage({
  topic,
  formulas,
}: {
  topic: Topic;
  formulas: FormulaCardItem[];
}) {
  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-[var(--radius-lg)] p-6">
        <div className="eyebrow">{topic.section}</div>
        <h2 className="section-heading mt-3 max-w-3xl">{topic.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-textMuted">
          {topic.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {topic.prerequisites.map((prereq) => (
            <span key={prereq} className="pill">
              prereq: {prereq}
            </span>
          ))}
        </div>
      </div>
      <ConceptModule topic={topic} />
      <div className="grid gap-4 xl:grid-cols-2">
        {formulas.map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}
      </div>
    </section>
  );
}
