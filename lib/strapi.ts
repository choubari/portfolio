import { StrapiCollectionResponse, StrapiTestimonialAttributes } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL;

const getFetchOptions = (): RequestInit => ({
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store", // Disable cache
  // next: {
  //   revalidate: 3600, // revalidate every hour
  // },
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
