Comprehensive Project Overview
1. Project Purpose
This is a website for Debre Mihret Kidus Gebriel Ethiopian Orthodox Tewahedo Church in Christchurch, New Zealand. It's a bilingual (English/Amharic) church website featuring service times, about the church, news/blog, gallery, donation info, and contact details. The project is associated with "Finote Hiwot Sunday School."

2. Tech Stack
Astro v6.0.8 (static site generator)
Integrations: @astrojs/sitemap, astro-icon, Astro's built-in i18n routing, ClientRouter (view transitions)
CSS: LESS preprocessing (not Tailwind), PostCSS with autoprefixer
Fonts: Astro Fonts API (Inter via Fontsource)
CMS: Decap CMS with DecapBridge (PKCE auth via GitHub)
Content: Astro Content Collections (blog with Zod schema validation)
Build tool: Vite (bundled with Astro)
No Tailwind — uses custom CSS variables + CodeStitch component patterns
3. Project Structure
src/pages/en/ — English pages (index, about, services, blog, gallery, donate, contact, admin, 404)
src/pages/am/ — Amharic pages (same structure)
index.astro
 — Root redirect (browser language detection)
src/components/ — Reusable components (Header, Footer, BlogPreview, Pagination, LanguageSwitch, etc.)
BaseLayout.astro
 — Single layout wrapping all pages
src/content/blog/{en,am}/ — Blog posts by locale
src/locales/{en,am}/ — Translation JSON files (namespaced: common, home, about, services, blog, gallery, donate, contact)
src/config/ — i18n settings and route translations
src/data/ — Site-wide data (client.ts, navData.json)
src/js/ — Utility functions (locale detection, translations, structured data schemas)
src/styles/ — Global LESS stylesheets (root.less, markdown.less)
src/icons/ — SVG icons for astro-icon
public/admin/ — Decap CMS config and preview styles
4. Internationalization
Languages: English (en) and Amharic (am)
Routing: prefixDefaultLocale: true — both locales are prefixed (/en/..., /am/...)
Approach: Full page duplication per locale (not plugin-based)
Translation system: Custom useTranslations(locale) returning a t() function; supports namespaced keys ("home:hero.title")
Route translations: Defined in 
routeTranslations.ts
 (currently same slugs for both locales)
Blog slug mapping: Uses mappingKey frontmatter to link translated posts
Language switcher: TwoLocalesSelect.astro and MultiLocalesSelect.astro components
Browser redirect: Auto-redirects root / to preferred locale
5. Styling Approach
LESS preprocessor (scoped <style lang="less"> in components)
CSS custom properties (design tokens) defined in 
root.less
Color palette: Purple primary (#7c3aed), Ethiopian gold accent (#f59e0b), warm secondary (#92400e)
Typography: Inter font, clamp-based responsive sizing
Component classes: CodeStitch naming convention (.cs-topper, .cs-title, .cs-text, .cs-button-solid)
No Tailwind — all styling is custom LESS with CSS variables
Responsive: Mobile-first with @media breakpoints
6. Content Management
Blog collection defined in 
content.config.ts
 using Zod schema
Fields: title, permalink, description, author, date, featured, image, imageAlt, mappingKey, body (markdown)
Decap CMS at /admin with DecapBridge PKCE authentication
i18n structure: multiple_folders — posts stored in src/content/blog/en/ and src/content/blog/am/
Media: Stored in src/assets/images/blog/ (Astro-optimized)
Featured posts: Boolean flag in frontmatter
7. Build/Deploy
Scripts: npm run dev (dev server), npm run build (production), npm run preview
Utility scripts: remove-demo, remove-dark-mode, remove-decap, config-i18n, create-page
Deploy target: Netlify (has public/_redirects file)
Sitemap: Auto-generated, excludes /admin
Site URL: Placeholder https://www.yourwebsite.com (needs updating)
8. Coding Standards
TypeScript for utility code and data files
Astro components with scoped LESS styles
Path aliases: @layouts, @components, @js, @data, @config, @styles, @assets
Naming: PascalCase for components (folder + file), camelCase for utilities
i18n pattern: Every page calls getLocaleFromUrl() + useTranslations() in frontmatter
Content validation: Zod schemas with regex constraints on permalink and mappingKey
Accessibility: Skip-to-content link, semantic HTML, sr-only utility class
Renovate configured for dependency updates (
renovate.json5
)
CodeTours provided in .tours/ for onboarding
Here's a comprehensive overview of your project:

Project Summary
Debre Mihret Kidus Gebriel Ethiopian Orthodox Tewahedo Church — a bilingual church website for the Ethiopian Orthodox community in Christchurch, New Zealand.

Tech Stack
Astro 6.0.8 (static site generator)
LESS for styling (not Tailwind — custom CSS variables + CodeStitch patterns)
Decap CMS with DecapBridge for content management
Astro Content Collections with Zod validation for blog posts
Inter font via Astro Fonts API (Fontsource)
Deployed to Netlify
Internationalization
Two languages — English (en) and Amharic (am) — with prefix-based routing (/en/..., /am/...). Translation is handled through a custom useTranslations(locale) system with namespaced JSON files (src/locales/{locale}/{namespace}.json). Blog posts are linked across locales via a mappingKey in frontmatter.

Styling
LESS with CSS custom properties as design tokens. The color palette uses purple primary (#7c3aed), Ethiopian gold accent (#f59e0b), and warm earth secondary (#92400e). Components follow CodeStitch naming (.cs-topper, .cs-title, .cs-text, .cs-button-solid). Mobile-first responsive design with clamp-based typography.

Structure
src/pages/{en,am}/ — Duplicated pages per locale
src/components/ — Reusable Astro components (Header, Footer, BlogPreview, etc.)
BaseLayout.astro
 — Single shared layout
src/content/blog/{en,am}/ — Blog posts by locale
src/locales/{en,am}/ — Translation JSON files
src/config/ — Site settings, route translations
src/js/ — Utility functions (locale, translations, schemas)
src/styles/ — Global LESS stylesheets
Conventions
TypeScript for utilities and data
Path aliases (@layouts, @components, @js, @config, etc.)
Every page extracts locale from URL and initializes translations in frontmatter
Accessibility: skip-to-content link, semantic HTML, .sr-only utility
Blog schema enforces lowercase-hyphenated permalinks and mapping keys