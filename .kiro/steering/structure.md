# Project Structure

```
src/
├── pages/
│   ├── index.astro          # Root redirect (locale detection)
│   ├── en/                  # English pages
│   └── am/                  # Amharic pages
├── components/              # Reusable Astro components (PascalCase folders)
│   ├── Header/
│   ├── Footer/
│   ├── BlogPreview/
│   ├── BlogFullArticle/
│   ├── MahberCard/
│   ├── Pagination/
│   ├── LanguageSwitch/
│   └── ...
├── layouts/
│   └── BaseLayout.astro     # Single shared layout for all pages
├── content/
│   ├── blog/{en,am}/        # Blog posts by locale (markdown)
│   └── mahber/{en,am}/      # Mahber entries by locale
├── locales/
│   ├── en/                  # English translation JSON (namespaced)
│   └── am/                  # Amharic translation JSON (namespaced)
├── config/
│   ├── siteSettings.ts      # Locale definitions, defaults
│   └── routeTranslations.ts # Route slug mappings per locale
├── data/
│   ├── client.ts            # Site-wide client data
│   └── navData.json         # Navigation structure
├── js/                      # Utility functions
│   ├── translationUtils.ts  # useTranslations(locale) → t() function
│   ├── localeUtils.ts       # getLocaleFromUrl(), locale helpers
│   ├── localePreference.ts  # Browser locale storage
│   ├── mahberUtils.ts       # Mahber collection helpers
│   └── utils.ts             # General utilities
├── styles/
│   ├── root.less            # CSS custom properties / design tokens
│   └── markdown.less        # Blog markdown styling
├── icons/                   # SVG icons for astro-icon
├── assets/                  # Images, JS assets, SVGs
├── content.config.ts        # Content collection schemas (Zod)
└── env.d.ts                 # Astro environment types

public/
├── admin/                   # Decap CMS config and preview styles
└── _redirects               # Netlify redirect rules
```

## Conventions

- **Pages are duplicated per locale** — `src/pages/en/` and `src/pages/am/` mirror each other
- **Every page** calls `getLocaleFromUrl()` + `useTranslations(locale)` in its frontmatter
- **Components** use PascalCase folder names containing the `.astro` file
- **Translations** are namespaced JSON: `src/locales/{locale}/{namespace}.json` — accessed via `t("namespace:key.subkey")`
- **Blog posts** linked across locales via `mappingKey` frontmatter field
- **Content schemas** enforce lowercase-hyphenated `permalink` and `mappingKey` values
- **Styling** is scoped LESS inside components; global tokens live in `root.less`
- **Color palette**: purple primary (`#7c3aed`), Ethiopian gold accent (`#f59e0b`), warm secondary (`#92400e`)
