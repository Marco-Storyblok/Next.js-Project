import { storyblokEditable } from "@storyblok/react/rsc";
import { renderRichText } from "@storyblok/richtext";

export default function RichText({ blok }) {
  const html = renderRichText(blok.text);

  return (
    <div {...storyblokEditable(blok)}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}