import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleMark } from "./auth-shell";

type LoginFormProps = {
  lang: string;
  t: {
    welcome: string;
    description: string;
    google: string;
    separator: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    forgotPassword: string;
    submit: string;
    noAccount: string;
    signUp: string;
    termsHelper: string;
    terms: string;
    privacyHelper: string;
    privacy: string;
  };
};

export function LoginForm({ t, lang }: LoginFormProps) {
  return (
    <div>
      <h1 className="type-head text-head">{t.welcome}</h1>
      <p className="type-lead text-lead mt-5 text-ink-soft">{t.description}</p>

      <Button variant="secondary" size="lg" type="button" className="mt-10 w-full">
        <GoogleMark />
        {t.google}
      </Button>
      <p className="my-8 text-center text-ink-soft">{t.separator}</p>

      <form className="grid gap-5">
        <label className="grid gap-2">
          <span>{t.emailLabel}</span>
          <Input id="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required />
        </label>
        <label className="grid gap-2">
          <span className="flex items-baseline justify-between">
            {t.passwordLabel}
            <a href="#" className="link-quiet text-ink-soft underline">
              {t.forgotPassword}
            </a>
          </span>
          <Input id="password" type="password" autoComplete="current-password" required />
        </label>
        <Button type="submit" size="lg" className="mt-3">
          {t.submit}
        </Button>
      </form>

      <p className="mt-8">
        {t.noAccount}{" "}
        <Link href={`/${lang}/signup`} className="link-quiet underline">
          {t.signUp}
        </Link>
      </p>
      <p className="mt-10 text-small text-ink-soft">
        {t.termsHelper} {t.terms} {t.privacyHelper} {t.privacy}.
      </p>
    </div>
  );
}
