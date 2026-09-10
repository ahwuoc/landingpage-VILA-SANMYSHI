"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function ConsultationModal({ isOpen, onClose, serviceName }: ConsultationModalProps) {
  const t = useTranslations("ConsultationModal");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campaignBenefits = Array.from({ length: 3 }, (_, index) => t(`campaign_benefits.${index}`));
  const selectedService = serviceName || t("campaign_service");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setError(null);
    setIsSubmitted(false);
    onCloseRef.current();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: "",
      service: selectedService,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || t("error_msg"));
      }

      setIsSubmitted(true);
      window.setTimeout(handleClose, 3000);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t("error_msg"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center p-3 sm:p-5 lg:p-8">
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-brand-950/75 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-label={t("close_label")}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        className="relative max-h-[94svh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-elevated)] animate-scale-in lg:overflow-hidden"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-xl border border-brand-200 bg-white text-on-surface shadow-[var(--shadow-card)] transition-colors hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-200 lg:right-5 lg:top-5"
          aria-label={t("close_label")}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="grid min-h-[520px] place-items-center bg-brand-50 p-8 text-center lg:min-h-[620px] lg:p-16" aria-live="polite">
            <div className="max-w-lg">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-brand-600 text-white">
                <CheckCircle2 size={38} aria-hidden="true" />
              </span>
              <p className="mt-8 text-sm font-semibold text-brand-600">VILA SANMYSHI</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-brand-950 lg:text-4xl">
                {t("success_title")}
              </h2>
              <p className="mt-5 text-base leading-8 text-on-surface-variant">{t("success_msg")}</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <section className="relative overflow-hidden bg-brand-900 p-6 text-white sm:p-9 lg:min-h-[650px] lg:p-12">
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  <FileCheck2 size={16} aria-hidden="true" />
                  {t("campaign_badge")}
                </div>

                <h2 id="consultation-modal-title" className="mt-6 max-w-xl text-2xl font-bold leading-[1.16] tracking-[-0.03em] sm:mt-7 sm:text-4xl lg:text-[2.7rem]">
                  {t("campaign_title")}
                </h2>
                <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72 sm:text-base">
                  {t("campaign_desc")}
                </p>

                <ul className="mt-6 grid gap-3 sm:mt-8">
                  {campaignBenefits.map((benefit, index) => (
                    <li
                      key={benefit}
                      className={`${index > 0 ? "hidden sm:flex" : "flex"} items-start gap-3 rounded-xl border border-white/10 p-4 text-sm font-normal leading-6 text-white/80`}
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-brand-200" size={18} aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 hidden rounded-xl border border-white/12 bg-brand-950/35 p-5 sm:block">
                  <div className="flex items-center justify-between gap-4 text-[10px] font-semibold text-brand-200">
                    <span>LAO BẢO</span>
                    <Route size={17} aria-hidden="true" />
                    <span>SAVANNAKHET</span>
                    <Route size={17} aria-hidden="true" />
                    <span>MUKDAHAN</span>
                  </div>
                  <div className="relative mt-4 h-px bg-white/20" aria-hidden="true">
                    <span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-brand-200" />
                    <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-200" />
                    <span className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-brand-200" />
                  </div>
                </div>

                <p className="mt-6 hidden items-center gap-2 text-xs font-medium leading-5 text-white/58 sm:flex">
                  <ShieldCheck className="shrink-0 text-brand-200" size={17} aria-hidden="true" />
                  {t("campaign_note")}
                </p>
              </div>
            </section>

            <section className="bg-white p-7 sm:p-9 lg:flex lg:min-h-[650px] lg:flex-col lg:justify-center lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600">{t("form_label")}</p>
              <h3 className="mt-3 max-w-md text-2xl font-bold leading-tight tracking-[-0.025em] text-brand-950 sm:text-3xl">
                {t("form_title")}
              </h3>
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{t("form_intro")}</p>

              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-100 px-3 py-1.5 text-[10px] font-semibold text-brand-600">
                <FileCheck2 size={14} aria-hidden="true" />
                {t("service_label")}: {selectedService}
              </div>

              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold text-brand-800">{t("name_label")}</span>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={t("name_placeholder")}
                      className="min-h-13 w-full rounded-xl border border-brand-200 bg-brand-50 px-4 text-sm font-normal text-on-surface outline-none transition focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold text-brand-800">{t("phone_label")}</span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={t("phone_placeholder")}
                      className="min-h-13 w-full rounded-xl border border-brand-200 bg-brand-50 px-4 text-sm font-normal text-on-surface outline-none transition focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold text-brand-800">{t("message_label")}</span>
                  <textarea
                    rows={3}
                    name="message"
                    defaultValue={t("default_message", { service: selectedService })}
                    placeholder={t("message_placeholder")}
                    className="w-full resize-none rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-normal leading-6 text-on-surface outline-none transition focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100"
                  />
                </label>

                {error && (
                  <p className="rounded-xl border border-brand-300 bg-brand-100 p-3 text-center text-xs font-semibold text-on-surface" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? t("btn_loading") : t("btn_submit")}
                  {!isLoading && <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />}
                </button>

                <p className="text-center text-[10px] font-medium leading-5 text-on-surface-variant">
                  {t("privacy_note")}
                </p>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
