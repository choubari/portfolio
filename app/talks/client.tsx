"use client";
import { useState } from "react";
import { TALK_TYPES } from "@/types";
import { Calendar, MapPin } from "lucide-react";
import { Talks as TalksData } from "@/content/talks";

export function TalksClient() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const filteredData = activeType
    ? TalksData.filter((t) => t.talkType === activeType)
    : TalksData;
  const now = new Date();
  const upcomingData = filteredData.filter((t) => new Date(t.date) > now);
  const pastData = filteredData.filter((t) => new Date(t.date) <= now);

  // Group talks by year
  const talksByYear = pastData.reduce((acc, talk) => {
    const year = new Date(talk.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(talk);
    return acc;
  }, {} as Record<number, any[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">
          Public Talks
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p>Wearing my speaker hat because sharing is caring!</p>
      </div>

      <div className="text-center text-base text-white my-6">
        <button
          onClick={() => setActiveType(null)}
          className={`hover:underline cursor-pointer ${
            !activeType ? "text-[var(--color-accent)] underline" : "text-white"
          }`}
        >
          All ({TalksData.length})
        </button>
        <span className="mx-2">|</span>
        {TALK_TYPES.filter(
          (type) => TalksData.filter((t) => t.talkType === type).length > 0
        ).map((type, idx, arr) => {
          const count = TalksData.filter((t) => t.talkType === type).length;
          return (
            <span key={type}>
              <button
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={`hover:underline ml-2 cursor-pointer ${
                  activeType === type
                    ? "text-[var(--color-accent)] underline"
                    : "text-white"
                }`}
              >
                {`${count} ${type.toLowerCase()}${count > 1 ? "s" : ""}`}
              </button>
              {idx !== arr.length - 1 && ", "}
            </span>
          );
        })}
      </div>

      {upcomingData.length > 0 && (
        <div className="space-y-6 w-full">
          <h3
            className="text-3xl font-bold"
            style={{ color: "var(--color-accent)" }}
          >
            Upcoming
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {upcomingData.map((talk, i) => (
              <div
                key={i}
                className="flex flex-col h-full border border-gray-800 rounded-lg p-5 bg-[#17191d]"
              >
                <div className="flex-1 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-300">
                      <div
                        className="inline-flex items-center rounded-full px-3 py-1 text-sm"
                        style={{
                          backgroundColor: "rgba(99, 161, 221, 0.2)",
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
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{talk.date}</span>
                        <MapPin className="h-4 w-4 ml-4" />
                        <span>
                          {talk.country} {talk.city}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xl font-medium">
                      <span>🎤 {talk.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              {talksByYear[year].map((talk, i) => (
                <div
                  key={i}
                  className="flex flex-col h-full border border-gray-800 rounded-lg p-5 bg-[#17191d]"
                >
                  <div className="flex-1 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-300">
                        <div
                          className="inline-flex items-center rounded-full px-3 py-1 text-sm"
                          style={{
                            backgroundColor: "rgba(99, 161, 221, 0.2)",
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
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{talk.date}</span>
                          <MapPin className="h-4 w-4 ml-4" />
                          <span>
                            {talk.country} {talk.city}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <span>🎤 {talk.title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4 mt-auto">
                    {talk.video && (
                      <a
                        className="flex items-center gap-1 text-gray-300 hover-accent"
                        href={talk.video}
                        target="_blank"
                        rel="noreferrer"
                        title="Video Recording"
                      >
                        📽️<span className="underline">Video</span>
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
                        📝<span className="underline">Slides</span>
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
                        📖<span className="underline">Docs</span>
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
                        💻<span className="underline">Code</span>
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
                        🔗<span className="underline">Demo</span>
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
