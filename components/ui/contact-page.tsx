"use client";
import ContactForm from "@/components/contact-form";

export function ContactPage() {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Let
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            '
          </span>
          s Chat
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="mb-3">
          Feel free to reach out if you're interested in working together
        </p>
      </div>

      <div className="lg:mx-16">
        <ContactForm />
      </div>
    </div>
  );
}
