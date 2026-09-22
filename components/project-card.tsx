import Image from "next/image";
import type { Project } from "@/config/projects";
import { MediaOverlay } from "@/components/media-overlay";

/** A single project. Kept separate so rails can map over projects directly. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm border border-[var(--card-edge)] bg-white">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          width={1200}
          height={750}
          className="aspect-[16/10] w-full object-cover object-top"
        />
        <MediaOverlay label="Visit" />
      </div>

      <h3 className="mt-3 font-semibold transition-colors group-hover:text-[var(--accent)]">
        {project.name}
      </h3>

      <p className="mt-1.5 leading-relaxed text-[var(--muted)]">
        {project.tagline}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}
