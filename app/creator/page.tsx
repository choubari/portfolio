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

type PlatformCounts = { name: SocialPlatform; label: string; count: number };

async function followersByPlatform(): Promise<PlatformCounts[]> {
  const [
    twitterCount,
    githubCount,
    linkedinCount,
    youtubeCount,
    instagramCount,
    facebookCount,
    tiktokCount,
    newsletterCount,
  ] = await Promise.all([
    getTwitterFollowers(),
    getGithubFollowers(),
    getLinkedinFollowers(),
    getYoutubeFollowers(),
    getInstagramFollowers(),
    getFacebookFollowers(),
    getTiktokFollowers(),
    getNewsletterFollowers(),
  ]);

  return [
    { name: "YouTube", label: "subscribers", count: youtubeCount },
    { name: "Instagram", label: "followers", count: instagramCount },
    { name: "X", label: "followers", count: twitterCount },
    { name: "Github", label: "followers", count: githubCount },
    { name: "Linkedin", label: "followers", count: linkedinCount },
    { name: "Facebook", label: "page likes", count: facebookCount },
    { name: "TikTok", label: "followers", count: tiktokCount },
    { name: "Newsletter", label: "subscribers", count: newsletterCount },
  ];
}

export default async function Creator() {
  const platforms = await followersByPlatform();

  return (
    <div className="py-14 sm:py-20">
      <PageTitle
        comment="creator"
        lede="Educating yet entertaining content for the dev community."
      >
        Content Creation
      </PageTitle>

      <div className="mt-12 border-t border-[var(--rule)]">
        {platforms.map((platform, i) => (
          <Reveal key={platform.name} delay={Math.min(i, 6) * 50}>
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
