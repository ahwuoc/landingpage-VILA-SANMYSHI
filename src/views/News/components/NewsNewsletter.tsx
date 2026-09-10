"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslations } from "next-intl";

export default function NewsNewsletter() {
  const t = useTranslations("NewsPage.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email, source: "News Page" }]);

      if (error) {
        if (error.code === "23505") {
          setMessage(t('already_subscribed'));
        } else {
          throw error;
        }
        setStatus("error");
      } else {
        setStatus("success");
        setMessage(t('success_msg'));
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(t('error_msg'));
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 text-on-primary sm:px-8 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-brand-900 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.03em] md:mb-6 md:text-5xl" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
            <p className="mx-auto mb-8 max-w-2xl text-base font-normal leading-7 text-white/70 md:mb-10 md:text-lg">
              {t('desc')}
            </p>

            {status === "success" ? (
              <div className="animate-fade-in rounded-xl border border-white/20 bg-white/10 p-6 md:p-8">
                <span className="material-symbols-outlined text-4xl md:text-5xl mb-4 text-white">check_circle</span>
                <p className="text-lg md:text-xl font-bold">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholder')}
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-normal text-white placeholder:text-white/50 transition-colors focus:border-white/40 focus:bg-white/15 focus:outline-none disabled:opacity-50 md:px-8 md:py-5"
                  />
                  {status === "error" && (
                    <span className="absolute -bottom-6 left-2 text-[10px] font-bold text-white/80 animate-shake">
                      {message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-xl bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-50 md:px-10 md:py-5"
                >
                  {status === "loading" ? t('btn_loading') : t('btn_submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
