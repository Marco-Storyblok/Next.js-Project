import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { getColorStyles } from "@/lib/color-styles";

export default function Grid({ blok }) {
  const columnCount = ["1", "2", "3", "4"].includes(blok.column_count)
    ? blok.column_count
    : "3";

  return (
    <section
      {...storyblokEditable(blok)}
      className="grid-section"
      style={getColorStyles({
        "--blok-background": blok.background_color,
        "--blok-text": blok.text_color,
      })}
    >
      {blok.title && (
        <h2 className="grid-section__title">
          {blok.title}
        </h2>
      )}

      {blok.description && (
        <p className="grid-section__description">
          {blok.description}
        </p>
      )}

      <div className={`grid grid--${columnCount}`}>
        {blok.columns?.map((nestedBlok) => (
          <StoryblokServerComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
          />
        ))}
      </div>
    </section>
  );
}
