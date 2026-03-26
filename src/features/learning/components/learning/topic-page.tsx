import { ConceptModule } from "@/features/learning/components/learning/concept-module";
import { FormulaCard } from "@/features/learning/components/learning/formula-card";
import { TopicActions } from "@/features/learning/components/learning/topic-actions";
import { FormulaCardItem, Topic } from "@/features/learning/domain/types";

export function TopicPage({
  topic,
  formulas,
  isBookmarked,
  isCompleted,
  onToggleBookmark,
}: {
  topic: Topic;
  formulas: FormulaCardItem[];
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: (topicId: Topic["id"]) => void;
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
          {topic.prerequisites.length > 0 ? (
            topic.prerequisites.map((prereq) => (
              <span key={prereq} className="pill">
                prereq: {prereq}
              </span>
            ))
          ) : (
            <span className="pill">entry point topic</span>
          )}
        </div>
      </div>
      <TopicActions
        topic={topic}
        isBookmarked={isBookmarked}
        isCompleted={isCompleted}
        onToggleBookmark={onToggleBookmark}
      />
      <ConceptModule topic={topic} />
      {formulas.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {formulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[var(--radius-lg)] p-6 text-sm leading-7 text-textMuted">
          No formula cards are attached to this topic yet. Use the concept
          module and problem engine to explore it while the formula deck grows.
        </div>
      )}
    </section>
  );
}
