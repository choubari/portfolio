import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <div className="flex flex-col pt-10 pb-44 md:pt-32 min-h-[calc(100vh-76px)]">
          <div className="flex flex-col justify-center space-y-12 w-full">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              <span style={{ color: "var(--color-accent)" }}>
                Coding & Storytelling:
              </span>{" "}
              <br />
              That&apos;s what I do!
            </h1>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-4 py-1 h-auto"
              >
                Engineering
              </Button>
              <Button
                variant="outline"
                className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-4 py-1 h-auto"
              >
                Educating
              </Button>
              <Button
                variant="outline"
                className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-4 py-1 h-auto"
              >
                Entertaining
              </Button>
            </div>

            <p className="text-xl leading-relaxed max-w-2xl">
              I bring ambitious ideas to life with software engineering, and
              share my expertise across conferences and social media.
            </p>

            <div>
              <Link href="/contact">
                {/* <Button
                  className="text-white rounded-full text-lg px-6 py-3 h-auto"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
               */}
                <Button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full text-lg px-6 py-3 h-auto">
                  Let&apos;s CHAT!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
