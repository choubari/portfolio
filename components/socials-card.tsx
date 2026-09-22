import { SocialPlatform } from "@/types";
import { countFormatter, findSocialLinkHref } from "@/lib/utils";

interface PlatformProps {
  platform: SocialPlatform;
  title: string;
  followersCount: number;
}

/** One social account row. On hover the whole row responds, not just the count. */
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
    <span className="mono underline decoration-transparent underline-offset-4 transition-colors group-hover:text-[var(--accent)] group-hover:decoration-[var(--accent)]">
      {platform}
    </span>
    <span className="flex items-baseline gap-2">
      <span className="text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
        {countFormatter(followersCount)}
      </span>
      <span className="mono transition-colors group-hover:text-[var(--accent)]">
        {title}
      </span>
    </span>
  </a>
);

export default SocialsCard;
