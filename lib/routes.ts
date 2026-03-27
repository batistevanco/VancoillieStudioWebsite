export type Locale = "nl" | "en";
export type RouteKey =
  | "landing"
  | "home"
  | "websites"
  | "apps"
  | "software"
  | "about"
  | "contact"
  | "thankYou";

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
    default:
      return "landing";
  }
}

export function getAlternateLocalePath(pathname: string, locale: Locale) {
  const route = getRouteKeyFromPathname(pathname);
  return getLocalizedPath(locale, route);
}
