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
        className="h-7 w-7 rounded-full"
      />
      <span className="font-mono text-sm font-medium tracking-tight text-[var(--ink)]">
        <span className="text-[var(--action)]">~/</span>
        choubari
        <span className="text-[var(--faint)] transition-colors group-hover:text-[var(--action)]">
          .com
        </span>
      </span>
    </Link>
  );
}
