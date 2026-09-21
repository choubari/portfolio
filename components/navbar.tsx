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

  // Close the disclosure whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 bg-[rgba(245,242,237,0.6)] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,#000_62%,transparent)]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-[var(--edge)]">
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
                    ? "text-[var(--action)]"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
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

      {/* Mobile: a plain disclosure, not a drawer */}
      <ul
        id="mobile-nav"
        className={cn(
          "overflow-hidden bg-[var(--paper)] transition-[max-height] duration-300 ease-ease sm:hidden",
          open ? "max-h-80 border-t border-[var(--rule)]" : "max-h-0"
        )}
      >
        {MainNav.map((item, i) => (
          <li key={item.href} className="mx-[var(--edge)]">
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "row flex items-baseline gap-3 py-3",
                isActive(item.href)
                  ? "text-[var(--action)]"
                  : "text-[var(--ink)]"
              )}
            >
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
