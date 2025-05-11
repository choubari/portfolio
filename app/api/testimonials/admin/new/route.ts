"use server";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Session } from "next-auth";
import { AdminTestimonial, TESTIMONIAL_CATEGORY } from "@/types/testimonial";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface ExtendedSession extends Session {
  user?: Session["user"] & {
    login?: string;
  };
}

export async function POST(req: NextRequest) {
  const session: ExtendedSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const incomingFormData = await req.formData();
    const parsedData: { [key: string]: string | string[] } = {};
    let uploadedFileId: number | null = null;

    // Process file first if it exists
    const screenshotValue = incomingFormData.get("screenshot");
    if (screenshotValue instanceof File && screenshotValue.size > 0) {
      const fileFormDataForStrapi = new FormData();
      fileFormDataForStrapi.append(
        "files",
        screenshotValue,
        screenshotValue.name
      );

      const uploadResponse = await fetch(`${STRAPI_API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: fileFormDataForStrapi,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Strapi upload error:", errorData);
        return NextResponse.json(
          { message: "Screenshot upload failed", details: errorData },
          { status: 500 }
        );
      }
      const uploadedFilesResponse = await uploadResponse.json();
      if (uploadedFilesResponse && uploadedFilesResponse.length > 0) {
        uploadedFileId = uploadedFilesResponse[0].id;
      }
    }

    // Process other form fields
    incomingFormData.forEach((value, key) => {
      if (key === "screenshot") return; // Already processed

      if (key === "categories") {
        const currentCategories = parsedData[key] || [];
        if (Array.isArray(currentCategories)) {
          currentCategories.push(value as string);
          parsedData[key] = currentCategories;
        } else {
          parsedData[key] = [currentCategories as string, value as string];
        }
      } else {
        parsedData[key] = value as string;
      }
    });

    if (parsedData.categories && !Array.isArray(parsedData.categories)) {
      parsedData.categories = [parsedData.categories as string];
    }
    if (!parsedData.categories) {
      parsedData.categories = [];
    }

    const publishedAtValue =
      parsedData.status === "published" ? new Date().toISOString() : null;

    // Validate categories
    const validCategories = (parsedData.categories as string[]).filter(
      (cat): cat is keyof typeof TESTIMONIAL_CATEGORY =>
        Object.keys(TESTIMONIAL_CATEGORY).includes(cat)
    );

    // Create payload with proper typing
    const strapiPayload: Partial<AdminTestimonial> = {
      name: parsedData.name as string,
      position: (parsedData.position as string) || undefined,
      company: (parsedData.company as string) || undefined,
      source: parsedData.source as string,
      date: (parsedData.date as string) || undefined,
      testimonial_link: (parsedData.link as string) || undefined,
      message: parsedData.message as string,
      categories: validCategories,
      publishedAt: publishedAtValue,
    };

    if (uploadedFileId) {
      strapiPayload.photo = String(uploadedFileId);
    }

    const endpoint = `${STRAPI_API_URL}/api/testimonials?status=${parsedData.status}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: strapiPayload }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Strapi error creating testimonial:", errorData);
      return NextResponse.json(
        { message: "Failed to create testimonial", details: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(
      { message: "Testimonial created successfully", data: responseData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing testimonial:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: "Error processing testimonial", error: errorMessage },
      { status: 500 }
    );
  }
}
