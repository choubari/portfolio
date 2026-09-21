import type { Talk } from "@/types";
import { youtubeThumb } from "@/lib/youtube";

const RESOURCES: { key: keyof Talk; label: string }[] = [
  { key: "video", label: "video" },
  { key: "slides", label: "slides" },
  { key: "docs", label: "docs" },
  { key: "demoCode", label: "code" },
  { key: "demoLink", label: "demo" },
];

/** A talk as a card, with its thumbnail. */
export function TalkCard({ talk }: { talk: Talk }) {
  const thumb = talk.cover ?? youtubeThumb(talk.video);

  return (
    <article className="card flex flex-col gap-5 p-5 sm:flex-row">
      <div className="w-full shrink-0 sm:w-56">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="aspect-video w-full rounded-[6px] border border-[var(--card-edge)] object-cover"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-[6px] bg-[var(--brown)]/10 p-3">
            <span className="mono text-center font-semibold text-[var(--brown)]">
              {talk.host}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="mono">{talk.date}</p>
        <h4 className="mt-1 text-[1.0625rem] font-semibold leading-snug">
          {talk.title}
        </h4>
        <p className="mt-1.5 text-[var(--muted)]">
          <a
            href={talk.hostLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="link font-medium"
          >
            {talk.host}
          </a>
          <span className="text-[var(--brown-soft)]">
            {" "}
            — {talk.city} {talk.country}
          </span>
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="chip">{talk.talkType.toLowerCase()}</span>
          {talk.duration && <span className="chip">{talk.duration}</span>}
          {RESOURCES.map(({ key, label }) => {
            const href = talk[key] as string | undefined;
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="chip-link"
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
