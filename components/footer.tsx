import Link from "next/link";
import { FooterGroups, FooterSocials } from "@/config/navigation";

/** Every route that is not in the header is reachable from here. */
export function Footer() {
  return (
    <footer className="mt-28 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-[var(--edge)] py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FooterGroups.map((group) => (
            <div key={group.title}>
              <h2 className="comment">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--action)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="comment">social</h2>
            <ul className="mt-4 space-y-2.5">
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
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--action)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mono mt-12 border-t border-[var(--rule)] pt-6">
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
