import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. Longer = slower. */
  duration?: number;
  className?: string;
}

/**
 * Infinite horizontal loop. The track is duplicated so the seam is invisible;
 * edges are mask-faded, it pauses on hover, and stops under reduced-motion.
 */
export function Marquee({ items, duration = 38, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn("marquee border-y border-[var(--rule)] py-4", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="label-mono flex shrink-0 items-center gap-6 px-6"
          >
            {item}
            <span className="text-[var(--gold)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
