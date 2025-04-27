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
    <a href={href} target="_blank" rel="noreferrer">
      <div className="flex h-full border border-gray-800 rounded-lg p-5 bg-[#17191d] text-white transform transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-accent">
        <div className="flex-grow">
          <h2 className="text-4xl font-bold mb-2">{count}</h2>
          <p className="text-sm text-gray-300">{title}</p>
        </div>
        <div className="text-[var(--color-accent)] text-4xl">
          <SocialIcon />
        </div>
      </div>
    </a>
  );
};

export default SocialsCard;
