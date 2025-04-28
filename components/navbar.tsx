"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

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
          <button
            className="md:hidden ml-2 p-2 rounded text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={handleMenuToggle}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? (
              <X
                className="h-6 w-6 text-accent"
                style={{
                  color: "var(--color-accent)",
                }}
              />
            ) : (
              <Menu
                className="h-6 w-6 text-accent"
                style={{
                  color: "var(--color-accent)",
                }}
              />
            )}
          </button>
          <ul className="hidden md:flex space-x-8">
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
        <div
          className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-200 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuToggle}
          aria-hidden={!menuOpen}
        />
        <ul
          className={`md:hidden fixed top-0 right-0 h-auto w-3/4 max-w-xs bg-gray-800 z-30 shadow-lg p-8 space-y-6 transform transition-transform duration-200 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="menu"
          aria-label="Mobile navigation"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close navigation menu"
            onClick={handleMenuToggle}
          >
            <X
              className="h-6 w-6 text-accent"
              style={{
                color: "var(--color-accent)",
              }}
            />
          </button>
          <li>
            <Link
              href="/about"
              className="block text-lg capitalize"
              style={linkStyle("/about")}
              onClick={handleLinkClick}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/talks"
              className="block text-lg capitalize"
              style={linkStyle("/talks")}
              onClick={handleLinkClick}
            >
              Talks
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block text-lg capitalize"
              style={linkStyle("/blog")}
              onClick={handleLinkClick}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-lg capitalize"
              style={linkStyle("/contact")}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
