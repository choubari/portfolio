"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();

  const getIsActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname === path) return true;
    return false;
  };

  const linkStyle = (path: string) => {
    return {
      color: getIsActive(path) ? "var(--color-accent)" : "",
    };
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-10 border-b border-gray-800"
      style={{
        backgroundColor: "var(--color-background)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/about"
                className="capitalize transition-colors hover-accent"
                style={linkStyle("/about")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/talks"
                className="capitalize transition-colors hover-accent"
                style={linkStyle("/talks")}
              >
                Talks
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="capitalize transition-colors hover-accent"
                style={linkStyle("/blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="capitalize transition-colors hover-accent"
                style={linkStyle("/contact")}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
