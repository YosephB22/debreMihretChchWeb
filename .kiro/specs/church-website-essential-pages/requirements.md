# Requirements Document

## Introduction

This feature adds essential pages to the Debre Mihret St. Gebriel Ethiopian Orthodox Tewahedo Church website. The pages address gaps identified in the current site: visitor orientation, faith documentation, media archives, event scheduling, fellowships and service groups (mahber), and legal compliance. All pages follow the existing bilingual (EN/AM) architecture, LESS styling with CodeStitch patterns, and Decap CMS content management approach.

## Glossary

- **Website**: The Debre Mihret St. Gebriel EOTC Astro-based static site deployed on Netlify
- **Visitor**: A person accessing the website for the first time or planning their first in-person visit
- **Page_Router**: The Astro file-based routing system that serves pages under /en/ and /am/ prefixes
- **Translation_System**: The custom useTranslations(locale) utility that loads namespaced JSON translation files
- **CMS**: Decap CMS with DecapBridge PKCE authentication used for content management
- **Content_Collection**: An Astro Content Collection defined with Zod schema validation and glob loader
- **Navigation_System**: The navData.json-driven header navigation with support for nested dropdown items
- **Sermon**: A recorded teaching or homily delivered by clergy, stored as audio or video media
- **Event**: A scheduled church activity such as a feast day, Sunday school session, or community gathering
- **Mahber**: A fellowship association or service group within the Ethiopian Orthodox tradition (e.g., youth mahber, women's mahber, Sunday school)


## Requirements

### Requirement 1: Plan Your Visit Page

**User Story:** As a first-time visitor, I want a dedicated "Plan Your Visit" page, so that I know what to expect when attending the church for the first time.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/visit/ or /am/visit/, THE Page_Router SHALL render the Plan Your Visit page in the corresponding language
2. THE Website SHALL display the Plan Your Visit page with four distinct content sections: parking information, dress code guidance, children's accommodations, and what to expect during a service, each with a visible heading and at least one paragraph of descriptive text
3. THE Translation_System SHALL load a "visit" namespace JSON file containing all text content for the Plan Your Visit page, and IF a translation key is missing from the namespace file, THEN THE Translation_System SHALL render the key path as fallback text
4. THE Navigation_System SHALL include a "Plan Your Visit" link in the main navigation menu, visible without requiring interaction with a submenu, in both supported locales with locale-appropriate labels
5. IF the Plan Your Visit page is accessed with an unsupported locale prefix, THEN THE Page_Router SHALL return a 404 response
6. THE Website SHALL set a unique page title and meta description on the Plan Your Visit page, loaded from the "visit" translation namespace

### Requirement 2: Beliefs / Statement of Faith Page

**User Story:** As a community member or curious visitor, I want a Beliefs page, so that I can understand the core tenets of the Ethiopian Orthodox Tewahedo faith in accessible language.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/beliefs/ or /am/beliefs/, THE Page_Router SHALL render the Beliefs page in the corresponding language
2. THE Website SHALL present the core tenets of the Ethiopian Orthodox Tewahedo faith organized into a minimum of 5 sections (e.g., Holy Trinity, Sacraments, Scripture, Saints, Fasting), where each section is preceded by a visible heading element (h2 or h3) that identifies the topic
3. THE Translation_System SHALL load a "beliefs" namespace JSON file containing all section headings and body text content for the Beliefs page
4. THE Navigation_System SHALL include a "Beliefs" link accessible from the main navigation menu
5. IF the Beliefs page is accessed with an unsupported locale prefix, THEN THE Page_Router SHALL return a 404 response
6. THE Website SHALL structure the Beliefs page content using a sequential heading hierarchy (h2 for section titles) so that screen readers can navigate between sections

### Requirement 3: Sermon Archive Page

**User Story:** As a church member, I want a Sermon Archive page, so that I can listen to or watch past sermons organized by date and series.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/sermons/ or /am/sermons/, THE Page_Router SHALL render the Sermon Archive page in the corresponding language
2. THE Website SHALL display a list of Sermon entries sorted by date in descending order (newest first), showing title, date, speaker, and media type (audio or video), with a maximum of 12 entries per page and pagination controls when the total exceeds 12
3. THE Content_Collection SHALL define a "sermons" collection with Zod schema validation for fields: title, date, speaker, description, mediaUrl, mediaType (enum of "audio" or "video"), series, and mappingKey
4. THE CMS SHALL provide an editorial interface for creating, editing, and deleting Sermon entries in both English and Amharic
5. WHEN a Visitor selects a Sermon entry, THE Website SHALL display an embedded media player inline on the page that plays the associated audio or video content without navigating away from the Sermon Archive page
6. THE Website SHALL allow filtering of Sermon entries by series name, with an "All" option selected by default that displays all entries
7. THE Translation_System SHALL load a "sermons" namespace JSON file containing UI labels for the Sermon Archive page
8. IF no Sermon entries exist, THEN THE Website SHALL display a placeholder message indicating sermons will be available soon
9. IF a Visitor filters by series and no Sermon entries match the selected series, THEN THE Website SHALL display a message indicating no sermons are found for the selected series
10. THE Navigation_System SHALL include a "Sermons" link accessible from the main navigation menu

### Requirement 4: Events Calendar Page

**User Story:** As a church member or visitor, I want an Events Calendar page, so that I can see upcoming feast days, Sunday school sessions, and community events in one place.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/events/ or /am/events/, THE Page_Router SHALL render the Events Calendar page in the corresponding language
2. THE Website SHALL display upcoming Event entries (entries whose date is on or after the current calendar date) in ascending chronological order showing title, date, time, location, and description
3. THE Content_Collection SHALL define an "events" collection with Zod schema validation for fields: title (max 150 characters), date, endDate (optional), time, location (max 200 characters), description (max 500 characters), category, recurring (boolean), and mappingKey
4. THE CMS SHALL provide an editorial interface for creating, editing, and deleting Event entries in both English and Amharic
5. THE Website SHALL allow filtering of Event entries by category (feast-day, sunday-school, community, youth)
6. THE Translation_System SHALL load an "events" namespace JSON file containing UI labels for the Events Calendar page
7. THE Navigation_System SHALL include an "Events" link accessible from the main navigation menu
8. WHILE an Event entry date is in the past (before the current calendar date), THE Website SHALL display the entry in a separate "Past Events" section below the upcoming events list, sorted in descending chronological order
9. IF no upcoming Event entries exist, THEN THE Website SHALL display a placeholder message indicating that no upcoming events are currently scheduled
10. IF the Events Calendar page is accessed with an unsupported locale prefix, THEN THE Page_Router SHALL return a 404 response

### Requirement 5: Mahber (Fellowships & Services) Page

**User Story:** As a member or visitor, I want a Mahber/Fellowships page, so that I can learn about the church's service groups (Sunday school, youth mahber, women's/men's mahber, outreach) and how to get involved.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/mahber/ or /am/mahber/, THE Page_Router SHALL render the Mahber page in the corresponding language
2. THE Website SHALL display each Mahber entry showing name (maximum 100 characters), description (maximum 500 characters), meeting schedule as free-text (e.g., "Sundays 2–3 PM"), and contact person name with optional email address
3. THE Content_Collection SHALL define a "mahber" collection with Zod schema validation for fields: name (string, required), description (string, required), schedule (string, required), contactName (string, required), contactEmail (string, optional), image (optional), order (number, required), and mappingKey (string, required)
4. THE CMS SHALL provide an editorial interface for creating, editing, and deleting Mahber entries in both English and Amharic
5. THE Website SHALL display Mahber entries sorted by the order field in ascending order
6. THE Translation_System SHALL load a "mahber" namespace JSON file containing UI labels for the Mahber page
7. THE Navigation_System SHALL include a "Mahber" link (displayed as "Fellowships & Services" in English and "ማኅበራት" in Amharic) accessible from the main navigation menu
8. IF no Mahber entries exist, THEN THE Website SHALL display a placeholder message indicating fellowship information will be available soon
9. IF the Mahber page is accessed with an unsupported locale prefix, THEN THE Page_Router SHALL return a 404 response

### Requirement 6: Privacy Policy Page

**User Story:** As a website administrator, I want a Privacy Policy page, so that the church complies with the New Zealand Privacy Act for data collected through contact forms and donation pages.

#### Acceptance Criteria

1. WHEN a Visitor navigates to /en/privacy/ or /am/privacy/, THE Page_Router SHALL render the Privacy Policy page in the corresponding language
2. THE Website SHALL display the privacy policy covering: what data is collected, how data is used, data retention period, third-party sharing, cookies, and contact information for privacy inquiries
3. THE Translation_System SHALL load a "privacy" namespace JSON file containing all text content for the Privacy Policy page
4. THE Website SHALL include a link to the Privacy Policy page in the site footer, and the link SHALL navigate to the privacy page matching the current locale
5. THE Privacy Policy page SHALL reference the New Zealand Privacy Act 2020 as the governing legislation
6. THE Privacy Policy page SHALL display a visible "last updated" date indicating when the policy was most recently revised
7. IF the Privacy Policy page is accessed with an unsupported locale prefix, THEN THE Page_Router SHALL return a 404 response


