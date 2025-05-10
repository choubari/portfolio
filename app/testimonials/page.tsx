import { getTestimonials } from "@/lib/strapi";
import ToastClient from "@/components/toast-client";
import { Suspense } from "react";
import TestimonialsClient from "./client";
import { BrandButton } from "@/components/brand-button";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Disable caching for this page

export default async function TestimonialsPage() {
  // Fetch testimonials on the server
  const testimonials = await getTestimonials();

  return (
    <div className="w-full space-y-10 py-10">
      {/* Client component for handling toasts */}
      <Suspense fallback={null}>
        <ToastClient />
      </Suspense>

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

      {testimonials.length === 0 ? (
        <div className="text-center py-10">
          <p>No testimonials found</p>
        </div>
      ) : (
        <TestimonialsClient testimonials={testimonials} />
      )}

      <div className="flex justify-center">
        <Link href="/testimonials/new">
          <BrandButton>Share your testimonial</BrandButton>
        </Link>
      </div>
    </div>
  );
}
