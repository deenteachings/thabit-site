"use client";

import { useSyncExternalStore } from "react";
import InkHeroCard from "@/components/ink-hero-card";
import Logo from "@/components/logo";

const emptySubscribe = () => () => {};
const emptySnapshot = () => "";

const getToday = () =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

function useToday() {
  return useSyncExternalStore(emptySubscribe, getToday, emptySnapshot);
}

export default function Hero() {
  const today = useToday();

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
        <Logo className="mb-10 h-16 w-auto sm:h-20" />

        <p className="rounded-full border border-border bg-elevated px-4 py-1.5 text-[12px] font-medium text-tertiary">
          {today || "Today"}
        </p>

        <p className="mt-8 text-[26px] tracking-tight text-primary">
          As-salamu alaykum,{" "}
          <strong className="font-bold">you&apos;re safe here.</strong>
        </p>

        <h1 className="display-huge mt-4 max-w-4xl text-balance">
          Feel held by Allah, not lectured at.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-[16px] leading-6 text-secondary">
          Thābit is a gentle emotional healing companion — quiet adhkar, a
          listening presence, and small daily practices rooted in authentic
          sources. For the days when your heart feels too heavy to pray, we
          built something to sit beside you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#download" className="btn-pill btn-solid w-full sm:w-auto">
            Get the app
          </a>
          <a
            href="#practices"
            className="btn-pill btn-outline w-full sm:w-auto"
          >
            See what&apos;s inside
          </a>
        </div>

        <div className="mt-16 w-full max-w-md">
          <InkHeroCard />
        </div>
      </div>
    </section>
  );
}
