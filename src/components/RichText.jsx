import {
  storyblokEditable,
  renderRichText,
} from "@storyblok/react/rsc";

export default function RichText({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <div
        dangerouslySetInnerHTML={{
          __html: renderRichText(blok.text),
        }}
      />
    </div>
  );
}