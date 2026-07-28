import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokContentVersion } from "@/lib/storyblok-config";
import { getStoryblokLink } from "@/lib/storyblok-link";
import { getColorStyles } from "@/lib/color-styles";
import SidebarMenu from "@/components/SidebarMenu";

export default async function Sidebar({ children }) {
  const storyblokApi = getStoryblokApi();
  const settings = await getSettings(storyblokApi);

  if (!settings) {
    return children;
  }

  const navigationItems = (settings.navigation_items || [])
    .filter((item) => !isTrue(item.hidden))
    .map((item) => ({
      id: item._uid,
      href: getStoryblokLink(item.link),
      label: item.label,
    }))
    .filter((item) => item.href && item.label);

  if (isTrue(settings.hide_sidebar)) {
    return children;
  }

  return (
    <SidebarMenu
      items={navigationItems}
      sidebarTitle={settings.sidebar_title}
      colorStyles={getColorStyles({
        "--sidebar-background": settings.background_color,
        "--sidebar-text": settings.text_color,
        "--button-background": settings.button_background_color,
        "--button-text": settings.button_text_color,
      })}
    >
      {children}
    </SidebarMenu>
  );
}

async function getSettings(storyblokApi) {
  try {
    const { data } = await storyblokApi.get("cdn/stories/settings", {
      version: storyblokContentVersion,
    });

    return data.story.content;
  } catch {
    return null;
  }
}

function isTrue(value) {
  return value === true || value === "true" || value === 1 || value === "1";
}
