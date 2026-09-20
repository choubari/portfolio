import Link from "next/link";
import { Repo } from "@/types";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="row group grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
    >
      <div className="min-w-0">
        <h3 className="font-semibold transition-colors group-hover:text-[var(--action)]">
          {repo.name}
        </h3>
        {repo.description && (
          <p className="mt-1 leading-relaxed text-[var(--muted)]">
            {repo.description}
          </p>
        )}
      </div>
      <div className="mono flex shrink-0 items-baseline gap-3 sm:justify-end">
        {repo.language && <span>{repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>
    </Link>
  );
}
