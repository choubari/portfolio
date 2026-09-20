import RepoCard from "@/components/repo-card";
import { fetchGithubRepos } from "@/lib/utils";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default async function OSS() {
  const repos = await fetchGithubRepos();

  return (
    <div className="py-20 sm:py-28">
      <PageTitle
        eyebrow="00 / Open source"
        lede="Here are some of the open sourced projects I've worked on."
      >
        Open Source Contributions
      </PageTitle>

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, i) => (
          <Reveal key={repo.id} delay={(i % 3) * 90}>
            <RepoCard repo={repo} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
