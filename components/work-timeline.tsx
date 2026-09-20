import { Experience } from "@/config/experience";
import { Reveal } from "@/components/motion/reveal";

/**
 * Work history as a list, not cards: company, one line, stack, dates.
 * Deliberately shallow — the detail lives on LinkedIn.
 */
export function WorkTimeline({ limit }: { limit?: number }) {
  const roles = limit ? Experience.slice(0, limit) : Experience;

  return (
    <ul className="border-t border-[var(--rule)]">
      {roles.map((role, i) => (
        <Reveal as="li" key={`${role.company}-${role.start}`} delay={i * 60}>
          <div className="row grid grid-cols-1 gap-x-8 gap-y-2 py-6 sm:grid-cols-[9rem_1fr]">
            <div className="mono flex items-baseline gap-2 pt-1">
              {role.current && (
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--action)]"
                  aria-label="Current role"
                />
              )}
              <span>{role.period}</span>
            </div>

            <div>
              <h3 className="flex flex-wrap items-baseline gap-x-2 text-base font-semibold">
                {role.href ? (
                  <a href={role.href} target="_blank" rel="noreferrer" className="link">
                    {role.company}
                  </a>
                ) : (
                  <span>{role.company}</span>
                )}
                <span className="font-normal text-[var(--muted)]">
                  · {role.title}
                </span>
              </h3>

              <p className="mt-1.5 max-w-2xl leading-relaxed text-[var(--muted)]">
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
