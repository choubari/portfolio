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
      {/* TODO(copy): title and project blurbs are yours to rewrite. */}
      <PageTitle
        comment="work"
        mark="work"
        lede="Where I've worked, what I've shipped on my own, and what I maintain in the open."
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
            experience
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <WorkTimeline limit={shown} />
        </div>
        {Experience.length > shown && (
          <p className="mono mt-4">
            + {Experience.length - shown} earlier roles —{" "}
            <a
              href="https://linkedin.com/in/choubari"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-deep)]"
            >
              see LinkedIn ↗
            </a>
          </p>
        )}
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle>side projects</SectionTitle>
        </Reveal>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionTitle
            action={{ label: `All ${repos.length} repos`, href: "/oss" }}
          >
            open source — most starred
          </SectionTitle>
        </Reveal>
        <div className="mt-4">
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
