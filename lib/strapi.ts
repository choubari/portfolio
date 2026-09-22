import { StrapiCollectionResponse, StrapiTestimonialAttributes } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL;

const isDev = process.env.NODE_ENV === "development";

/**
 * Testimonials are always cached — never `no-store`.
 *
 * In dev that matters most: without it every hot reload hits the CMS, which
 * is slow to wake and makes local work crawl. `force-cache` holds the
 * response for the whole dev session. In production it is ISR, refreshed
 * hourly, which also keeps the pages that read it static.
 *
 * `cache` and `next.revalidate` are mutually exclusive, so only one of the
 * two branches below is ever applied.
 */
const getFetchOptions = (): RequestInit =>
  ({
    headers: {
      "Content-Type": "application/json",
    },
    ...(isDev
      ? { cache: "force-cache" }
      : { next: { revalidate: 3600 } }),
  } as RequestInit);

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
