import Link from "next/link";
import { Repo } from "@/types";
import { Star, GitBranch, ArrowUpRight } from "lucide-react";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card group flex h-full flex-col p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
          {repo.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--faint)] transition-all duration-500 ease-ease group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--gold)]" />
      </div>

      {repo.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {repo.description}
        </p>
      )}

      <div className="label-mono mt-6 flex items-center gap-4 border-t border-[var(--rule)] pt-4">
        <span className="inline-flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GitBranch className="h-3.5 w-3.5" /> {repo.forks_count}
        </span>
        {repo.language && (
          <span className="ml-auto text-[var(--sky)]">{repo.language}</span>
        )}
      </div>
    </Link>
  );
}
