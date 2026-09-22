"use client";

import { useState } from "react";
import { TALK_TYPES, type Talk } from "@/types";
import { Talks as TalksData } from "@/content/talks";
import { TalkCard } from "@/components/talk-card";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { FilterChip } from "@/components/filter-chip";

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

  const availableTypes = TALK_TYPES.filter((type) =>
    TalksData.some((t) => t.talkType === type)
  );

  return (
    <div className="py-14 sm:py-20">
      <PageTitle

        lede="Wearing my speaker hat because sharing is caring!"
      >
        Talks &amp; Workshops
      </PageTitle>

      <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <FilterChip
          active={!activeType}
          onClick={() => setActiveType(null)}
          label={`all (${TalksData.length})`}
        />
        {availableTypes.map((type) => {
          const count = TalksData.filter((t) => t.talkType === type).length;
          return (
            <FilterChip
              key={type}
              active={activeType === type}
              onClick={() => setActiveType(activeType === type ? null : type)}
              label={`${type.toLowerCase()} (${count})`}
            />
          );
        })}
      </div>

      {upcomingData.length > 0 && (
        <section className="mt-12">
          <h3 className="flex items-baseline gap-3">
            <span className="text-xl font-bold tracking-[-0.02em] text-[var(--accent)]">
              Upcoming
            </span>
            <span className="font-mono text-base text-[var(--brown-soft)]">
              ({upcomingData.length})
            </span>
          </h3>
          <div className="list-sep mt-5">
            {upcomingData.map((talk, i) => (
              <Reveal key={`${talk.title}-${i}`} delay={i * 50}>
                <TalkCard talk={talk} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {sortedYears.map((year) => (
        <section key={year} className="mt-14">
          <h3 className="flex items-baseline gap-3">
            <span className="text-2xl font-bold tracking-[-0.02em]">{year}</span>
            <span className="font-mono text-base text-[var(--brown-soft)]">
              ({talksByYear[year].length}{" "}
              {talksByYear[year].length === 1 ? "talk" : "talks"})
            </span>
          </h3>
          <div className="list-sep mt-5">
            {talksByYear[year].map((talk, i) => (
              <Reveal key={`${talk.title}-${i}`} delay={Math.min(i, 5) * 50}>
                <TalkCard talk={talk} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {filteredData.length === 0 && (
        <p className="mt-12 text-[var(--muted)]">No talks of that kind yet.</p>
      )}
    </div>
  );
}

