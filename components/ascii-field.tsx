"use client";

import { useEffect, useRef } from "react";

/**
 * Diagonal ASCII rocket.
 *
 * The ship is rasterised each frame from real geometry — hull, nose cone,
 * fins, window, plume — evaluated in a frame rotated 45° up-and-right,
 * then shaded into a density ramp. Rasterising rather than hand-drawing is
 * what lets it sit on a true diagonal and read as a carved, lit object.
 *
 * Two stacked <pre> layers: the ship in accent blue, the starfield behind
 * it in a faint warm grey. Each is rewritten via textContent once per
 * frame, so React never re-renders and there are no per-character nodes.
 */

const RAMP = " .·:;-=+ox*%#@";
/* The ship uses only the dense half of the ramp, so the hull reads as a
   solid lit object rather than dissolving into mid-grey texture. */
const SHIP_RAMP = "-=+ox*%#@";

/** Character cells are about twice as tall as wide. */
const ASPECT = 1.9;
const SQRT1_2 = Math.SQRT1_2;

/** Returns 0..1 ink density for the ship at axis coords (u, v), or null. */
function shipAt(u: number, v: number, t: number): number | null {
  const BODY = 30;
  const NOSE = 14;
  const R = 8.5;

  // Nose cone
  if (u >= BODY && u <= BODY + NOSE) {
    const k = (u - BODY) / NOSE;
    const r = R * Math.pow(1 - k, 0.6);
    if (Math.abs(v) <= r) {
      if (r - Math.abs(v) < 0.9) return 1; // rim
      const n = v / Math.max(r, 0.001);
      return 0.45 + 0.5 * (1 - Math.abs(n + 0.35));
    }
    return null;
  }

  // Hull
  if (u >= 0 && u < BODY) {
    if (Math.abs(v) <= R) {
      // Porthole
      const wu = u - BODY * 0.68;
      const wd = Math.sqrt(wu * wu + v * v);
      if (wd < R * 0.4) return wd < R * 0.26 ? -1 : 1.0;

      // Hull bands
      if (
        Math.abs(u - BODY * 0.26) < 0.8 ||
        Math.abs(u - BODY * 0.38) < 0.55
      ) {
        return 1.0;
      }

      if (R - Math.abs(v) < 0.9) return 1; // hull rim
      // Cylinder shading: lightest just above the axis.
      const n = v / R;
      return 0.35 + 0.6 * (1 - Math.abs(n + 0.45));
    }

    // Fins, rear
    const span = 13;
    if (u < span) {
      const k = 1 - u / span;
      const reach = R + R * 1.35 * k;
      if (Math.abs(v) <= reach) {
        const edge = (Math.abs(v) - R) / Math.max(reach - R, 0.001);
        if (edge > 0.86) return 0.95; // fin edge
        return 0.45 + 0.3 * (1 - edge);
      }
    }
    return null;
  }

  // Exhaust plume
  if (u < 0 && u > -34) {
    const d = -u;
    const spread = R * 0.7 + d * 0.28;
    if (Math.abs(v) < spread) {
      const across = 1 - Math.abs(v) / spread;
      const fade = Math.max(0, 1 - d / 34);
      const pulse = 0.5 + 0.5 * Math.sin(d * 0.5 - t * 10);
      const val = across * fade * pulse * 1.6;
      return val > 0.12 ? Math.min(1, val) : null;
    }
  }

  return null;
}

const STATIC_SHIP = `
                                   .:=+*#%@
                                .:=+x%@@@#*
                             .-=+x%@@@@#x=.
                          :=+x%@@@@@#x=.
                       .-=x%@@@@@#x-.
                    :=+x%@@@@@@x+:
                 .=+x%@@@@@@x+.
              .-+x%@@@@@@x+-
           :=+x%@@@@@@x+:
        .=+x%@@@@@@x=.
      -+x%@@@@@@x+-
   :=+x%@@@@@%x+:
 .=+*%@@@@@x=.
-+x%@@@@x+-
+x%@@x+-
%@x=.
`.trim();

export function AsciiField({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLPreElement>(null);
  const fieldRef = useRef<HTMLPreElement>(null);
  const pointer = useRef({ x: -999, y: -999, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    const shipEl = shipRef.current;
    const fieldEl = fieldRef.current;
    if (!wrap || !shipEl || !fieldEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const probe = document.createElement("span");
    probe.textContent = "M".repeat(20);
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;font:inherit";
    shipEl.appendChild(probe);
    const charW = probe.getBoundingClientRect().width / 20;
    probe.remove();
    if (!charW) return;

    const lineH =
      parseFloat(getComputedStyle(shipEl).lineHeight) || charW * ASPECT;

    let cols = 0;
    let rows = 0;
    const measure = () => {
      const r = wrap.getBoundingClientRect();
      cols = Math.max(30, Math.min(120, Math.floor(r.width / charW)));
      rows = Math.max(16, Math.min(50, Math.floor(r.height / lineH)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.current = {
        x: (e.clientX - r.left) / charW,
        y: (e.clientY - r.top) / lineH,
        active: true,
      };
    };
    window.addEventListener("pointermove", onMove);

    const starAt = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const p = pointer.current;

      // Shifted down-left so the nose cone is not clipped by the top-right
      // corner of the container.
      const cx = cols * 0.36;
      const cy = rows * 0.6;
      const bob = Math.sin(t * 0.8) * 1.6;

      let ship = "";
      let field = "";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x - cx;
          // Screen y grows downward; flip it so "up" is positive.
          const ny = -(y - cy) * ASPECT;

          // 45° axis pointing up and to the right.
          const u = (dx + ny) * SQRT1_2 + bob;
          const v = (-dx + ny) * SQRT1_2;

          const s = shipAt(u, v, t);
          if (s === -1) {
            // Porthole glass: a deliberate hole in the hull.
            ship += " ";
            field += " ";
            continue;
          }
          if (s !== null) {
            const i = Math.max(
              0,
              Math.min(
                SHIP_RAMP.length - 1,
                Math.round(s * (SHIP_RAMP.length - 1))
              )
            );
            ship += SHIP_RAMP[i];
            field += " ";
            continue;
          }
          ship += " ";

          // Starfield with a pointer ripple.
          let val = 0;
          if (p.active) {
            const rx = x - p.x;
            const ry = (y - p.y) * ASPECT;
            const d = Math.sqrt(rx * rx + ry * ry);
            val += Math.max(0, 1 - d / 38) * Math.sin(d * 0.5 - t * 4.5);
          }
          val +=
            0.12 * Math.sin(x * 0.16 + t * 0.6) * Math.cos(y * 0.3 - t * 0.4);

          if (val < 0.16) {
            const st = starAt(x, y);
            field += st > 0.992 ? "*" : st > 0.968 ? "·" : " ";
          } else {
            const i = Math.min(
              RAMP.length - 1,
              Math.floor(val * (RAMP.length - 1) * 0.8)
            );
            field += RAMP[i];
          }
        }
        if (y < rows - 1) {
          ship += "\n";
          field += "\n";
        }
      }

      shipEl.textContent = ship;
      fieldEl.textContent = field;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="ASCII rocket climbing diagonally through a starfield that ripples around the cursor"
    >
      <pre
        ref={fieldRef}
        aria-hidden="true"
        className="ascii-live pointer-events-none absolute inset-0 select-none overflow-hidden text-[var(--faint)] opacity-70"
      />
      <pre
        ref={shipRef}
        aria-hidden="true"
        className="ascii-live pointer-events-none absolute inset-0 select-none overflow-hidden text-[var(--accent)]"
      >
        {STATIC_SHIP}
      </pre>
    </div>
  );
}
