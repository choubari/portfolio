import type { SocialPlatform } from "./social";

export enum TESTIMONIAL_CATEGORY {
  WORK = "Work & Expertise",
  LEADERSHIP = "Leadership & Soft Skills",
  GROWTH = "Growth & Learning",
  COMMUNITY = "Community & Volunteering",
  DESIGN = "Design & Creativity",
}

export type Testimonial = {
  name: string;
  message: string;
  position: string;
  company?: string;
  photo: string;
  date: string;
  source?: SocialPlatform;
  link?: string;
  category: TESTIMONIAL_CATEGORY[];
};
