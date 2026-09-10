"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { COMPANY_INFO, BRAND_NAME } from "@/constants/company";
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";

export default function ContactView() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<{ id: string; title: Record<string, string> }[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then(r => r.json())
      .then(data => setServices(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
 

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || t('error_msg'));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      <PageHero
        image="/images/contact/hero.png"
        imageAlt="VILA SANMYSHI Contact"
        overlay="bg-brand-950/55"
        align="center"
        breadcrumb={[{ label: t('page_title') }]}
        tag={t('hero_tag')}
        title={<span dangerouslySetInnerHTML={{ __html: t.raw('hero_title').replace('{brand}', BRAND_NAME) }} />}
        description={t('hero_desc')}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info & Support Image */}
          <div className="space-y-12 lg:space-y-16 order-2 lg:order-1">
            <div>
              <div className="mb-10 lg:mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{t('support_badge')}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-[-0.03em] lg:text-4xl" dangerouslySetInnerHTML={{ __html: t.raw('support_title') }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="rounded-2xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                    <span className="material-symbols-outlined text-primary text-xl lg:text-2xl">call</span>
                  </div>
                  <h3 className="mb-1 text-base font-bold tracking-[-0.02em] lg:mb-2 lg:text-lg">{t('phone_label')}</h3>
                  <p className="text-sm lg:text-base text-on-surface-variant font-bold">{COMPANY_INFO.phone}</p>
                  <p className="text-[10px] lg:text-xs text-slate-400 mt-2 font-medium">{t('phone_note')}</p>
                </div>
                <div className="rounded-2xl bg-brand-900 p-6 text-white lg:p-8">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                    <span className="material-symbols-outlined text-white text-xl lg:text-2xl">mail</span>
                  </div>
                  <h3 className="mb-1 text-base font-bold tracking-[-0.02em] lg:mb-2 lg:text-lg">{t('email_label')}</h3>
                  <p className="text-sm font-bold text-white lg:text-base">{COMPANY_INFO.email}</p>
                  <p className="mt-2 text-[10px] font-normal text-white/55 lg:text-xs">{t('email_note')}</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-brand-200 bg-brand-900 shadow-[var(--shadow-card)]">
              <Image
                src="/images/contact/support.png"
                alt="Đội ngũ hỗ trợ khách hàng VILA SANMYSHI"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-brand-950/35" />
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1 lg:mb-2 italic">{t('team_badge')}</div>
                <div className="text-xl lg:text-2xl font-black tracking-tight uppercase">{t('team_title')}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 lg:p-10">
              <h3 className="text-lg lg:text-xl font-black mb-4 lg:mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-primary lg:text-3xl">location_on</span>
                {t('address_title')}
              </h3>
              <p className="text-sm lg:text-base text-on-surface-variant font-bold leading-relaxed">
                {COMPANY_INFO.address.split(',').slice(0, 2).join(',')}, <br />
                {COMPANY_INFO.address.split(',').slice(2).join(',')}
              </p>
              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white border border-on-surface/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
                  {t('btn_directions')}
                </button>
                <button className="flex-1 bg-white border border-on-surface/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
                  {t('btn_office')}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 flex h-fit flex-col rounded-2xl border border-brand-200 bg-white p-8 shadow-[var(--shadow-card)] md:p-10 lg:order-2 lg:p-12">
            <div className="mb-8 lg:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{t('form_badge')}</span>
              </div>
              <h2 className="mb-3 text-2xl font-bold tracking-[-0.03em] text-on-surface lg:mb-4 lg:text-3xl" dangerouslySetInnerHTML={{ __html: t.raw('form_title') }} />
              <p className="text-base font-normal leading-7 text-on-surface-variant lg:text-lg">{t('form_desc')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-2 lg:space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500 uppercase">{t('field_name')}</label>
                  <input name="name" type="text" required placeholder="Nguyễn Văn A" className="w-full rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-normal transition-colors focus:border-primary focus:bg-white focus:outline-none lg:p-5" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500 uppercase">{t('field_phone')}</label>
                  <input name="phone" type="tel" required placeholder="090 000 0000" className="w-full rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-normal transition-colors focus:border-primary focus:bg-white focus:outline-none lg:p-5" />
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500 uppercase">{t('field_email')}</label>
                <input name="email" type="email" placeholder="email@gmail.com" className="w-full rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-normal transition-colors focus:border-primary focus:bg-white focus:outline-none lg:p-5" />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500 uppercase">{t('field_service')}</label>
                <div className="relative">
                  <select name="service" className="w-full appearance-none rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-medium transition-colors focus:border-primary focus:bg-white focus:outline-none lg:p-5">
                    {services.map(s => {
                      const title = s.title[locale] || s.title['vi'];
                      return (
                        <option key={s.id} value={title}>{title}</option>
                      );
                    })}
                  </select>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-faint">expand_more</span>
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500 uppercase">{t('field_message')}</label>
                <textarea name="message" rows={4} placeholder={t('placeholder_message')} className="w-full resize-none rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-normal transition-colors focus:border-primary focus:bg-white focus:outline-none lg:p-5" />
              </div>

              {success && (
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-5">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-primary">{t('success_msg')}</p>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-brand-300 bg-brand-100 p-5">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-on-surface">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-5 text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 lg:text-sm"
              >
                {loading ? t('btn_loading') : t('btn_submit')}
              </button>

              <p className="text-[8px] lg:text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest mt-4">
                {t('privacy_note')}
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="group relative mx-6 mb-20 h-[450px] overflow-hidden rounded-2xl border border-brand-200 shadow-[var(--shadow-card)] sm:mx-8 lg:mb-24 lg:h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15246.131102555555!2d106.5744!3d16.6321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316ae38c11e737bd%3A0x673416e788812c3b!2zQ-G7rWEga2jhuql1IFF14buRYyB04bq_IExhbyBC4bqjbw!5e0!3m2!1svi!2svn!4v1711181234567!5m2!1svi!2svn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-0 hover:grayscale-0 transition-all duration-700"
          title="Google Maps Location"
        ></iframe>
        <div className="absolute left-6 top-6 max-w-xs rounded-xl border border-brand-200 bg-white/95 p-4 shadow-[var(--shadow-card)] lg:left-10 lg:top-10 lg:p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <h4 className="font-black text-xs lg:text-sm uppercase tracking-tight">{t('map_office')}</h4>
          </div>
          <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase leading-relaxed uppercase tracking-tighter">Cửa khẩu Lao Bảo, <br />Quảng Trị, Việt Nam</p>
        </div>
      </section>
    </div>
  );
}
