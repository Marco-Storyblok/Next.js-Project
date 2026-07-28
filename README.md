# Next.js + Storyblok starter

A minimal Next.js App Router project backed by Storyblok. Every Storyblok story is available at its `full_slug`, while the `home` story is rendered at `/`.

## Requirements

- Node.js 20.9 or later
- A Storyblok space
- A Preview token for development
- A Public token for production

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add the Preview token to `STORYBLOK_DELIVERY_API_TOKEN`.
3. Keep `STORYBLOK_CONTENT_VERSION=draft` for the Visual Editor.
4. Set `STORYBLOK_REGION` to the space region: `eu`, `us`, `ca`, `ap`, or `cn`.
5. Install dependencies and start the HTTPS development server:

```bash
npm ci
npm run dev
```

Open `https://localhost:3000` and accept the local certificate. In Storyblok, set **Settings → Visual Editor → Default environment** to the same URL. Set the `home` story's **Config → Real path** to `/`.

## Content model

Technical component and field names must match the names registered in `src/lib/storyblok.js`.

### `page` (content type)

| Field | Type | Configuration |
| --- | --- | --- |
| `body` | Blocks | Allow `teaser` and `grid` |
| `seo_title` | Text | Browser and search-engine title |
| `seo_description` | Textarea | Search-engine description |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |

### `settings` (content type)

Create exactly one story with the slug `settings`.

| Field | Type | Configuration |
| --- | --- | --- |
| `sidebar_title` | Text | Global sidebar title |
| `hide_sidebar` | Boolean | Hide the complete sidebar |
| `navigation_items` | Blocks | Allow only `navigation_item` |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |
| `button_background_color` | Single-Option | Internal datasource `theme-colors` |
| `button_text_color` | Single-Option | Internal datasource `theme-colors` |

### `navigation_item` (nestable block)

| Field | Type | Configuration |
| --- | --- | --- |
| `label` | Text | Link label |
| `link` | Link | Link destination |
| `hidden` | Boolean | Exclude the item from the sidebar |

The order of the blocks in `settings.navigation_items` determines the sidebar order.

### `teaser` (nestable block)

| Field | Type | Configuration |
| --- | --- | --- |
| `headline` | Text | — |
| `description` | Textarea | — |
| `image` | Asset | Images only |
| `alignment` | Single-Option | `left`, `center`, or `right` |
| `show_button` | Boolean | — |
| `button_label` | Text | — |
| `button_link` | Link | — |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |
| `button_background_color` | Single-Option | Internal datasource `theme-colors` |
| `button_text_color` | Single-Option | Internal datasource `theme-colors` |

### `grid` (nestable block)

| Field | Type | Configuration |
| --- | --- | --- |
| `title` | Text | — |
| `description` | Textarea | — |
| `column_count` | Single-Option | `1`, `2`, `3`, or `4` |
| `columns` | Blocks | Allow only `feature` |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |

### `feature` (nestable block)

| Field | Type | Configuration |
| --- | --- | --- |
| `name` | Text | — |
| `description` | Textarea | — |
| `picture` | Asset | Images only |
| `category` | Single-Option | Local options |
| `active` | Boolean | — |
| `active_label` | Text | Label shown when active |
| `inactive_label` | Text | Label shown when inactive |
| `button_label` | Text | — |
| `button` | Link | — |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |
| `button_background_color` | Single-Option | Internal datasource `theme-colors` |
| `button_text_color` | Single-Option | Internal datasource `theme-colors` |

### `favorite` (content type)

| Field | Type | Configuration |
| --- | --- | --- |
| `title` | Text | — |
| `description` | Textarea | — |
| `link` | Link | Makes the title a link |
| `related_stories` | Multi-Options | Source: Internal stories; use UUIDs |
| `background_color` | Single-Option | Internal datasource `theme-colors` |
| `text_color` | Single-Option | Internal datasource `theme-colors` |

## Color datasource

Create an internal datasource with the slug `theme-colors`. Each entry value must be a valid hexadecimal CSS color, such as `#0a0a0a` or `#f5f5f5`. Color fields are optional; the CSS defaults apply when no value is selected.

## Deployment

Set these environment variables in the hosting provider:

```text
STORYBLOK_DELIVERY_API_TOKEN=<Public token>
STORYBLOK_CONTENT_VERSION=published
STORYBLOK_REGION=eu
```

Use a separate preview deployment with a Preview token and `STORYBLOK_CONTENT_VERSION=draft`. Never commit `.env.local`, personal access tokens, or local certificates; they are excluded by `.gitignore`.

Run both checks before publishing code:

```bash
npm run lint
npm run build
```

## Adding a block

1. Create the React component and apply `storyblokEditable(blok)` to its root element.
2. Render nested blocks with `StoryblokServerComponent` and use `_uid` as the React key.
3. Register the technical component name in `src/lib/storyblok.js`.
4. Create a block with the same technical name in the Storyblok Block Library.
