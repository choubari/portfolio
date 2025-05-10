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
          className={`absolute top-4 right-4 text-xl transition-colors ${
            testimonial_link ? "text-[var(--color-accent)]" : "text-gray-500"
          }`}
        >
          {IconElement}
        </span>
      )}
      <p className={`text-gray-300 mb-3 ${IconElement ? "mr-6" : ""}`}>
        "{message}"
      </p>
      <div className="mt-auto">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">
          {position}
          {company && `, ${company}`}
        </p>
      </div>
    </>
  );

  const commonClasses =
    "block mb-4 break-inside-avoid rounded-lg border border-gray-800 bg-[#17191d] p-5 relative transition-colors";

  if (testimonial_link) {
    return (
      <a
        href={testimonial_link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonClasses} hover:border-[var(--color-accent)] cursor-pointer`}
      >
        {cardInnerContent}
      </a>
    );
  }

  return <div className={commonClasses}>{cardInnerContent}</div>;
}
