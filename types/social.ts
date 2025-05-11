export type SocialPlatform =
  | "Github"
  | "Linkedin"
  | "YouTube"
  | "X"
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
