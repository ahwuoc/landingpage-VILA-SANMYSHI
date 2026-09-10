import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO } from "@/constants/company";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });

  return {
    title: t("metadata_title"),
    robots: { index: false, follow: false },
  };
}

export default async function MaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-brand-950 font-sans selection:bg-primary/30 selection:text-white lg:flex-row">
      {/* LEFT SECTION: Full Media Panel */}
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/2bab8143-64a1-4ed5-ab59-238f7f1b7d87.png"
          alt="System Maintenance"
          fill
          className="object-cover p-0 lg:object-contain lg:p-12"
          preload
        />

        <div className="absolute inset-0 z-10 bg-brand-950/35" />

        {/* Floating ID Tag / Brand Branding */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white shadow-[var(--shadow-card)] lg:h-16 lg:w-16">
              <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain p-2" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-black tracking-tighter text-lg leading-none uppercase">VILA</p>
              <p className="text-primary font-black tracking-tighter text-lg leading-none uppercase">SANMYSHI</p>
            </div>
          </Link>
        </div>

      </div>

      {/* RIGHT SECTION: Control Center / Info Panel */}
      <div className="relative z-30 flex h-screen w-full items-center justify-center overflow-y-auto border-l border-white/10 bg-brand-950 p-6 lg:w-2/5 lg:overflow-visible lg:p-12">
        <div className="max-w-md w-full py-12 lg:py-0">
          <div className="space-y-10 animate-fade-up">
            {/* Status Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{t("status_badge")}</span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
                {t("title_part1")} <br />
                <span className="text-white">{t("title_highlight")}</span>
              </h1>

              <p className="text-sm font-normal leading-7 text-white/65">
                {t("description")}
              </p>
            </div>

            {/* Advanced Progress Card */}
            <div className="group/progress relative space-y-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8">
              <div className="flex justify-between items-end relative z-10">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t("load_label")}</span>
                <span className="text-3xl font-black text-white tabular-nums">65%</span>
              </div>

              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden relative z-10">
                <div className="relative h-full rounded-full bg-primary" style={{ width: '65%' }} />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-xs animate-spin">sync</span>
                {t("loading_text")}
              </div>
            </div>

            {/* Quick Contact - Simplified & Elegant */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] pl-2">{t("channels_label")}</p>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="group/item flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-xl">phone_iphone</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t("hotline_label")}</p>
                      <p className="text-white font-black group-hover/item:text-primary transition-colors">{COMPANY_INFO.hotline}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover/item:translate-x-1 group-hover/item:text-primary transition-all">chevron_right</span>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="group/item flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover/item:bg-primary/20">
                      <span className="material-symbols-outlined text-xl text-primary">alternate_email</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t("email_label")}</p>
                      <p className="font-bold text-white transition-colors group-hover/item:text-primary">{COMPANY_INFO.email}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 transition-all group-hover/item:translate-x-1 group-hover/item:text-primary">chevron_right</span>
                </a>
              </div>
            </div>

            {/* Footer Details */}
            <div className="pt-10 flex items-center justify-between">
              <Link
                href="/admin"
                className="text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-[0.2em] transition-colors"
              >
                {t("access_portal")}
              </Link>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                {t("est_year")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
