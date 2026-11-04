import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AuthShell
      lang={lang}
      image="/shop/sweater.png"
      alt={lang === "ja" ? "生成りのニットを着た女性" : "A woman in an unbleached knit"}
    >
      <LoginForm t={dict[lang].auth.login} lang={lang} />
    </AuthShell>
  );
}
