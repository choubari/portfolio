import { Experience } from "@/config/experience";
import { Reveal } from "@/components/motion/reveal";
import { CompanyLogo } from "@/components/company-logo";

/** Roles as a list, with the company mark doing the visual work. */
export function WorkTimeline({ limit }: { limit?: number }) {
  const roles = limit ? Experience.slice(0, limit) : Experience;

  return (
    <ul className="border-t border-[var(--rule)]">
      {roles.map((role, i) => (
        <Reveal as="li" key={`${role.company}-${role.start}`} delay={i * 50}>
          <div className="row flex gap-4 py-6">
            <CompanyLogo name={role.company} logo={role.logo} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="flex flex-wrap items-baseline gap-x-2">
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link font-semibold"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="font-semibold">{role.company}</span>
                  )}
                  <span className="text-[var(--muted)]">{role.title}</span>
                </h3>
                <span className="mono flex items-center gap-2">
                  {role.current && (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--action)]"
                      aria-label="Current role"
                    />
                  )}
                  {role.period}
                </span>
              </div>

              {role.note && (
                <p className="mono mt-1.5 text-[var(--action)]">{role.note}</p>
              )}

              <p className="mt-2 max-w-2xl leading-relaxed text-[var(--muted)]">
                {role.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {role.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
