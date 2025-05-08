import { StrapiCollectionResponse, StrapiTestimonialAttributes } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

const getFetchOptions = (): RequestInit => ({
  headers: {
    // Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  next: {
    revalidate: 60, // Revalidate every minute
  },
});

export async function getTestimonials(): Promise<
  StrapiTestimonialAttributes[]
> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/testimonials`,
      getFetchOptions()
    );

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
