import { v4 as uid } from "uuid";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export const footerLinks = [
  {
    id: uid,
    name: "terms",
    href: "/terms-and-conditions",
  },
  {
    id: uid,
    name: "privacy",
    href: "/privacy-policy",
  },
  {
    id: uid,
    name: "Refund Policy",
    href: "/refund-policy",
  },
  {
    id: uid,
    name: "Cancellation Policy",
    href: "/cancellation-policy",
  },
  {
    id: uid,
    name: "cookies",
    href: "/cookies",
  },
];

export const socials = [
  {
    id: uid,
    logo: <FaYoutube />,
    href: "https://www.youtube.com/@WyntersDreams/",
  },
  {
    id: uid,
    logo: <FaFacebookF />,
    href: "https://www.facebook.com/",
  },
  {
    id: uid,
    logo: <FaInstagram />,
    href: "https://www.instagram.com/",
  },
];
