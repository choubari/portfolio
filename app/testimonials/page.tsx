"use client";
import TestimonialCard from "@/components/testimonial-card";
import { Testimonials } from "@/content/testimonials";
import { FEEDBACK_CATEGORY } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] =
    useState<FEEDBACK_CATEGORY | null>(null);

  const filteredTestimonials = activeCategory
    ? Testimonials.filter((testimonial) =>
        testimonial.category.includes(activeCategory)
      )
    : Testimonials;

  const getButtonClasses = (isActive: boolean) =>
    cn(
      "hover:underline cursor-pointer",
      isActive ? "text-[var(--color-accent)] underline" : "text-white"
    );

  return (
    <div className="w-full space-y-10 py-10">
      <div className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">
          Testimonials
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p>What They're Saying!</p>
      </div>

      <div className="text-center text-base my-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={getButtonClasses(!activeCategory)}
        >
          All ({Testimonials.length})
        </button>
        <span className="mx-2 text-gray-500">|</span>
        {Object.values(FEEDBACK_CATEGORY)
          .filter((category) =>
            Testimonials.some((testimonial) =>
              testimonial.category.includes(category)
            )
          )
          .map((category, index, array) => {
            const count = Testimonials.filter((testimonial) =>
              testimonial.category.includes(category)
            ).length;
            return (
              <span key={category}>
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category ? null : category
                    )
                  }
                  className={
                    getButtonClasses(activeCategory === category) + " ml-2"
                  }
                >
                  {category} ({count})
                </button>
                {index !== array.length - 1 && (
                  <span className="text-gray-500">, </span>
                )}
              </span>
            );
          })}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filteredTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
