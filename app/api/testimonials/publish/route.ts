"use server";

import { NextRequest, NextResponse } from "next/server";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req: NextRequest) {
  try {
    // Extract testimonial ID from the URL query parameters
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.redirect(
        new URL(`${BASE_URL}/testimonials?error=missing-documentId`)
      );
    }

    // Find by documentId and then publish
    const queryUrl = `${STRAPI_API_URL}/api/testimonials?filters[documentId][$eq]=${documentId}`;

    const findResponse = await fetch(queryUrl, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    if (!findResponse.ok) {
      return NextResponse.redirect(
        new URL(`${BASE_URL}/testimonials?error=find-failed`)
      );
    }

    const findData = await findResponse.json();

    if (!findData.data || findData.data.length === 0) {
      return NextResponse.redirect(
        new URL(`${BASE_URL}/testimonials?error=testimonial-not-found`)
      );
    }

    const testimonial = findData.data[0];
    const actualId = testimonial.id;

    // Check if it's already published
    if (testimonial.publishedAt) {
      const redirectUrl = new URL(
        `${BASE_URL}/testimonials?success=already-published`
      );
      return NextResponse.redirect(redirectUrl);
    }

    // Update this testimonial to published
    const updateUrl = `${STRAPI_API_URL}/api/testimonials/${actualId}`;
    const updateResponse = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          publishedAt: new Date().toISOString(),
        },
      }),
    });

    if (!updateResponse.ok) {
      return NextResponse.redirect(
        new URL(`${BASE_URL}/testimonials?error=update-failed`)
      );
    }

    return NextResponse.redirect(
      new URL(`${BASE_URL}/testimonials?success=published`)
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL(`${BASE_URL}/testimonials?error=server-error`)
    );
  }
}
