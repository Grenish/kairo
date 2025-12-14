import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Redirect `/` to a locale root, choosing the best match from `Accept-Language`.
 *
 * Notes:
 * - This runs on the server only.
 * - It uses a minimal matcher so you don't need extra dependencies.
 * - Supported locales must match your `[lang]` route and `dict` keys.
 */
const SUPPORTED_LOCALES = ["en", "ja"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function pickLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
  fallback: Locale = "en",
): Locale {
  if (!acceptLanguage) return fallback;

  // Example header:
  // "en-US,en;q=0.9,ja;q=0.8"
  const candidates = acceptLanguage
    .split(",")
    .map((part) => part.trim())
    .map((part) => {
      const [tag, ...params] = part.split(";").map((s) => s.trim());
      const qParam = params.find((p) => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    // Normalize: "ja-jp" -> "ja"
    const base = tag.split("-")[0] as string;

    // Map common aliases (optional, but helps)
    const normalized = base === "jp" ? "ja" : base;

    if ((SUPPORTED_LOCALES as readonly string[]).includes(normalized)) {
      return normalized as Locale;
    }
  }

  return fallback;
}

export default async function RootPage() {
  const h = await headers();
  const acceptLanguage = h.get("accept-language");

  const locale = pickLocaleFromAcceptLanguage(acceptLanguage, "en");
  redirect(`/${locale}`);
}
