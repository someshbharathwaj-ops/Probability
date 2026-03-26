"use client";

import { Topic } from "@/features/learning/domain/types";

interface StudyPlannerProps {
  bookmarkedTopics: Topic[];
  reviewTopics: Topic[];
  dailyGoalMinutes: number;
  todayMinutes: number;
  currentStreak: number;
  longestStreak: number;
  sessionsToWeeklyTarget: number;
  onSetDailyGoal: (minutes: number) => void;
  onOpenTopic: (topicId: Topic["id"]) => void;
}

export function StudyPlanner({
  bookmarkedTopics,
  reviewTopics,
  dailyGoalMinutes,
  todayMinutes,
  currentStreak,
  longestStreak,
  sessionsToWeeklyTarget,
  onSetDailyGoal,
  onOpenTopic,
}: StudyPlannerProps) {
  const progress = Math.min(
    100,
    dailyGoalMinutes === 0 ? 0 : Math.round((todayMinutes / dailyGoalMinutes) * 100)
  );

  return (
    <section className="glass-panel rounded-[var(--radius-lg)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="eyebrow">Study Planner</div>
          <h2 className="section-heading mt-3">Daily target and quick-review lane</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[20, 40, 60].map((goal) => (
            <button
              key={goal}
              className={`pill ${goal === dailyGoalMinutes ? "text-text" : ""}`}
              onClick={() => onSetDailyGoal(goal)}
            >
              {goal}m goal
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)]">
        <article className="rounded-[var(--radius-md)] border border-border bg-white/5 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
            Goal Progress
          </div>
          <div className="mt-3 font-display text-4xl text-accent">
            {todayMinutes}m
          </div>
          <p className="mt-2 text-sm text-textMuted">Target: {dailyGoalMinutes} minutes</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-mint"
              style={{ width: `${progress}%` }}
            />
          </div>
        </article>

        <article className="rounded-[var(--radius-md)] border border-border bg-white/5 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
            Review Queue
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {reviewTopics.length > 0 ? (
              reviewTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="rounded-2xl border border-border bg-black/20 px-4 py-3 text-left"
                  onClick={() => onOpenTopic(topic.id)}
                >
                  <div className="text-sm text-text">{topic.shortTitle}</div>
                  <div className="mt-1 text-xs text-textMuted">{topic.section}</div>
                </button>
              ))
            ) : (
              <p className="text-sm leading-7 text-textMuted">
                Review recommendations will appear as you interact with more material.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-[var(--radius-md)] border border-border bg-white/5 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
            Bookmarks and Streaks
          </div>
          <div className="mt-3 flex gap-6">
            <div>
              <div className="font-display text-3xl text-gold">{currentStreak}d</div>
              <div className="text-xs uppercase tracking-[0.22em] text-textMuted">Current streak</div>
            </div>
            <div>
              <div className="font-display text-3xl text-mint">{longestStreak}d</div>
              <div className="text-xs uppercase tracking-[0.22em] text-textMuted">Best streak</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-textMuted">
            Weekly target gap: {sessionsToWeeklyTarget} more focused study sessions.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {bookmarkedTopics.length > 0 ? (
              bookmarkedTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="pill text-text"
                  onClick={() => onOpenTopic(topic.id)}
                >
                  {topic.shortTitle}
                </button>
              ))
            ) : (
              <p className="text-sm leading-7 text-textMuted">
                Bookmark a topic to keep it one tap away here.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
