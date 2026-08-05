export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function normalizeLanguage(value) {
  return LANGUAGES.some(({ code }) => code === value)
    ? value
    : DEFAULT_LANGUAGE;
}

export function getLanguage(searchParams = {}) {
  return normalizeLanguage(
    searchParams.lang || searchParams._storyblok_lang || DEFAULT_LANGUAGE,
  );
}

export function getLanguageParams(language) {
  return language === DEFAULT_LANGUAGE ? {} : { language };
}
