"use client";

import { useState } from "react";
import { TALK_TYPES, type Talk } from "@/types";
import { Talks as TalksData } from "@/content/talks";
import { TalkCard } from "@/components/talk-card";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function TalksClient() {
  const [activeType, setActiveType] = useState<string | null>(null);

  const filteredData = activeType
    ? TalksData.filter((t) => t.talkType === activeType)
    : TalksData;

  const now = new Date();
  const upcomingData = filteredData.filter((t) => new Date(t.date) > now);
  const pastData = filteredData.filter((t) => new Date(t.date) <= now);

  const talksByYear = pastData.reduce((acc, talk) => {
    const year = new Date(talk.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(talk);
    return acc;
  }, {} as Record<number, Talk[]>);

  const sortedYears = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const availableTypes = TALK_TYPES.filter(
    (type) => TalksData.filter((t) => t.talkType === type).length > 0
  );

  return (
    <div className="py-20 sm:py-28">
      <PageTitle
        eyebrow="00 / Speaking"
        lede="Wearing my speaker hat because sharing is caring!"
      >
        Public Talks
      </PageTitle>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap items-center gap-2">
        <FilterChip
          active={!activeType}
          onClick={() => setActiveType(null)}
          label={`All (${TalksData.length})`}
        />
        {availableTypes.map((type) => {
          const count = TalksData.filter((t) => t.talkType === type).length;
          return (
            <FilterChip
              key={type}
              active={activeType === type}
              onClick={() => setActiveType(activeType === type ? null : type)}
              label={`${type} (${count})`}
            />
          );
        })}
      </div>

      {upcomingData.length > 0 && (
        <section className="mt-16">
          <h3 className="label-mono flex items-center gap-2.5">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Upcoming
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {upcomingData.map((talk, i) => (
              <Reveal key={`${talk.title}-${i}`} delay={(i % 2) * 90}>
                <TalkCard talk={talk} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 space-y-16">
        {sortedYears.map((year) => (
          <section key={year}>
            <h3 className="flex items-baseline gap-4 text-2xl font-semibold tracking-display">
              {year}
              <span className="label-mono">
                {talksByYear[year].length}{" "}
                {talksByYear[year].length === 1 ? "talk" : "talks"}
              </span>
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {talksByYear[year].map((talk, i) => (
                <Reveal key={`${talk.title}-${i}`} delay={(i % 2) * 90}>
                  <TalkCard talk={talk} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="mt-16 text-[var(--muted)]">
          No talks of that kind — yet.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "label-mono rounded-full border px-4 py-2 transition-all duration-500 ease-ease",
        active
          ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
          : "border-[var(--rule)] text-[var(--muted)] hover:border-[var(--rule-strong)] hover:text-[var(--text)]"
      )}
    >
      {label}
    </button>
  );
}
