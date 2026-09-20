import { SocialPlatform } from "@/types";
import { countFormatter, findSocialLinkHref } from "@/lib/utils";
import SocialsIcon from "@/lib/socialsIconMap";

interface PlatformProps {
  platform: SocialPlatform;
  title: string;
  followersCount: number;
}

const SocialsCard: React.FC<PlatformProps> = ({
  platform,
  title,
  followersCount,
}) => {
  const SocialIcon =
    SocialsIcon[platform.toLowerCase() as keyof typeof SocialsIcon] ||
    SocialsIcon["none"];
  const count = countFormatter(followersCount);
  const href = findSocialLinkHref(platform);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="card group flex h-full items-start gap-4 p-6"
    >
      <div className="flex-grow">
        <p className="text-4xl font-semibold tracking-display transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
          {count}
        </p>
        <p className="label-mono mt-2">{title}</p>
      </div>
      <span className="text-3xl text-[var(--sky)] transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
        <SocialIcon />
      </span>
    </a>
  );
};

export default SocialsCard;
