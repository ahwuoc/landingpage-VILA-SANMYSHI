import { routing } from "@/i18n/routing";

export const SITE_URL = "https://vilasanmyshi.com";

const hreflang: Record<string, string> = { vi: "vi-VN", en: "en-US", th: "th-TH" };

/**
 * Canonical + hreflang for one page. `path` is the part after the locale,
 * e.g. "" for the home page or "/about".
 */
export function alternatesFor(locale: string, path = "") {
  const languages: Record<string, string> = { "x-default": `${SITE_URL}/${routing.defaultLocale}${path}` };
  for (const code of routing.locales) languages[hreflang[code]] = `${SITE_URL}/${code}${path}`;
  return { canonical: `${SITE_URL}/${locale}${path}`, languages };
}

/** The layout template appends " | VILA SANMYSHI"; drop a trailing brand so it is not repeated. */
export function pageTitle(title: string) {
  return title.replace(/\s*\|\s*vila sanmyshi\s*$/i, "");
}
