import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  homePage,
  aboutPage,
  ministriesPage,
  eventsPage,
  sermonsPage,
  watchPage,
  blogIndexPage,
  articlePage,
  givePage,
  contactPage,
  prayerPage,
  testimonyPage,
  searchPage,
  privacyPage,
  termsPage,
  notFoundPage,
} from "./pages.mjs";
import { site, articles, ministries } from "./content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

// Rewrites root-absolute local links/assets ("/css/main.css", "/about.html")
// into paths relative to the page being written ("css/main.css", "../about.html")
// so the site also works opened straight off disk (file://), not only when
// served from a domain root. External/absolute URLs (http(s):, mailto:, tel:,
// //cdn...) and the canonical/OG tags (already full https://... URLs) are left
// untouched.
function toRelative(html, pagePath) {
  const depth = pagePath.split("/").filter(Boolean).length - 1; // /blog/x.html -> 1
  const prefix = depth > 0 ? "../".repeat(depth) : "";

  const rewriteOne = (val) => {
    if (!val || val.startsWith("//")) return val; // protocol-relative external, leave alone
    const target = val === "/" ? "index.html" : val.slice(1);
    return `${prefix}${target}`;
  };

  let out = html;

  // href="/..." / src="/..."
  out = out.replace(/(href|src)="(\/[^"]*)"/g, (m, attr, val) => `${attr}="${rewriteOne(val)}"`);

  // srcset="/a.jpg 800w, /b.jpg 1280w, ..."
  out = out.replace(/srcset="([^"]*)"/g, (m, list) => {
    const rewritten = list
      .split(",")
      .map((part) => {
        const trimmed = part.trim();
        const spaceIdx = trimmed.indexOf(" ");
        const url = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
        const descriptor = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx);
        if (!url.startsWith("/")) return trimmed;
        return `${rewriteOne(url)}${descriptor}`;
      })
      .join(", ");
    return `srcset="${rewritten}"`;
  });

  // inline style="...url('/images/x.jpg')..." (e.g. the --hero-image custom property)
  out = out.replace(/url\((['"]?)(\/[^'")]*)\1\)/g, (m, quote, val) => `url(${quote}${rewriteOne(val)}${quote})`);

  return out;
}

function write(relPath, html) {
  const full = path.join(PUBLIC, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, toRelative(html, relPath), "utf8");
  console.log("wrote", relPath);
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------
const routes = [
  { path: "/index.html", html: homePage() },
  { path: "/about.html", html: aboutPage() },
  { path: "/ministries.html", html: ministriesPage() },
  { path: "/events.html", html: eventsPage() },
  { path: "/sermons.html", html: sermonsPage() },
  { path: "/watch.html", html: watchPage() },
  { path: "/blog.html", html: blogIndexPage() },
  { path: "/give.html", html: givePage() },
  { path: "/contact.html", html: contactPage() },
  { path: "/prayer.html", html: prayerPage() },
  { path: "/testimony.html", html: testimonyPage() },
  { path: "/search.html", html: searchPage() },
  { path: "/privacy-policy.html", html: privacyPage() },
  { path: "/terms.html", html: termsPage() },
  { path: "/404.html", html: notFoundPage() },
];

articles.forEach((a) => {
  routes.push({ path: `/blog/${a.slug}.html`, html: articlePage(a) });
});

routes.forEach((r) => write(r.path, r.html));

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------
const sitemapPaths = routes
  .map((r) => r.path.replace(/index\.html$/, ""))
  .filter((p) => p !== "/404.html" && p !== "");
sitemapPaths.unshift("/");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(sitemapPaths)]
  .map(
    (p) => `  <url>
    <loc>${site.url}${p === "/" ? "/" : p}</loc>
    <changefreq>${p === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${p === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap, "utf8");
console.log("wrote sitemap.xml");

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------
const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
fs.writeFileSync(path.join(PUBLIC, "robots.txt"), robots, "utf8");
console.log("wrote robots.txt");

// ---------------------------------------------------------------------------
// site.webmanifest
// ---------------------------------------------------------------------------
const manifest = {
  name: site.name,
  short_name: site.shortName,
  start_url: "/",
  display: "standalone",
  background_color: "#101E6D",
  theme_color: "#101E6D",
  icons: [
    { src: "images/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "images/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
};
fs.writeFileSync(path.join(PUBLIC, "site.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");
console.log("wrote site.webmanifest");

// ---------------------------------------------------------------------------
// search-index.json (used by /search.html + js/search.js)
// ---------------------------------------------------------------------------
const searchIndex = [
  { title: "Home", url: "/", excerpt: site.metaDescription, tag: "Page" },
  { title: "Who We Are", url: "/about.html", excerpt: "Learn about Heralds International Christian Centre, our mission and our emphasis on discipleship.", tag: "Page" },
  { title: "Ministries", url: "/ministries.html", excerpt: "Explore the ministries at Heralds and find where you fit.", tag: "Page" },
  { title: "Events", url: "/events.html", excerpt: "Gatherings and moments of fellowship at Heralds.", tag: "Page" },
  { title: "Sermons", url: "/sermons.html", excerpt: "Catch up on messages from Heralds International Christian Centre.", tag: "Page" },
  { title: "Watch Online", url: "/watch.html", excerpt: "Join our online worship community.", tag: "Page" },
  { title: "Give", url: "/give.html", excerpt: "Support the work of Heralds International Christian Centre.", tag: "Page" },
  { title: "Contact Us", url: "/contact.html", excerpt: "Get in touch with Heralds International Christian Centre.", tag: "Page" },
  { title: "Prayer Request", url: "/prayer.html", excerpt: "Submit a prayer request to our prayer team.", tag: "Page" },
  { title: "Share Your Testimony", url: "/testimony.html", excerpt: "Tell us how God has moved in your life.", tag: "Page" },
  ...ministries.map((m) => ({ title: m.name + " Ministry", url: "/ministries.html#" + m.slug, excerpt: m.short, tag: "Ministry" })),
  ...articles.map((a) => ({ title: a.title, url: `/blog/${a.slug}.html`, excerpt: a.excerpt, tag: "Article" })),
];
// search.html lives at the site root, so its result links are root-relative
// (no leading "/") — this also lets the results work when the site is opened
// straight off disk rather than through a server.
const searchIndexRelative = searchIndex.map((item) => ({
  ...item,
  url: item.url === "/" ? "index.html" : item.url.replace(/^\//, ""),
}));
fs.writeFileSync(path.join(PUBLIC, "search-index.json"), JSON.stringify(searchIndexRelative, null, 2), "utf8");
console.log("wrote search-index.json");

console.log(`\nBuild complete: ${routes.length} pages.`);
