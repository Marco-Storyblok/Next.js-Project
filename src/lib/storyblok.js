import Page from "@/components/Page";
import Feature from "@/components/Feature";
import Grid from "@/components/Grid";
import Teaser from "@/components/Teaser";
import Favorite from "@/components/Favorite";
import Settings from "@/components/Settings";
import NavigationItem from "@/components/NavigationItem";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    favorite: Favorite,
    settings: Settings,
    navigation_item: NavigationItem,
  },
  apiOptions: {
    region: process.env.STORYBLOK_REGION || "eu",
  },
});
