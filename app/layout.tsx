import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { RevealObserver } from "@/components/providers/reveal-observer";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Kanji and kana fall through to this face; the Latin glyphs stay in Hanken Grotesk.
const zen = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Kairo — clothing from Tokyo, named for one word each",
    template: "%s — Kairo",
  },
  description:
    "Tailoring, knitwear and kimono cut in Tokyo. Every Kairo piece is named for one Japanese word.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#151d33" },
    { media: "(prefers-color-scheme: light)", color: "#151d33" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${zen.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <CartProvider>
              {children}
              <RevealObserver />
            </CartProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
