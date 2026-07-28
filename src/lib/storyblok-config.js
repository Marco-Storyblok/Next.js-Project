export const storyblokContentVersion =
  process.env.STORYBLOK_CONTENT_VERSION ||
  (process.env.NODE_ENV === "production" ? "published" : "draft");
