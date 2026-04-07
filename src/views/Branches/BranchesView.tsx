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
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">{t("hero_tag")}</span>
          </div>

          <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight mb-8">
            {t.rich("hero_title", {
              highlight: (chunks) => <span className="text-primary-fixed">{chunks}</span>
            })}
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg lg:text-xl font-medium leading-relaxed">
            {t("hero_desc")}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Main Interactive Branch Network Section */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Sticky Vietnam Map */}
            <div className="w-full lg:col-span-7 lg:sticky lg:top-32 self-start">
              <div className="space-y-8 mb-12 lg:hidden text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">{t("map_tag")}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                  {t.rich("map_title", {
                    highlight: (chunks) => <span className="text-primary-fixed">{chunks}</span>
                  })}
                </h2>
              </div>

              <div className="relative">
                <VietnamMap activeId={activeBranchId} onMarkerClick={handleBranchClick} />

                {/* Stats Overlay for Desktop Map */}
                <div className="hidden lg:grid grid-cols-2 gap-8 mt-12 pl-8 border-l border-white/5">
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-primary">
                      {branches.length.toString().padStart(2, '0')}
                    </p>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{t("stat_offices")}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-white">01</p>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{t("stat_countries")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrollable Branch Details */}
            <div className="w-full lg:col-span-5 space-y-6">
              <div className="hidden lg:block space-y-6 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">{t("map_tag")}</span>
                </div>
                <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                  {t.rich("map_title", {
                    highlight: (chunks) => <span className="text-primary-fixed">{chunks}</span>
                  })}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {t("map_desc")}
                </p>
              </div>

              <div className="max-h-[700px] xl:max-h-[850px] overflow-y-auto pr-4 space-y-6 custom-scrollbar scroll-smooth">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    id={`branch-${branch.id}`}
                    onClick={() => handleBranchClick(branch.id)}
                    className={`group cursor-pointer rounded-[2rem] border p-6 lg:p-8 transition-all duration-500 shadow-xl ${activeBranchId === branch.id
                      ? 'bg-slate-900 border-primary ring-1 ring-primary shadow-primary/20'
                      : 'bg-slate-900/50 backdrop-blur-xl border-white/5 hover:bg-slate-900 hover:border-primary/20'
                      }`}
                  >
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4 flex-grow">
                        <div>
                          <span className={`text-[10px] font-black tracking-widest uppercase mb-2 block ${activeBranchId === branch.id ? 'text-primary-fixed' : 'text-slate-500'}`}>{t(branch.type)}</span>
                          <h3 className={`text-xl font-black leading-tight transition-colors ${activeBranchId === branch.id ? 'text-primary-fixed' : 'text-white'}`}>
                            {branch.name}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <p className="text-slate-400 text-sm font-semibold leading-relaxed">{branch.address}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">call</span>
                            </div>
                            <p className="text-slate-300 text-sm font-black tracking-wider">{branch.phone}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeBranchId === branch.id ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-white/5 text-slate-500'}`}>
                              <span className="material-symbols-outlined text-lg">mail</span>
                            </div>
                            <p className="text-slate-400 text-sm font-semibold truncate">{branch.email}</p>
                          </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${activeBranchId === branch.id
                              ? 'bg-primary-fixed text-slate-950'
                              : 'bg-white/5 text-white hover:bg-primary-fixed hover:text-slate-950'
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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6">{t("cta_title")}</h2>
            <p className="text-slate-500 text-lg lg:text-xl font-medium mb-12">
              {t("cta_desc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all"
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
