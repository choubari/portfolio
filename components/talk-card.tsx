import type { Talk } from "@/types";
import { youtubeThumb } from "@/lib/youtube";

const RESOURCES: { key: keyof Talk; label: string }[] = [
  { key: "video", label: "video" },
  { key: "slides", label: "slides" },
  { key: "docs", label: "docs" },
  { key: "demoCode", label: "code" },
  { key: "demoLink", label: "demo" },
];

/**
 * A talk row. The title leads, the host is the secondary line, and the
 * incidentals (type, duration, place) sit last and smallest — so the
 * three tiers are not all competing at the same weight.
 */
export function TalkCard({ talk }: { talk: Talk }) {
  const thumb = youtubeThumb(talk.video);

  return (
    <article className="row flex gap-5 py-5">
      <div className="hidden w-32 shrink-0 sm:block">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="aspect-video w-full rounded-sm border border-[var(--rule)] object-cover"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-sm border border-dashed border-[var(--rule)]">
            <span className="mono">{talk.talkType.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-semibold leading-snug">{talk.title}</h4>

        <p className="mt-1 text-sm text-[var(--muted)]">
          <a
            href={talk.hostLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            {talk.host}
          </a>
          <span className="font-sans"> · {talk.country}</span> {talk.city}
        </p>

        <p className="mono mt-2">
          {talk.date}
          {" · "}
          {talk.talkType.toLowerCase()}
          {talk.duration && ` · ${talk.duration}`}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-3">
          {RESOURCES.map(({ key, label }) => {
            const href = talk[key] as string | undefined;
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mono text-[var(--action)] underline underline-offset-2 hover:text-[var(--action-deep)]"
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
