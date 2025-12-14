/**
 * Central i18n definitions shared by routing and dictionaries.
 *
 * Keep this file as the single source of truth for supported locales.
 * Import `locales`/`Locale` from here wherever you handle `[lang]`.
 */

export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

/**
 * Runtime type guard for validating arbitrary values (e.g. route params).
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Coerce an arbitrary value into a supported locale, falling back to `fallback`.
 * Useful when you prefer non-404 behavior.
 */
export function coerceLocale(
  value: unknown,
  fallback: Locale = "en",
): Locale {
  return isLocale(value) ? value : fallback;
}
