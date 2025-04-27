import SocialsCard from "@/components/socials-card";
import {
  getFacebookFollowers,
  getGithubFollowers,
  getInstagramFollowers,
  getLinkedinFollowers,
  getNewsletterFollowers,
  getTiktokFollowers,
  getTwitterFollowers,
  getYoutubeFollowers,
} from "@/lib/utils";
import { SocialPlatform } from "@/types";

type PlatformCounts = {
  name: SocialPlatform;
  label: string;
  count: number;
};

async function followersByPlatform(): Promise<PlatformCounts[]> {
  const twitterCount = await getTwitterFollowers();
  const githubCount = await getGithubFollowers();
  const linkedinCount = await getLinkedinFollowers();
  const youtubeCount = await getYoutubeFollowers();
  const instagramCount = await getInstagramFollowers();
  const facebookCount = await getFacebookFollowers();
  const tiktokCount = await getTiktokFollowers();
  const newsletterCount = await getNewsletterFollowers();

  return [
    { name: "YouTube", label: "Subscribers", count: youtubeCount },
    { name: "Instagram", label: "Total Followers", count: instagramCount },
    { name: "Twitter", label: "Total Followers", count: twitterCount },
    { name: "Github", label: "Followers", count: githubCount },
    { name: "Linkedin", label: "Followers", count: linkedinCount },
    { name: "Facebook", label: "Page Likes", count: facebookCount },
    { name: "TikTok", label: "Followers", count: tiktokCount },
    {
      name: "Newsletter",
      label: "Newsletter Subscribers",
      count: newsletterCount,
    },
  ];
}

export default async function Creator() {
  const platforms = await followersByPlatform();

  return (
    <div className="mx-5 my-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Content Creation
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="italic">Tech Influencer to be XD</p>
        <p className="mt-7 mb-2">
          Part-Time Content Creator, present in almost all social media
          platforms.
          <br />
          In a mission to deliver educating yet entertaining content for the dev
          community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {platforms.map((platform) => (
          <SocialsCard
            key={platform.name}
            platform={platform.name}
            title={platform.label}
            followersCount={platform.count}
          />
        ))}
      </div>
    </div>
  );
}
