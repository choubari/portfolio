import Link from "next/link";
import Image from "next/image";
import { FooterGroups, FooterSocials } from "@/config/navigation";
import SocialsIcon from "@/lib/socialsIconMap";

const SOCIAL_ICONS = FooterSocials.filter((s) => s.href.startsWith("http"));

/**
 * Footer as a solid clay slab pinned to the bottom of the page — an
 * identity block on the left, link columns on the right, one baseline rule.
 */
export function Footer() {
  return (
    <footer className="bleed mt-24 bg-[var(--card)]">
      <div className="mx-auto max-w-5xl px-[var(--edge)] py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/kawtar.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full ring-1 ring-[var(--brown)]/25"
              />
              <div>
                <p className="text-lg font-bold leading-tight">
                  Kawtar Choubari
                </p>
                <p className="mono">Full stack engineer · Paris</p>
              </div>
            </div>

            {/* TODO(copy): yours to sharpen. */}
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Shipping products at startup velocity — React, React Native and
              AI. Open to freelance work and speaking invitations.
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
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
                      className="flex h-9 w-9 items-center justify-center rounded-[6px] text-[1rem] text-[var(--brown)] transition-colors hover:bg-[var(--brown)] hover:text-[var(--card)]"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FooterGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--brown)]">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-[var(--muted)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--brown-deep)] hover:decoration-[var(--brown)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--brown)]/20 pt-6">
          <p className="mono">
            Cooked in Paris — © {new Date().getFullYear()}
          </p>
          <a
            href="https://github.com/choubari/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="mono font-medium text-[var(--brown)] underline underline-offset-4 hover:text-[var(--brown-deep)]"
          >
            source ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
