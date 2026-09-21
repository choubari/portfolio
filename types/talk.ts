export const TALK_TYPES = [
  "Conference",
  "Meetup",
  "Podcast",
  "Webinar",
  "Workshop",
] as const;

export type TalkType = (typeof TALK_TYPES)[number];

export type Talk = {
  featured?: boolean;
  title: string;
  talkType: TalkType;
  host: string;
  country: string;
  city: string;
  hostLink?: string;
  date: string;
  duration?: string;
  /** Your own cover image; falls back to the YouTube still. */
  cover?: string;
  video?: string;
  slides?: string;
  demoCode?: string;
  demoLink?: string;
  docs?: string;
};
