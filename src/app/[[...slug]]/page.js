import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokContentVersion } from "@/lib/storyblok-config";
import { getLanguage, getLanguageParams } from "@/lib/languages";
import LanguageProvider from "@/components/LanguageProvider";
import Sidebar from "@/components/Sidebar";
import { notFound } from "next/navigation";
import { cache } from "react";

function getFullSlug(slug) {
  return slug ? slug.join("/") : "home";
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;
  const language = getLanguage(query);
  const story = await fetchStory(getFullSlug(slug), language);

  return {
    title: story.content.seo_title || story.name,
    description:
      story.content.seo_description || story.content.description || undefined,
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;
  const language = getLanguage(query);

  const story = await fetchStory(getFullSlug(slug), language);

  return (
    <LanguageProvider language={language}>
      <Sidebar language={language}>
        <StoryblokStory
          story={story}
          bridgeOptions={{
            language: language === "en" ? undefined : language,
            resolveRelations: [
              "favorite.related_stories",
              "favorite.linked_story",
            ],
            resolveLinks: "story",
          }}
        />
      </Sidebar>
    </LanguageProvider>
  );
}

const fetchStory = cache(async function fetchStory(fullSlug, language) {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: storyblokContentVersion,
      ...getLanguageParams(language),
      resolve_relations: [
        "favorite.related_stories",
        "favorite.linked_story",
      ],
      resolve_links: "story",
    });

    return data.story;
  } catch (error) {
    if (error?.status === 404) {
      notFound();
    }

    throw error;
  }
});
