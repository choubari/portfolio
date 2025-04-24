"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const getIsActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname === path) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#191c20]/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold">Portfolio</div>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className={`capitalize hover:text-teal-400 transition-colors ${
                  getIsActive("/") ? "text-teal-400" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/talks"
                className={`capitalize hover:text-teal-400 transition-colors ${
                  getIsActive("/talks") ? "text-teal-400" : ""
                }`}
              >
                Talks
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`capitalize hover:text-teal-400 transition-colors ${
                  getIsActive("/contact") ? "text-teal-400" : ""
                }`}
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
