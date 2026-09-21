import type { Talk } from "@/types";
import { youtubeThumb } from "@/lib/youtube";

/**
 * Talk as a thumbnail card. Uses the YouTube still where a recording
 * exists, and a typographic placeholder where it does not.
 * Plain <img>: next/image is configured `unoptimized`, so it would add
 * remote-pattern config for no benefit.
 */
export function TalkThumb({ talk }: { talk: Talk }) {
  const thumb = youtubeThumb(talk.video);
  const href = talk.video || talk.slides || talk.hostLink || "/talks";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm border border-[var(--rule)] bg-white">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-[var(--paper)] p-4">
            <span className="mono text-center">{talk.host}</span>
          </div>
        )}

        {talk.video && (
          <span className="mono absolute bottom-2 right-2 rounded-sm bg-white/90 px-1.5 py-0.5 text-[var(--ink)]">
            ▶ {talk.duration ?? "watch"}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-medium leading-snug transition-colors group-hover:text-[var(--action)]">
        {talk.title}
      </h3>
      <p className="mono mt-1.5">
        {talk.host} · {talk.date}
      </p>
    </a>
  );
}
