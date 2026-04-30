export type Locale = "nl" | "en";
export type RouteKey =
  | "landing"
  | "home"
  | "websites"
  | "apps"
  | "software"
  | "about"
  | "contact"
  | "thankYou"
  | "brainox"
  | "mijn-it-hulp"
  | "news"
  | "abbo"
  | "inmandje"
  | "stockbuddy"
  | "geldinzicht"
  | "taakflow";

const routeMap: Record<Locale, Record<RouteKey, string>> = {
  nl: {
    landing: "/",
    home: "/home",
    websites: "/websites",
    apps: "/apps",
    software: "/software",
    about: "/about",
    contact: "/contact",
    thankYou: "/bedankt",
    brainox: "/brainox",
    "mijn-it-hulp": "/mijn-it-hulp",
    news: "/news",
    abbo: "/abbo",
    inmandje: "/inmandje",
    stockbuddy: "/stockbuddy",
    geldinzicht: "/geldinzicht",
    taakflow: "/taakflow",
  },
  en: {
    landing: "/en",
    home: "/en/home",
    websites: "/en/websites",
    apps: "/en/apps",
    software: "/en/software",
    about: "/en/about",
    contact: "/en/contact",
    thankYou: "/en/thank-you",
    brainox: "/en/brainox",
    "mijn-it-hulp": "/en/mijn-it-hulp",
    news: "/en/news",
    abbo: "/en/abbo",
    inmandje: "/en/inmandje",
    stockbuddy: "/en/stockbuddy",
    geldinzicht: "/en/geldinzicht",
    taakflow: "/en/taakflow",
  },
};

export function getLocalizedPath(locale: Locale, route: RouteKey) {
  return routeMap[locale][route];
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
}

export function getRouteKeyFromPathname(pathname: string): RouteKey {
  if (pathname === "/" || pathname === "/en") {
    return "landing";
  }

  const normalized = pathname.startsWith("/en/")
    ? pathname.replace(/^\/en/, "")
    : pathname;

  switch (normalized) {
    case "/home":
      return "home";
    case "/websites":
      return "websites";
    case "/apps":
      return "apps";
    case "/software":
      return "software";
    case "/about":
      return "about";
    case "/contact":
      return "contact";
    case "/bedankt":
    case "/thank-you":
      return "thankYou";
    case "/brainox":
      return "brainox";
    case "/mijn-it-hulp":
      return "mijn-it-hulp";
    case "/news":
      return "news";
    case "/abbo":
      return "abbo";
    case "/inmandje":
      return "inmandje";
    case "/stockbuddy":
      return "stockbuddy";
    case "/geldinzicht":
      return "geldinzicht";
    case "/taakflow":
      return "taakflow";
    default:
      return "landing";
  }
}

export function getAlternateLocalePath(pathname: string, locale: Locale) {
  const route = getRouteKeyFromPathname(pathname);
  return getLocalizedPath(locale, route);
}
