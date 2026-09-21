import type { Talk } from "@/types";

const RESOURCES: { key: keyof Talk; label: string }[] = [
  { key: "video", label: "video" },
  { key: "slides", label: "slides" },
  { key: "docs", label: "docs" },
  { key: "demoCode", label: "code" },
  { key: "demoLink", label: "demo" },
];

/**
 * A talk row. Date sits in its own left rail; the title carries the weight;
 * host and place are one quiet line; type and duration are tags, not prose.
 * No auto-thumbnail here — covers are opt-in via `talk.cover`.
 */
export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="row grid grid-cols-1 gap-x-8 gap-y-2 py-6 sm:grid-cols-[7rem_1fr]">
      <p className="mono pt-1 tabular-nums">{talk.date}</p>

      <div className="min-w-0">
        <h4 className="text-lg font-semibold leading-snug">{talk.title}</h4>

        <p className="mt-1.5 text-[var(--muted)]">
          <a
            href={talk.hostLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
          >
            {talk.host}
          </a>
          <span className="text-[var(--faint)]">
            {" "}
            — {talk.city}
            {talk.country ? ` ${talk.country}` : ""}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="tag">{talk.talkType.toLowerCase()}</span>
          {talk.duration && <span className="tag">{talk.duration}</span>}
          {RESOURCES.map(({ key, label }) => {
            const href = talk[key] as string | undefined;
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="tag border-[var(--accent)]/35 text-[var(--accent)] transition-colors hover:bg-[var(--accent-wash)]"
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
