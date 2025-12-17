import { LoginForm } from "@/components/auth/login-form";
import { dict } from "@/lib/dict";
import { notFound } from "next/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const { lang } = await params;
  const t = dict[lang]?.auth.login;

  if (!t) return notFound();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex items-center justify-center">
            <h2>Kairo</h2>
          </div>
        </a>
        <LoginForm t={t} />
      </div>
    </div>
  );
}
