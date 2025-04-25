import {
  Calendar,
  Clock,
  Mic,
  FileText,
  Code,
  LinkIcon,
  Video,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Talks as TalksData } from "@/content/talks";

export function Talks() {
  // Group talks by year
  const talksByYear = TalksData.reduce((acc, talk) => {
    const year = new Date(talk.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(talk);
    return acc;
  }, {} as Record<number, any[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Public Talks
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="mb-3">
          Wearing my speaker hat because sharing is caring!
        </p>
      </div>

      <div className="space-y-16 w-full">
        {sortedYears.map((year) => (
          <div key={year} className="space-y-6 w-full">
            <h3
              className="text-3xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              {year}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {talksByYear[year].map((talk, index) => (
                <div
                  key={index}
                  className="border border-gray-800 rounded-lg p-5 bg-[#17191d]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-300">
                        <div
                          className="inline-flex items-center rounded-full px-3 py-1 text-sm"
                          style={{
                            backgroundColor: "rgba(45, 212, 191, 0.2)",
                            color: "var(--color-accent)",
                          }}
                        >
                          ⏱️ {talk.duration}
                        </div>
                        <div
                          className="inline-flex items-center rounded-full px-3 py-1 text-sm"
                          style={{
                            backgroundColor: "rgba(87, 90, 96, 0.5)",
                            color: "var(--color-accent)",
                          }}
                        >
                          {talk.talkType}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xl font-semibold">
                          <a
                            href={talk.hostLink || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4 hover-accent"
                          >
                            {talk.host}
                          </a>
                          <span>
                            {talk.country} {talk.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{talk.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xl font-medium">
                        <span>🎤 {talk.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {talk.video && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.video}
                        target="_blank"
                        rel="noreferrer"
                        title="Video Recording"
                      >
                        📽️
                        <span className="underline">Video</span>
                      </a>
                    )}

                    {talk.slides && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.slides}
                        target="_blank"
                        rel="noreferrer"
                        title="Slides"
                      >
                        📝
                        <span className="underline">Slides</span>
                      </a>
                    )}

                    {talk.docs && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.docs}
                        target="_blank"
                        rel="noreferrer"
                        title="Docs"
                      >
                        📖
                        <span className="underline">Docs</span>
                      </a>
                    )}

                    {talk.demoCode && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.demoCode}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Source Code"
                      >
                        💻
                        <span className="underline">Code</span>
                      </a>
                    )}

                    {talk.demoLink && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        title="Demo Link"
                      >
                        🔗
                        <span className="underline">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
