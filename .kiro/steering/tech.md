# Tech Stack & Build

## Core Framework

- **Astro 6.0.8** — static site generator (SSG)
- **TypeScript** (strict mode, extends `astro/tsconfigs/strictest`)
- **Vite** (bundled with Astro)

## Styling

- **LESS** preprocessor — scoped `<style lang="less">` in components
- **CSS custom properties** as design tokens (defined in `src/styles/root.less`)
- **PostCSS + Autoprefixer**
- **No Tailwind** — all styling is custom LESS with CSS variables
- CodeStitch naming convention: `.cs-topper`, `.cs-title`, `.cs-text`, `.cs-button-solid`

## Integrations & Libraries

- `@astrojs/sitemap` — auto-generated sitemap
- `astro-icon` — SVG icon system
- Astro Fonts API — Inter font via Fontsource
- Decap CMS with DecapBridge (PKCE auth via GitHub)
- Astro Content Collections with Zod schema validation

## Path Aliases

| Alias | Path |
|-------|------|
| `@layouts/*` | `src/layouts/*` |
| `@components/*` | `src/components/*` |
| `@js/*` | `src/js/*` |
| `@config/*` | `src/config/*` |
| `@data/*` | `src/data/*` |
| `@assets/*` | `src/assets/*` |
| `@styles/*` | `src/styles/*` |
| `@locales/*` | `src/locales/*` |

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run create-page` | Scaffold a new page |
| `npm run config-i18n` | Configure i18n settings |
| `npm run remove-demo` | Remove demo content |
| `npm run remove-decap` | Remove Decap CMS |

## Deploy Target

Netlify (static hosting). Site URL placeholder in `astro.config.mjs` needs updating to real domain.
