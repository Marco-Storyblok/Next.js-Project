import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

export default function Settings({ blok }) {
  return (
    <main {...storyblokEditable(blok)} className="settings-preview">
      {blok.sidebar_title && (
        <h1 className="settings-preview__title">{blok.sidebar_title}</h1>
      )}

      <div className="settings-preview__navigation">
        {blok.navigation_items?.map((item) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </main>
  );
}
