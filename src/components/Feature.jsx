import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { getStoryblokLink } from "@/lib/storyblok-link";
import { getColorStyles } from "@/lib/color-styles";
import { LocalizedLink } from "@/components/LanguageProvider";

export default function Feature({ blok }) {
  const buttonUrl = getStoryblokLink(blok.button);
  const statusLabel = blok.active ? blok.active_label : blok.inactive_label;

  return (
    <article
      {...storyblokEditable(blok)}
      className={`feature ${
        blok.active ? "feature--active" : ""
      }`}
      style={getColorStyles({
        "--blok-background": blok.background_color,
        "--blok-text": blok.text_color,
        "--button-background": blok.button_background_color,
        "--button-text": blok.button_text_color,
      })}
    >
      {blok.picture?.filename && (
        <div className="feature__image">
          <Image
            src={blok.picture.filename}
            alt={blok.picture.alt || blok.name || ""}
            fill
            sizes="(max-width: 800px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="feature__header">
        {blok.category && (
          <span className="feature__category">
            {blok.category}
          </span>
        )}

        {statusLabel && (
          <span
            className={`feature__status ${
              blok.active ? "feature__status--active" : ""
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {blok.name && <h3>{blok.name}</h3>}

      {blok.description && (
        <p>{blok.description}</p>
      )}

      {buttonUrl && blok.button_label && (
        <LocalizedLink
          href={buttonUrl}
          target={blok.button?.target || "_self"}
          rel={
            blok.button?.target === "_blank"
              ? "noopener noreferrer"
              : undefined
          }
          className="feature__link"
        >
          {blok.button_label}
        </LocalizedLink>
      )}
    </article>
  );
}
