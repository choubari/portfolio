import { Calendar, MapPin } from "lucide-react";
import type { Talk } from "@/types";

const RESOURCES: {
  key: keyof Talk;
  icon: string;
  label: string;
  title: string;
}[] = [
  { key: "video", icon: "📽️", label: "Video", title: "Video Recording" },
  { key: "slides", icon: "📝", label: "Slides", title: "Slides" },
  { key: "docs", icon: "📖", label: "Docs", title: "Docs" },
  { key: "demoCode", icon: "💻", label: "Code", title: "Open Source Code" },
  { key: "demoLink", icon: "🔗", label: "Demo", title: "Demo Link" },
];

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        {talk.duration && (
          <span className="label-mono rounded-full border border-[var(--gold)]/40 px-3 py-1 text-[var(--gold)]">
            {talk.duration}
          </span>
        )}
        <span className="label-mono rounded-full border border-[var(--rule-strong)] px-3 py-1 text-[var(--sky)]">
          {talk.talkType}
        </span>
      </div>

      <h4 className="mt-5 text-lg font-semibold leading-snug">{talk.title}</h4>

      <div className="mt-3">
        <a
          href={talk.hostLink || "#"}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-base"
        >
          {talk.host}
        </a>
        <div className="label-mono mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {talk.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-sans">{talk.country}</span> {talk.city}
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-4 pt-6">
        {RESOURCES.map(({ key, icon, label, title }) => {
          const href = talk[key] as string | undefined;
          if (!href) return null;
          return (
            <a
              key={key}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors duration-500 ease-ease hover:text-[var(--gold)]"
              href={href}
              target="_blank"
              rel="noreferrer"
              title={title}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </a>
          );
        })}
      </div>
    </article>
  );
}
