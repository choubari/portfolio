"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar is borderless at the top of the page and gains a rule + blur
  // once the content starts sliding underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile drawer, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-[var(--rule)] bg-[rgba(8,11,24,0.72)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-[var(--edge)]">
        <Logo />

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {MainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "group relative py-1 text-sm transition-colors",
                  isActive(item.href)
                    ? "text-[var(--gold)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--gold)] transition-transform duration-500 ease-ease",
                    isActive(item.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="-mr-2 p-2 text-[var(--text)] md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[rgba(8,11,24,0.6)] backdrop-blur-sm transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-xs flex-col border-l border-[var(--rule)] bg-[var(--surface)] p-8 transition-transform duration-500 ease-ease md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <button
          className="self-end p-2 text-[var(--text)]"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>

        <ul className="mt-6 flex flex-col gap-1">
          {MainNav.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-3 border-b border-[var(--rule)] py-4 text-xl transition-all duration-500 ease-ease",
                  isActive(item.href)
                    ? "text-[var(--gold)]"
                    : "text-[var(--text)]",
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                )}
                style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms" }}
              >
                <span className="label-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
