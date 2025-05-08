import TestimonialsBlock from "@/components/blocks/testimonials";
import { getTestimonials } from "@/lib/strapi";

async function TestimonialsPage() {
  const testimonials = await getTestimonials();

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

      <TestimonialsBlock testimonials={testimonials} />
    </div>
  );
}

export default TestimonialsPage;
