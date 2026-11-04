"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { fill } from "@/lib/dict";
import { cn } from "@/lib/utils";

type VisitText = {
  title: string;
  address: readonly string[];
  hours: readonly { days: string; time: string }[];
  phone: string;
  openNow: string;
  closedNow: string;
  days: readonly string[];
  button: string;
  mailSubject: string;
  mailBody: string;
  alt: string;
};

// Opening hours by weekday (0 = Sunday), in Tokyo time. Monday is closed.
const HOURS: Record<number, [number, number] | null> = {
  0: [11, 19],
  1: null,
  2: [11, 20],
  3: [11, 20],
  4: [11, 20],
  5: [11, 20],
  6: [11, 19],
};

function tokyoNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function shopStatus(t: VisitText) {
  const { day, minutes } = tokyoNow();
  const today = HOURS[day];
  if (today && minutes >= today[0] * 60 && minutes < today[1] * 60) {
    return { open: true, text: fill(t.openNow, { time: `${today[1]}:00` }) };
  }
  // Find the next opening, today later or on a following day.
  for (let step = 0; step < 8; step++) {
    const d = (day + step) % 7;
    const hours = HOURS[d];
    if (!hours) continue;
    if (step === 0 && minutes >= hours[0] * 60) continue;
    return {
      open: false,
      text: fill(t.closedNow, { day: t.days[d], time: `${hours[0]}:00` }),
    };
  }
  return null;
}

/** The shop on its street, with a card that says whether it is open right now. */
export function Visit({ t, email }: { t: VisitText; email: string }) {
  const [status, setStatus] = useState<ReturnType<typeof shopStatus>>(null);

  useEffect(() => {
    const update = () => setStatus(shopStatus(t));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [t]);

  const mailto = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;

  return (
    <section aria-labelledby="visit-title" className="relative mt-32 lg:mt-48 lg:h-svh lg:min-h-[44rem]">
      <div className="relative h-[70svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <Image
          src="/store.png"
          alt={t.alt}
          fill
          sizes="100vw"
          className="visit-photo object-cover object-[35%_50%]"
        />
      </div>

      <div className="wrap relative -mt-20 lg:absolute lg:top-16 lg:right-0 lg:mt-0">
        <div className="bg-paper text-paper-ink lg:w-[24rem]">
          <div className="grid gap-5 p-8">
            <h2 id="visit-title" className="type-lead text-lead">
              {t.title}
            </h2>
            <p className="min-h-[1.5em] font-medium" aria-live="polite">
              {status && (
                <>
                  <span
                    aria-hidden
                    className={cn(
                      "mr-2 inline-block size-2.5 align-middle",
                      status.open ? "bg-paper-ink" : "bg-paper-soft/50"
                    )}
                  />
                  {status.text}
                </>
              )}
            </p>
            <address className="not-italic">
              {t.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <table className="w-full">
              <tbody>
                {t.hours.map((row) => (
                  <tr key={row.days}>
                    <th scope="row" className="py-0.5 text-left font-normal">
                      {row.days}
                    </th>
                    <td className="tabular py-0.5 text-right">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href={`tel:${t.phone.replace(/[^\d+]/g, "")}`} className="link-quiet tabular self-start">
              {t.phone}
            </a>
            <a
              href={mailto}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-2 w-full bg-paper-ink text-paper hover:bg-paper-ink/88"
              )}
            >
              {t.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
