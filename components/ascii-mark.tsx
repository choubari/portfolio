import { cn } from "@/lib/utils";

/**
 * Small ASCII glyphs that sit beside page titles. Each page picks one by
 * name, so the set stays consistent instead of being improvised per page.
 */
const MARKS: Record<string, string> = {
  rocket: `   /\\
  /  \\
 |    |
 | KC |
 |____|
  /\\/\\
 '    '`,
  terminal: ` ______
|>_    |
|      |
|______|`,
  mic: `  .-.
  | |
  | |
 (   )
  '-'
 __|__`,
  code: ` <  >
  \\/
  /\\
 </  >`,
  star: `   *
  /|\\
 * + *
  \\|/
   *`,
  mail: ` ______
|\\    /|
| \\  / |
|  \\/  |
|______|`,
  grid: ` [][][]
 [][][]
 [][][]`,
  quote: `  ,,
 (  )
  \\/
  ''`,
};

export function AsciiMark({
  name,
  className,
}: {
  name: keyof typeof MARKS | string;
  className?: string;
}) {
  const art = MARKS[name] ?? MARKS.rocket;
  return (
    <pre
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none font-mono text-[9px] leading-[1.15] text-[var(--accent)] opacity-80 sm:text-[10px]",
        className
      )}
    >
      {art}
    </pre>
  );
}
