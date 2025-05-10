import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Repo } from "@/types";
import { SocialPlatform } from "@/types";
import { FooterSocials } from "@/config/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateCaptcha = (response_key: string) => {
  return new Promise((resolve, reject) => {
    // Skip reCAPTCHA validation if DISABLE_RECAPTCHA is set to 'true'
    if (process.env.DISABLE_RECAPTCHA === "true") {
      return resolve(true);
    }

    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

    fetch(url, {
      method: "post",
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success == true) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
      });
  });
};

export const fetchGithubRepos = async (): Promise<Repo[]> => {
  const response = await fetch("https://api.github.com/users/choubari/repos");
  const data: Repo[] = await response.json();
  // Filter out forked repos
  const originalRepos = data.filter((repo) => !repo.fork);
  // Sort by stargazers count descending
  const sortedData = originalRepos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  return sortedData;
};

export const getTwitterFollowers = async (): Promise<number> => {
  // TODO: integrate with Twitter API
  return 2449;
};

export const getGithubFollowers = async (): Promise<number> => {
  const response = await fetch("https://api.github.com/users/choubari");
  const data = await response.json();
  return data.followers;
};

export const getLinkedinFollowers = async (): Promise<number> => {
  // TODO: integrate with LinkedIn API
  return 5888;
};

export const getYoutubeFollowers = async (): Promise<number> => {
  // TODO: integrate with YouTube API
  return 1349;
};

export const getInstagramFollowers = async (): Promise<number> => {
  // TODO: integrate with Instagram API
  return 2662;
};

export const getFacebookFollowers = async (): Promise<number> => {
  // TODO: integrate with Facebook API
  return 374;
};

export const getTiktokFollowers = async (): Promise<number> => {
  // TODO: integrate with TikTok API
  return 25;
};

export const getNewsletterFollowers = async (): Promise<number> => {
  // TODO: integrate with Beehiiv API
  return 25;
};

export function findSocialLinkHref(label: SocialPlatform): string {
  if (label === "Newsletter") {
    return "/newsletter";
  }
  const socialLink = FooterSocials.find((social) => social.label === label);
  return socialLink ? socialLink.href : "#";
}

export function countFormatter(n: number): string {
  const countFormat = Intl.NumberFormat("en", { notation: "compact" });
  return countFormat.format(n);
}
