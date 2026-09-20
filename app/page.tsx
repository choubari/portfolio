import Link from "next/link";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { WorkTimeline } from "@/components/work-timeline";
import { LinkedInFeed } from "@/components/linkedin-posts";
import { BrandButton } from "@/components/brand-button";
import { Talks } from "@/content/talks";

export default function Home() {
  const recentTalks = [...Talks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <>
      <Hero />

      <section className="pb-16">
        <Reveal>
          <SectionTitle action={{ label: "Full history", href: "/about" }}>
            work
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <WorkTimeline limit={4} />
        </div>
      </section>

      <section className="pb-16">
        <Reveal>
          <SectionTitle action={{ label: "All talks", href: "/talks" }}>
            speaking
          </SectionTitle>
        </Reveal>
        <ul className="mt-6 border-t border-[var(--rule)]">
          {recentTalks.map((talk, i) => (
            <Reveal as="li" key={`${talk.title}-${i}`} delay={i * 60}>
              <Link
                href="/talks"
                className="row grid grid-cols-1 gap-x-8 gap-y-1 py-4 sm:grid-cols-[9rem_1fr]"
              >
                <span className="mono pt-0.5">{talk.date}</span>
                <span>
                  {talk.title}
                  <span className="mono ml-2">{talk.host}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="pb-16">
        <Reveal>
          <SectionTitle
            action={{ label: "LinkedIn", href: "https://linkedin.com/in/choubari" }}
          >
            recent posts
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <LinkedInFeed />
        </div>
      </section>

      <section className="pb-8">
        <Reveal className="flex flex-col items-start gap-5">
          <SectionTitle className="w-full">get in touch</SectionTitle>
          {/* TODO(copy): your words here. */}
          <p className="max-w-xl leading-relaxed text-[var(--muted)]">
            Building something in React or React Native, or looking for a
            speaker? Tell me what you&apos;re working on.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <BrandButton>Let&apos;s work together</BrandButton>
            </Link>
            <a href="mailto:contact@choubari.com?subject=Speaking%20invitation">
              <BrandButton tone="ghost">Invite me to speak</BrandButton>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
