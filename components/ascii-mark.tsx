import { cn } from "@/lib/utils";

/**
 * ASCII glyphs beside page titles. Each one depicts what its page is
 * actually about rather than being decorative filler.
 */
const MARKS: Record<string, string> = {
  // /about — a person at a desk
  about: `    ___
   /   \\
   \\_o_/
  __|_|__
 |       |
 |_______|`,

  // /work — a shipping crate stack
  work: ` _______
|#|#|#|#|
|_|_|_|_|
|#|#|#|#|
|_|_|_|_|`,

  // /talks — a mic on a stand with sound
  talks: `   ___
  /   \\  ))
 |  o  | ))
  \\___/  ))
    |
   _|_`,

  // /blog — a terminal with a caret
  blog: ` __________
|_>_______|
| $ cat _  |
|          |
|__________|`,

  // /contact — an envelope, opening
  contact: ` __________
|\\        /|
| \\      / |
|  \\____/  |
|__________|`,

  // /oss — a branching graph
  oss: ` o
 |\\
 | o
 |/|
 o |
  \\|
   o`,

  // /creator — a play button
  creator: ` ________
|  \\     |
|   \\    |
|   /    |
|__/_____|`,

  // /newsletter — a paper plane
  newsletter: `    /|
   / |
  /__|_
  \\    \\
   \\____\\`,

  // /testimonials — a speech bubble
  testimonials: ` ________
|        |
|  " "   |
|________|
  \\/`,
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
        "select-none font-mono text-[10px] leading-[1.2] text-[var(--brown-soft)]",
        className
      )}
    >
      {art}
    </pre>
  );
}
