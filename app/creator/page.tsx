import SocialsCard from "@/components/socials-card";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
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
    { name: "X", label: "Total Followers", count: twitterCount },
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
    <div className="py-20 sm:py-28">
      <PageTitle eyebrow="00 / Creator" lede="Tech Influencer to be XD">
        Content Creation
      </PageTitle>

      <Reveal>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Part-Time Content Creator, present in almost all social media
          platforms. In a mission to deliver educating yet entertaining content
          for the dev community.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform, i) => (
          <Reveal key={platform.name} delay={(i % 4) * 80}>
            <SocialsCard
              platform={platform.name}
              title={platform.label}
              followersCount={platform.count}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
