import { cn } from "@/lib/utils";

/**
 * Small ASCII marks beside page titles.
 *
 * Only shapes that actually read at this size live here. Earlier versions
 * tried to hand-draw a person, a mic and a terminal in 6 lines and they
 * came out unreadable — anything that doesn't survive the size test is
 * simply not included, and pages without a mark render without one.
 */
const MARKS: Record<string, string> = {
  // GitHub mark: the circle with the cat silhouette, blocked out.
  github: `    ▄▄███████▄▄
  ▄█████████████▄
 ███▀▀     ▀▀███
███   ▄   ▄   ███
███           ███
 ███▄  ▀─▀  ▄███
  ▀████▄▄▄████▀
     ▀▀█ █▀▀`,

  // Stacked shipping crates.
  crates: `┌────┬────┐
│▓▓▓▓│▓▓▓▓│
├────┼────┤
│▓▓▓▓│▓▓▓▓│
└────┴────┘`,

  // A commit graph.
  graph: `  ●
  │╲
  │ ●
  │╱
  ●
  │╲
  │ ●`,
};

export function AsciiMark({
  name,
  className,
}: {
  name: keyof typeof MARKS | string;
  className?: string;
}) {
  const art = MARKS[name];
  if (!art) return null;
  return (
    <pre
      aria-hidden="true"
      className={cn(
        "select-none font-mono text-[11px] leading-[1.15] text-[var(--brown)]",
        className
      )}
    >
      {art}
    </pre>
  );
}
