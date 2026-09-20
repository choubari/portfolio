"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive ASCII field.
 *
 * A rocket sits in a starfield that ripples outward from the pointer. The
 * whole thing is one <pre> whose textContent is rewritten each frame, so
 * React never re-renders and there are no per-character DOM nodes.
 *
 * Degrades in two steps: no pointer → it still drifts on its own; reduced
 * motion or no JS → the static frame rendered on the server stays put.
 */

const RAMP = " .·:-=+*%@";

// Drawn into the field; spaces are transparent.
const ROCKET = [
  "    /\\    ",
  "   /  \\   ",
  "  |    |  ",
  "  | KC |  ",
  "  |    |  ",
  " /|    |\\ ",
  "/ |____| \\",
  "  /\\  /\\  ",
  " /  \\/  \\ ",
  "    ||    ",
  "   (||)   ",
  "    ''    ",
];

/** Server-rendered fallback: the rocket on a quiet starfield. */
const STATIC_FRAME = [
  "  .      *        .       *      .         *  ",
  "     *        .        *      .        *      ",
  "  .       *       /\\        .      *       .  ",
  "      *        /  \\     *        .        *   ",
  "   .      *   |    |       .          *       ",
  "        .     | KC |   *        .         *   ",
  "  *       .   |    |        *        .        ",
  "     .       /|    |\\    .       *        .   ",
  "   *      . / |____| \\      *        .    *   ",
  "      .       /\\  /\\     .       *            ",
  "  *      .   /  \\/  \\      *          .    *  ",
  "     .    *     ||      .        *        .   ",
  "  .          * (||)  *       .        *       ",
  "     *    .      ''       *       .       *   ",
].join("\n");

export function AsciiField({ className }: { className?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -999, y: -999, active: false });

  useEffect(() => {
    const pre = preRef.current;
    const wrap = wrapRef.current;
    if (!pre || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Measure one character so the grid matches the element's real size.
    const probe = document.createElement("span");
    probe.textContent = "M".repeat(20);
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;font:inherit";
    pre.appendChild(probe);
    const charW = probe.getBoundingClientRect().width / 20;
    probe.remove();

    const styles = getComputedStyle(pre);
    const charH = parseFloat(styles.lineHeight) || charW * 1.8;
    if (!charW || !charH) return;

    let cols = 0;
    let rows = 0;
    const measure = () => {
      const w = wrap.getBoundingClientRect().width;
      cols = Math.max(24, Math.min(96, Math.floor(w / charW)));
      rows = 16;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = pre.getBoundingClientRect();
      pointer.current = {
        x: (e.clientX - r.left) / charW,
        y: (e.clientY - r.top) / charH,
        active: true,
      };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    // Deterministic per-cell star jitter, so stars don't crawl.
    const starAt = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const p = pointer.current;

      const rocketTop = Math.floor((rows - ROCKET.length) / 2);
      const rocketLeft = Math.floor((cols - ROCKET[0].length) / 2);

      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Rocket takes precedence over the field.
          const ry = y - rocketTop;
          const rx = x - rocketLeft;
          if (ry >= 0 && ry < ROCKET.length) {
            const line = ROCKET[ry];
            if (rx >= 0 && rx < line.length) {
              const ch = line[rx];
              if (ch !== " ") {
                out += ch;
                continue;
              }
            }
          }

          // Ripple from the pointer, on top of a slow ambient swell.
          // y is doubled because character cells are about twice as tall
          // as they are wide, which keeps the ripple circular.
          let v = 0;
          if (p.active) {
            const dx = x - p.x;
            const dy = (y - p.y) * 2;
            const d = Math.sqrt(dx * dx + dy * dy);
            v += Math.max(0, 1 - d / 34) * Math.sin(d * 0.55 - t * 5.2);
          }
          v += 0.16 * Math.sin(x * 0.18 + t * 0.7) * Math.cos(y * 0.34 - t * 0.5);

          const s = starAt(x, y);
          if (v < 0.12) {
            // Quiet space: a sparse, stable starfield.
            out += s > 0.987 ? "*" : s > 0.96 ? "·" : " ";
          } else {
            const idx = Math.min(
              RAMP.length - 1,
              Math.floor(v * (RAMP.length - 1) * 1.15)
            );
            out += RAMP[idx];
          }
        }
        if (y < rows - 1) out += "\n";
      }

      pre.textContent = out;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      role="img"
      aria-label="Interactive ASCII rocket in a starfield that ripples around the cursor"
    >
      <pre
        ref={preRef}
        aria-hidden="true"
        className="ascii-live select-none overflow-hidden font-mono leading-[1.15] text-[var(--action-mid)]"
      >
        {STATIC_FRAME}
      </pre>
    </div>
  );
}
