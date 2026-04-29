import type { Locale } from "./siteSettings";

export const routeTranslations: Record<Locale, Record<string, string>> = {
  en: {
    about: "about",
    contact: "contact",
  },
  am: {
    about: "about",
    contact: "contact",
  },
};

export const localizedCollections = {
  blog: { en: "blog", am: "blog" },
} as const;
