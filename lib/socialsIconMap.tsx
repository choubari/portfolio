import { ReactElement } from "react";
import {
  BsYoutube,
  BsGithub,
  BsTwitter,
  BsInstagram,
  BsFacebook,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SocialsIcon: { [key: string]: () => ReactElement } = {
  youtube: () => <BsYoutube />,
  linkedin: () => <BsLinkedin />,
  github: () => <BsGithub />,
  tiktok: () => <FaTiktok />,
  instagram: () => <BsInstagram />,
  twitter: () => <BsTwitter />,
  x: () => <BsTwitterX />,
  facebook: () => <BsFacebook />,
  newsletter: () => <MdEmail />,
  none: () => <></>,
  undefined: () => <></>,
  null: () => <></>,
};

export default SocialsIcon;
