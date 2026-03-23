export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel rounded-[var(--radius-lg)] p-8 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 font-display text-5xl">
          Signal lost in state space.
        </h1>
        <p className="mt-4 text-textMuted">
          The route you asked for is not part of the current stochastic
          manifold.
        </p>
      </div>
    </main>
  );
}
