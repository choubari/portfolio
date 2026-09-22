import type React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import SpeedInsight from "@/components/metrics/speed-insight";
import AuthProvider from "@/components/auth-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "React Native",
    "React",
    "Next.js",
    "TypeScript",
    "Freelance",
    "Mobile engineer",
    "Conference speaker",
  ],
  authors: [{ name: "Kawtar Choubari", url: "https://choubari.com" }],
  creator: "Kawtar Choubari",
  publisher: "Kawtar Choubari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.jpg`, alt: "Choubari.com" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@choubari_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Runs before first paint. Entrance animations only apply once this
            marks the document JS-capable, so the page is never blank. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--action)] focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main
                id="main"
                className="flex flex-1 flex-col pt-24"
              >
                <SpeedInsight />
                <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-[var(--edge)]">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
            <Toaster richColors theme="light" />
            <SpeedInsights />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
