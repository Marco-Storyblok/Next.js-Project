export function getStoryblokLink(link) {
  if (!link) return "";

  const rawUrl = link.cached_url || link.url || "";
  if (!rawUrl) return "";

  if (link.linktype === "email") {
    return rawUrl.startsWith("mailto:") ? rawUrl : `mailto:${rawUrl}`;
  }

  if (link.linktype === "story") {
    const path = rawUrl === "home" || rawUrl === "home/" ? "" : rawUrl;
    const href = path.startsWith("/") ? path : `/${path}`;
    return link.anchor ? `${href}#${link.anchor}` : href || "/";
  }

  return rawUrl;
}
