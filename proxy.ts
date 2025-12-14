import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "ja"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";
const LOCALE_COOKIE = "kairo_locale";

/**
 * Parse `Accept-Language` and return the best supported locale.
 * We only support `en` and `ja` for now:
 * - "ja", "ja-JP" -> "ja"
 * - "en", "en-US" -> "en"
 * - anything else -> DEFAULT_LOCALE
 */
function detectLocaleFromAcceptLanguage(headerValue: string | null): Locale {
  if (!headerValue) return DEFAULT_LOCALE;

  // Example: "en-US,en;q=0.9,ja;q=0.8"
  const candidates = headerValue
    .split(",")
    .map((part) => part.trim())
    .map((part) => {
      const [tag, qPart] = part.split(";").map((s) => s.trim());
      const q = qPart?.startsWith("q=") ? Number(qPart.slice(2)) : 1;
      return { tag: (tag ?? "").toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((x) => x.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const base = tag.split("-")[0] as string;
    if (base === "ja") return "ja";
    if (base === "en") return "en";
  }

  return DEFAULT_LOCALE;
}

function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

function pathnameHasLocale(pathname: string): boolean {
  // "/en", "/en/..." etc
  const seg = pathname.split("/")[1];
  return isLocale(seg);
}

function isPublicAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/manifest") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".map")
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Don't touch internal/asset routes.
  if (isPublicAsset(pathname)) return NextResponse.next();

  // If the user is already on a localized route, persist the locale cookie.
  if (pathnameHasLocale(pathname)) {
    const locale = pathname.split("/")[1] as Locale;
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      // 1 year
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }

  // Only redirect the bare root "/" to a locale.
  // (If you later add more non-localized top-level routes, handle them here explicitly.)
  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}`;

  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}

export const config = {
  matcher: [
    /**
     * Run on all routes except Next internals.
     * We still do our own filtering for common assets above.
     */
    "/((?!_next).*)",
  ],
};
