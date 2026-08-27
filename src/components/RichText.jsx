import {
  storyblokEditable,
  StoryblokServerRichText,
} from "@storyblok/react/rsc";

export default function RichText({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <StoryblokServerRichText document={blok.text} />
    </div>
  );
}