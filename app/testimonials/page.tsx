import { getTestimonials } from "@/lib/strapi";
import ToastClient from "@/components/toast-client";
import { Suspense } from "react";
import TestimonialsClient from "./client";
import { BrandButton } from "@/components/brand-button";
import Link from "next/link";
import { PageTitle } from "@/components/section-title";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="py-14 sm:py-20">
      <Suspense fallback={null}>
        <ToastClient />
      </Suspense>

      <PageTitle comment="testimonials" mark="testimonials" lede="What they're saying.">
        Kind words
      </PageTitle>

      <div className="mt-10">
        {testimonials.length === 0 ? (
          <p className="text-[var(--muted)]">
            Testimonials are temporarily unavailable (probably the CMS server is
            down). Please try again in a few seconds.
          </p>
        ) : (
          <TestimonialsClient testimonials={testimonials} />
        )}
      </div>

      <div className="mt-12 border-t border-[var(--rule)] pt-10">
        <Link href="/testimonials/new">
          <BrandButton>Share your testimonial</BrandButton>
        </Link>
      </div>
    </div>
  );
}
