import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.yourwebsite.com", // update with real domain
  i18n: {
    defaultLocale: "en",
    locales: ["en", "am"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  trailingSlash: "always",
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-NZ",
          am: "am-ET",
        },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-primary",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      weights: [400, 500, 600, 700, 900],
      styles: ["normal", "italic"],
    },
  ],
});
