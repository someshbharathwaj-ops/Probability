"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-xl rounded-[var(--radius-lg)] p-8">
        <div className="eyebrow">App Error</div>
        <h1 className="mt-4 font-display text-4xl">
          The learning workspace hit an unexpected state.
        </h1>
        <p className="mt-4 text-sm leading-7 text-textMuted">{error.message}</p>
        <button className="pill mt-6 text-text" onClick={() => reset()}>
          Retry
        </button>
      </div>
    </main>
  );
}
