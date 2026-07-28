import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokLink } from "@/lib/storyblok-link";
import { getColorStyles } from "@/lib/color-styles";

export default function Favorite({ blok }) {
  const href = getStoryblokLink(blok.link);
  const relatedStories = Array.isArray(blok.related_stories)
    ? blok.related_stories.filter((story) => typeof story === "object")
    : [];

  return (
    <main
      {...storyblokEditable(blok)}
      className="favorite"
      style={getColorStyles({
        "--blok-background": blok.background_color,
        "--blok-text": blok.text_color,
      })}
    >
      <article className="favorite__content">
        {blok.title && (
          <h1 className="favorite__title">
            {href ? <Link href={href}>{blok.title}</Link> : blok.title}
          </h1>
        )}

        {blok.description && (
          <p className="favorite__description">{blok.description}</p>
        )}

        {relatedStories.length > 0 && (
          <ul className="favorite__related">
            {relatedStories.map((story) => {
              const storyHref =
                story.full_slug === "home" ? "/" : `/${story.full_slug}`;

              return (
                <li key={story.uuid}>
                  <Link href={storyHref}>{story.name}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </main>
  );
}
