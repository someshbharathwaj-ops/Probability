"use client";

export function TopicFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-6 block">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-textMuted">
        Filter Topics
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search topics, sections, or ideas"
        className="mt-3 w-full rounded-2xl border border-border bg-black/20 px-4 py-3 text-sm text-text outline-none transition placeholder:text-textMuted focus:border-accent"
      />
    </label>
  );
}
