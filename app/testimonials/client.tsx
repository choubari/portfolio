"use client";

import { useState } from "react";
import { FilterChip } from "@/components/filter-chip";
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


  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          active={!activeCategoryKey}
          onClick={() => setActiveCategoryKey(null)}
          label={`all (${testimonials.length})`}
        />
        {availableCategoryKeys.map((categoryKey, index, array) => {
          const categoryValue = TESTIMONIAL_CATEGORY[categoryKey];
          const count = testimonials.filter((testimonial) =>
            (testimonial.categories as string[]).includes(categoryKey)
          ).length;
          return (
            <FilterChip
              key={categoryKey}
              active={activeCategoryKey === categoryKey}
              onClick={() =>
                setActiveCategoryKey(
                  activeCategoryKey === categoryKey ? null : categoryKey
                )
              }
              label={`${categoryValue} (${count})`}
            />
          );
        })}
      </div>
      <div className="masonry mt-10 columns-1 sm:columns-2 lg:columns-3">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </>
  );
}
