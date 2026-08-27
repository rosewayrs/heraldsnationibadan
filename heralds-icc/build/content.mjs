// Central content store for the Heralds International Christian Centre website.
// Facts not supplied by the organization (service times, staff names, contact
// details, history/dates) are marked isPlaceholder so templates can render
// them in a clearly-flagged, easily-findable way instead of inventing facts.

export const site = {
  name: "Heralds International Christian Centre",
  shortName: "Heralds",
  abbr: "HICC",
  locationName: "Heralds International Christian Centre, Ibadan",
  tagline: "Raising Effective Ministers of the Word",
  description:
    "Heralds International Christian Centre, Ibadan is a local assembly where believers find a family and are trained to be effective ministers of the Word — standing and representing all that Christ is, and impacting the world by ruling and reigning in natural affairs.",
  metaDescription:
    "Heralds International Christian Centre (HICC), Ibadan is a family of believers built on discipleship, love, faith and the supernatural. Join us in person or online in Ibadan, Oyo State.",
  url: "https://www.heraldsibadan.org", // placeholder — no live domain yet
  address: {
    line1: "HeraldsNation Ibadan",
    line2: "No. 1, Asande House, Alarere Layout,",
    line3: "Off Lagos–Ibadan Expressway, Iwo Road,",
    line4: "Ibadan, Oyo State, Nigeria",
    full: "HeraldsNation Ibadan, No. 1, Asande House, Alarere Layout, Off Lagos-Ibadan Expressway, Iwo Road, Ibadan, Oyo State",
  },
  contact: {
    email: { value: "To be confirmed", isPlaceholder: true },
    phone: { value: "To be confirmed", isPlaceholder: true },
  },
  serviceTimes: { value: "Sundays: 9:00AM · Thursdays: 5:30PM", isPlaceholder: false },
  social: {
    instagram: { value: "#", isPlaceholder: true },
    facebook: { value: "#", isPlaceholder: true },
    tiktok: { value: "#", isPlaceholder: true },
    youtube: { value: "#", isPlaceholder: true },
    telegram: { value: "https://t.me/heraldsibadan", isPlaceholder: false },
  },
  // The channel where services are streamed live — used for every "join us
  // live" / "watch online" call to action across the site.
  liveTelegram: "https://t.me/heraldsibadan",
  // Latest highlight video featured on the homepage sermon panel.
  highlightVideoId: "Fs1B4d_3oMU",
};

export const nav = {
  primary: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/about.html" },
    { label: "Ministries", href: "/ministries.html" },
    { label: "Sermons", href: "/sermons.html" },
    { label: "Events", href: "/events.html" },
    { label: "Articles", href: "/blog.html" },
    { label: "Give", href: "/give.html" },
  ],
  utility: [
    { label: "Watch Online", href: "/watch.html", icon: "play" },
  ],
  cta: { label: "Plan Your Visit", href: "/about.html#visit" },
};

export const footerLinks = {
  quick: [
    { label: "Who We Are", href: "/about.html" },
    { label: "Ministries", href: "/ministries.html" },
    { label: "Give", href: "/give.html" },
    { label: "Share your Testimony", href: "/testimony.html" },
    { label: "Prayer Request", href: "/prayer.html" },
    { label: "Events", href: "/events.html" },
    { label: "Articles", href: "/blog.html" },
  ],
  media: [
    { label: "Watch Live", href: "/watch.html" },
    { label: "Sermons", href: "/sermons.html" },
    { label: "Search", href: "/search.html" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy.html" },
    { label: "Terms and Conditions", href: "/terms.html" },
  ],
};

// ---------------------------------------------------------------------------
// Ministries — 11 supplied departments. Descriptions are written from the
// normal function such a department serves in local-church life; no specific
// programs, leaders or statistics are invented.
// ---------------------------------------------------------------------------
export const ministries = [
  {
    slug: "teaching",
    name: "Teaching",
    short: "Sound doctrine, taught clearly and lived out.",
    description:
      "The Teaching ministry exists to make the Word of God plain — through Sunday ministrations, classes and discipleship materials that build believers on sound doctrine. Its aim is simple: every Herald should know what they believe, why they believe it, and how to live it.",
    icon: "book-open",
    image: "/images/teaching-ministry.jpg",
  },
  {
    slug: "outreach",
    name: "Outreach",
    short: "Taking the Gospel beyond the four walls.",
    description:
      "Outreach carries the good news of Christ into our streets, campuses and community — through evangelism, community engagement and practical acts of love that open doors for the Gospel in Ibadan and beyond.",
    icon: "megaphone",
    image: "/images/outreach-ministry.jpg",
  },
  {
    slug: "tentmakers",
    name: "Tentmakers",
    short: "Serving faithfully in the marketplace for Christ.",
    description:
      "Tentmakers equips working believers to see their careers, trades and businesses as platforms for ministry — representing Christ with excellence and integrity in the marketplace, just as Paul made tents while he preached.",
    icon: "briefcase",
    image: null,
  },
  {
    slug: "protocol",
    name: "Protocol",
    short: "Order and honour in the house of God.",
    description:
      "Protocol coordinates ushering, hospitality and the smooth flow of every gathering — creating an atmosphere where guests feel welcomed, service runs with order, and God is honoured in every detail.",
    icon: "shield-check",
    image: null,
  },
  {
    slug: "follow-up",
    name: "Follow Up",
    short: "No one walks the journey of faith alone.",
    description:
      "Follow Up reaches out to new believers and first-time guests, walking with them in the early steps of their journey with Christ and connecting them into the life and family of the church.",
    icon: "hands",
    image: null,
  },
  {
    slug: "church-care",
    name: "Church Care",
    short: "Watching over the wellbeing of the family.",
    description:
      "Church Care looks after the practical and pastoral wellbeing of the congregation — checking in on members, visiting the sick and reaching out in seasons of need, so that no one in the Heralds family is forgotten.",
    icon: "heart",
    image: null,
  },
  {
    slug: "multimedia",
    name: "Multimedia",
    short: "Telling the story with excellence.",
    description:
      "Multimedia handles sound, visuals, livestream and content — serving every gathering with excellence so the message is seen and heard clearly, both in the auditorium and by those joining online.",
    icon: "camera",
    image: "/images/multimedia-ministry.jpg",
  },
  {
    slug: "music",
    name: "Music",
    short: "Leading the family into the presence of God.",
    description:
      "The Music ministry leads the congregation in worship — creating an atmosphere for the presence of God through song, so that every gathering begins in praise and ends in encounter.",
    icon: "music",
    image: "/images/music-ministry.jpg",
  },
  {
    slug: "admin",
    name: "Admin",
    short: "Stewarding the work of the church with excellence.",
    description:
      "Admin manages the administrative and organisational backbone of church life — records, planning and coordination — so that ministry runs in order and every other department is well supported.",
    icon: "clipboard",
    image: null,
  },
  {
    slug: "welfare",
    name: "Welfare",
    short: "Practical love in tangible ways.",
    description:
      "Welfare extends practical, tangible support to members of the church family — expressing the love of Christ not only in word, but in deed, to those going through need or hardship.",
    icon: "gift",
    image: null,
  },
  {
    slug: "young-heralds",
    name: "Young Heralds",
    short: "Raising the next generation of ministers.",
    description:
      "Young Heralds nurtures children and younger members of the church family in the things of God — building a firm, joyful foundation of faith early, so that the next generation grows up as effective ministers of the Word.",
    icon: "sparkles",
    image: null,
  },
];

// ---------------------------------------------------------------------------
// Homepage copy
// ---------------------------------------------------------------------------
export const home = {
  hero: {
    eyebrow: site.serviceTimes,
    heading: ["Raising Heralds,", "Making Disciples"],
    body: "A family of believers in Ibadan, trained to be effective ministers of the Word — standing for all that Christ is, in an atmosphere of love, faith and the supernatural.",
    primaryCta: { label: "Plan Your Visit", href: "/about.html#visit" },
    secondaryCta: { label: "Watch Online", href: "/watch.html", icon: "play" },
  },
  welcome: {
    badge: "Who We Are",
    heading: ["Welcome To", "Heralds International Christian Centre"],
    body: "We are a local assembly where believers find a family and are trained to be effective ministers of the Word — standing and representing all that Christ is, and impacting the world by ruling and reigning in natural affairs. We do this in an atmosphere of love, faith and the supernatural.",
    highlight: "Our strong emphasis is on discipleship — the life of Christianity, and the way Christianity is sustained.",
    cta: { label: "Learn More", href: "/about.html" },
    image: "/images/welcome-portrait.jpg",
  },
  experience: {
    badge: "Are you a first-time visitor?",
    heading: ["Find The Right Way", "To Connect"],
    body: "However you meet us first — in the room or on a screen — we want you to find a family here.",
    cards: [
      {
        title: "Visit In Person",
        body: "Join us for worship at HeraldsNation, Ibadan and experience the family for yourself.",
        cta: { label: "Get Directions", href: "/about.html#visit" },
        style: "light",
        image: "/images/visit-us-hall.jpg",
      },
      {
        title: "Watch Online",
        body: "Can't join us in the room yet? Worship with our online community from wherever you are.",
        cta: { label: "Watch Now", href: "/watch.html", icon: "play" },
        style: "navy",
      },
      {
        title: "Become a Member",
        body: "Take the next step and become part of the Heralds family, formally and fully.",
        cta: { label: "Join The Family", href: "/about.html#membership" },
        style: "accent",
      },
    ],
  },
  sermon: {
    eyebrow: "Catch Up",
    heading: "Missed A Service?",
    body: "Catch up on the ministration of the Word from our most recent gathering.",
    cta: { label: "Visit Sermon Archive", href: "/sermons.html" },
  },
  events: {
    badge: "Stay Connected",
    heading: ["Life At", "Heralds"],
    body: "A look at moments from our gatherings — worship, ministration and fellowship as a family.",
    cta: { label: "View All Events", href: "/events.html" },
  },
  testimony: {
    badge: "Testimony",
    heading: "Your Story Of His Faithfulness",
    body: "Tell us how God has moved in your life — a breakthrough, an answered prayer, a season turned around. Whether you worship with us in person or online, we want to hear it.",
    cta: { label: "Share Your Testimony", href: "/testimony.html" },
  },
  ministries: {
    badge: "Get Involved",
    heading: ["Find Your Place", "In The Family"],
    body: "Every member of the body has a part to play. Explore our ministries and discover where you fit.",
    cta: { label: "Explore All Ministries", href: "/ministries.html" },
  },
  blog: {
    badge: "Articles",
    heading: "From Our Blog",
    cta: { label: "View All Articles", href: "/blog.html" },
  },
  finalCta: {
    heading: "Ready To Find Your People?",
    body: "We'd love to welcome you to Heralds International Christian Centre — a warm family of love, where you're discipled to walk in all that Christ has called you to be.",
    primaryCta: { label: "Plan Your Visit", href: "/about.html#visit" },
    secondaryCta: { label: "Join The Family", href: "/about.html#membership" },
  },
};

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------
export const about = {
  hero: {
    badge: "Who We Are",
    heading: "Welcome To Heralds International Christian Centre",
    body: site.description,
  },
  mission: {
    heading: "Our Emphasis: Discipleship",
    body: "We believe discipleship is the life of Christianity, and the way Christianity is sustained. At Heralds, we do not simply gather to hear the Word — we are trained, mentored and released to live it: to stand and represent all that Christ is, and to impact the world by ruling and reigning in natural affairs.",
  },
  values: [
    {
      title: "Love",
      body: "Every relationship at Heralds is built in an atmosphere of genuine, practical love — the kind that makes a stranger feel like family.",
    },
    {
      title: "Faith",
      body: "We contend for a life of faith — trusting God's Word above every circumstance, and teaching believers to do the same.",
    },
    {
      title: "The Supernatural",
      body: "We create room for God to move — believing that the supernatural is a normal part of the believer's everyday walk with Christ.",
    },
    {
      title: "Discipleship",
      body: "We are committed to raising effective ministers of the Word, not just attendees — believers equipped to reproduce what they have received.",
    },
  ],
  visit: {
    heading: "Plan Your Visit",
    body: "We'd love to have you join us. Here's where to find us.",
    serviceTimes: site.serviceTimes,
  },
  membership: {
    heading: "Become Part Of The Family",
    body: "Ready to call Heralds home? We'll walk you through what it means to become a member of this local assembly and take your next step in discipleship.",
    cta: { label: "Contact Us", href: "/contact.html" },
  },
};

// ---------------------------------------------------------------------------
// Blog / Articles — original short-form devotional pieces, not news/fact claims.
// ---------------------------------------------------------------------------
export const articles = [
  {
    slug: "why-discipleship-is-the-life-of-christianity",
    title: "Why Discipleship Is The Life Of Christianity",
    excerpt:
      "Christianity was never meant to be received and kept to yourself. From the beginning, the faith has spread one disciple at a time — and that is still how it is sustained today.",
    category: "Discipleship",
    image: "/images/gallery-1.jpg",
    body: [
      "When Jesus gave His final instruction to His followers, He did not tell them to build an audience. He told them to make disciples — to teach others to obey everything He had commanded, and to do it generation after generation.",
      "That is why, at Heralds, discipleship is not a program tucked into a corner of church life. It is the whole point. A believer who only receives is only half-formed. A believer who is trained, corrected, and released to reproduce what they have received becomes a minister of the Word in their own right — able to stand for Christ wherever life places them.",
      "This is what it means to be a Herald: not merely someone who hears the message, but someone who carries it, lives it, and passes it on.",
    ],
  },
  {
    slug: "family-before-audience",
    title: "Family Before Audience",
    excerpt:
      "A church can gather a crowd and still miss the point. At Heralds, we would rather build a family — a place where every person is known, not just counted.",
    category: "Community",
    image: "/images/fellowship-1.jpg",
    body: [
      "There is a difference between an audience and a family. An audience shows up, watches, and leaves the way it came. A family shows up for one another — in the good seasons and the hard ones.",
      "From the very beginning, the church in Scripture looked more like a family than a performance: believers devoted to one another's company, sharing what they had, and carrying one another's burdens.",
      "We want that same atmosphere of love at Heralds International Christian Centre — a place where you are not just another face in the room, but a member of the family, known and cared for.",
    ],
  },
  {
    slug: "ruling-and-reigning-in-natural-affairs",
    title: "Ruling And Reigning In Natural Affairs",
    excerpt:
      "Faith was never meant to stay inside the four walls of the church. As believers, we are called to represent Christ everywhere — in our homes, our work, and our everyday decisions.",
    category: "Discipleship",
    image: "/images/gallery-3.jpg",
    body: [
      "Scripture describes believers as a royal priesthood — people positioned to reign in life through Christ. That is not a call reserved for a select few; it is the everyday inheritance of every disciple.",
      "At Heralds, part of what we mean by 'impacting the world by ruling and reigning in natural affairs' is this: your faith should show up in how you run your business, raise your family, treat your neighbours, and carry yourself at work — not only in how you behave on a Sunday.",
      "Discipleship trains us for exactly this — to represent all that Christ is, everywhere we go.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Events — no confirmed events supplied; page is built with a clear "no
// upcoming events yet" state plus a structure ready for future entries.
// ---------------------------------------------------------------------------
export const events = {
  upcoming: [],
  emptyState: {
    heading: "No Upcoming Events Right Now",
    body: "We don't have an event on the calendar at this moment — check back soon, or follow our social pages for the latest updates.",
  },
};

// ---------------------------------------------------------------------------
// Sermons — placeholder structure ready for real messages to be added later.
// ---------------------------------------------------------------------------
export const sermons = {
  emptyState: {
    heading: "Our Sermon Archive Is Coming Soon",
    body: "We're building out our library of past ministrations. In the meantime, join us live for the full experience of a service at Heralds.",
  },
  // Real teaching-series flyers from the church's Telegram channel. Order is
  // intentional (matches how the church wants them presented) -- do not
  // alphabetize or re-sort.
  archive: [
    { title: "Elias", image: "/images/sermons/elias.jpg" },
    { title: "Jesus Knows You", image: "/images/sermons/jesus-knows-you.jpg" },
    { title: "The Promises of God", image: "/images/sermons/the-promises-of-god.jpg" },
    { title: "Meno", image: "/images/sermons/meno.jpg" },
    { title: "The Supernatural", image: "/images/sermons/the-supernatural.jpg" },
    { title: "Attitude", image: "/images/sermons/attitude.jpg" },
    { title: "Faith Or Not", image: "/images/sermons/faith-or-not.jpg" },
    { title: "Increase", image: "/images/sermons/increase.jpg" },
  ],
};

export const legal = {
  privacy: {
    heading: "Privacy Policy",
    updated: "This page is a placeholder and will be replaced with our full privacy policy prior to launch.",
    body: [
      "Heralds International Christian Centre respects your privacy. This placeholder page will be replaced with a complete privacy policy describing what information we collect through this website (such as contact form and newsletter submissions), how it is used, and how you may request its removal.",
      "If you have questions in the meantime, please reach out via our Contact page.",
    ],
  },
  terms: {
    heading: "Terms and Conditions",
    updated: "This page is a placeholder and will be replaced with our full terms of use prior to launch.",
    body: [
      "This placeholder page will be replaced with complete terms and conditions governing the use of this website prior to public launch.",
      "If you have questions in the meantime, please reach out via our Contact page.",
    ],
  },
};
