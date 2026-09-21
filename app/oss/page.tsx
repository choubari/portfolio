import RepoCard from "@/components/repo-card";
import { fetchGithubRepos } from "@/lib/utils";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default async function OSS() {
  const repos = await fetchGithubRepos();

  return (
    <div className="py-14 sm:py-20">
      <PageTitle
        comment="open source"
        mark="github"
        lede="Projects I've built and shared publicly."
      >
        Open Source
      </PageTitle>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, i) => (
          <Reveal key={repo.id} delay={Math.min(i, 6) * 50}>
            <RepoCard repo={repo} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
