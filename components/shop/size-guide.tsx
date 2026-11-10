"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dict } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";
import { SIZE_CHART } from "@/lib/sizes";

export function SizeTable({ lang }: { lang: Locale }) {
  const t = dict[lang].product;
  return (
    <div className="overflow-x-auto">
      <table className="tabular w-full text-left">
        <thead>
          <tr className="border-b border-border">{/* taste-skill-ignore: a real table */}
            <th scope="col" className="py-3 pr-4 font-medium">{t.size}</th>
            <th scope="col" className="py-3 pr-4 font-medium">{t.sizeJP}</th>
            <th scope="col" className="py-3 pr-4 font-medium">{t.chest}</th>
            <th scope="col" className="py-3 pr-4 font-medium">{t.waist}</th>
            <th scope="col" className="py-3 font-medium">{t.height}</th>
          </tr>
        </thead>
        <tbody>
          {SIZE_CHART.map((row) => (
            <tr key={row.size} className="border-b border-border">{/* taste-skill-ignore: a real table */}
              <th scope="row" className="py-3 pr-4 font-medium">{row.size}</th>
              <td className="py-3 pr-4">{row.jp}</td>
              <td className="py-3 pr-4">{row.chest}</td>
              <td className="py-3 pr-4">{row.waist}</td>
              <td className="py-3">{row.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-ink-soft">{t.sizeNote}</p>
    </div>
  );
}

export function SizeGuide({ lang }: { lang: Locale }) {
  const t = dict[lang].product;

  return (
    <Dialog>
      <DialogTrigger className="link-quiet text-ink-soft underline hover:text-foreground">
        {t.sizeGuide}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.sizeChartTitle}</DialogTitle>
          <DialogDescription>{t.sizeChartDesc}</DialogDescription>
        </DialogHeader>
        <SizeTable lang={lang} />
      </DialogContent>
    </Dialog>
  );
}
