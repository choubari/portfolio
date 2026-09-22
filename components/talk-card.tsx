import type { Talk } from "@/types";

const RESOURCES: { key: keyof Talk; label: string }[] = [
  { key: "video", label: "video" },
  { key: "slides", label: "slides" },
  { key: "docs", label: "docs" },
  { key: "demoCode", label: "code" },
  { key: "demoLink", label: "demo" },
];

/**
 * A talk on the /talks index. Same shape as a blog row: date in a left
 * rail, title, then supporting detail. No thumbnail and no card — those
 * are reserved for the three featured talks on the homepage.
 */
export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="row grid grid-cols-1 gap-x-8 gap-y-1 py-6 sm:grid-cols-[9rem_1fr]">
      <p className="mono pt-1 tabular-nums">{talk.date}</p>

      <div className="min-w-0">
        <h4 className="text-[1.0625rem] font-semibold leading-snug">
          {talk.title}
        </h4>

        <p className="mt-1 text-[var(--muted)]">
          <a
            href={talk.hostLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="link font-medium"
          >
            {talk.host}
          </a>
          <span className="text-[var(--faint)]">
            {" "}
            — {talk.city} {talk.country}
          </span>
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="mono uppercase tracking-[0.1em]">
            {talk.talkType}
            {talk.duration && ` · ${talk.duration}`}
          </span>
          {RESOURCES.map(({ key, label }) => {
            const href = talk[key] as string | undefined;
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mono font-medium text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-deep)]"
              >
                {label} ↗
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
