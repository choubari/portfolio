import Link from "next/link";
import { Logo } from "./logo";
import { SiGithub, SiNextdotjs, SiTailwindcss, SiVercel } from "react-icons/si";
import NewsletterBox from "@/components/newsletter-box";

export function Footer() {
  return (
    <footer
      className="w-full py-8 border-t border-gray-800"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-gray-400">
              Bringing ambitious ideas to life with software & prompt
              engineering
            </p>
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold mb-4">
              Links
              <span style={{ color: "var(--color-accent)" }}>.</span>
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover-accent">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/talks" className="hover-accent">
                  Talks
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xl font-bold mb-4">
              Newsletter
              <span style={{ color: "var(--color-accent)" }}>.</span>
            </h2>
            <p className="mb-3">
              {" "}
              <Link href={"/newsletter"} className="underline">
                Occasional updates
              </Link>
              , unsubscribe anytime.
            </p>
            <NewsletterBox type="slim" />
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Copyright. Made with ❤️ by</span>
            <a
              href="https://twitter.com/choubari_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-accent"
              style={{ color: "var(--color-accent)" }}
            >
              @choubari_
            </a>
            <span>using</span>
            <span className="flex items-center gap-1">
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
              className="hover-accent"
              style={{ color: "var(--color-accent)" }}
            >
              Open-Source.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
