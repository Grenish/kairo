import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kairo | Japanese Fashion and Quiet Luxury",
    template: "%s | Kairo",
  },
  description:
    "Kairo redefines luxury through Japanese craftsmanship and timeless design. Shop curated apparel, read our journal, and discover quiet luxury.",
  applicationName: "Kairo",
  openGraph: {
    type: "website",
    siteName: "Kairo",
    title: "Kairo | Japanese Fashion and Quiet Luxury",
    description:
      "Kairo redefines luxury through Japanese craftsmanship and timeless design. Shop curated apparel and discover quiet luxury.",
    images: ["/story.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable} suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <CartProvider>{children}</CartProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
