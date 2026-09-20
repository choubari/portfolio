import { StrapiTestimonialAttributes } from "@/types";
import SocialsIcon from "@/lib/socialsIconMap";

interface TestimonialCardProps {
  testimonial: StrapiTestimonialAttributes;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { message, name, position, company, testimonial_link, source } =
    testimonial;

  const NormalizedSource = source?.toLowerCase();
  const IconComponent =
    NormalizedSource && SocialsIcon[NormalizedSource]
      ? SocialsIcon[NormalizedSource]
      : null;
  const IconElement = IconComponent ? <IconComponent /> : null;

  const cardInnerContent = (
    <>
      {IconElement && (
        <span
          className={`absolute right-5 top-5 text-lg transition-colors duration-500 ease-ease ${
            testimonial_link
              ? "text-[var(--sky)] group-hover:text-[var(--gold)]"
              : "text-[var(--faint)]"
          }`}
        >
          {IconElement}
        </span>
      )}
      <span
        aria-hidden="true"
        className="block font-mono text-3xl leading-none text-[var(--gold)]/50"
      >
        &ldquo;
      </span>
      <p
        className={`mt-2 leading-relaxed text-[var(--muted)] ${
          IconElement ? "mr-6" : ""
        }`}
      >
        {message}
      </p>
      <div className="mt-5 border-t border-[var(--rule)] pt-4">
        <p className="font-medium text-[var(--text)]">{name}</p>
        <p className="label-mono mt-1 normal-case tracking-normal">
          {position}
          {company && `, ${company}`}
        </p>
      </div>
    </>
  );

  const commonClasses =
    "card group relative mb-5 block break-inside-avoid p-6";

  if (testimonial_link) {
    return (
      <a
        href={testimonial_link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonClasses} cursor-pointer`}
      >
        {cardInnerContent}
      </a>
    );
  }

  return <div className={commonClasses}>{cardInnerContent}</div>;
}
