import { site } from "./content.mjs";

export function page({
  title,
  description,
  path = "/",
  ogImage = "/images/og-default.jpg",
  bodyHtml,
  jsonLd = null,
  bodyClass = "",
}) {
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} | ${site.tagline}`;
  const url = `${site.url}${path}`;
  const desc = description || site.metaDescription;

  const jsonLdBlocks = [organizationJsonLd(), jsonLd].filter(Boolean);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">

<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#101E6D">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${fullTitle}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${site.url}${ogImage}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/main.css">
<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>
${jsonLdBlocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n")}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main-content">Skip to content</a>
${bodyHtml}
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    alternateName: site.abbr,
    url: site.url,
    logo: `${site.url}/images/logo-heralds.png`,
    image: `${site.url}/images/og-default.jpg`,
    description: site.metaDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 1, Asande House, Alarere Layout, Off Lagos-Ibadan Expressway, Iwo Road",
      addressLocality: "Ibadan",
      addressRegion: "Oyo State",
      addressCountry: "NG",
    },
    telephone: site.contact.phone.isPlaceholder ? undefined : site.contact.phone.numbers[0].raw,
    email: site.contact.email.isPlaceholder ? undefined : site.contact.email.value,
    sameAs: Object.values(site.social)
      .filter((s) => !s.isPlaceholder)
      .map((s) => s.value),
  };
}
