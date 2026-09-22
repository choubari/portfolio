import Link from "next/link";
import { Repo } from "@/types";
import { Star, GitFork, ArrowUpRight } from "lucide-react";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card group flex h-full flex-col p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.0625rem] font-semibold transition-colors group-hover:text-[var(--accent)]">
          {repo.name}
        </h3>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--brown-soft)] transition-colors group-hover:text-[var(--accent)]" />
      </div>

      {repo.description && (
        <p className="mt-2 flex-1 leading-relaxed text-[var(--muted)]">
          {repo.description}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {repo.language && <span className="chip">{repo.language}</span>}
        <span className="chip gap-1.5">
          <Star className="h-4 w-4" /> {repo.stargazers_count}
        </span>
        <span className="chip gap-1.5">
          <GitFork className="h-4 w-4" /> {repo.forks_count}
        </span>
      </div>
    </Link>
  );
}
