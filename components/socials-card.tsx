import { SocialPlatform } from "@/types";
import { countFormatter, findSocialLinkHref } from "@/lib/utils";

interface PlatformProps {
  platform: SocialPlatform;
  title: string;
  followersCount: number;
}

const SocialsCard: React.FC<PlatformProps> = ({
  platform,
  title,
  followersCount,
}) => (
  <a
    href={findSocialLinkHref(platform)}
    target="_blank"
    rel="noreferrer"
    className="row group flex items-baseline justify-between gap-4 py-4"
  >
    <span className="mono">{platform}</span>
    <span className="flex items-baseline gap-2">
      <span className="text-xl font-semibold transition-colors group-hover:text-[var(--action)]">
        {countFormatter(followersCount)}
      </span>
      <span className="mono">{title}</span>
    </span>
  </a>
);

export default SocialsCard;
