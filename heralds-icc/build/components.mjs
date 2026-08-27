import { icon } from "./icons.mjs";
import { site, nav, footerLinks } from "./content.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------
export function badge(text) {
  return `<span class="badge"><span class="badge-dot"></span>${esc(text)}</span>`;
}

export function placeholderNote(text) {
  return `<span class="tbd" title="Placeholder — to be confirmed by the church office">${esc(text)} <em>(tbc)</em></span>`;
}

export function button({ label, href, icon: iconName, variant = "primary", size = "md", tag = "a", type, className = "", external = false }) {
  const T = tag === "button" ? "button" : "a";
  const attrs =
    T === "a"
      ? `href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}`
      : `type="${type || "button"}"`;
  const iconHtml = iconName ? icon(iconName, "btn-icon") : "";
  return `<${T} class="btn btn-${variant} btn-${size} ${className}" ${attrs}>${esc(label)}${iconHtml}</${T}>`;
}

export function sectionHeading({ badgeText, heading, body, align = "center", accent = 0 }) {
  const headingLines = Array.isArray(heading) ? heading : [heading];
  const headingHtml = headingLines
    .map((line, i) => (i === accent ? `<span class="accent">${esc(line)}</span>` : esc(line)))
    .join("<br>");
  return `
  <div class="section-heading section-heading-${align}">
    ${badgeText ? badge(badgeText) : ""}
    <h2>${headingHtml}</h2>
    ${body ? `<p class="section-body">${esc(body)}</p>` : ""}
  </div>`;
}

// ---------------------------------------------------------------------------
// Header / Nav
// ---------------------------------------------------------------------------
export function header(activePath = "/") {
  const links = nav.primary
    .map(
      (l) =>
        `<li><a href="${l.href}" class="${l.href === activePath ? "active" : ""}">${esc(l.label)}</a></li>`
    )
    .join("");

  const mobileLinks = nav.primary
    .map(
      (l) =>
        `<li><a href="${l.href}" class="${l.href === activePath ? "active" : ""}">${esc(l.label)}</a></li>`
    )
    .join("");

  return `
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="${esc(site.name)} — Home">
        <img src="/images/logo-heralds.png" alt="${esc(site.name)}" width="190" height="60">
      </a>
      <nav class="nav-desktop" aria-label="Primary">
        <ul>${links}</ul>
      </nav>
      <div class="header-actions">
        <a href="/watch.html" class="watch-link">${icon("play", "icon-sm")}<span>Online</span></a>
        <a href="/testimony.html" class="btn btn-outline btn-sm header-cta">Testimony</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          ${icon("menu", "icon")}
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="mobile-menu-inner">
        <nav aria-label="Mobile">
          <ul>${mobileLinks}</ul>
        </nav>
        <div class="mobile-menu-actions">
          <a href="/watch.html" class="btn btn-outline-light btn-md">${icon("play", "btn-icon")}Watch Online</a>
          <a href="/about.html#visit" class="btn btn-accent btn-md">Plan Your Visit</a>
        </div>
        <div class="mobile-menu-social">
          ${socialIcons()}
        </div>
      </div>
    </div>
  </header>`;
}

function socialIcons() {
  const items = [
    ["telegram", site.social.telegram.value],
    ["instagram", site.social.instagram.value],
    ["facebook", site.social.facebook.value],
    ["tiktok", site.social.tiktok.value],
    ["youtube", site.social.youtube.value],
  ];
  return `<div class="social-row">${items
    .map(
      ([name, href]) =>
        `<a href="${href}" class="social-icon" aria-label="${name}" ${href === "#" ? 'rel="nofollow"' : 'target="_blank" rel="noopener"'}>${icon(name, "icon-sm")}</a>`
    )
    .join("")}</div>`;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export function footer() {
  const quick = footerLinks.quick.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("");
  const media = footerLinks.media.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("");
  const legal = footerLinks.legal.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("");

  return `
  <footer class="site-footer">
    <div class="footer-cta">
      <div class="container footer-cta-inner">
        <h2>Ready To Find Your People?</h2>
        <p>We'd love to welcome you to Heralds International Christian Centre. Experience a warm family of love, where you're discipled to walk in all that Christ has called you to be.</p>
        <div class="cta-row">
          ${button({ label: "Plan Your Visit", href: "/about.html#visit", variant: "outline", icon: "arrow-right" })}
          ${button({ label: "Join The Family", href: "/about.html#membership", variant: "accent" })}
        </div>
      </div>
    </div>
    <div class="footer-main">
      <div class="container footer-grid">
        <div class="footer-col footer-brand">
          <img src="/images/logo-heralds.png" alt="${esc(site.name)}" width="180" height="57">
          <p class="footer-tagline">Raising Effective Ministers of the Word</p>
          <p class="footer-contact"><a href="/contact.html">${icon("mail", "icon-sm")}Contact Us</a></p>
          <p class="footer-contact">${icon("map-pin", "icon-sm")}<span>${site.address.line1}, ${site.address.line2}<br>${site.address.line3} ${site.address.line4}</span></p>
        </div>
        <div class="footer-col">
          <h3>Quick Links</h3>
          <ul>${quick}</ul>
        </div>
        <div class="footer-col">
          <h3>Service Times</h3>
          <p class="tbd-block">${esc(site.serviceTimes.value)}</p>
          <h3 class="mt">Media</h3>
          <ul>${media}</ul>
        </div>
        <div class="footer-col footer-newsletter">
          <h3>Stay In The Loop</h3>
          <p>Get updates on events, articles and life at Heralds.</p>
          ${newsletterForm("footer")}
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; ${new Date().getUTCFullYear() || 2026} Heralds International Christian Centre. All rights reserved.</p>
        <ul class="footer-legal">${legal}</ul>
        ${socialIcons()}
      </div>
    </div>
  </footer>`;
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------
export function ministryCard(m, variant) {
  const style = variant || m.cardStyle || "panel";
  const img = m.image
    ? `<div class="ministry-card-media"><img src="${m.image}" alt="${esc(m.name)} ministry at Heralds International Christian Centre" loading="lazy" width="600" height="450"></div>`
    : "";
  return `
  <article class="ministry-card ministry-card-${style}${m.image ? " has-media" : ""}">
    ${img}
    <div class="ministry-card-body">
      <span class="ministry-card-icon">${icon(m.icon, "icon")}</span>
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.description)}</p>
    </div>
  </article>`;
}

export function blogCard(a) {
  return `
  <article class="blog-card">
    <a href="/blog/${a.slug}.html" class="blog-card-media">
      <img src="${a.image}" alt="" loading="lazy" width="500" height="330">
      <span class="blog-card-category">${esc(a.category)}</span>
    </a>
    <div class="blog-card-body">
      <h3><a href="/blog/${a.slug}.html">${esc(a.title)}</a></h3>
      <p>${esc(a.excerpt)}</p>
      <a href="/blog/${a.slug}.html" class="text-link">Read More${icon("arrow-right", "icon-xs")}</a>
    </div>
  </article>`;
}

export function sermonCard(s, href) {
  return `
  <a class="sermon-card" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.title)} — watch the full teaching on our Telegram channel">
    <img src="${s.image}" alt="${esc(s.title)} — teaching series at Heralds International Christian Centre" loading="lazy" width="800" height="800">
    <span class="sermon-card-overlay"><span>${icon("telegram", "icon-xs")}Watch On Telegram</span></span>
  </a>`;
}

export function sermonCardMore(href) {
  return `
  <a class="sermon-card sermon-card-more" href="${href}" target="_blank" rel="noopener noreferrer">
    <span class="sermon-card-more-icon">${icon("arrow-up-right", "icon")}</span>
    <span>See More Teaching</span>
  </a>`;
}

export function galleryStrip(images) {
  return `<div class="gallery-strip">${images
    .map(
      (src, i) =>
        `<div class="gallery-item gallery-item-${(i % 3) + 1}"><img src="${src}" alt="Life at Heralds International Christian Centre" loading="lazy" width="500" height="500"></div>`
    )
    .join("")}</div>`;
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------
export function newsletterForm(idPrefix = "nl") {
  return `
  <form class="newsletter-form" data-form="newsletter" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="company">
    <input type="hidden" name="form-name" value="newsletter">
    <label for="${idPrefix}-email" class="sr-only">Email address</label>
    <div class="input-row">
      <input type="email" id="${idPrefix}-email" name="email" placeholder="Your email address" required>
      <button type="submit" class="btn btn-accent btn-sm" aria-label="Subscribe">${icon("arrow-right", "btn-icon")}</button>
    </div>
    <input type="text" name="company" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
    <p class="form-note" data-form-note hidden></p>
  </form>`;
}

export function textField({ id, name, label, type = "text", required = true, placeholder = "", full = false }) {
  return `
  <div class="form-field ${full ? "form-field-full" : ""}">
    <label for="${id}">${esc(label)}${required ? "" : " (optional)"}</label>
    <input type="${type}" id="${id}" name="${name}" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${required ? "required" : ""}>
  </div>`;
}

export function textArea({ id, name, label, required = true, rows = 5 }) {
  return `
  <div class="form-field form-field-full">
    <label for="${id}">${esc(label)}${required ? "" : " (optional)"}</label>
    <textarea id="${id}" name="${name}" rows="${rows}" ${required ? "required" : ""}></textarea>
  </div>`;
}

export function selectField({ id, name, label, options, required = true }) {
  const opts = options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  return `
  <div class="form-field">
    <label for="${id}">${esc(label)}</label>
    <select id="${id}" name="${name}" ${required ? "required" : ""}>${opts}</select>
  </div>`;
}

export function formWrapper({ name, fieldsHtml, submitLabel, successMessage }) {
  return `
  <form class="site-form" data-form="${name}" name="${name}" method="POST" data-netlify="true" netlify-honeypot="company" data-success="${esc(successMessage)}">
    <input type="hidden" name="form-name" value="${name}">
    <div class="form-grid">${fieldsHtml}</div>
    <input type="text" name="company" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="submit" class="btn btn-primary btn-lg">${esc(submitLabel)}</button>
    <p class="form-note" data-form-note hidden></p>
  </form>`;
}

// ---------------------------------------------------------------------------
// Page hero (internal pages)
// ---------------------------------------------------------------------------
export function pageHero({ badgeText, heading, body, image, small = false }) {
  return `
  <section class="page-hero ${small ? "page-hero-sm" : ""} ${image ? "has-image" : ""}" ${image ? `style="background-image:linear-gradient(120deg,rgba(16,30,109,.88),rgba(8,15,43,.92)),url('${image}')"` : ""}>
    <div class="container page-hero-inner">
      ${badgeText ? badge(badgeText) : ""}
      <h1>${esc(heading)}</h1>
      ${body ? `<p>${esc(body)}</p>` : ""}
    </div>
  </section>`;
}

export function emptyState({ icon: iconName = "calendar", heading, body }) {
  return `
  <div class="empty-state">
    <span class="empty-state-icon">${icon(iconName, "icon-lg")}</span>
    <h3>${esc(heading)}</h3>
    <p>${esc(body)}</p>
  </div>`;
}
