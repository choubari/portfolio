"use client";

import { useEffect, useRef } from "react";

/**
 * An ASCII envelope that opens, lets a letter rise out, and closes again.
 * Frames are generated rather than hand-drawn so the flap angle and the
 * letter's position move continuously instead of snapping between poses.
 */
const W = 34;
const H = 15;

function frame(t: number): string {
  // 0..1 progress through the loop, eased so it dwells when open.
  const phase = (Math.sin(t * 1.1) + 1) / 2;
  const open = phase * phase * (3 - 2 * phase);

  const grid: string[][] = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => " ")
  );

  const set = (x: number, y: number, c: string) => {
    if (x >= 0 && x < W && y >= 0 && y < H) grid[y][x] = c;
  };

  const left = 3;
  const right = W - 4;
  const top = 5;
  const bottom = H - 2;

  // Letter rising out of the envelope
  const lift = Math.round(open * 5);
  if (lift > 0) {
    const lTop = top - lift;
    const lLeft = left + 4;
    const lRight = right - 4;
    for (let x = lLeft; x <= lRight; x++) {
      set(x, lTop, "─");
      set(x, top, "─");
    }
    for (let y = lTop; y <= top; y++) {
      set(lLeft, y, "│");
      set(lRight, y, "│");
    }
    // A couple of lines of "writing"
    for (let y = lTop + 1; y < top; y += 2) {
      for (let x = lLeft + 2; x < lRight - 2; x++) set(x, y, "-");
    }
  }

  // Envelope body
  for (let x = left; x <= right; x++) {
    set(x, top, "─");
    set(x, bottom, "─");
  }
  for (let y = top; y <= bottom; y++) {
    set(left, y, "│");
    set(right, y, "│");
  }
  set(left, top, "┌");
  set(right, top, "┐");
  set(left, bottom, "└");
  set(right, bottom, "┘");

  // Flap: closed folds down into a V, open folds up and out.
  const mid = Math.round((left + right) / 2);
  const depth = bottom - top;
  const flapDown = Math.round((1 - open) * (depth - 1));
  for (let i = 0; i <= mid - left; i++) {
    const yDown = top + Math.round((i / (mid - left)) * flapDown);
    const yUp = top - Math.round((i / (mid - left)) * open * 3);
    const y = open > 0.02 ? yUp : yDown;
    set(left + i, y, open > 0.02 ? "/" : "\\");
    set(right - i, y, open > 0.02 ? "\\" : "/");
  }

  return grid.map((r) => r.join("")).join("\n");
}

export function AsciiEnvelope({ className }: { className?: string }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = frame(Math.PI / 2);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      el.textContent = frame((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`select-none whitespace-pre font-mono text-[11px] leading-[1.15] text-[var(--accent)] sm:text-[13px] ${
        className ?? ""
      }`}
    >
      {frame(0)}
    </pre>
  );
}
