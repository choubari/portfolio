import Link from "next/link";
import { Repo } from "@/types";
import { Star, GitBranch } from "lucide-react";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="flex flex-col h-full border border-gray-800 rounded-lg p-5 bg-[#17191d]">
      <h3 className="text-xl font-semibold mb-2">
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="hover:underline hover:text-[var(--color-accent)]"
        >
          {repo.name}
        </Link>
      </h3>
      {repo.description && (
        <p className="flex-1 text-gray-300 mb-4">{repo.description}</p>
      )}
      <div className="flex items-center gap-4 mt-auto text-gray-400">
        <span className="inline-flex items-center gap-1">
          <Star className="h-4 w-4" /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitBranch className="h-4 w-4" /> {repo.forks_count}
        </span>
        {repo.language && (
          <span className="ml-auto text-gray-200">{repo.language}</span>
        )}
      </div>
    </div>
  );
}
