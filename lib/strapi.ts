import { StrapiCollectionResponse, StrapiTestimonialAttributes } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL;
// const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const getFetchOptions = (): RequestInit => ({
  headers: {
    // Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  // cache: "no-store", // Disable cache
  next: {
    revalidate: 60, // Revalidate every minute
    // revalidate: 0, // Force revalidation on every request
  },
});

export async function getTestimonials(): Promise<
  StrapiTestimonialAttributes[]
> {
  try {
    const apiUrl = `${STRAPI_URL}/api/testimonials`;

    const response = await fetch(apiUrl, getFetchOptions());

    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }

    const data: StrapiCollectionResponse<StrapiTestimonialAttributes> =
      await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
