"use server";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { NewTestimonialNotificationEmail } from "@/components/email/new-testimonial-notification";
import type { PublicTestimonial } from "@/types/testimonial";
import { TESTIMONIAL_CATEGORY, TESTIMONIAL_SOURCE } from "@/types/testimonial";
import { validateCaptcha } from "@/lib/utils";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Validate reCAPTCHA
    if (
      !(await validateCaptcha(formData.get("g-recaptcha-response") as string))
    ) {
      return NextResponse.json(
        { message: "reCAPTCHA validation failed. Please try again." },
        { status: 400 }
      );
    }
    formData.delete("g-recaptcha-response");

    // Extract basic form fields directly from FormData
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const position = formData.get("position") as string | null;
    const company = formData.get("company") as string | null;
    const sourceDetails = formData.get("sourceDetails") as string | null;
    const profileLink = formData.get("profileLink") as string | null;
    const message = formData.get("message") as string | null;

    // Extract categories (multiple values)
    const categoryValues: string[] = [];
    formData.getAll("categories").forEach((value) => {
      categoryValues.push(value as string);
    });

    // Validate required fields
    if (
      !name ||
      !email ||
      !sourceDetails ||
      !message ||
      categoryValues.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate categories
    const validCategories = categoryValues.filter(
      (cat): cat is keyof typeof TESTIMONIAL_CATEGORY =>
        Object.keys(TESTIMONIAL_CATEGORY).includes(cat)
    );

    if (validCategories.length !== categoryValues.length) {
      return NextResponse.json(
        { message: "Invalid category provided." },
        { status: 400 }
      );
    }

    // payload for Strapi
    const finalPayload: PublicTestimonial = {
      name,
      email,
      position: position || null,
      company: company || null,
      source_details: sourceDetails || "",
      profile_link: profileLink || null,
      message,
      categories: validCategories,
      // Server-side fields that don't come from the form
      date: new Date().toISOString().split("T")[0],
      source: TESTIMONIAL_SOURCE.OTHER,
      publishedAt: null,
    };

    const response = await fetch(`${STRAPI_API_URL}/api/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: finalPayload }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: "Failed to submit testimonial to Strapi",
          error: errorData.error || errorData,
        },
        { status: response.status }
      );
    }

    const strapiResponseData = await response.json();
    const testimonialId = strapiResponseData.data?.id;

    let documentId = null;
    if (strapiResponseData.data?.documentId) {
      documentId = strapiResponseData.data.documentId;
    } else if (strapiResponseData.data?.attributes?.documentId) {
      // Fallback for different API structure
      documentId = strapiResponseData.data.attributes.documentId;
    }

    try {
      const emailProps = {
        submitterName: finalPayload.name,
        submitterEmail: finalPayload.email,
        position: finalPayload.position,
        company: finalPayload.company,
        sourceDetails: finalPayload.source_details,
        profileLink: finalPayload.profile_link,
        categories: finalPayload.categories,
        testimonialMessage: finalPayload.message,
        testimonialDate: finalPayload.date,
        testimonialId: testimonialId ? String(testimonialId) : undefined,
        documentId: documentId || undefined,
      };

      await resend.emails.send({
        from: `Kawtar <${process.env.SENDER_EMAIL}>`,
        to: `${process.env.FORWARD_EMAIL}`,
        subject: "New Testimonial Submitted!",
        react: NewTestimonialNotificationEmail(
          emailProps
        ) as React.ReactElement,
      });
    } catch (emailError) {
      console.error(
        "Error sending new testimonial notification email:",
        emailError
      );
    }

    return NextResponse.json(
      {
        message: "Thank you! Your testimonial has been submitted for review.",
        data: strapiResponseData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing public testimonial submission:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        message: "Error processing testimonial submission",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
