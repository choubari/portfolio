"use client";

import { useEffect, useRef } from "react";

/**
 * A real 3D ASCII rocket you can grab and spin.
 *
 * Proper 3D, not a rotated sprite: the hull, nose cone, fins and nozzle are
 * sampled as parametric surfaces, each sample carries a surface normal, and
 * every point is rotated, perspective-projected and written through a
 * z-buffer. The character comes from Lambert shading (normal · light) — the
 * same technique as the classic spinning-donut demo.
 *
 * Drag to rotate. Release and it eases back into a slow idle spin.
 */

// Dark -> bright. Index 0 is used for faces pointing away from the light.
const RAMP = ".,-~:;=!*#$@";

type Sample = {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
};

/** Build the rocket once — the geometry never changes, only the rotation. */
function buildRocket(): Sample[] {
  const pts: Sample[] = [];
  const R = 1; // hull radius
  const BOTTOM = -1.3;
  const SHOULDER = 0.7; // where the cone starts
  const TIP = 1.9;

  const push = (
    x: number,
    y: number,
    z: number,
    nx: number,
    ny: number,
    nz: number
  ) => {
    const len = Math.hypot(nx, ny, nz) || 1;
    pts.push({ x, y, z, nx: nx / len, ny: ny / len, nz: nz / len });
  };

  // --- Hull (cylinder) ---
  for (let t = 0; t < Math.PI * 2; t += 0.07) {
    const ct = Math.cos(t);
    const st = Math.sin(t);
    for (let y = BOTTOM; y < SHOULDER; y += 0.035) {
      push(R * ct, y, R * st, ct, 0, st);
    }
  }

  // --- Nose cone ---
  const coneH = TIP - SHOULDER;
  const slope = R / coneH; // for the normal's vertical component
  for (let t = 0; t < Math.PI * 2; t += 0.07) {
    const ct = Math.cos(t);
    const st = Math.sin(t);
    for (let y = SHOULDER; y < TIP; y += 0.035) {
      const rad = R * (1 - (y - SHOULDER) / coneH);
      push(rad * ct, y, rad * st, ct, slope, st);
    }
  }

  // --- Nozzle (flared skirt) ---
  for (let t = 0; t < Math.PI * 2; t += 0.09) {
    const ct = Math.cos(t);
    const st = Math.sin(t);
    for (let y = BOTTOM - 0.4; y < BOTTOM; y += 0.045) {
      const k = (BOTTOM - y) / 0.4;
      const rad = R * (0.75 + 0.45 * k);
      push(rad * ct, y, rad * st, ct, -0.35, st);
    }
  }

  // --- Three fins ---
  for (let f = 0; f < 3; f++) {
    const a = (f / 3) * Math.PI * 2;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    // Fin plane normal is perpendicular to the fin's own plane.
    const nx = -sa;
    const nz = ca;
    for (let u = 0; u <= 1; u += 0.022) {
      // Sweeps outward as it goes down.
      const reach = R + 1.15 * u;
      const yTop = BOTTOM + 0.95 * (1 - u) + 0.05;
      for (let y = BOTTOM - 0.15; y < yTop; y += 0.045) {
        const r = R + (reach - R) * 1;
        push(r * ca, y, r * sa, nx, 0.12, nz);
        push(r * ca, y, r * sa, -nx, 0.12, -nz);
      }
    }
  }

  return pts;
}

export function Ascii3D({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pre = preRef.current;
    if (!wrap || !pre) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const probe = document.createElement("span");
    probe.textContent = "M".repeat(20);
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;font:inherit";
    pre.appendChild(probe);
    const charW = probe.getBoundingClientRect().width / 20;
    probe.remove();
    if (!charW) return;
    const lineH = parseFloat(getComputedStyle(pre).lineHeight) || charW * 1.9;

    const points = buildRocket();

    let cols = 0;
    let rows = 0;
    let scale = 1;
    const measure = () => {
      const r = wrap.getBoundingClientRect();
      cols = Math.max(24, Math.min(120, Math.floor(r.width / charW)));
      rows = Math.max(14, Math.min(60, Math.floor(r.height / lineH)));
      // Fit the ~3.6-unit-tall rocket into the shorter axis.
      scale = Math.min(cols / 2.1, (rows * (lineH / charW)) / 3.6);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    // Orientation, and the velocity that carries it after a flick.
    let yaw = 0.6;
    let pitch = -0.25;
    let vYaw = 0;
    let vPitch = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vYaw = 0;
      vPitch = 0;
      wrap.setPointerCapture(e.pointerId);
      wrap.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vYaw = dx * 0.01;
      vPitch = dy * 0.01;
      yaw += vYaw;
      pitch += vPitch;
      pitch = Math.max(-1.3, Math.min(1.3, pitch));
      e.preventDefault();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      wrap.style.cursor = "grab";
      if (wrap.hasPointerCapture(e.pointerId))
        wrap.releasePointerCapture(e.pointerId);
    };

    wrap.style.cursor = "grab";
    wrap.style.touchAction = "none";
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    const zbuf = new Float32Array(1);
    let buffers = { z: zbuf, ch: new Uint8Array(1), size: 0 };

    const render = () => {
      const size = cols * rows;
      if (buffers.size !== size) {
        buffers = {
          z: new Float32Array(size),
          ch: new Uint8Array(size),
          size,
        };
      }
      const { z: zb, ch } = buffers;
      zb.fill(0);
      ch.fill(32); // space

      const cA = Math.cos(pitch);
      const sA = Math.sin(pitch);
      const cB = Math.cos(yaw);
      const sB = Math.sin(yaw);

      // Light from the upper left, in front.
      const lx = -0.5;
      const ly = 0.7;
      const lz = -0.5;
      const ll = Math.hypot(lx, ly, lz);

      const cx = cols / 2;
      const cy = rows / 2;
      const K2 = 7; // camera distance
      const K1 = scale * K2 * 0.78;
      const yAspect = charW / lineH; // squash y so the rocket isn't stretched

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Yaw about Y, then pitch about X.
        const x1 = p.x * cB + p.z * sB;
        const z1 = -p.x * sB + p.z * cB;
        const y2 = p.y * cA - z1 * sA;
        const z2 = p.y * sA + z1 * cA;

        const nx1 = p.nx * cB + p.nz * sB;
        const nz1 = -p.nx * sB + p.nz * cB;
        const ny2 = p.ny * cA - nz1 * sA;
        const nz2 = p.ny * sA + nz1 * cA;

        const zc = z2 + K2;
        if (zc <= 0.1) continue;
        const ooz = 1 / zc;

        const sx = Math.round(cx + K1 * ooz * x1);
        const sy = Math.round(cy - K1 * ooz * y2 * yAspect);
        if (sx < 0 || sx >= cols || sy < 0 || sy >= rows) continue;

        const idx = sy * cols + sx;
        if (ooz <= zb[idx]) continue;

        const lum = (nx1 * lx + ny2 * ly + nz2 * lz) / ll;
        const li = Math.max(
          0,
          Math.min(RAMP.length - 1, Math.round(((lum + 1) / 2) * (RAMP.length - 1)))
        );

        zb[idx] = ooz;
        ch[idx] = RAMP.charCodeAt(li);
      }

      let out = "";
      for (let y = 0; y < rows; y++) {
        out += String.fromCharCode(...ch.subarray(y * cols, y * cols + cols));
        if (y < rows - 1) out += "\n";
      }
      pre.textContent = out;
    };

    let raf = 0;
    const loop = () => {
      if (!dragging) {
        // Idle: ease the flick out, then settle into a slow spin.
        vYaw *= 0.94;
        vPitch *= 0.9;
        yaw += vYaw + 0.006;
        pitch += vPitch;
        pitch += (-0.15 - pitch) * 0.01; // drift back toward level
      }
      render();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      render(); // one static frame, still draggable
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`group relative select-none ${className ?? ""}`}
      role="img"
      aria-label="A 3D ASCII rocket. Drag to rotate it."
    >
      <pre
        ref={preRef}
        aria-hidden="true"
        className="ascii-live h-full w-full overflow-hidden text-[var(--accent)]"
      />
      <span className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] text-[var(--brown-soft)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        drag to rotate
      </span>
    </div>
  );
}
