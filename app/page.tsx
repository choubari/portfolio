import { Hero } from "@/components/hero";
import { CallToAction } from "@/components/cta";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { ProjectGrid } from "@/components/project-grid";
import { TalkThumb } from "@/components/talk-thumb";
import { LinkedInFeed } from "@/components/linkedin-posts";
import TestimonialCard from "@/components/testimonial-card";
import RepoCard from "@/components/repo-card";
import { Talks } from "@/content/talks";
import { getTestimonials } from "@/lib/strapi";
import { fetchGithubRepos } from "@/lib/utils";
import {
  FeaturedTalkTitles,
  FeaturedTestimonialIds,
  TOP_REPOS,
} from "@/config/featured";

export default async function Home() {
  // Explicitly chosen in config/featured.ts, in that order — not "latest N".
  const featuredTalks = FeaturedTalkTitles.map((title) =>
    Talks.find((t) => t.title.trim() === title.trim())
  ).filter((t): t is (typeof Talks)[number] => Boolean(t));

  const allTestimonials = await getTestimonials();
  const featuredTestimonials = FeaturedTestimonialIds.length
    ? FeaturedTestimonialIds.map((id) =>
        allTestimonials.find((t) => t.id === id)
      ).filter(Boolean)
    : allTestimonials.slice(0, 2);

  const repos = await fetchGithubRepos();
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return (
    <>
      <Hero />

      <section className="pb-20">
        <Reveal>
          <SectionTitle action={{ label: "All work", href: "/work" }}>
            selected work
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <ProjectGrid limit={2} />
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
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {featuredTalks.map((talk, i) => (
            <Reveal key={talk.title} delay={i * 70}>
              <TalkThumb talk={talk} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <Reveal>
          <SectionTitle
            count={repos.length}
            action={{ label: "All repos", href: "/oss" }}
          >
            open source
          </SectionTitle>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {topRepos.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 50}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="pb-20">
          <Reveal>
            <SectionTitle
              count={allTestimonials.length}
              action={{ label: "All testimonials", href: "/testimonials" }}
            >
              kind words
            </SectionTitle>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {featuredTestimonials.map(
              (t) =>
                t && (
                  <Reveal key={t.id}>
                    <TestimonialCard testimonial={t} />
                  </Reveal>
                )
            )}
          </div>
        </section>
      )}

      <section className="pb-20">
        <Reveal>
          <SectionTitle
            action={{
              label: "LinkedIn",
              href: "https://linkedin.com/in/choubari",
            }}
          >
            recent posts
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <LinkedInFeed />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
