import { SocialPlatform } from "@/types";

export const FooterSocials: { label: SocialPlatform; href: string }[] = [
  { label: "Twitter", href: "https://twitter.com/choubari_" },
  { label: "Github", href: "https://github.com/choubari" },
  { label: "Linkedin", href: "https://linkedin.com/in/choubari" },
  { label: "YouTube", href: "https://www.youtube.com/@choubari" },
  { label: "Instagram", href: "https://instagram.com/choubari" },
  { label: "Facebook", href: "https://facebook.com/choubari" },
  { label: "TikTok", href: "https://www.tiktok.com/@choubari" },
  { label: "Newsletter", href: "/newsletter" },
];

export const MainNav: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Talks", href: "/talks" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Grouped footer links. Everything not in the header is reachable here. */
export const FooterGroups: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "work",
    links: [
      { label: "Experience & projects", href: "/work" },
      { label: "Open source", href: "/oss" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "words",
    links: [
      { label: "Talks", href: "/talks" },
      { label: "Blog", href: "/blog" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Creator", href: "/creator" },
    ],
  },
  {
    title: "connect",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Leave a testimonial", href: "/testimonials/new" },
    ],
  },
];
