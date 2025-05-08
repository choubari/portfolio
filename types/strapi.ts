import { TESTIMONIAL_CATEGORY, SocialPlatform } from ".";

// Strapi Media structure
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      url: string;
      width?: number;
      height?: number;
      formats?: {
        thumbnail?: { url: string; width: number; height: number };
        small?: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        large?: { url: string; width: number; height: number };
      };
    };
  } | null;
}

// Strapi response attributes for testimonials
export interface StrapiTestimonialAttributes {
  name: string;
  message: string;
  position: string;
  company?: string;
  photo?: StrapiMedia;
  source: SocialPlatform;
  link?: string;
  date: string;
  categories: TESTIMONIAL_CATEGORY[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  id: number;
}

// Single Strapi testimonial
export interface StrapiTestimonial {
  id: number;
  attributes: StrapiTestimonialAttributes;
}

// Strapi API response structure for a collection
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
