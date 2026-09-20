import type { Talk } from "@/types";

const RESOURCES: { key: keyof Talk; label: string }[] = [
  { key: "video", label: "video" },
  { key: "slides", label: "slides" },
  { key: "docs", label: "docs" },
  { key: "demoCode", label: "code" },
  { key: "demoLink", label: "demo" },
];

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="row grid grid-cols-1 gap-x-8 gap-y-2 py-5 sm:grid-cols-[9rem_1fr]">
      <div className="mono pt-0.5">
        {talk.date}
        <div className="mt-1">
          {talk.talkType}
          {talk.duration && ` · ${talk.duration}`}
        </div>
      </div>

      <div>
        <h4 className="font-semibold leading-snug">{talk.title}</h4>
        <p className="mono mt-1.5">
          <a
            href={talk.hostLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--action)] hover:text-[var(--action-deep)]"
          >
            {talk.host}
          </a>
          {" · "}
          <span className="font-sans">{talk.country}</span> {talk.city}
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {RESOURCES.map(({ key, label }) => {
            const href = talk[key] as string | undefined;
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mono text-[var(--muted)] underline underline-offset-2 hover:text-[var(--action)]"
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
