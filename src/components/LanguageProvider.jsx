"use client";

import Link from "next/link";
import { createContext, useContext, useEffect } from "react";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

const LanguageContext = createContext(DEFAULT_LANGUAGE);

export default function LanguageProvider({ language, children }) {
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function getLocalizedHref(href, language) {
  if (!href || href.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(href)) {
    return href;
  }

  const url = new URL(href, "http://storyblok.local");
  if (language === DEFAULT_LANGUAGE) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", language);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function LocalizedLink({ href, ...props }) {
  const language = useLanguage();
  return <Link href={getLocalizedHref(href, language)} {...props} />;
}
