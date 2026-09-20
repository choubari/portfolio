import Image from "next/image";
import { Projects } from "@/config/projects";
import { Reveal } from "@/components/motion/reveal";

/** Personal projects, led by a real screenshot of each one. */
export function ProjectGrid({ limit }: { limit?: number }) {
  const items = limit ? Projects.slice(0, limit) : Projects;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
      {items.map((project, i) => (
        <Reveal key={project.name} delay={(i % 2) * 70}>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="overflow-hidden rounded-sm border border-[var(--rule)] bg-white">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                width={1200}
                height={750}
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-ease group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="font-semibold transition-colors group-hover:text-[var(--action)]">
                {project.name}
              </h3>
              <span className="mono">
                {project.href.replace("https://", "")} ↗
              </span>
            </div>

            <p className="mt-1.5 leading-relaxed text-[var(--muted)]">
              {project.tagline}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
