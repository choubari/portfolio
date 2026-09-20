import { StrapiTestimonialAttributes } from "@/types";

interface TestimonialCardProps {
  testimonial: StrapiTestimonialAttributes;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { message, name, position, company, testimonial_link, source } =
    testimonial;

  const body = (
    <>
      <blockquote className="border-l-2 border-[var(--rule)] pl-4 leading-relaxed text-[var(--muted)] transition-colors group-hover:border-[var(--action)]">
        {message}
      </blockquote>
      <footer className="mono mt-3 pl-4">
        <span className="text-[var(--ink)]">{name}</span>
        {position && ` · ${position}`}
        {company && `, ${company}`}
        {testimonial_link && source && (
          <span className="text-[var(--action)]"> · {source} ↗</span>
        )}
      </footer>
    </>
  );

  const cls = "group mb-8 block break-inside-avoid";

  return testimonial_link ? (
    <a
      href={testimonial_link}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {body}
    </a>
  ) : (
    <figure className={cls}>{body}</figure>
  );
}
