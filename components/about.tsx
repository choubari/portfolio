import { Button } from "@/components/ui/button";

export function About() {
  return (
    <div className="space-y-12">
      <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
        <span className="text-teal-400">Coding & Storytelling:</span> <br />
        That&apos;s what I do!
      </h1>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-6 py-2 h-auto"
        >
          Engineering
        </Button>
        <Button
          variant="outline"
          className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-6 py-2 h-auto"
        >
          Educating
        </Button>
        <Button
          variant="outline"
          className="bg-blue-400/20 text-blue-200 hover:bg-blue-400/30 border-blue-400/30 rounded-md text-lg px-6 py-2 h-auto"
        >
          Entertaining
        </Button>
      </div>

      <p className="text-xl leading-relaxed max-w-2xl">
        I bring ambitious ideas to life with software engineering, and share my
        expertise across conferences and social media.
      </p>

      <div>
        <Button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full text-lg px-6 py-3 h-auto">
          Let&apos;s CHAT!
        </Button>
      </div>
    </div>
  );
}
