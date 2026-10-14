import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { dict } from "@/lib/dict";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a Kairo account to save favorites, track orders, receive early access to new collections, and enjoy exclusive offers.",
};

export default async function SignupPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const { lang } = await params;
  const t = dict[lang]?.auth.signup;

  if (!t) return notFound();

  return (
    <div className="bg-smooth bg-cover bg-no-repeat bg-center flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
      <div className="absolute inset-0 backdrop-blur-xs bg-muted/50" />
      <div className="flex w-full max-w-sm flex-col gap-6 relative">
        <a
          href={`/${lang}`}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="text-primary-foreground flex items-center justify-center">
            <h2 className="font-bold tracking-widest">KAIRO</h2>
          </div>
        </a>
        <SignupForm t={t} lang={lang} />
      </div>
    </div>
  );
}
