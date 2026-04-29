export const locales = ["en", "am"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeMap: Record<Locale, string> = { en: "en-US", am: "am-AM" };
export const languageSwitcherMap: Record<Locale, string> = { en: "EN", am: "AM" };
