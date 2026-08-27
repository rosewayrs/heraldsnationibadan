// Minimal hand-authored line-icon set (24x24, stroke-based, Feather-inspired).
// No external icon font / CDN dependency.

const PATHS = {
  play: '<polygon points="6 3 20 12 6 21 6 3"></polygon>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>',
  "arrow-right": '<line x1="4" y1="12" x2="20" y2="12"></line><polyline points="13 5 20 12 13 19"></polyline>',
  "arrow-up-right": '<line x1="6" y1="18" x2="18" y2="6"></line><polyline points="8 6 18 6 18 16"></polyline>',
  "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
  close: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
  "book-open": '<path d="M2 4.5C4 3.5 7 3.5 9 4.5V19.5C7 18.5 4 18.5 2 19.5V4.5Z"></path><path d="M22 4.5C20 3.5 17 3.5 15 4.5V19.5C17 18.5 20 18.5 22 19.5V4.5Z"></path><line x1="12" y1="6" x2="12" y2="21"></line>',
  megaphone: '<path d="M3 11v3a1 1 0 0 0 1 1h2l4 5v-14l-4 5H4a1 1 0 0 0-1 1Z"></path><path d="M13 8a4 4 0 0 1 0 8"></path><path d="M17 5a8.5 8.5 0 0 1 0 14"></path>',
  briefcase: '<rect x="2.5" y="7.5" width="19" height="12" rx="2"></rect><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5"></path><line x1="2.5" y1="13" x2="21.5" y2="13"></line>',
  "shield-check": '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"></path><polyline points="9 12 11.5 14.5 16 10"></polyline>',
  hands: '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6"></path><path d="M11 12.5V4.5a1.5 1.5 0 0 1 3 0v8"></path><path d="M14 12.5V6a1.5 1.5 0 0 1 3 0v9c0 3.5-2.5 6-6 6-2 0-3.3-.7-4.5-2L4 15.5c-.6-.7-.5-1.7.2-2.2.6-.5 1.4-.4 2 .1L8 15"></path>',
  heart: '<path d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4a5 5 0 0 1 6.5 3 5 5 0 0 1 6.5-3c3.5.5 5 4 3.5 7.2-2.5 4.7-10 9.3-10 9.3Z"></path>',
  camera: '<path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"></path><circle cx="12" cy="13.5" r="3.5"></circle>',
  music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"></rect><rect x="9" y="2.5" width="6" height="3.5" rx="1"></rect><line x1="8" y1="11" x2="16" y2="11"></line><line x1="8" y1="15" x2="16" y2="15"></line>',
  gift: '<rect x="3" y="9" width="18" height="4" rx="1"></rect><rect x="4" y="13" width="16" height="8" rx="1"></rect><line x1="12" y1="9" x2="12" y2="21"></line><path d="M12 9C10 9 8.5 7.5 8.5 6.2 8.5 5 9.4 4 10.6 4c1.4 0 2.4 1.6 1.4 5Z"></path><path d="M12 9c2 0 3.5-1.5 3.5-2.8C15.5 5 14.6 4 13.4 4c-1.4 0-2.4 1.6-1.4 5Z"></path>',
  sparkles: '<path d="M11 3v3M11 17v3M4 11h3M17 11h3M6 6l2 2M15 15l2 2M16 6l-2 2M7 15l-2 2"></path><path d="M11 8a3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3Z"></path>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"></rect><polyline points="3 6 12 13 21 6"></polyline>',
  phone: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C10 20 4 14 4 6a2 2 0 0 1 1-2Z"></path>',
  "map-pin": '<path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.5"></circle>',
  clock: '<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline>',
  search: '<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.2" y2="16.2"></line>',
  check: '<polyline points="5 13 9.5 17.5 19 7"></polyline>',
  "check-circle": '<circle cx="12" cy="12" r="9.5"></circle><polyline points="7.5 12.5 10.5 15.5 16.5 9"></polyline>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"></rect><line x1="3.5" y1="10" x2="20.5" y2="10"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line>',
  users: '<circle cx="9" cy="8" r="3.2"></circle><path d="M2.5 20c.7-3.6 3.3-5.5 6.5-5.5s5.8 1.9 6.5 5.5"></path><circle cx="17.5" cy="8.5" r="2.6"></circle><path d="M15.8 14.7c2.6.3 4.5 2.1 5.1 5.3"></path>',
  quote: '<path d="M9.5 8c-2.5 0-4.5 2-4.5 4.5S7 17 9.5 17c.3 2-1 3.5-3 4v1c3.5-.3 6-2.7 6-6.3V12c0-2.2-1.8-4-4-4Z"></path><path d="M18 8c-2.5 0-4.5 2-4.5 4.5S15.5 17 18 17c.3 2-1 3.5-3 4v1c3.5-.3 6-2.7 6-6.3V12c0-2.2-1.8-4-4-4Z"></path>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.3" cy="6.7" r="1"></circle>',
  facebook: '<path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7Z"></path>',
  tiktok: '<path d="M14 3v10.8a2.6 2.6 0 1 1-2-2.5"></path><path d="M14 3c.3 2 1.8 3.6 4 3.9"></path>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3"></rect><polygon points="10.5 9.5 15.5 12 10.5 14.5"></polygon>',
  telegram: '<circle cx="12" cy="12" r="9.5"></circle><path d="M6.5 12.2 17 7.8 15 16.5l-4-2.8-2 1.8.3-3Z"></path><path d="M11 13.7 17 7.8"></path>',
  x: '<line x1="5" y1="5" x2="19" y2="19"></line><line x1="19" y1="5" x2="5" y2="19"></line>',
};

export function icon(name, cls = "icon") {
  const inner = PATHS[name] || PATHS["check"];
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
