import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Kawtar Choubari — home"
      className="group flex items-center gap-2.5"
    >
      <Image
        src="/kawtar.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7 rounded-full ring-1 ring-[var(--card-edge)]"
      />
      {/* The whole wordmark shifts to accent on hover — previously the
          middle stayed ink, which read as a broken hover state. */}
      <span className="font-mono text-sm font-medium tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
        <span className="text-[var(--accent)]">~/</span>
        choubari
        <span className="text-[var(--faint)] transition-colors group-hover:text-[var(--accent)]">
          .com
        </span>
      </span>
    </Link>
  );
}
