/**
 * Four-frame ASCII rocket. The exhaust pulses and the starfield drifts;
 * everything is CSS (see `.ascii` in globals.css), so there is no JS cost
 * and no dependency. Frame 1 doubles as the static fallback when animation
 * cannot run — reduced-motion, or CSS animations otherwise unavailable.
 */

const FRAMES = [
  `      .        *           .
   *          .        *
        /\\              .
       |==|      *
       |  |   .
   .   |KC|          *
       |  |    .
      /|  |\\
     / |__| \\   .
   *   \\  /        *
        \\/     .
        ||
        ''`,

  `   .       *        .      *
        .         *
        /\\   .
       |==|
   *   |  |       *
       |KC|   .
    .  |  |
      /|  |\\        .
     / |__| \\
       \\  /   *
   *    \\/
        /\\
       (||)
        ''`,

  `  *        .    *         .
      *        .
        /\\        *
       |==|  .
       |  |
   .   |KC|      *
       |  |  .
      /|  |\\
  *  / |__| \\    .
       \\  /
        \\/    *
        /\\
       ( || )
      '  ''  '`,

  `      *    .         *
   .          *     .
        /\\             *
       |==|
    *  |  |    .
       |KC|
       |  |     *
      /|  |\\  .
     / |__| \\
   .   \\  /     *
        \\/
        /\\
      ((||))
     '  '''  '`,
];

export function AsciiRocket({ className }: { className?: string }) {
  return (
    <div
      className={`ascii ${className ?? ""}`}
      role="img"
      aria-label="ASCII art of a rocket launching through a starfield"
    >
      {FRAMES.map((frame, i) => (
        <pre key={i} className="ascii-frame" aria-hidden="true">
          {frame}
        </pre>
      ))}
    </div>
  );
}
