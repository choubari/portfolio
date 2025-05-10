export enum TESTIMONIAL_CATEGORY {
  WORK = "Work & Expertise",
  LEADERSHIP = "Leadership & Soft Skills",
  GROWTH = "Growth & Learning",
  COMMUNITY = "Community & Volunteering",
  DESIGN = "Design & Creativity",
}

export enum TESTIMONIAL_SOURCE {
  LINKEDIN = "LinkedIn",
  TWITTER_X = "X",
  EMAIL = "Email",
  YOUTUBE = "YouTube",
  INSTAGRAM = "Instagram",
  FACEBOOK = "Facebook",
  WHATSAPP = "Whatsapp",
  OTHER = "Other",
}

interface BaseTestimonial {
  name: string;
  position?: string | null;
  company?: string | null;
  message: string;
  categories: Array<keyof typeof TESTIMONIAL_CATEGORY>;
}

export interface AdminTestimonial extends BaseTestimonial {
  source: string;
  date?: string;
  testimonial_link?: string;
  photo?: string;
  publishedAt: string | null;
}

export interface PublicTestimonial extends BaseTestimonial {
  email: string;
  source_details: string;
  profile_link?: string | null;
  publishedAt: null;
  source: TESTIMONIAL_SOURCE.OTHER;
  date: string;
}

export interface PublicTestimonialFormData {
  name: string;
  email: string;
  position: string;
  company: string;
  sourceDetails: string;
  profileLink: string;
  categories: Array<keyof typeof TESTIMONIAL_CATEGORY>;
  message: string;
}

export interface AdminTestimonialFormData {
  name: string;
  position: string;
  company: string;
  source: keyof typeof TESTIMONIAL_SOURCE | "";
  date: string;
  link: string;
  categories: Array<keyof typeof TESTIMONIAL_CATEGORY>;
  message: string;
  status: "draft" | "published";
}
