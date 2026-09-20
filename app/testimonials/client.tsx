"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import TestimonialCard from "@/components/testimonial-card";
import { TESTIMONIAL_CATEGORY } from "@/types";
import { StrapiTestimonialAttributes } from "@/types/strapi";

interface TestimonialsFilterProps {
  testimonials: StrapiTestimonialAttributes[];
}

export default function TestimonialsClient({
  testimonials,
}: TestimonialsFilterProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<
    keyof typeof TESTIMONIAL_CATEGORY | null
  >(null);

  const filteredTestimonials = activeCategoryKey
    ? testimonials.filter((testimonial) =>
        (testimonial.categories as string[]).includes(activeCategoryKey)
      )
    : testimonials;

  const availableCategoryKeys = (
    Object.keys(TESTIMONIAL_CATEGORY) as Array<
      keyof typeof TESTIMONIAL_CATEGORY
    >
  ).filter((key) => {
    // Ensure the key is a valid key of the enum before checking testimonials
    if (!(key in TESTIMONIAL_CATEGORY)) return false;
    return testimonials.some((testimonial) =>
      (testimonial.categories as string[]).includes(key)
    );
  });

  const getButtonClasses = (isActive: boolean) =>
    cn(
      "mono underline-offset-4 transition-colors",
      isActive
        ? "text-[var(--action)] underline"
        : "text-[var(--muted)] hover:text-[var(--ink)]"
    );

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          onClick={() => setActiveCategoryKey(null)}
          className={getButtonClasses(!activeCategoryKey)}
        >
          All ({testimonials.length})
        </button>
        {availableCategoryKeys.map((categoryKey, index, array) => {
          const categoryValue = TESTIMONIAL_CATEGORY[categoryKey];
          const count = testimonials.filter((testimonial) =>
            (testimonial.categories as string[]).includes(categoryKey)
          ).length;
          return (
            <span key={categoryKey}>
              <button
                onClick={() =>
                  setActiveCategoryKey(
                    activeCategoryKey === categoryKey ? null : categoryKey
                  )
                }
                className={getButtonClasses(activeCategoryKey === categoryKey)}
              >
                {categoryValue} ({count})
              </button>
            </span>
          );
        })}
      </div>
      <div className="mt-10 columns-1 gap-10 sm:columns-2">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </>
  );
}
