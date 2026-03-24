import { LearningActivity } from "@/features/learning/domain/types";

export function ActivityTimeline({
  activityFeed,
}: {
  activityFeed: LearningActivity[];
}) {
  if (activityFeed.length === 0) {
    return (
      <div className="glass-panel rounded-[var(--radius-lg)] p-6">
        <div className="eyebrow">Recent Activity</div>
        <p className="mt-4 text-sm leading-7 text-textMuted">
          Interact with a topic, formula, or problem to start building a study
          trail.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-[var(--radius-lg)] p-6">
      <div className="eyebrow">Recent Activity</div>
      <div className="mt-5 space-y-4">
        {activityFeed.map((activity) => (
          <article
            key={activity.id}
            className="rounded-2xl border border-border bg-white/5 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-text">
                {activity.label}
              </h3>
              <span className="pill">{activity.topicId}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-textMuted">
              {activity.detail}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-textMuted">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
