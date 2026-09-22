import { Projects } from "@/config/projects";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";

/** Two-column grid of projects, used on /work. */
export function ProjectGrid({ limit }: { limit?: number }) {
  // `homeOnly` entries are for the homepage rail, not this page.
  let items = Projects.filter((p) => !p.homeOnly);
  if (limit) items = items.slice(0, limit);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
      {items.map((project, i) => (
        <Reveal key={project.name} delay={(i % 2) * 70}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
