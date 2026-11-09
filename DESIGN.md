# MediHive design system

## Intent

A hospital group in India that puts the doctor, the hospital and the fee in plain
sight before a booking. The site reads like a well-set clinic directory: editorial
typography, warm paper, hairline rules, no marketing noise.

Shape: **Index-First**. The home page opens with the doctor directory, searchable
and priced, rather than a hero image. Genre: editorial. Job: **book**.

## Theme

Garden, seed `consumer-healthcare-booking-indian-c71e·65e429db·2026-11-09·r0`.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-paper` | `oklch(95.8% 0.024 90)` | `oklch(17% 0.018 155)` |
| `--color-ink` | `oklch(23% 0.045 158)` | `oklch(94% 0.015 95)` |
| `--color-accent` | `oklch(46% 0.125 160)` | `oklch(72% 0.120 158)` |
| `--color-rule` | `oklch(83% 0.022 110)` | `oklch(32% 0.020 150)` |
| `--color-ink-band` | `oklch(23% 0.045 158)` | `oklch(13% 0.020 155)` |
| `--color-on-ink-band` | `oklch(95.8% 0.024 90)` | `oklch(94% 0.015 95)` |

All colours, type sizes, spacing, radii and motion live in `src/styles/tokens.css`.
No component or page may declare a colour or font-family literal. Use
`color-mix(in oklch, var(--token) N%, transparent)` when a tint is needed.

Ink bands (footer, closing sections) use `--color-ink-band` and
`--color-on-ink-band`, never `--color-ink`, so they invert correctly in dark mode.

## Type

- Display: **Vollkorn** 600. Headings, wordmark, FAQ questions, doctor names.
- Body: **Hanken Grotesk** 400 and 500. Prose, labels, navigation.
- Accent italic: **Newsreader** italic 400. Captions and photo credits only.
- Weights in use: 400, 500, 600. Nothing heavier; `strong` is 600.
- Headings wrap with `overflow-wrap: break-word`; display headings are capped by
  `ch` measure, not by fixed pixel widths.

## Layout

- `.container` sets the page gutter and max width.
- `.section` is the vertical rhythm unit; `.section--tight` for lists directly
  under a page head; `.band` and `.band--ink` for full-width surfaces.
- `.page-head` is the standard route opening: h1, lead, meta row, hairline.
- `.hero-index` opens the home page with no minimum height; the directory starts
  within the first screen.
- Grids use `minmax(0, 1fr)` for any track that can hold text.

## Components

- **Header**: flat six-link navigation, search panel, theme toggle, phone, one
  filled Book CTA. Below 80rem the CTA and phone collapse into the mobile panel.
- **Footer**: letter close, contact block, four link columns, photo credits.
- **Buttons**: `.btn` outline, `.btn--primary` filled accent, `.btn--sm` for row
  actions. One filled primary per screen region. Labels never wrap.
- **Rows**: `.rows`/`.row` is the default list unit for doctors, services,
  specialties, hospitals and articles. Layout is name and description, then
  secondary facts, then a row action.
- **Directory**: `.directory`/`.doctor` for the home page; each entry carries the
  hospital, the hours and the fee.
- **Forms**: `.field`, `.label`, `.input`, `.select`, `.textarea`, `.notice`.
  Validation messages are inline and honest. No form claims to send data.
- **Accordion**: `.faq-question` is a real button with `aria-expanded` and
  `aria-controls`; closed answers are `display: none`.
- **Map**: Leaflet inside `.map-frame`, attribution restyled to paper and ink so
  it stays above 4.5:1 contrast over any tile.
- **Photos**: `.photo` with explicit width and height; credited in `.caption`.

## Honesty rules

- Every number on the site is counted from `src/utils/data.ts`. No invented
  patient counts, ratings, awards or years of experience.
- Booking and contact forms prepare a message and say so. They link to the phone
  number for confirmation and never show a fake success state.
- No testimonial, star rating or payment badge appears without a source.

## Motion

Short, functional transitions only: 150 to 250 ms, `--ease-out`. Hover and focus
change colour or rule weight, not position. `prefers-reduced-motion: reduce`
disables the FAQ open animation. No scroll-triggered reveal, no parallax.

## Accessibility

- WCAG 2.2 AA target. Body text uses `--color-ink-2` or darker on paper.
- Focus ring: 2px `--color-focus` with 2px offset. On ink bands, `--color-accent-2`.
- Skip link is the first focusable element.
- Icon-only controls carry an `aria-label`; decorative icons are `aria-hidden`.
- Status text (`result-count`) is announced via `role="status"`.
- Tables stack below 60rem with `data-label` headings, never horizontal scroll.
- Reduced motion is respected.

## Content

- Sentence case for headings. No eyebrow or kicker above a heading.
- No em dash or en dash in copy. Use a full stop or a comma.
- Use curly quotes and apostrophes in prose.
- Fee copy always names the unit: "consultation", "per person".
- Empty states say what happened and offer one clear action.

## Page map

`/` home, `/doctors`, `/services`, `/specialties`, `/hospitals`,
`/health-packages`, `/blog`, `/blog/:slug`, `/about`, `/contact`,
`/book-appointment`, `/faq`, `/privacy`, `/terms`.

Anchors: services use their slug (`/services#general-checkup`), specialties use
their slug (`/specialties#cardiology`).

## Do not

- Do not reintroduce `@astryxdesign/theme-neutral`: its `:scope` rule overrides
  `--color-accent` and turns every primary button grey.
- Do not use `@import ... layer(base)`; Tailwind 3 only loads utilities here.
- Do not put raw hex, rgb or oklch values in component code.
- Do not add a floating chat widget over row actions. Contact routes through the
  phone number and the contact form.
