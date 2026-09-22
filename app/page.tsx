import { Hero } from "@/components/hero";
import { WhatIDo } from "@/components/what-i-do";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { HScroll } from "@/components/h-scroll";
import { ProjectCard } from "@/components/project-card";
import { Projects } from "@/config/projects";
import { TalkThumb } from "@/components/talk-thumb";
import { CallToAction } from "@/components/cta";
import TestimonialCard from "@/components/testimonial-card";
import { Talks } from "@/content/talks";
import { getTestimonials } from "@/lib/strapi";
import {
  FeaturedTalkTitles,
  FeaturedTestimonialIds,
  FeaturedProjectNames,
} from "@/config/featured";

export default async function Home() {
  // Chosen explicitly in config/featured.ts, in that order — not "latest N".
  const featuredTalks = FeaturedTalkTitles.map((title) =>
    Talks.find((t) => t.title.trim() === title.trim())
  ).filter((t): t is (typeof Talks)[number] => Boolean(t));

  const featuredProjects = FeaturedProjectNames.map((n) =>
    Projects.find((p) => p.name === n)
  ).filter((p): p is (typeof Projects)[number] => Boolean(p));

  const allTestimonials = await getTestimonials();
  const featuredTestimonials = FeaturedTestimonialIds.length
    ? FeaturedTestimonialIds.map((id) =>
        allTestimonials.find((t) => t.id === id)
      ).filter(Boolean)
    : allTestimonials.slice(0, 6);

  return (
    <>
      <Hero />

      <WhatIDo />

      <section className="pb-20">
        <Reveal>
          <SectionTitle action={{ label: "All work", href: "/work" }}>
            selected work
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <HScroll itemClassName="w-[calc(50%-2.25rem)] min-w-[16rem]">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </HScroll>
        </div>
      </section>

      <section className="pb-20">
        <Reveal>
          <SectionTitle
            count={Talks.length}
            action={{ label: "All talks", href: "/talks" }}
          >
            speaking
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <HScroll itemClassName="w-[20rem]">
            {featuredTalks.map((talk) => (
              <TalkThumb key={talk.title} talk={talk} />
            ))}
          </HScroll>
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="pb-20">
          <Reveal>
            <SectionTitle
              count={allTestimonials.length}
              action={{ label: "All testimonials", href: "/testimonials" }}
            >
              what people say
            </SectionTitle>
          </Reveal>
          <div className="masonry mt-8 columns-1 sm:columns-2 lg:columns-3">
            {featuredTestimonials.map(
              (t) => t && <TestimonialCard key={t.id} testimonial={t} />
            )}
          </div>
        </section>
      )}


      <CallToAction />
    </>
  );
}
