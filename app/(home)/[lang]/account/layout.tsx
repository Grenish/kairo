import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description:
    "View your Kairo account: track orders, manage saved addresses, and revisit your favorites, reviews, and bookmarks.",
  robots: { index: false, follow: false },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
