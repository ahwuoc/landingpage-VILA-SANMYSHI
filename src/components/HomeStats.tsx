"use client";

import Image from "next/image";
import Counter from "./Counter";
import { useTranslations } from "next-intl";

export default function HomeStats() {
  const t = useTranslations("Home.stats");

  const STATS_ASSETS = [
    {
      value: "20",
      unit: "+",
      image: "/images/services/sea-freight-premium.png",
      duration: 2000,
    },
    {
      value: "8.967",
      unit: "+",
      image: "/images/stats/partners.png",
      duration: 2300,
    },
    {
      value: "550.055",
      unit: "+",
      image: "/images/services/fulfillment-premium.png",
      duration: 2600,
    },
    {
      value: "15.000",
      unit: "+",
      image: "/images/stats/global_clients.png",
      duration: 2900,
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS_ASSETS.map((stat, i) => (
            <div
              key={i}
              className="group relative flex min-h-[280px] cursor-default flex-col overflow-hidden rounded-2xl border border-brand-200 p-7 lg:min-h-[340px] lg:p-8"
            >
              <Image
                src={stat.image}
                alt={t(`items.${i}.label`)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-brand-950/65" />

              <p className="relative z-10 text-label-md text-white/70 mb-auto">{t(`items.${i}.label`)}</p>

              <div className="relative z-10 mt-auto">
                <div className="mb-1 flex items-baseline gap-1 text-4xl font-bold tracking-[-0.03em] text-white lg:text-5xl">
                  <Counter value={stat.value} duration={stat.duration} />
                  <span className="text-xl lg:text-2xl">{stat.unit}</span>
                </div>
                <p className="text-label-lg text-white/80">{t(`items.${i}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
