import Link from "next/link";
import { FooterSocials } from "@/config/navigation";

/** Minimal footer: one line of links, one line of credit. */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-[var(--edge)] py-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {FooterSocials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="mono transition-colors hover:text-[var(--action)]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mono">
          © {new Date().getFullYear()} Kawtar Choubari ·{" "}
          <a
            href="https://github.com/choubari/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--action)]"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
