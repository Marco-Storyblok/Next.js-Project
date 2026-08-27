import {
  storyblokEditable,
  renderRichText,
} from "@storyblok/react/rsc";

export default function RichText({ blok }) {
  const html = renderRichText(blok.text, {
    resolver: (component, blok) => {
      return undefined;
    },
    nodeResolvers: {
      image: (node) => {
        const src = node?.attrs?.src;

        if (!src) {
          return "";
        }

        const transformedSrc =
          `${src}/m/768x0/filters:format(avif):no_upscale():quality(80)`;

        return `
          <img
            src="${transformedSrc}"
            alt="${node.attrs.alt || ""}"
            title="${node.attrs.title || ""}"
            style="max-width:100%;height:auto;"
          />
        `;
      },
    },
  });

  return (
    <div {...storyblokEditable(blok)}>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}