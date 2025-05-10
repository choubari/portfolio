"use client";
import SelectMenu from "@/components/ui/dropdown";
import { ContactPurpose } from "@/content/contact";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState(ContactPurpose[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecaptchaDisabled, setIsRecaptchaDisabled] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setIsRecaptchaDisabled(process.env.DISABLE_RECAPTCHA === "true");
  }, []);

  function clearForm() {
    setFullName("");
    setEmail("");
    setPurpose(ContactPurpose[0]);
    setMessage("");
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let recaptchaValue = recaptchaRef.current?.getValue();

    if (!isRecaptchaDisabled && !recaptchaValue) {
      alert("Please click <I'm not a robot> before sending the form");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (recaptchaValue) {
      formData.append("g-recaptcha-response", recaptchaValue);
    }
    formData.append("fullName", fullname);
    formData.append("email", email);
    formData.append("purpose", purpose.label);
    formData.append("message", message);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const resBody = await res.json();
      setLoading(false);

      if (res.ok && !resBody.error) {
        alert("Your message has been sent successfully");
        clearForm();
      } else {
        console.error("API error:", resBody);
        alert("Error, try again! or reach me on Linkedin / X");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setLoading(false);
      alert("An unexpected error occurred. Please try again later.");
    }
  }

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
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullname" className="block font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="John Doe"
                className="w-full p-2.5 rounded-md border border-gray-800 bg-[#17191d] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                minLength={4}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                id="email"
                className="w-full p-2.5 rounded-md border border-gray-800 bg-[#17191d] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="purpose" className="block font-medium">
              What would you like to chat about?
            </label>
            <SelectMenu
              dropdownList={ContactPurpose}
              selected={purpose}
              setSelected={setPurpose}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              className="w-full p-2.5 rounded-md border border-gray-800 bg-[#17191d] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
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

          <button
            type="submit"
            className={cn(
              loading ? "bg-gray-500" : "bg-[var(--color-accent)]",
              "text-black font-medium rounded-md px-6 py-3 h-auto w-full md:w-auto"
            )}
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
