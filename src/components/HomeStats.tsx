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
    <section className="py-20 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS_ASSETS.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[2rem] min-h-[280px] lg:min-h-[360px] flex flex-col p-7 lg:p-9 group cursor-default"
            >
              <Image
                src={stat.image}
                alt={t(`items.${i}.label`)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

              <p className="relative z-10 text-label-md text-white/70 mb-auto">{t(`items.${i}.label`)}</p>

              <div className="relative z-10 mt-auto">
                <div className="text-4xl lg:text-6xl font-black text-white tracking-tighter flex items-baseline gap-1 mb-1">
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
