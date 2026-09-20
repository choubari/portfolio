import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Choubari — home"
      className="group font-mono text-sm font-medium tracking-tight text-[var(--ink)]"
    >
      <span className="text-[var(--action)]">~/</span>
      choubari
      <span className="text-[var(--faint)] transition-colors group-hover:text-[var(--action)]">
        .com
      </span>
    </Link>
  );
}
