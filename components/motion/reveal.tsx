"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms, applied as a CSS transition-delay. */
  delay?: number;
  /** Render as a different element. Defaults to a div. */
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Fades + lifts its children into view once, the first time they intersect.
 * All the actual animation lives in `.reveal` / `.is-visible` in globals.css,
 * so it collapses automatically under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the browser can't observe, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0: any sliver of the element counts. A higher threshold can
      // never be met by an element taller than the viewport.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);

    /**
     * Force the element visible without relying on a transition.
     *
     * `.is-visible` only *starts* a transition from opacity 0. If the tab is
     * throttled or backgrounded the animation timeline does not advance, the
     * transition sits at currentTime 0 forever, and — because transitions
     * outrank even `!important` — the content is stuck invisible. Clearing
     * transition-property cancels it and lets the inline value apply.
     */
    const forceVisible = () => {
      node.style.transition = "none";
      node.style.opacity = "1";
      node.style.transform = "none";
      setVisible(true);
    };

    // Loaded in a background tab: show it outright, animation is pointless.
    if (document.visibilityState !== "visible") forceVisible();

    const onVisibility = () => {
      if (document.visibilityState === "visible") return;
      forceVisible();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Safety net: whatever happens with the observer, nothing stays invisible.
    const failsafe = window.setTimeout(forceVisible, 3000);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
