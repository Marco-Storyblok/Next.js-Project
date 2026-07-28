import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokContentVersion } from "@/lib/storyblok-config";
import { notFound } from "next/navigation";
import { cache } from "react";

function getFullSlug(slug) {
  return slug ? slug.join("/") : "home";
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await fetchStory(getFullSlug(slug));

  return {
    title: story.content.seo_title || story.name,
    description:
      story.content.seo_description || story.content.description || undefined,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const story = await fetchStory(getFullSlug(slug));

  return <StoryblokStory story={story} />;
}

const fetchStory = cache(async function fetchStory(fullSlug) {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: storyblokContentVersion,
      resolve_relations: "favorite.related_stories",
    });

    return data.story;
  } catch (error) {
    if (error?.status === 404) {
      notFound();
    }

    throw error;
  }
});
