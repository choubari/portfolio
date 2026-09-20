import { getTestimonials } from "@/lib/strapi";
import ToastClient from "@/components/toast-client";
import { Suspense } from "react";
import TestimonialsClient from "./client";
import { BrandButton } from "@/components/brand-button";
import Link from "next/link";
import { PageTitle } from "@/components/section-title";

// export const dynamic = "force-dynamic"; // Disable caching for this page

export default async function TestimonialsPage() {
  // Fetch testimonials on the server
  const testimonials = await getTestimonials();

  return (
    <div className="py-20 sm:py-28">
      {/* Client component for handling toasts */}
      <Suspense fallback={null}>
        <ToastClient />
      </Suspense>

      <PageTitle eyebrow="00 / Kind words" lede="What They're Saying!">
        Testimonials
      </PageTitle>

      <div className="mt-16">
        {testimonials.length === 0 ? (
          <div className="card p-8">
            <p className="text-lg font-medium">
              Testimonials are temporarily unavailable (probaby the CMS server
              is down)
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Please try again in a few seconds
            </p>
          </div>
        ) : (
          <TestimonialsClient testimonials={testimonials} />
        )}
      </div>

      <div className="mt-16 border-t border-[var(--rule)] pt-12">
        <Link href="/testimonials/new">
          <BrandButton>Share your testimonial</BrandButton>
        </Link>
      </div>
    </div>
  );
}
