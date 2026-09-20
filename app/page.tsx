import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { SectionTitle } from "@/components/section-title";
import { BrandButton } from "@/components/brand-button";
import { Talks } from "@/content/talks";

/* Tech pills lifted from the choubari.com banner. */
const STACK = [
  "React",
  "React Native",
  "TypeScript",
  "Next.js",
  "AI & LLMs",
  "Node.js",
];

/* TODO(copy): rewrite these three for React Native freelance positioning. */
const SERVICES = [
  {
    index: "01",
    title: "Mobile engineering",
    body: "React Native apps built to ship — from a blank repo to the store, with the release pipeline that keeps them moving.",
  },
  {
    index: "02",
    title: "Web engineering",
    body: "React and Next.js front-ends, typed end to end, tuned for the performance budget the product actually has.",
  },
  {
    index: "03",
    title: "Speaking & teaching",
    body: "Conference talks, workshops and educational content that turn hard-won engineering practice into something a team can use.",
  },
];

export default function Home() {
  const recentTalks = [...Talks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <Hero />

      <Reveal as="section" className="bleed my-4">
        <Marquee items={STACK} />
      </Reveal>

      {/* What I do */}
      <section className="py-24 sm:py-32">
        <Reveal>
          <SectionTitle index="01" kicker="What I do">
            Engineering, end to end
          </SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.index} delay={i * 110}>
              <article className="group h-full bg-[var(--surface)] p-7 transition-colors duration-500 ease-ease hover:bg-[var(--raised)]">
                <span className="label-mono text-[var(--gold)]">
                  {service.index}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recent talks */}
      <section className="border-t border-[var(--rule)] py-24 sm:py-32">
        <Reveal>
          <SectionTitle index="02" kicker="On stage">
            Recent talks
          </SectionTitle>
        </Reveal>

        <ul className="mt-14">
          {recentTalks.map((talk, i) => (
            <Reveal as="li" key={talk.title} delay={i * 90}>
              <Link
                href="/talks"
                className="group flex flex-col gap-2 border-b border-[var(--rule)] py-6 transition-colors duration-500 ease-ease hover:border-[var(--rule-strong)] sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="label-mono shrink-0 sm:w-40">
                  {talk.date}
                </span>
                <span className="flex-1 text-lg transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
                  {talk.title}
                </span>
                <span className="label-mono shrink-0">
                  {talk.host}{" "}
                  <span className="font-sans">{talk.country}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <Link
            href="/talks"
            className="link-underline mt-10 inline-flex items-center gap-1.5 text-sm"
          >
            All talks
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[var(--rule)] py-24 sm:py-32">
        <Reveal className="flex flex-col items-start gap-8">
          <SectionTitle index="03" kicker="Next">
            Let&apos;s build something cool together
          </SectionTitle>
          {/* TODO(copy): freelance availability + engagement types. */}
          <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            Tell me what you&apos;re building and where it&apos;s stuck.
          </p>
          <Link href="/contact">
            <BrandButton>Let&apos;s CHAT!</BrandButton>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
