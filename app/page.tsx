import Link from "next/link";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { ProjectGrid } from "@/components/project-grid";
import { TalkThumb } from "@/components/talk-thumb";
import { BrandButton } from "@/components/brand-button";
import TestimonialCard from "@/components/testimonial-card";
import { Talks } from "@/content/talks";
import { getTestimonials } from "@/lib/strapi";

export default async function Home() {
  const featuredTalks = [...Talks]
    .filter((t) => t.video)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const testimonials = (await getTestimonials()).slice(0, 2);

  return (
    <>
      <Hero />

      <section className="pb-20">
        <Reveal>
          <SectionTitle action={{ label: "All work", href: "/work" }}>
            work
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <ProjectGrid limit={2} />
        </div>
      </section>

      <section className="pb-20">
        <Reveal>
          <SectionTitle action={{ label: "All talks", href: "/talks" }}>
            talks
          </SectionTitle>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {featuredTalks.map((talk, i) => (
            <Reveal key={talk.title} delay={i * 70}>
              <TalkThumb talk={talk} />
            </Reveal>
          ))}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="pb-20">
          <Reveal>
            <SectionTitle
              action={{ label: "All testimonials", href: "/testimonials" }}
            >
              testimonials
            </SectionTitle>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.id}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="pb-4">
        <Reveal className="flex flex-col items-start gap-5">
          <SectionTitle className="w-full">get in touch</SectionTitle>
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
