import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Choubari — home"
      className="group inline-flex items-baseline text-xl font-semibold tracking-display"
    >
      <span className="text-[var(--faint)] transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
        {"<"}
      </span>
      <span className="text-[var(--text)]">Choubari</span>
      <span className="text-[var(--faint)] transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
        {"/>"}
      </span>
    </Link>
  );
}
