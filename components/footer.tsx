import Link from "next/link";
import { Logo } from "./logo";
import { SiGithub, SiNextdotjs, SiTailwindcss, SiVercel } from "react-icons/si";
import NewsletterBox from "@/components/newsletter-box";
import { FooterLinks, FooterSocials } from "@/config/navigation";
import SocialsIcon from "@/lib/socialsIconMap";

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-[var(--edge)] py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed text-[var(--muted)]">
              Bringing ambitious ideas to life with software &amp; prompt
              engineering
            </p>

            <ul className="mt-6 flex flex-wrap gap-4">
              {FooterSocials.filter((s) => s.href.startsWith("http")).map(
                (social) => {
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
                        className="inline-block text-lg text-[var(--faint)] transition-all duration-500 ease-ease hover:-translate-y-0.5 hover:text-[var(--gold)]"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label-mono">Links</h2>
            <ul className="mt-5 space-y-3">
              {FooterLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--muted)] transition-colors duration-500 ease-ease hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="label-mono">Newsletter</h2>
            <p className="mt-5 text-[var(--muted)]">
              <Link href="/newsletter" className="link-underline">
                Occasional updates
              </Link>
              , unsubscribe anytime.
            </p>
            <div className="mt-4">
              <NewsletterBox type="slim" />
            </div>
          </div>
        </div>

        <div className="label-mono mt-16 flex flex-wrap items-center justify-center gap-2 border-t border-[var(--rule)] pt-8 text-center normal-case tracking-normal">
          <span>© {new Date().getFullYear()} Copyright. Made with ❤️ by</span>
          <a
            href="https://twitter.com/choubari_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sky)] transition-colors hover:text-[var(--gold)]"
          >
            @choubari_
          </a>
          <span>using</span>
          <span className="flex items-center gap-1.5 text-[var(--text)]">
            <SiNextdotjs />
            <SiTailwindcss />
            <SiGithub />
            <SiVercel />
          </span>
          <span>. Proudly</span>
          <a
            href="https://github.com/choubari/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sky)] transition-colors hover:text-[var(--gold)]"
          >
            Open-Source.
          </a>
        </div>
      </div>
    </footer>
  );
}
