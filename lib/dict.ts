import { categorySection } from "./dictionary/category-section";
import { hero } from "./dictionary/hero";
import { navbar } from "./dictionary/navbar";
import { philosophySection } from "./dictionary/philosophy-section";
import { productsSample } from "./dictionary/products-sample";
import { testimonialsSection } from "./dictionary/testimonials-section";
import { sneakPeakSection } from "./dictionary/sneak-peak-section";
import { trendingSection } from "./dictionary/trending-section";
import { blogSection } from "./dictionary/blog-section";
import { auth } from "./dictionary/auth";

export const dict = {
  en: {
    navbar: navbar.en,
    hero: hero.en,
    categorySection: categorySection.en,
    productsSample: productsSample.en,
    philosophySection: philosophySection.en,
    testimonialsSection: testimonialsSection.en,
    sneakPeakSection: sneakPeakSection.en,
    trendingSection: trendingSection.en,
    blogSection: blogSection.en,
    auth: auth.en,
  },
  ja: {
    navbar: navbar.ja,
    hero: hero.ja,
    categorySection: categorySection.ja,
    productsSample: productsSample.ja,
    philosophySection: philosophySection.ja,
    testimonialsSection: testimonialsSection.ja,
    sneakPeakSection: sneakPeakSection.ja,
    trendingSection: trendingSection.ja,
    blogSection: blogSection.ja,
    auth: auth.ja,
  },
} as const;

