import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokLink } from "@/lib/storyblok-link";
import { getColorStyles } from "@/lib/color-styles";

export default function Teaser({ blok }) {
  const alignment = ["left", "center", "right"].includes(blok.alignment)
    ? blok.alignment
    : "left";

  const buttonUrl = getStoryblokLink(blok.button_link);

  const customStyles = {
    ...(blok.image?.filename && {
      backgroundImage: `url(${blok.image.filename}/m/1600x0/filters:quality(80))`,
    }),
    ...getColorStyles({
      "--blok-background": blok.background_color,
      "--blok-text": blok.text_color,
      "--button-background": blok.button_background_color,
      "--button-text": blok.button_text_color,
    }),
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={`teaser teaser--${alignment}`}
      style={customStyles}
    >
      <div className="teaser__content">
        {blok.headline && <h1>{blok.headline}</h1>}

        {blok.description && (
          <p>{blok.description}</p>
        )}

        {blok.show_button && buttonUrl && blok.button_label && (
          <a
            href={buttonUrl}
            target={blok.button_link?.target || "_self"}
            rel={
              blok.button_link?.target === "_blank"
                ? "noopener noreferrer"
                : undefined
            }
            className="button"
          >
            {blok.button_label}
          </a>
        )}
      </div>
    </section>
  );
}
