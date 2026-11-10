import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";

export default async function SignupPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AuthShell
      lang={lang}
      image="/shop/tops.png"
      alt={lang === "ja" ? "グレーと藍の切り替えトップスの女性" : "A woman in a grey and indigo panelled top"}
    >
      <SignupForm t={dict[lang].auth.signup} lang={lang} />
    </AuthShell>
  );
}
