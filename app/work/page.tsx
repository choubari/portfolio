import Link from "next/link";
import type { Metadata } from "next";
import RepoCard from "@/components/repo-card";
import { fetchGithubRepos } from "@/lib/utils";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { WorkTimeline } from "@/components/work-timeline";
import { ProjectGrid } from "@/components/project-grid";
import { TOP_REPOS } from "@/config/featured";
import { Experience } from "@/config/experience";
import { AsciiButton } from "@/components/ascii-button";

export const metadata: Metadata = {
  title: "Work — Kawtar Choubari",
  description:
    "Professional experience, side projects and open source by Kawtar Choubari.",
};

export default async function WorkPage() {
  const repos = await fetchGithubRepos();
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, TOP_REPOS);

  const shown = 4;

  return (
    <div className="py-14 sm:py-20">
      <PageTitle
        lede="Where I've worked, what I've shipped, and what I maintain in the open."
      >
        Work
      </PageTitle>

      <section className="mt-16">
        <Reveal>
          <SectionTitle
            action={{
              label: "Full history on LinkedIn",
              href: "https://linkedin.com/in/choubari",
            }}
          >
            professional experience
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <WorkTimeline limit={shown} />
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle>featured projects</SectionTitle>
        </Reveal>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle
            action={{ label: `All repos`, href: "/oss" }}
          >
            open source
          </SectionTitle>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topRepos.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 40}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full-bleed brown block, same treatment as the homepage CTA */}
      <section className="bleed mt-24 bg-[var(--brown)] text-[var(--paper)]">
        <div className="mx-auto max-w-5xl px-[var(--edge)] py-20 sm:py-24">
          <Reveal className="flex flex-col items-start gap-6">
            <h2 className="max-w-2xl text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Interested in working together?
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--paper-80)]">
              I take on a limited number of freelance and consulting projects
              alongside my full-time role. If you have something to build or an
              existing product that needs attention, I&apos;d like to hear about
              it.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-6">
              <AsciiButton href="/contact" tone="invert">
                Tell me about your project
              </AsciiButton>
              {/* Anchors into the substance on /about rather than a generic bio */}
              <Link
                href="/about#how-i-work"
                className="font-medium text-[var(--paper)] underline decoration-[var(--paper-40)] underline-offset-4 transition-colors hover:decoration-[var(--paper)]"
              >
                See how I work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
