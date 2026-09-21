import { StrapiTestimonialAttributes } from "@/types";
import SocialsIcon from "@/lib/socialsIconMap";

/**
 * Testimonials are cards, not bare quotes separated by whitespace — a
 * solid ground and a real edge so each one is unambiguously its own block.
 */
export default function TestimonialCard({
  testimonial,
}: {
  testimonial: StrapiTestimonialAttributes;
}) {
  const { message, name, position, company, testimonial_link, source } =
    testimonial;

  const key = source?.toLowerCase();
  const Icon = key && SocialsIcon[key] ? SocialsIcon[key] : null;

  const body = (
    <>
      <span
        aria-hidden="true"
        className="block font-mono text-3xl leading-none text-[var(--brown)]/40"
      >
        &ldquo;
      </span>

      <p className="mt-2 text-[1.0625rem] leading-relaxed text-[var(--ink)]">
        {message}
      </p>

      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--card-edge)] pt-4">
        <div className="min-w-0">
          <p className="font-semibold">{name}</p>
          <p className="mono truncate">
            {position}
            {company && `, ${company}`}
          </p>
        </div>
        {Icon && (
          <span
            className={`shrink-0 text-lg ${
              testimonial_link
                ? "text-[var(--accent)]"
                : "text-[var(--brown-soft)]"
            }`}
          >
            <Icon />
          </span>
        )}
      </footer>
    </>
  );

  const cls = "card mb-6 block break-inside-avoid p-6";

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
