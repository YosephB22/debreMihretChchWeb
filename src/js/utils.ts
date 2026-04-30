import { localeMap, defaultLocale, type Locale } from "@config/siteSettings";

export function formatDate(date: string | number | Date, locale: Locale = defaultLocale): string {
  return new Date(date).toLocaleDateString(localeMap[locale], {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
