import type { Metadata } from "next";
import RepoCard from "@/components/repo-card";
import { fetchGithubRepos } from "@/lib/utils";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { WorkTimeline } from "@/components/work-timeline";
import { ProjectGrid } from "@/components/project-grid";
import { TOP_REPOS } from "@/config/featured";
import { Experience } from "@/config/experience";

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
    </div>
  );
}
