import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import Analytics from "@/components/analytics";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Coding & Storytelling",
  description:
    "A monochrome, Notion-style portfolio showcasing talks and projects",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div
            className="flex flex-col min-h-screen text-white"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <Navbar />
            <main
              className="flex-1 flex flex-col mt-16 border-y border-gray-800"
              style={{ backgroundColor: "var(--color-background-alt)" }}
            >
              <Analytics />
              <div className="container mx-auto px-4 py-4 max-w-5xl flex-1 flex flex-col">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
