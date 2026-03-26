"use client";

import { Topic } from "@/features/learning/domain/types";

interface TopicActionsProps {
  topic: Topic;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: (topicId: Topic["id"]) => void;
}

export function TopicActions({
  topic,
  isBookmarked,
  isCompleted,
  onToggleBookmark,
}: TopicActionsProps) {
  return (
    <div className="glass-panel rounded-[var(--radius-md)] p-5">
      <div className="eyebrow">Topic Actions</div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="pill text-text" onClick={() => onToggleBookmark(topic.id)}>
          {isBookmarked ? "Remove bookmark" : "Bookmark topic"}
        </button>
        <span className="pill">{isCompleted ? "mastery checkpoint cleared" : "still in rotation"}</span>
        <span className="pill">{topic.formulas.length} formulas</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-textMuted">
        Use bookmarks to pin recurring weak spots and keep high-value topics within the
        planner lane.
      </p>
    </div>
  );
}
