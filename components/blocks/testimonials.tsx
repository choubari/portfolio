"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import TestimonialCard from "@/components/testimonial-card";
import { TESTIMONIAL_CATEGORY } from "@/types";
import { StrapiTestimonialAttributes } from "@/types/strapi";

interface TestimonialsFilterProps {
  testimonials: StrapiTestimonialAttributes[];
}

export default function TestimonialsBlock({
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
      "hover:underline cursor-pointer",
      isActive ? "text-[var(--color-accent)] underline" : "text-white"
    );

  return (
    <>
      <div className="text-center text-base my-6">
        <button
          onClick={() => setActiveCategoryKey(null)}
          className={getButtonClasses(!activeCategoryKey)}
        >
          All ({testimonials.length})
        </button>
        <span className="mx-2 text-gray-500">|</span>
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
                className={
                  getButtonClasses(activeCategoryKey === categoryKey) + " ml-2"
                }
              >
                {categoryValue} ({count})
              </button>
              {index !== array.length - 1 && (
                <span className="text-gray-500">, </span>
              )}
            </span>
          );
        })}
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </>
  );
}
