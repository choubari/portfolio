"use client";

import {
  TESTIMONIAL_CATEGORY,
  PublicTestimonialFormData,
} from "@/types/testimonial";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const initialPublicFormData: PublicTestimonialFormData = {
  name: "",
  email: "",
  position: "",
  company: "",
  sourceDetails: "",
  profileLink: "",
  categories: [],
  message: "",
};

export default function PublicTestimonialForm() {
  const [formData, setFormData] = useState<PublicTestimonialFormData>(
    initialPublicFormData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRecaptchaDisabled, setIsRecaptchaDisabled] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    if (utmSource) {
      setFormData((prev) => ({ ...prev, sourceDetails: utmSource }));
    }

    setIsRecaptchaDisabled(process.env.DISABLE_RECAPTCHA === "true");
  }, []);

  const inputStyles =
    "mt-2 w-full p-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] disabled:opacity-70 disabled:cursor-not-allowed";
  const labelStyles = "block font-medium";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const categoryKey = value as keyof typeof TESTIMONIAL_CATEGORY;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryKey]
        : prev.categories.filter((cat) => cat !== categoryKey),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.sourceDetails ||
      formData.categories.length === 0 ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields.", { duration: 5000 });
      return;
    }

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!isRecaptchaDisabled && !recaptchaValue) {
      toast.error("Please verify that you're not a robot", { duration: 5000 });
      return;
    }

    setIsLoading(true);

    const submissionFormData = new FormData();
    submissionFormData.append("name", formData.name);
    submissionFormData.append("email", formData.email);
    submissionFormData.append("position", formData.position);
    submissionFormData.append("company", formData.company);
    submissionFormData.append("sourceDetails", formData.sourceDetails);
    submissionFormData.append("profileLink", formData.profileLink);
    submissionFormData.append("message", formData.message);
    if (recaptchaValue) {
      submissionFormData.append("g-recaptcha-response", recaptchaValue);
    }
    formData.categories.forEach((category) =>
      submissionFormData.append("categories", category)
    );

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        body: submissionFormData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          result.message ||
            "Thank you! Your testimonial has been submitted for review."
        );
        setFormData(initialPublicFormData);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        let errorMessage = "Failed to submit testimonial.";
        if (result.error && result.error.message) {
          errorMessage = result.error.message;
          if (
            result.error.details &&
            result.error.details.errors &&
            result.error.details.errors.length > 0
          ) {
            const specificErrors = result.error.details.errors
              .map((err: any) => `${err.path.join(".")}: ${err.message}`)
              .join("; ");
            errorMessage += ` Details: ${specificErrors}`;
          }
        } else if (result.message) {
          errorMessage = result.message;
        }
        toast.error(errorMessage, { duration: 8000 });
        console.error("Submission error details:", result);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className={labelStyles}>
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          Your Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="position" className={labelStyles}>
          Your Position / Title
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className={inputStyles}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="company" className={labelStyles}>
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className={inputStyles}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="howDidYouKnowMeText" className={labelStyles}>
          How did you hear about me/us? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="sourceDetails"
          id="sourceDetails"
          value={formData.sourceDetails}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading}
          placeholder="e.g., Twitter, LinkedIn, Conference, Referral"
        />
      </div>

      <div>
        <label htmlFor="profileLink" className={labelStyles}>
          Link to your Profile (e.g. LinkedIn, Twitter, GitHub)
        </label>
        <input
          type="url"
          name="profileLink"
          id="profileLink"
          value={formData.profileLink}
          onChange={handleChange}
          className={inputStyles}
          placeholder="https://linkedin.com/in/yourprofile"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          Your Testimonial <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={inputStyles}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className={labelStyles}>
          What the testimonial is about <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(TESTIMONIAL_CATEGORY).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center space-x-2 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              <input
                type="checkbox"
                name="categories"
                value={key}
                checked={formData.categories.includes(
                  key as keyof typeof TESTIMONIAL_CATEGORY
                )}
                onChange={handleCategoryChange}
                className="form-checkbox h-4 w-4 text-[var(--color-accent)] bg-[var(--rule)] border-[var(--rule)] rounded focus:ring-[var(--color-accent)] focus:ring-offset-[var(--paper)]"
                disabled={isLoading}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {isRecaptchaDisabled ? (
        <div className="bg-yellow-800/20 border border-yellow-700 p-2 rounded text-yellow-200 text-sm">
          reCAPTCHA validation is disabled in development mode
        </div>
      ) : (
        <div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="normal"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          />
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[var(--color-accent)] text-white font-medium rounded-sm px-6 py-3 h-auto w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </div>
    </form>
  );
}
