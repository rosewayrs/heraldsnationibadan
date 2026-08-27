# Heralds International Christian Centre — Website

A complete, production-ready website for **Heralds International Christian Centre, Ibadan**, built with the layout philosophy, section rhythm, navigation structure, card patterns and responsive behavior of `elevationng.org` as a design reference — fully re-skinned with Heralds' own identity, copy, colors and photography. No Elevation Church branding, imagery or content is used anywhere in this project.

## A note on the tech stack

The original brief asked for Next.js + TypeScript + Tailwind. This build environment's network egress does **not** allow access to the npm package registry (`npm install` is blocked at the network level), so a real Next.js project couldn't be scaffolded here. Rather than deliver something broken or incomplete, this was built as a **dependency-free static site generator**:

- Plain, modern JavaScript (ES modules) — no build tools, no `npm install` required, ever.
- Component-style architecture: reusable functions for the header, footer, buttons, cards, forms, etc. (`build/components.mjs`), driven by a single content file (`build/content.mjs`) and composed into pages (`build/pages.mjs`).
- Hand-written CSS design system (`public/css/main.css`) implementing the same visual language Tailwind would have (design tokens, utility-like rhythm, responsive breakpoints).
- Output is plain HTML/CSS/JS — it runs anywhere, with zero server, zero build step, and zero ongoing dependency risk.

If you later want this rebuilt in Next.js/React, the component boundaries, copy, content structure and design tokens here translate directly — it would be a fast port, not a redesign.

## Project structure

```
heralds-icc/
├── build/                  # Site generator source (edit these, not the HTML in public/)
│   ├── content.mjs         # ALL site copy, ministries, articles, contact info, nav
│   ├── components.mjs      # Reusable UI building blocks (header, footer, cards, forms...)
│   ├── icons.mjs           # Hand-authored inline SVG icon set
│   ├── layout.mjs          # <head> wrapper: SEO meta, Open Graph, JSON-LD
│   ├── pages.mjs           # Page templates (home, about, ministries, blog, etc.)
│   ├── build.mjs           # Orchestrator — writes public/*.html, sitemap.xml, robots.txt
│   └── process_images.py   # One-off script that produced public/images/ from source photos
├── public/                 # ⭐ THE WEBSITE — deploy this folder as-is
│   ├── index.html, about.html, ministries.html, events.html, sermons.html,
│   │   watch.html, blog.html, blog/*.html, give.html, contact.html, prayer.html,
│   │   testimony.html, search.html, privacy-policy.html, terms.html, 404.html
│   ├── css/main.css, js/main.js, js/search.js
│   ├── images/              # Optimized photography + logo + favicons + OG image
│   ├── sitemap.xml, robots.txt, site.webmanifest, search-index.json
├── package.json
└── README.md
```

## Editing content

Everything text-based lives in **`build/content.mjs`** — ministry descriptions, homepage copy, article text, the address, nav labels, etc. Change it there, then rebuild:

```bash
node build/build.mjs
```

(No `npm install` needed — this uses only Node's built-in modules.)

### Placeholders you should replace before launch

The brief was explicit that no facts should be invented. A few real details weren't supplied, so they're rendered as clearly flagged placeholders (search `content.mjs` for `isPlaceholder`, or search the site for "to be confirmed"):

- **Service times** (shown on the homepage, About, Contact and the footer)
- **Phone number and email address** (Contact page, footer)
- **Bank / giving account details** (Give page)
- **Social media links** (currently `#` — footer and mobile menu)
- **Domain** — `site.url` in `content.mjs` is set to a placeholder (`https://www.heraldsibadan.org`); update it once a real domain is live (it feeds canonical URLs, sitemap.xml, robots.txt and Open Graph tags)

### Adding real photos, sermons, events

- Drop new images into `public/images/` and reference them from `content.mjs`.
- `events.upcoming` and the sermons page are currently empty-state by design (no real events/sermons were supplied) — once you have real ones, add them as data in `content.mjs` and extend `pages.mjs`'s `eventsPage()`/`sermonsPage()` to render them as cards instead of the empty state.

## Forms

The contact, prayer request, testimony and newsletter forms are built **integration-ready** but not wired to a live backend (no email/CRM credentials were supplied, and none should ever be invented). They're marked up as [Netlify Forms](https://docs.netlify.com/forms/setup/)-compatible (`data-netlify="true"`, hidden `form-name` field, honeypot spam trap) — if you deploy on Netlify, they will work with zero extra configuration and submissions will appear in your Netlify dashboard. On any other host, swap the `fetch` target in `public/js/main.js` for your form backend of choice (Formspree, a serverless function, etc.).

## Deploying

This is a static site — drag-and-drop `public/` onto Netlify, Vercel, GitHub Pages, or any standard web host. There is no server, database or build step required at deploy time; `public/` is already the finished output.

All internal links, stylesheets, scripts and images use page-relative paths, so the site also renders correctly if you just double-click `public/index.html` and open it straight in a browser — useful for a quick local preview before it's deployed anywhere.

Before going live:
1. Fill in the placeholders above.
2. Update `site.url` in `build/content.mjs` to your real domain, then re-run `node build/build.mjs` so canonical URLs / sitemap / Open Graph tags are correct.
3. Point your DNS at your host.

## Design system

- **Colors**: deep navy (`#101E6D`→`#080F2B` gradient) as the dominant brand color, a warm gold accent (`#D9A441`) standing in for the reference site's lime accent, and a maroon (`#7B3410`) pulled from the supplied Heralds flame mark used for small highlights (ministry icons, placeholder flags). Full token list in `public/css/main.css` under `:root`.
- **Type**: Montserrat (headings) + Poppins (body) — the same pairing measured on the reference site, loaded from Google Fonts.
- **Imagery**: all photography is the church's own supplied photos (optimized into several crops/sizes in `public/images/`). No stock or reference-site imagery was used.

## QA performed

- Responsive-checked at 1920/1440/1280/1024/768/430/390/375px — no horizontal overflow on any page.
- Full internal link crawl — no broken links.
- All images carry `alt` text; every page has exactly one `<h1>`; forms have associated labels.
- Color contrast checked against WCAG AA for all text/background pairings in the design system.
- Searched the entire project for "Elevation" / "ElevationNG" — no matches.
