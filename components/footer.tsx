import Link from "next/link";
import { FooterGroups, FooterSocials } from "@/config/navigation";
import SocialsIcon from "@/lib/socialsIconMap";
import { AsciiRule } from "@/components/ascii-rule";

/**
 * Socials render as icons. Newsletter is deliberately excluded here — it is
 * an internal page and already lives in the "words" column.
 */
const SOCIAL_ICONS = FooterSocials.filter((s) => s.href.startsWith("http"));

export function Footer() {
  return (
    <footer className="mt-28 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-[var(--edge)] py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {FooterGroups.map((group) => (
            <div key={group.title}>
              <h2 className="comment">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--rule)] pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ul className="flex flex-wrap items-center gap-2">
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
                      className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--card-edge)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mono mt-5 leading-relaxed">
              Kawtar Choubari — full stack engineer, Paris.
              <br />
              Available for React &amp; React Native work, and for speaking.
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <AsciiRule />
            <p className="mono mt-3">
              © {new Date().getFullYear()} · built with Next.js ·{" "}
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
      </div>
    </footer>
  );
}
