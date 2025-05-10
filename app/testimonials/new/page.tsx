import PublicTestimonialForm from "@/components/forms/public-testimonial-form";

export default function SubmitTestimonialPage() {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">
          Submit Your Testimonial
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
      </div>
      <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">
        Thank you for considering to leave a testimonial! Your feedback is
        greatly appreciated and helps others understand the value I strive to
        provide.
      </p>
      <PublicTestimonialForm />
    </div>
  );
}
