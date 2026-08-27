import { icon } from "./icons.mjs";
import {
  site,
  home,
  about,
  membership,
  ministries,
  articles,
  events,
  sermons,
  giving,
  legal,
} from "./content.mjs";
import {
  header,
  footer,
  button,
  badge,
  sectionHeading,
  ministryCard,
  blogCard,
  eventCard,
  sermonCard,
  sermonCardMore,
  galleryStrip,
  pageHero,
  emptyState,
  textField,
  textArea,
  selectField,
  formWrapper,
  esc,
} from "./components.mjs";
import { page } from "./layout.mjs";

const shell = (main, activePath) => `
${header(activePath)}
<main id="main-content">
${main}
</main>
${footer()}`;

// ===========================================================================
// HOME
// ===========================================================================
export function homePage() {
  const main = `
  <section class="hero">
    <div class="hero-media hero-slider" data-hero-slider>
      <div class="hero-slide is-active">
        <img
          src="/images/hero-worship-1280.jpg"
          srcset="/images/hero-worship-800.jpg 800w, /images/hero-worship-1280.jpg 1280w, /images/hero-worship-1920.jpg 1920w, /images/hero-worship.jpg 2000w"
          sizes="100vw"
          alt="" role="presentation" fetchpriority="high">
      </div>
      <div class="hero-slide">
        <img
          src="/images/hero-worship-alt-1280.jpg"
          srcset="/images/hero-worship-alt-800.jpg 800w, /images/hero-worship-alt-1280.jpg 1280w, /images/hero-worship-alt-1920.jpg 1920w, /images/hero-worship-alt.jpg 2000w"
          sizes="100vw"
          alt="" role="presentation" loading="lazy">
      </div>
      <div class="hero-slide">
        <img
          src="/images/hero-worship-3-1280.jpg"
          srcset="/images/hero-worship-3-800.jpg 800w, /images/hero-worship-3-1280.jpg 1280w, /images/hero-worship-3-1920.jpg 1920w, /images/hero-worship-3.jpg 2000w"
          sizes="100vw"
          alt="" role="presentation" loading="lazy">
      </div>
    </div>
    <div class="hero-shape" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-inner">
        ${badge(home.hero.eyebrow.value)}
        <h1>${home.hero.heading.map(esc).join("<br>")}</h1>
        <p>${esc(home.hero.body)}</p>
        <div class="hero-actions">
          ${button({ label: home.hero.primaryCta.label, href: home.hero.primaryCta.href, variant: "accent", size: "lg" })}
          ${button({ label: home.hero.secondaryCta.label, href: home.hero.secondaryCta.href, variant: "outline", size: "lg", icon: "play" })}
        </div>
      </div>
    </div>
  </section>

  <section class="reveal">
    <div class="container">
      <div class="split">
        <div class="split-media">
          <div class="split-portrait"><img src="${home.welcome.image}" alt="A minister leading worship at Heralds International Christian Centre" width="420" height="420"></div>
          <div class="split-ring" aria-hidden="true"></div>
        </div>
        <div class="split-copy">
          ${badge(home.welcome.badge)}
          <h2>${home.welcome.heading.map(esc).join("<br>")}</h2>
          <p>${esc(home.welcome.body)}</p>
          <p class="highlight">${esc(home.welcome.highlight)}</p>
          ${button({ label: home.welcome.cta.label, href: home.welcome.cta.href, variant: "outline", icon: "arrow-right" })}
        </div>
      </div>
    </div>
  </section>

  <section class="bg-mist reveal">
    <div class="container">
      ${sectionHeading({ badgeText: home.experience.badge, heading: home.experience.heading, body: home.experience.body, accen: 1 })}
      <div class="experience-grid">
        ${home.experience.cards
          .map((c) => {
            if (c.image) {
              return `
              <article class="exp-card has-media">
                <div class="exp-card-media"><img src="${c.image}" alt="" loading="lazy"></div>
                <div class="exp-card-content">
                  <h3>${esc(c.title)}</h3>
                  <p>${esc(c.body)}</p>
                  ${button({ label: c.cta.label, href: c.cta.href, variant: "accent", size: "sm", icon: c.cta.icon })}
                </div>
              </article>`;
            }
            const variant = c.style === "navy" ? "exp-card-navy" : c.style === "accent" ? "exp-card-accent" : "exp-card-light";
            return `
            <article class="exp-card ${variant}">
              <div>
                <h3>${esc(c.title)}</h3>
                <p>${esc(c.body)}</p>
              </div>
              ${button({ label: c.cta.label, href: c.cta.href, variant: c.style === "light" ? "primary" : "outline-light", size: "sm", icon: c.cta.icon })}
            </article>`;
          })
          .join("")}
      </div>
    </div>
  </section>

  <section class="reveal">
    <div class="container">
      <div class="sermon-panel">
        <div class="sermon-copy">
          ${badge(home.sermon.eyebrow)}
          <h2>${esc(home.sermon.heading)}</h2>
          <p>${esc(home.sermon.body)}</p>
          ${button({ label: home.sermon.cta.label, href: home.sermon.cta.href, variant: "accent", icon: "arrow-right" })}
        </div>
        <div class="sermon-video">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${site.highlightVideoId}"
            title="Latest highlight from Heralds International Christian Centre"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-mist reveal">
    <div class="container">
      ${sectionHeading({ badgeText: home.events.badge, heading: home.events.heading, body: home.events.body, accent: 1 })}
      ${
        events.upcoming.length
          ? `<div class="event-grid">${events.upcoming.map(eventCard).join("")}</div>`
          : emptyState({ icon: "calendar", heading: events.emptyState.heading, body: events.emptyState.body })
      }
      <div style="text-align:center;margin-top:40px">${button({ label: home.events.cta.label, href: home.events.cta.href, variant: "primary" })}</div>
    </div>
  </section>

  <section class="reveal">
    <div class="container">
      <div class="testimony-section">
        <div class="testimony-media"><img src="/images/testimony-portrait.jpg" alt="A member worshipping at Heralds International Christian Centre" loading="lazy"></div>
        <div class="testimony-copy">
          ${icon("quote", "testimony-quote-icon")}
          ${badge(home.testimony.badge)}
          <h2>${esc(home.testimony.heading)}</h2>
          <p>${esc(home.testimony.body)}</p>
          ${button({ label: home.testimony.cta.label, href: home.testimony.cta.href, variant: "accent", icon: "arrow-right" })}
        </div>
      </div>
    </div>
  </section>

  <section class="bg-navy reveal">
    <div class="container">
      ${sectionHeading({ badgeText: home.ministries.badge, heading: home.ministries.heading, body: home.ministries.body, accent: 1 })}
      <div class="ministry-grid">
        ${ministries.slice(0, 6).map((m) => ministryCard(m, m.image ? "panel" : "navy")).join("")}
      </div>
      <div style="text-align:center;margin-top:40px">${button({ label: home.ministries.cta.label, href: home.ministries.cta.href, variant: "accent" })}</div>
    </div>
  </section>

  <section class="reveal">
    <div class="container">
      ${sectionHeading({ badgeText: home.blog.badge, heading: home.blog.heading, align: "center" })}
      <div class="blog-grid">
        ${articles.map(blogCard).join("")}
      </div>
      <div style="text-align:center;margin-top:40px">${button({ label: home.blog.cta.label, href: home.blog.cta.href, variant: "outline" })}</div>
    </div>
  </section>
  `;
  return page({
    title: "Home",
    path: "/",
    bodyHtml: shell(main, "/"),
  });
}

// ===========================================================================
// ABOUT
// ===========================================================================
export function aboutPage() {
  const main = `
  ${pageHero({ badgeText: about.hero.badge, heading: about.hero.heading, body: about.hero.body })}
  <section class="reveal">
    <div class="container">
      <div class="split">
        <div class="split-copy">
          <h2>${esc(about.mission.heading)}</h2>
          <p>${esc(about.mission.body)}</p>
        </div>
        <div class="split-media">
          <div class="split-portrait"><img src="/images/welcome-portrait.jpg" alt="A moment of prayer at Heralds International Christian Centre" width="420" height="420"></div>
          <div class="split-ring" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-mist reveal">
    <div class="container">
      ${sectionHeading({ badgeText: "What We Stand On", heading: "Our Core Values" })}
      <div class="values-grid">
        ${about.values.map((v) => `<div class="value-card"><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="reveal" id="visit">
    <div class="container">
      <div class="split reverse">
        <div class="split-copy">
          ${badge("Plan Your Visit")}
          <h2>${esc(about.visit.heading)}</h2>
          <p>${esc(about.visit.body)}</p>
          <div class="info-grid" style="grid-template-columns:1fr;margin-top:24px">
            <div class="info-card">
              <h4>${icon("map-pin")}Address</h4>
              <p>${site.address.line1}<br>${site.address.line2}<br>${site.address.line3}<br>${site.address.line4}</p>
            </div>
            <div class="info-card">
              <h4>${icon("clock")}Service Times</h4>
              <p>${esc(about.visit.serviceTimes.value)}</p>
            </div>
          </div>
        </div>
        <div class="split-media">
          <div class="map-frame">
            <iframe title="Map to Heralds International Christian Centre, Ibadan" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed"></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-navy reveal" id="membership">
    <div class="container" style="text-align:center;max-width:640px">
      <h2>${esc(about.membership.heading)}</h2>
      <p>${esc(about.membership.body)}</p>
      ${button({ label: about.membership.cta.label, href: about.membership.cta.href, variant: "accent" })}
    </div>
  </section>
  `;
  return page({
    title: "Who We Are",
    description: about.hero.body,
    path: "/about.html",
    bodyHtml: shell(main, "/about.html"),
  });
}

// ===========================================================================
// MEMBERSHIP
// ===========================================================================
export function membershipPage() {
  const main = `
  ${pageHero({ badgeText: membership.hero.badge, heading: membership.hero.heading, body: membership.hero.body, image: "/images/hero-worship-3.jpg" })}

  <section class="reveal" id="journey">
    <div class="container">
      ${sectionHeading({ badgeText: membership.journey.badge, heading: membership.journey.heading, body: membership.journey.body })}
      <div class="journey-track">
        ${membership.journey.steps
          .map(
            (s, i) => `
        <div class="journey-step">
          <div class="journey-step-num">${esc(s.step)}</div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
        </div>${i < membership.journey.steps.length - 1 ? '<div class="journey-connector" aria-hidden="true"></div>' : ""}`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="bg-mist reveal" id="membership">
    <div class="container">
      <div class="value-split">
        <div class="value-split-copy">
          ${badge(membership.value.badge)}
          <h2>${esc(membership.value.heading)}</h2>
          <p>${esc(membership.value.body)}</p>
          <ul class="value-bullets">
            ${membership.value.bullets.map((b) => `<li>${icon("check", "icon-sm")}<span>${esc(b)}</span></li>`).join("")}
          </ul>
        </div>
        <div class="value-split-card">
          <h3>${esc(membership.value.card.heading)}</h3>
          <p>${esc(membership.value.card.body)}</p>
          ${button({ label: membership.value.card.cta.label, href: membership.value.card.cta.href, variant: "accent" })}
        </div>
      </div>
    </div>
  </section>

  <section class="bg-navy reveal">
    <div class="container" style="text-align:center;max-width:640px">
      <h2>Join Us</h2>
      <p>Sundays: ${esc(site.serviceTimes.value)}</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        ${button({ label: "Watch Online", href: "/watch.html", variant: "outline" })}
        ${button({ label: "Plan Your Visit", href: "/about.html#visit", variant: "accent" })}
      </div>
    </div>
  </section>

  <section class="reveal" id="pastors">
    <div class="container">
      ${sectionHeading({ badgeText: membership.pastors.badge, heading: membership.pastors.heading, body: membership.pastors.body })}
      <div class="pastor-grid">
        ${membership.pastors.list
          .map(
            (p) => `
        <div class="pastor-card">
          <span class="pastor-role">${esc(p.role)}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.bio)}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="bg-mist reveal" id="care">
    <div class="container" style="text-align:center;max-width:640px">
      ${badge(membership.care.badge)}
      <h2>${esc(membership.care.heading)}</h2>
      <p>${esc(membership.care.body)}</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        ${button({ label: membership.care.cta.label, href: membership.care.cta.href, variant: "primary" })}
        ${button({ label: membership.care.secondaryCta.label, href: membership.care.secondaryCta.href, variant: "outline" })}
      </div>
    </div>
  </section>

  <section class="bg-navy reveal">
    <div class="container" style="text-align:center;max-width:640px">
      ${badge(membership.finalCta.badge)}
      <h2>${esc(membership.finalCta.heading)}</h2>
      <p>${esc(membership.finalCta.body)}</p>
      ${button({ label: membership.finalCta.cta.label, href: membership.finalCta.cta.href, variant: "accent" })}
    </div>
  </section>
  `;
  return page({
    title: "Membership",
    description: membership.hero.body,
    path: "/membership.html",
    bodyHtml: shell(main, "/membership.html"),
  });
}

// ===========================================================================
// MINISTRIES
// ===========================================================================
export function ministriesPage() {
  const main = `
  ${pageHero({ badgeText: "Get Involved", heading: "Ministries At Heralds", body: "Every member of the body has a part to play. Explore the ministries that keep our house of faith running — and find where you fit.", image: "/images/hero-worship-alt.jpg" })}
  <section class="reveal">
    <div class="container">
      <div class="ministry-grid">
        ${ministries.map((m) => ministryCard(m, m.image ? "panel" : "panel")).join("")}
      </div>
    </div>
  </section>
  <section class="bg-mist reveal">
    <div class="container" style="text-align:center;max-width:600px">
      ${sectionHeading({ badgeText: "Serve With Us", heading: "Ready To Get Plugged In?", body: "Reach out and we'll help you find the ministry that fits your gifting and season." })}
      ${button({ label: "Contact Us", href: "/contact.html", variant: "primary" })}
    </div>
  </section>
  `;
  return page({
    title: "Ministries",
    description: "Explore the eleven ministries at Heralds International Christian Centre, Ibadan — Teaching, Outreach, Tentmakers, Protocol, Follow Up, Church Care, Multimedia, Music, Admin, Welfare and Young Heralds.",
    path: "/ministries.html",
    bodyHtml: shell(main, "/ministries.html"),
  });
}

// ===========================================================================
// EVENTS
// ===========================================================================
export function eventsPage() {
  const main = `
  ${pageHero({ badgeText: "Stay Connected", heading: "Events At Heralds", body: "Gatherings, conferences and moments of fellowship as a family.", image: "/images/gallery-2.jpg" })}
  <section class="reveal">
    <div class="container">
      ${
        events.upcoming.length
          ? `<div class="event-grid">${events.upcoming.map(eventCard).join("")}</div>`
          : emptyState({ icon: "calendar", heading: events.emptyState.heading, body: events.emptyState.body })
      }
    </div>
  </section>
  <section class="bg-mist reveal">
    <div class="container">
      ${sectionHeading({ badgeText: "Life At Heralds", heading: "Moments From Our Gatherings" })}
      ${galleryStrip(["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg", "/images/fellowship-1.jpg", "/images/fellowship-2.jpg", "/images/testimony-portrait.jpg"])}
    </div>
  </section>
  `;
  return page({
    title: "Events",
    description: "Upcoming events, conferences and gatherings at Heralds International Christian Centre, Ibadan.",
    path: "/events.html",
    bodyHtml: shell(main, "/events.html"),
  });
}

// ===========================================================================
// SERMONS
// ===========================================================================
export function sermonsPage() {
  const main = `
  ${pageHero({ badgeText: "Sermons", heading: "The Word, Ministered", body: "Catch up on messages from Heralds International Christian Centre — sound teaching to build your walk with Christ.", image: "/images/teaching-ministry.jpg" })}
  <section class="reveal">
    <div class="container">
      ${sectionHeading({ badgeText: "Sermon Archive", heading: "Recent Teaching Series", body: "Tap any series below to watch the full teaching on our Telegram channel.", align: "center" })}
      <div class="sermon-archive-grid">
        ${sermons.archive.map((s) => sermonCard(s, sermons.telegramLink)).join("")}
        ${sermonCardMore(sermons.telegramLink)}
      </div>
    </div>
  </section>
  <section class="bg-mist reveal">
    <div class="container" style="text-align:center;max-width:600px">
      ${sectionHeading({ badgeText: "Join Us", heading: "Experience A Service Live", body: "The best way to catch the full weight of a ministration is in the room, or live online." })}
      <div class="cta-row" style="justify-content:center">
        ${button({ label: "Plan Your Visit", href: "/about.html#visit", variant: "primary" })}
        ${button({ label: "Watch Online", href: "/watch.html", variant: "outline", icon: "play" })}
      </div>
    </div>
  </section>
  `;
  return page({
    title: "Sermons",
    description: "Watch and catch up on sermons and ministrations from Heralds International Christian Centre, Ibadan.",
    path: "/sermons.html",
    bodyHtml: shell(main, "/sermons.html"),
  });
}

// ===========================================================================
// WATCH / LIVESTREAM
// ===========================================================================
export function watchPage() {
  const main = `
  ${pageHero({ badgeText: "Online Church", heading: "Watch Live", body: "Join our online community and worship with us from wherever you are.", image: "/images/multimedia-ministry.jpg" })}
  <section class="reveal">
    <div class="container">
      <div class="sermon-video" style="border-radius:var(--radius-lg);max-width:900px;margin:0 auto">
        ${emptyState({ icon: "play", heading: "We Stream Live On Telegram", body: "Join the Heralds Ibadan Telegram channel to worship with us live at every service, and to catch up on past ministrations." })}
      </div>
      <div style="text-align:center;margin-top:32px;display:flex;flex-wrap:wrap;gap:16px;justify-content:center">
        ${button({ label: "Join Us Live On Telegram", href: site.social.telegram.value, variant: "accent", icon: "arrow-up-right", external: true })}
        ${button({ label: "Plan Your Visit Instead", href: "/about.html#visit", variant: "outline" })}
      </div>
    </div>
  </section>
  `;
  return page({
    title: "Watch Online",
    description: "Watch Heralds International Christian Centre online — join our online worship community from wherever you are.",
    path: "/watch.html",
    bodyHtml: shell(main, "/watch.html"),
  });
}

// ===========================================================================
// BLOG INDEX + ARTICLE
// ===========================================================================
export function blogIndexPage() {
  const main = `
  ${pageHero({ badgeText: "Articles", heading: "From Our Blog", body: "Reflections on discipleship, community and life as a Herald." })}
  <section class="reveal">
    <div class="container">
      <div class="blog-grid">${articles.map(blogCard).join("")}</div>
    </div>
  </section>
  `;
  return page({
    title: "Articles",
    description: "Articles and devotional reflections from Heralds International Christian Centre, Ibadan.",
    path: "/blog.html",
    bodyHtml: shell(main, "/blog.html"),
  });
}

export function articlePage(a) {
  const idx = articles.findIndex((x) => x.slug === a.slug);
  const related = articles.filter((_, i) => i !== idx).slice(0, 2);
  const main = `
  ${pageHero({ small: true, badgeText: a.category, heading: a.title })}
  <section class="reveal">
    <div class="container">
      <div class="article-hero-image"><img src="${a.image}" alt="" loading="lazy"></div>
      <div class="article-body">
        ${a.body.map((p) => `<p>${esc(p)}</p>`).join("")}
      </div>
      <div style="text-align:center;margin-top:48px">${button({ label: "Back To All Articles", href: "/blog.html", variant: "outline", icon: "arrow-right" })}</div>
    </div>
  </section>
  ${
    related.length
      ? `<section class="bg-mist reveal"><div class="container">${sectionHeading({ badgeText: "Keep Reading", heading: "More Articles" })}<div class="blog-grid">${related.map(blogCard).join("")}</div></div></section>`
      : ""
  }
  `;
  return page({
    title: a.title,
    description: a.excerpt,
    path: `/blog/${a.slug}.html`,
    ogImage: a.image,
    bodyHtml: shell(main, "/blog.html"),
  });
}

// ===========================================================================
// GIVE
// ===========================================================================
export function givePage() {
  const main = `
  ${pageHero({ badgeText: "Giving", heading: "Give", body: "Your giving fuels discipleship, outreach and the work of the Gospel through Heralds International Christian Centre.", image: "/images/give-banner.jpg" })}
  <section class="reveal">
    <div class="container">
      <div class="give-grid">
        <div class="give-card">
          <h3>${icon("gift")}In-Person Giving</h3>
          <p>You're welcome to give during any of our gatherings at HeraldsNation Ibadan — offering and tithe baskets are available at every service.</p>
        </div>
        <div class="give-card">
          <h3>${icon("briefcase")}Bank Transfer Giving</h3>
          ${giving.bankAccounts
            .map(
              (a) => `
          <div class="give-account">
            <span class="give-account-purpose">${esc(a.purpose)}</span>
            <p class="give-account-name">${esc(a.accountName)}</p>
            <p class="give-account-details">${esc(a.accountNumber)} &middot; ${esc(a.bank)}</p>
          </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="empty-state" style="margin-top:24px">
        <span class="empty-state-icon">${icon("check-circle", "icon-lg")}</span>
        <h3>Online Giving Is Coming Soon</h3>
        <p>We're setting up secure card-based online giving. In the meantime, please give via bank transfer above, in person, or reach out via our Contact page.</p>
      </div>
    </div>
  </section>
  `;
  return page({
    title: "Give",
    description: "Support the work of Heralds International Christian Centre, Ibadan through giving.",
    path: "/give.html",
    bodyHtml: shell(main, "/give.html"),
  });
}

// ===========================================================================
// CONTACT
// ===========================================================================
export function contactPage() {
  const fields =
    textField({ id: "c-name", name: "name", label: "Full Name" }) +
    textField({ id: "c-email", name: "email", label: "Email Address", type: "email" }) +
    textField({ id: "c-phone", name: "phone", label: "Phone Number", type: "tel", required: false }) +
    textArea({ id: "c-message", name: "message", label: "Message" });

  const main = `
  ${pageHero({ badgeText: "Contact", heading: "Get In Touch", body: "Have a question, or want to connect with the Heralds family? Reach out — we'd love to hear from you.", image: "/images/contact-banner.jpg" })}
  <section class="reveal">
    <div class="container">
      <div class="split">
        <div>
          ${formWrapper({ name: "contact", fieldsHtml: fields, submitLabel: "Send Message", successMessage: "Thank you — your message has been received. We'll get back to you soon." })}
        </div>
        <div class="split-copy">
          <div class="info-grid" style="grid-template-columns:1fr">
            <div class="info-card"><h4>${icon("map-pin")}Address</h4><p>${site.address.line1}<br>${site.address.line2}<br>${site.address.line3}<br>${site.address.line4}</p></div>
            <div class="info-card"><h4>${icon("mail")}Email</h4><p><a href="mailto:${site.contact.email.value}">${esc(site.contact.email.value)}</a></p></div>
            <div class="info-card"><h4>${icon("phone")}Phone</h4><p>${site.contact.phone.numbers.map((n) => `<a href="tel:${n.raw}">${esc(n.display)}</a>`).join(" &middot; ")}</p></div>
            <div class="info-card"><h4>${icon("clock")}Service Times</h4><p>${esc(site.serviceTimes.value)}</p></div>
          </div>
        </div>
      </div>
      <div class="map-frame" style="margin-top:56px">
        <iframe title="Map to Heralds International Christian Centre, Ibadan" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed"></iframe>
      </div>
    </div>
  </section>
  `;
  return page({
    title: "Contact Us",
    description: "Get in touch with Heralds International Christian Centre, Ibadan.",
    path: "/contact.html",
    bodyHtml: shell(main, "/contact.html"),
  });
}

// ===========================================================================
// PRAYER REQUEST
// ===========================================================================
export function prayerPage() {
  const fields =
    textField({ id: "p-name", name: "name", label: "Full Name" }) +
    textField({ id: "p-email", name: "email", label: "Email Address", type: "email" }) +
    selectField({ id: "p-type", name: "type", label: "This Request Is", options: ["Personal", "Family", "Health", "Provision", "Other"] }) +
    textArea({ id: "p-request", name: "request", label: "Your Prayer Request" });

  const main = `
  ${pageHero({ badgeText: "Prayer", heading: "Prayer Request", body: "We believe in the power of praying together. Share your request and our prayer team will stand in faith with you.", image: "/images/prayer-banner.jpg" })}
  <section class="reveal">
    <div class="container" style="max-width:720px">
      ${formWrapper({ name: "prayer", fieldsHtml: fields, submitLabel: "Submit Prayer Request", successMessage: "Thank you — your prayer request has been received. We're standing in faith with you." })}
    </div>
  </section>
  `;
  return page({
    title: "Prayer Request",
    description: "Submit a prayer request to Heralds International Christian Centre, Ibadan.",
    path: "/prayer.html",
    bodyHtml: shell(main, "/prayer.html"),
  });
}

// ===========================================================================
// TESTIMONY
// ===========================================================================
export function testimonyPage() {
  const fields =
    textField({ id: "t-name", name: "name", label: "Full Name" }) +
    textField({ id: "t-email", name: "email", label: "Email Address", type: "email" }) +
    selectField({ id: "t-where", name: "where", label: "You Worship With Us", options: ["In Person at HeraldsNation Ibadan", "Online"] }) +
    textArea({ id: "t-story", name: "story", label: "Your Testimony", rows: 7 });

  const main = `
  ${pageHero({ badgeText: "Testimony", heading: "Your Story Of His Faithfulness", body: "Tell us how God has moved in your life — a healing, a breakthrough, a quiet answer to prayer." })}
  <section class="reveal">
    <div class="container" style="max-width:720px">
      ${formWrapper({ name: "testimony", fieldsHtml: fields, submitLabel: "Share My Testimony", successMessage: "Thank you for sharing what God has done — we're rejoicing with you!" })}
    </div>
  </section>
  `;
  return page({
    title: "Share Your Testimony",
    description: "Share your testimony of God's faithfulness with the Heralds International Christian Centre family.",
    path: "/testimony.html",
    bodyHtml: shell(main, "/testimony.html"),
  });
}

// ===========================================================================
// SEARCH
// ===========================================================================
export function searchPage() {
  const main = `
  ${pageHero({ small: true, badgeText: "Search", heading: "Search Heralds International Christian Centre" })}
  <section class="reveal">
    <div class="container">
      <div class="search-box">
        ${icon("search")}
        <input type="search" id="search-input" placeholder="Search pages, ministries, articles..." aria-label="Search">
      </div>
      <div id="search-results"></div>
    </div>
  </section>
  `;
  return page({
    title: "Search",
    path: "/search.html",
    bodyHtml: shell(main, "/search.html") + `<script src="/js/search.js" defer></script>`,
  });
}

// ===========================================================================
// LEGAL
// ===========================================================================
export function privacyPage() {
  const main = `
  ${pageHero({ small: true, heading: legal.privacy.heading })}
  <section class="reveal"><div class="container article-body">
    <p><em>${esc(legal.privacy.updated)}</em></p>
    ${legal.privacy.body.map((p) => `<p>${esc(p)}</p>`).join("")}
  </div></section>`;
  return page({ title: legal.privacy.heading, path: "/privacy-policy.html", bodyHtml: shell(main, "") });
}

export function termsPage() {
  const main = `
  ${pageHero({ small: true, heading: legal.terms.heading })}
  <section class="reveal"><div class="container article-body">
    <p><em>${esc(legal.terms.updated)}</em></p>
    ${legal.terms.body.map((p) => `<p>${esc(p)}</p>`).join("")}
  </div></section>`;
  return page({ title: legal.terms.heading, path: "/terms.html", bodyHtml: shell(main, "") });
}

// ===========================================================================
// 404
// ===========================================================================
export function notFoundPage() {
  const main = `
  ${header("")}
  <main id="main-content">
    <div class="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or may have moved.</p>
      ${button({ label: "Back To Home", href: "/", variant: "primary" })}
    </div>
  </main>
  ${footer()}`;
  return page({ title: "Page Not Found", path: "/404.html", bodyHtml: main });
}
