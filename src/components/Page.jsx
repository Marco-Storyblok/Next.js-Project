import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { getColorStyles } from "@/lib/color-styles";

export default function Page({ blok }) {
  return (
    <main
      {...storyblokEditable(blok)}
      className="page"
      style={getColorStyles({
        "--blok-background": blok.background_color,
        "--blok-text": blok.text_color,
      })}
    >
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </main>
  );
}
