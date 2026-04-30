import type { Locale } from "./siteSettings";

export const routeTranslations: Record<Locale, Record<string, string>> = {
  en: {
    about: "about",
    services: "services",
    blog: "blog",
    gallery: "gallery",
    donate: "donate",
    contact: "contact",
  },
  am: {
    about: "about",
    services: "services",
    blog: "blog",
    gallery: "gallery",
    donate: "donate",
    contact: "contact",
  },
};

export const localizedCollections = {
  blog: { en: "blog", am: "blog" },
} as const;
