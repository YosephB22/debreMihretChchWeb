# Implementation Plan: Church Website Essential Pages

## Overview

This plan implements five essential pages for the Debre Mihret church website: Plan Your Visit, Beliefs, Events Calendar, Mahber (Fellowships & Services), and Privacy Policy. The implementation follows an incremental approach — starting with shared infrastructure (collections, translations, navigation), then static pages, then collection-driven pages with client-side interactivity, and finally testing.

## Tasks

- [x] 1. Set up content collections and shared infrastructure
  - [x] 1.1 Define events and mahber content collections in `src/content.config.ts`
    - Add `eventsCollection` with Zod schema: title (max 150), date, endDate (optional), time, location (max 200), description (max 500), category (enum), recurring (boolean), mappingKey (regex)
    - Add `mahberCollection` with Zod schema: name (max 100), description (max 500), schedule, contactName, contactEmail (optional), image (optional), order (number), mappingKey (regex)
    - Export both in the `collections` object alongside existing `blog`
    - _Requirements: 4.3, 5.3_

  - [x] 1.2 Create content directories with sample entries for both locales
    - Create `src/content/events/en/` and `src/content/events/am/` with one sample event markdown file each
    - Create `src/content/mahber/en/` and `src/content/mahber/am/` with one sample mahber markdown file each
    - Ensure sample files pass Zod schema validation
    - _Requirements: 4.3, 5.3_

  - [x] 1.3 Create translation namespace JSON files for all five pages
    - Create `src/locales/en/visit.json` and `src/locales/am/visit.json` with page title, meta description, section headings (parking, dress code, children, what to expect), and body text
    - Create `src/locales/en/beliefs.json` and `src/locales/am/beliefs.json` with page title, meta description, and minimum 5 section headings + body text
    - Create `src/locales/en/events.json` and `src/locales/am/events.json` with UI labels (page title, filter labels, upcoming/past headings, empty state)
    - Create `src/locales/en/mahber.json` and `src/locales/am/mahber.json` with UI labels (page title, empty state, contact label)
    - Create `src/locales/en/privacy.json` and `src/locales/am/privacy.json` with full privacy policy text (data collected, usage, retention, third-party, cookies, contact, NZ Privacy Act 2020 reference, last updated date)
    - _Requirements: 1.3, 2.3, 4.6, 5.6, 6.3_

  - [x] 1.4 Update navigation data and footer
    - Add entries to `src/data/navData.json` for: visit, beliefs, events, mahber (with locale labels)
    - Replace "Media" dropdown with flat "Gallery" link (only one child)
    - Add Privacy Policy link to the Footer component with locale-aware URL (`/{locale}/privacy/`)
    - _Requirements: 1.4, 2.4, 4.7, 5.7, 6.4_

  - [x] 1.5 Update Decap CMS config with new collections
    - Add `events` collection with all fields including optional endDate, category select, recurring boolean
    - Add `mahber` collection with all fields including optional contactEmail, image, and order number
    - _Requirements: 4.4, 5.4_

- [x] 2. Implement static content pages (Visit, Beliefs, Privacy)
  - [x] 2.1 Create Plan Your Visit page for both locales
    - Create `src/pages/en/visit.astro` and `src/pages/am/visit.astro`
    - Use BaseLayout, load "visit" namespace via useTranslations
    - Render four content sections with headings: parking, dress code, children, what to expect
    - Set page title and meta description from translation namespace
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

  - [x] 2.2 Create Beliefs / Statement of Faith page for both locales
    - Create `src/pages/en/beliefs.astro` and `src/pages/am/beliefs.astro`
    - Use BaseLayout, load "beliefs" namespace via useTranslations
    - Render minimum 5 sections (Holy Trinity, Sacraments, Scripture, Saints, Fasting) with h2 headings for screen reader navigation
    - Set page title and meta description from translation namespace
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6_

  - [x] 2.3 Create Privacy Policy page for both locales
    - Create `src/pages/en/privacy.astro` and `src/pages/am/privacy.astro`
    - Use BaseLayout, load "privacy" namespace via useTranslations
    - Render all required sections: data collected, usage, retention, third-party sharing, cookies, contact info
    - Include reference to New Zealand Privacy Act 2020
    - Display visible "last updated" date
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6, 6.7_

- [x] 3. Checkpoint - Verify static pages build
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement utility functions for collection pages
  - [x] 4.1 Create `src/js/eventUtils.ts` with event helper functions
    - Implement `partitionEventsByDate(events, referenceDate)` — returns `{ upcoming, past }` with correct sort orders
    - Implement `filterEventsByCategory(events, category)` — returns filtered list
    - _Requirements: 4.2, 4.5, 4.8_

  - [x] 4.2 Create `src/js/mahberUtils.ts` with mahber helper functions
    - Implement `sortMahberByOrder(entries)` — returns entries sorted ascending by order field
    - _Requirements: 5.5_

- [x] 5. Implement reusable components for collection pages
  - [x] 5.1 Create EventCard and EventFilter components
    - Create `src/components/EventCard/EventCard.astro` displaying title, date, time, location, description, and category badge
    - Create `src/components/EventFilter/EventFilter.astro` with category filter buttons (feast-day, sunday-school, community, youth)
    - _Requirements: 4.2, 4.5_

  - [x] 5.2 Create MahberCard component
    - Create `src/components/MahberCard/MahberCard.astro` displaying name, description, schedule, contactName, and optional contactEmail
    - Include optional image rendering
    - _Requirements: 5.2_

- [x] 6. Implement collection-driven pages
  - [x] 6.1 Create Events Calendar page with date partitioning and filtering
    - Create `src/pages/en/events.astro` and `src/pages/am/events.astro`
    - Use BaseLayout, load "events" namespace, query events collection filtered by locale
    - Partition events into upcoming (ascending) and past (descending) using `partitionEventsByDate`
    - Render EventFilter with category buttons
    - Render upcoming events section, then past events section
    - Display empty state message when no upcoming events exist
    - Add client-side JS for category filtering
    - _Requirements: 4.1, 4.2, 4.5, 4.8, 4.9, 4.10_

  - [x] 6.2 Create Mahber page with ordered display
    - Create `src/pages/en/mahber.astro` and `src/pages/am/mahber.astro`
    - Use BaseLayout, load "mahber" namespace, query mahber collection filtered by locale
    - Sort entries by order field ascending using `sortMahberByOrder`
    - Render MahberCard list
    - Display empty state message when no entries exist
    - _Requirements: 5.1, 5.2, 5.5, 5.8, 5.9_

- [x] 7. Checkpoint - Verify all pages build and render correctly
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses Astro 6, TypeScript, LESS styling, and Decap CMS
- All pages follow the existing bilingual (EN/AM) prefix-based routing pattern
- Client-side interactivity uses vanilla JS (no framework) for filtering

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2", "1.4", "1.5"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "4.1", "4.2"] },
    { "id": 3, "tasks": ["5.1", "5.2"] },
    { "id": 4, "tasks": ["6.1", "6.2"] },
    { "id": 5, "tasks": ["8.1"] },
    { "id": 6, "tasks": ["8.2", "8.3", "8.4", "8.5", "8.6"] }
  ]
}
```
