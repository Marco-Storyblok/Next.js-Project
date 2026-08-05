"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const language = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function changeLanguage(event) {
    const nextLanguage = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (nextLanguage === "en") params.delete("lang");
    else params.set("lang", nextLanguage);

    // Storyblok uses this parameter inside the Visual Editor.
    if (params.has("_storyblok_lang")) {
      params.set("_storyblok_lang", nextLanguage);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">
        {language === "es" ? "Idioma" : "Language"}
      </span>
      <select value={language} onChange={changeLanguage} aria-label="Language">
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
