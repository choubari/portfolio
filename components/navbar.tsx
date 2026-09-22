"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import { MainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Flat and transparent at the top; becomes a glass pill once the page
  // scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the disclosure whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  // The open mobile menu always needs a surface, even at scroll position 0.
  const solid = scrolled || open;

  return (
    <nav className="fixed inset-x-0 top-0 z-40 px-[var(--edge)] pt-4">
      <div
        className={cn(
          "mx-auto max-w-5xl transition-all duration-300 ease-ease",
          open ? "overflow-hidden" : "",
          solid
            ? "rounded-lg border border-[var(--card-edge)] bg-[rgba(245,242,237,0.8)] shadow-[0_10px_30px_-12px_rgba(94,58,58,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "rounded-none border border-transparent bg-transparent shadow-none",
          open && "rounded-lg"
        )}
      >
        <div className="flex h-14 items-center justify-between px-5 sm:px-6">
          <Logo />

          <ul className="hidden items-center gap-6 sm:flex">
            {MainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[0.9375rem] font-medium transition-colors",
                    isActive(item.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--accent)]"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="mono -mr-1 p-1 font-semibold text-[var(--ink)] sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "[ close ]" : "[ menu ]"}
          </button>
        </div>

        {/* Mobile: a plain disclosure, inside the shell so it clips */}
        <ul
          id="mobile-nav"
          className={cn(
            "overflow-hidden transition-[max-height] duration-300 ease-ease sm:hidden",
            open ? "max-h-80 border-t border-[var(--card-edge)]" : "max-h-0"
          )}
        >
          {MainNav.map((item, i) => (
            <li key={item.href} className="mx-5">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "row flex items-baseline gap-3 py-3",
                  isActive(item.href)
                    ? "text-[var(--accent)]"
                    : "text-[var(--ink)]"
                )}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
