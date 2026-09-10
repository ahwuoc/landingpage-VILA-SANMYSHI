"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { VietnamMap } from "@/components/maps/VietnamMap";
import { useTranslations } from "next-intl";

interface Branch {
  id: string;
  type: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  image: string;
}

interface BranchesViewProps {
  branches: Branch[];
}

export function BranchesView({ branches }: BranchesViewProps) {
  const t = useTranslations("Branches");
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);

  const handleBranchClick = (id: string) => {
    setActiveBranchId(id);
    const element = document.getElementById(`branch-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 pb-20 pt-36 lg:pb-24 lg:pt-48">
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center sm:px-8">
          <div className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>{t("hero_tag")}</span>
          </div>

          <h1 className="mb-8 text-4xl font-bold leading-tight tracking-[-0.03em] text-white lg:text-6xl">
            {t.rich("hero_title", {
              highlight: (chunks) => <span className="text-white">{chunks}</span>
            })}
          </h1>

          <p className="mx-auto max-w-2xl text-base font-normal leading-8 text-white/65 lg:text-lg">
            {t("hero_desc")}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </section>

      {/* Main Interactive Branch Network Section */}
      <section className="relative overflow-hidden bg-brand-950 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Sticky Vietnam Map */}
            <div className="w-full lg:col-span-7 lg:sticky lg:top-32 self-start">
              <div className="space-y-8 mb-12 lg:hidden text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
                  <span>{t("map_tag")}</span>
                </div>
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-white lg:text-5xl">
                  {t.rich("map_title", {
                    highlight: (chunks) => <span className="text-white">{chunks}</span>
                  })}
                </h2>
              </div>

              <div className="relative">
                <VietnamMap activeId={activeBranchId} onMarkerClick={handleBranchClick} />

                {/* Stats Overlay for Desktop Map */}
                <div className="mt-12 hidden grid-cols-2 gap-8 border-l border-white/10 pl-8 lg:grid">
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-primary">
                      {branches.length.toString().padStart(2, '0')}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{t("stat_offices")}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">01</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{t("stat_countries")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrollable Branch Details */}
            <div className="w-full lg:col-span-5 space-y-6">
              <div className="hidden lg:block space-y-6 mb-12">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
                  <span>{t("map_tag")}</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] text-white xl:text-5xl">
                  {t.rich("map_title", {
                    highlight: (chunks) => <span className="text-white">{chunks}</span>
                  })}
                </h2>
                <p className="text-base font-normal leading-7 text-white/65 lg:text-lg lg:leading-8">
                  {t("map_desc")}
                </p>
              </div>

              <div className="max-h-[700px] xl:max-h-[850px] overflow-y-auto pr-4 space-y-6 custom-scrollbar scroll-smooth">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    id={`branch-${branch.id}`}
                    onClick={() => handleBranchClick(branch.id)}
                    className={`group cursor-pointer rounded-xl border p-6 transition-colors duration-300 lg:p-8 ${activeBranchId === branch.id
                      ? 'border-primary bg-white/[0.08]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                  >
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4 flex-grow">
                        <div>
                          <span className={`mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] ${activeBranchId === branch.id ? 'text-white/75' : 'text-white/45'}`}>{t(branch.type)}</span>
                          <h3 className="text-xl font-bold leading-tight text-white">
                            {branch.name}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <p className="text-sm font-normal leading-6 text-white/65">{branch.address}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">call</span>
                            </div>
                            <p className="text-sm font-semibold tracking-wide text-white/80">{branch.phone}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">mail</span>
                            </div>
                            <p className="truncate text-sm font-normal text-white/65">{branch.email}</p>
                          </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${activeBranchId === branch.id
                              ? 'bg-primary text-white'
                              : 'border border-white/15 text-white hover:bg-white/10'
                              }`}
                          >
                            <span className="material-symbols-outlined text-base">map</span>
                            {t("btn_map")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-4xl font-bold tracking-[-0.03em] text-on-surface lg:text-5xl">{t("cta_title")}</h2>
            <p className="mb-10 text-base font-normal leading-7 text-on-surface-variant lg:text-lg">
              {t("cta_desc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700"
            >
              Liên hệ ngay
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
