import PublicTestimonialForm from "@/components/forms/public-testimonial-form";
import { PageTitle } from "@/components/section-title";

export default function SubmitTestimonialPage() {
  return (
    <div className="py-14 sm:py-20">
      <PageTitle
        lede="Thank you for considering to leave a testimonial! Your feedback is greatly appreciated and helps others understand the value I strive to provide."
      >
        Submit a testimonial
      </PageTitle>

      <div className="mt-12 max-w-xl">
        <PublicTestimonialForm />
      </div>
    </div>
  );
}
