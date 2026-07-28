import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokLink } from "@/lib/storyblok-link";

export default function NavigationItem({ blok }) {
  const href = getStoryblokLink(blok.link);

  if (!blok.label) return null;

  return (
    <div {...storyblokEditable(blok)} className="settings-preview__item">
      {href ? <Link href={href}>{blok.label}</Link> : blok.label}
    </div>
  );
}
