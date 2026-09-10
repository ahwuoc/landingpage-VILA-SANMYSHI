"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Handshake,
  MapPin,
  PackageCheck,
  Route,
  SearchCheck,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, COMPANY_INFO } from "@/constants/company";

export default function AboutView() {
  const t = useTranslations("About");
  const locale = useLocale();
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const businessFields = Array.from({ length: 12 }, (_, index) => t(`business_fields.${index}`));
  const timeline = Array.from({ length: 8 }, (_, index) => ({
    year: t(`timeline.${index}.year`),
    highlight: t(`timeline.${index}.highlight`),
    description: t(`timeline.${index}.desc`),
  }));
  const stats = Array.from({ length: 4 }, (_, index) => ({
    label: t(`capacity.${index}.label`),
    value: t(`capacity.${index}.value`),
    description: t(`capacity.${index}.desc`),
  }));
  const values = Array.from({ length: 4 }, (_, index) => ({
    title: t(`values.${index}.title`),
    description: t(`values.${index}.desc`),
  }));
  const heroProofs = Array.from({ length: 3 }, (_, index) => ({
    label: t(`hero.proofs.${index}.label`),
    value: t(`hero.proofs.${index}.value`),
  }));
  const processSteps = Array.from({ length: 4 }, (_, index) => ({
    title: t(`process.steps.${index}.title`),
    description: t(`process.steps.${index}.desc`),
  }));
  const commitments = Array.from({ length: 4 }, (_, index) => t(`process.commitments.${index}`));

  const purposeCards = [
    { icon: Target, title: t("mission.title"), description: t("mission.content"), featured: true },
    { icon: Globe2, title: t("vision.title"), description: t("vision.content"), featured: false },
    {
      icon: Handshake,
      title: t("purpose.promise_title"),
      description: t("purpose.promise_content"),
      featured: false,
    },
  ];
  const valueIcons = [ShieldCheck, FileCheck2, BadgeCheck, UsersRound];
  const processIcons = [ClipboardCheck, SearchCheck, Route, PackageCheck];

  const address =
    locale === "en"
      ? "13B Ong Ich Khiem, Lao Bao, Quang Tri, Vietnam"
      : COMPANY_INFO.address;
  const licenseLabel =
    locale === "en"
      ? "Customs Agent License"
      : locale === "th"
        ? "ใบอนุญาตตัวแทนพิธีการศุลกากร"
        : "Quyết định công nhận đại lý làm thủ tục Hải quan";

  const profileItems = [
    { label: t("info.company_name"), value: COMPANY_INFO.name },
    { label: t("info.main_office"), value: address },
    { label: t("info.tax_id"), value: COMPANY_INFO.mst },
    { label: t("info.representative"), value: COMPANY_INFO.representative },
    { label: licenseLabel, value: "1391/QĐ-TCHQ · 13/05/2019" },
    { label: t("info.website"), value: COMPANY_INFO.website },
    { label: t("info.hotline"), value: COMPANY_INFO.hotline },
    { label: t("info.email"), value: COMPANY_INFO.email },
  ];

  useEffect(() => {
    const container = pageRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-about-reveal]"));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.aboutDelay ?? 0);
          const startTransform =
            element.dataset.aboutReveal === "left"
              ? "translate3d(-28px, 0, 0)"
              : element.dataset.aboutReveal === "right"
                ? "translate3d(28px, 0, 0)"
                : "translate3d(0, 24px, 0)";
          element.animate(
            [
              { opacity: 0, transform: startTransform },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 680,
              delay,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          );
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTimeline = (direction: "left" | "right") => {
    const container = timelineRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -container.clientWidth * 0.72 : container.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  return (
    <div ref={pageRef} className="overflow-hidden bg-white text-brand-900">
      <header className="relative overflow-hidden bg-brand-50 pb-24 pt-36 lg:min-h-[760px] lg:pt-44">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-[1.03fr_.97fr]">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              {t("hero.title_small")} · Lao Bảo
            </div>
            <h1 className="text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[1.08] tracking-[-0.04em]">
              <span className="block">{t("page_title")}</span>
              <span className="block text-brand-600">VILA SANMYSHI.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-normal leading-8 text-on-surface-variant lg:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {heroProofs.map((item, index) => {
                const icons = [FileCheck2, Route, BadgeCheck];
                const Icon = icons[index];
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-brand-200 bg-white p-4 shadow-[var(--shadow-card)]">
                    <Icon className="shrink-0 text-brand-600" size={20} aria-hidden="true" />
                    <span>
                      <small className="block text-[8px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">{item.label}</small>
                      <strong className="mt-1 block text-[11px] font-semibold">{item.value}</strong>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[480px] lg:min-h-[610px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-brand-200 bg-brand-100 shadow-[var(--shadow-card)]">
              <Image
                src="/images/about/hero.png"
                alt={t("page_title")}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-brand-950/20" />
            </div>

            <div className="absolute -bottom-5 left-5 z-10 rounded-xl border border-brand-200 bg-white px-6 py-5 text-on-surface shadow-[var(--shadow-card)] sm:left-[-18px]">
              <small className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                {t("hero.established_label")}
              </small>
              <strong className="mt-1 block text-2xl font-bold tracking-tight">02 · 05 · 2018</strong>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div data-about-reveal="left">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
              <Building2 size={18} aria-hidden="true" />
              {t("profile_title")}
            </div>
            <h2 className="mt-4 max-w-xl text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              {t("profile_title")} {BRAND_NAME}.
            </h2>
            <div className="relative mt-9 aspect-[4/3] max-w-xl overflow-hidden rounded-2xl border border-brand-200 bg-brand-100 shadow-[var(--shadow-card)]">
              <Image
                src="/images/about/history.png"
                alt={t("profile_title")}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-950/20" />
              <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface shadow-[var(--shadow-card)]">
                {t("profile_tagline")}
              </div>
            </div>
          </div>

          <dl data-about-reveal="right" className="rounded-2xl border border-brand-200 bg-white px-6 shadow-[var(--shadow-card)] lg:px-8">
            {profileItems.map((item, index) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-brand-200 py-5 last:border-b-0 sm:grid-cols-[190px_1fr] sm:gap-8 lg:py-6"
              >
                <dt className="flex items-start gap-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-600">
                  <span className="text-brand-300">0{index + 1}</span>
                  {item.label}
                </dt>
                <dd className="text-sm font-normal leading-7 text-on-surface-variant lg:text-base">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-50 py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div data-about-reveal="up" className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                <Target size={18} aria-hidden="true" />
                {t("purpose.eyebrow")}
              </div>
              <h2 className="mt-4 text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.03em]">
                {t("purpose.title")}
              </h2>
            </div>
            <p className="max-w-2xl text-sm font-normal leading-7 text-on-surface-variant lg:justify-self-end lg:text-base">
              {t("purpose.intro")}
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {purposeCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  data-about-reveal="up"
                  data-about-delay={index * 90}
                  className={`flex min-h-80 flex-col rounded-2xl p-8 sm:p-10 ${
                    item.featured
                      ? "bg-brand-900 text-white"
                      : "border border-brand-200 bg-white"
                  }`}
                >
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      item.featured ? "bg-white/12 text-brand-100" : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className="mt-auto pt-16">
                    <p className={`text-xs font-semibold ${item.featured ? "text-brand-200" : "text-brand-500"}`}>
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] lg:text-3xl">{item.title}</h3>
                    <p
                      className={`mt-5 text-sm font-normal leading-7 lg:text-base ${
                        item.featured ? "text-white/70" : "text-on-surface-variant"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div data-about-reveal="up" className="mt-5 overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)]">
            <div className="border-b border-brand-200 px-7 py-5 sm:px-9">
              <h3 className="text-sm font-semibold text-brand-700">{t("purpose.values_title")}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = valueIcons[index];
                return (
                  <article
                    key={value.title}
                    className="border-b border-brand-200 p-7 last:border-b-0 sm:p-8 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <Icon className="text-brand-600" size={23} aria-hidden="true" />
                    <h4 className="mt-8 text-lg font-bold">{value.title}</h4>
                    <p className="mt-3 text-sm font-medium leading-6 text-on-surface-variant">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div data-about-reveal="up" className="grid items-end gap-8 lg:grid-cols-[1fr_.65fr]">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {t("business_fields_eyebrow")}
              </div>
              <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.03em]">
                {t("business_fields_title")}
              </h2>
            </div>
            <p className="max-w-xl text-sm font-normal leading-7 text-on-surface-variant lg:text-base">
              {t("business_fields_intro")}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessFields.map((field, index) => (
              <article
                key={field}
                data-about-reveal="up"
                data-about-delay={(index % 3) * 70}
                className="group flex min-h-36 flex-col justify-between rounded-xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)] transition hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)] lg:min-h-44 lg:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-500">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="text-brand-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-600" size={19} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-lg font-bold leading-snug lg:text-xl">{field}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:px-8">
          <div data-about-reveal="left" className="relative min-h-[520px] overflow-hidden rounded-2xl border border-brand-200 bg-brand-100 shadow-[var(--shadow-card)] lg:min-h-[680px]">
            <Image
              src="/images/about/leadership.png"
              alt={t("process.image_alt")}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-950/35" />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/15 bg-brand-950/85 p-5 text-white sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/12 text-brand-100">
                  <MapPin size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-200">{t("process.route_label")}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/75">Lao Bảo · Savannakhet · Mukdahan</p>
                </div>
              </div>
            </div>
          </div>

          <div data-about-reveal="right">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
              <Route size={18} aria-hidden="true" />
              {t("process.eyebrow")}
            </div>
            <h2 className="mt-4 text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              {t("process.title")}
            </h2>
            <p className="mt-6 max-w-2xl text-sm font-normal leading-7 text-on-surface-variant lg:text-base">
              {t("process.intro")}
            </p>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => {
                const Icon = processIcons[index];
                return (
                  <li key={step.title} className="rounded-xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-600">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-semibold text-brand-400">0{index + 1}</span>
                    </div>
                    <h3 className="mt-7 text-lg font-bold">{step.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-on-surface-variant">{step.description}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 rounded-2xl bg-brand-900 p-6 text-white sm:p-8">
              <h3 className="text-lg font-bold">{t("process.commitment_title")}</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {commitments.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3 text-sm font-normal leading-6 text-white/75">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-200" size={18} aria-hidden="true" />
                    {commitment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-20 text-white lg:py-24">
        <Image
          src="/images/about/history-timeline-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-brand-950/90" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div data-about-reveal="up" className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold text-brand-200">
                <Route size={18} aria-hidden="true" />
                {t("timeline_period")}
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.03em]">
                {t("timeline_title")}
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scrollTimeline("left")}
                className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 transition-colors hover:bg-white/10"
                aria-label={t("timeline_prev")}
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTimeline("right")}
                className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 transition-colors hover:bg-white/10"
                aria-label={t("timeline_next")}
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div ref={timelineRef} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5">
            {timeline.map((item, index) => (
              <article
                key={`${item.year}-${index}`}
                className="relative flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col rounded-xl border border-white/10 bg-white/[0.05] p-7 sm:w-[340px] lg:min-h-[340px] lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <strong className="text-4xl font-bold tracking-[-0.03em] text-brand-200 lg:text-5xl">{item.year}</strong>
                  <span className="text-xs text-white/30">0{index + 1}</span>
                </div>
                <div className="mt-auto pt-20">
                  <h3 className="text-xl font-bold leading-snug lg:text-2xl">{item.highlight}</h3>
                  <p className="mt-4 text-sm font-normal leading-7 text-white/60">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div data-about-reveal="up" className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_.65fr]">
            <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              {t("capacity_title")}
            </h2>
            <p className="max-w-xl text-sm font-normal leading-7 text-on-surface-variant lg:text-base">
              {t("capacity_intro")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <article
                key={stat.label}
                data-about-reveal="up"
                data-about-delay={index * 70}
                className="min-h-56 rounded-xl border border-brand-200 bg-white p-7 shadow-[var(--shadow-card)] lg:p-8"
              >
                <strong className="text-4xl font-bold tracking-[-0.03em] text-brand-700 lg:text-5xl">{stat.value}</strong>
                <h3 className="mt-5 text-xs font-semibold text-brand-600">{stat.label}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-on-surface-variant">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-white sm:px-8 lg:py-24">
        <div data-about-reveal="up" className="relative mx-auto grid max-w-7xl items-center gap-10 rounded-2xl bg-brand-900 p-8 sm:p-10 lg:grid-cols-[1.1fr_.65fr] lg:p-14">
          <div>
            <p className="text-xs font-semibold text-brand-200">VILA SANMYSHI · EWEC</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.3rem,4vw,4rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              {t("cta.title")}
            </h2>
          </div>
          <div>
            <p className="text-sm font-normal leading-7 text-white/75 lg:text-base">{t("cta.desc")}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-13 items-center gap-3 rounded-xl bg-white px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-100"
            >
              {t("cta.btn")}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
