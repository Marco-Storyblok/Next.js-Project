import {
  storyblokEditable,
  StoryblokServerRichText,
} from "@storyblok/react/rsc";

export default function RichText({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <StoryblokServerRichText
        document={blok.text}
        optimizeImage={{
          width: 768,
          filters: {
            format: "avif",
            quality: 80,
          },
        }}
      />
    </div>
  );
}