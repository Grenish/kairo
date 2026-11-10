import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleMark } from "./auth-shell";

type SignupFormProps = {
  lang: string;
  t: {
    title: string;
    description: string;
    google: string;
    separator: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    submit: string;
    hasAccount: string;
    login: string;
    termsHelper: string;
    terms: string;
    privacyHelper: string;
    privacy: string;
  };
};

export function SignupForm({ t, lang }: SignupFormProps) {
  return (
    <div>
      <h1 className="type-head text-head">{t.title}</h1>
      <p className="type-lead text-lead mt-5 text-ink-soft">{t.description}</p>

      <Button variant="secondary" size="lg" type="button" className="mt-10 w-full">
        <GoogleMark />
        {t.google}
      </Button>
      <p className="my-8 text-center text-ink-soft">{t.separator}</p>

      <form className="grid gap-5">
        <label className="grid gap-2">
          <span>{t.nameLabel}</span>
          <Input id="name" autoComplete="name" placeholder={t.namePlaceholder} required />
        </label>
        <label className="grid gap-2">
          <span>{t.emailLabel}</span>
          <Input id="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required />
        </label>
        <label className="grid gap-2">
          <span>{t.passwordLabel}</span>
          <Input id="password" type="password" autoComplete="new-password" minLength={8} required />
        </label>
        <Button type="submit" size="lg" className="mt-3">
          {t.submit}
        </Button>
      </form>

      <p className="mt-8">
        {t.hasAccount}{" "}
        <Link href={`/${lang}/login`} className="link-quiet underline">
          {t.login}
        </Link>
      </p>
      <p className="mt-10 text-small text-ink-soft">
        {t.termsHelper} {t.terms} {t.privacyHelper} {t.privacy}.
      </p>
    </div>
  );
}
