export type SocialPlatform =
  | "Github"
  | "Linkedin"
  | "YouTube"
  | "Twitter"
  | "Instagram"
  | "Facebook"
  | "TikTok"
  | "Newsletter"
  | "WhatsApp"
  | "Other";

export type SocialLink = {
  label: SocialPlatform;
  href: string;
};
