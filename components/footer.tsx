import Link from "next/link";
import { FooterGroups, FooterSocials } from "@/config/navigation";
import SocialsIcon from "@/lib/socialsIconMap";

/** Newsletter is an internal page and lives in the "words" column instead. */
const SOCIAL_ICONS = FooterSocials.filter((s) => s.href.startsWith("http"));

export function Footer() {
  return (
    <footer className="px-[var(--edge)] pb-8 pt-20">
      {/* The footer is a card sitting on the paper, not a hairline rule. */}
      <div className="card mx-auto max-w-5xl p-8 sm:p-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {FooterGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brown)]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brown)]">
              social
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOCIAL_ICONS.map((social) => {
                const Icon =
                  SocialsIcon[
                    social.label.toLowerCase() as keyof typeof SocialsIcon
                  ] || SocialsIcon["none"];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[var(--brown)]/10 text-[1.05rem] text-[var(--brown)] transition-colors hover:bg-[var(--brown)] hover:text-white"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--card-edge)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* TODO(copy): positioning line — yours to sharpen. */}
          <p className="text-[0.9375rem] text-[var(--muted)]">
            Shipping products at startup velocity — React, React Native and AI.
          </p>
          <p className="mono">
            Cooked in Paris ·{" "}
            <a
              href="https://github.com/choubari/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-deep)]"
            >
              source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
