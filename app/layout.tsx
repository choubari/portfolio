import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import Analytics from "@/components/metrics/analytics";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import SpeedInsight from "@/components/metrics/speed-insight";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Server Components",
    "Github",
    "Vercel",
  ],
  authors: [
    {
      name: "Kawtar Choubari",
      url: "https://choubari.com",
    },
  ],
  creator: "Kawtar Choubari",
  publisher: "Kawtar Choubari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        alt: "Choubari.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@choubari_",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "apple-touch-icon.png",
  },
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
              <SpeedInsight />
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
