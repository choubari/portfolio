/**
 * Hover overlay for any card whose lead element is an image — projects and
 * talks share it so the interaction is identical in both places.
 *
 * Expects the parent media wrapper to be `relative` and the card root to
 * carry `group`.
 */
export function MediaOverlay({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-all duration-300 ease-ease group-hover:bg-[var(--accent-overlay)] group-hover:opacity-100 group-focus-visible:bg-[var(--accent-overlay)] group-focus-visible:opacity-100"
    >
      <span className="inline-flex translate-y-1 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 ease-ease group-hover:translate-y-0">
        {label}
        <span aria-hidden="true">↗</span>
      </span>
    </div>
  );
}
