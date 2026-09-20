import type { Metadata } from "next";
import RepoCard from "@/components/repo-card";
import { fetchGithubRepos } from "@/lib/utils";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { WorkTimeline } from "@/components/work-timeline";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Work — Kawtar Choubari",
  description:
    "Professional experience, personal projects and open source by Kawtar Choubari.",
};

export default async function WorkPage() {
  const repos = await fetchGithubRepos();

  return (
    <div className="py-14 sm:py-20">
      <PageTitle comment="work">Everything I&apos;ve built</PageTitle>

      <section className="mt-14">
        <Reveal>
          <SectionTitle
            action={{
              label: "LinkedIn",
              href: "https://linkedin.com/in/choubari",
            }}
          >
            experience
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <WorkTimeline />
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle>projects</SectionTitle>
        </Reveal>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle
            action={{ label: "GitHub", href: "https://github.com/choubari" }}
          >
            open source
          </SectionTitle>
        </Reveal>
        <div className="mt-4 border-t border-[var(--rule)]">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={Math.min(i, 6) * 40}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
