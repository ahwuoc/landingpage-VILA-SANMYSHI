"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface ConsultationModalProps {
   isOpen: boolean;
   onClose: () => void;
   serviceName?: string;
}

export default function ConsultationModal({ isOpen, onClose, serviceName }: ConsultationModalProps) {
   const t = useTranslations("ConsultationModal");
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
      return () => {
         document.body.style.overflow = "unset";
      };
   }, [isOpen]);

   if (!isOpen) return null;

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      const form = e.currentTarget;
      const data = {
         name: (form.elements.namedItem("name") as HTMLInputElement).value,
         phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
         email: "",
         service: serviceName || "",
         message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      };
      try {
         const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });
         if (!res.ok) {
            const json = await res.json();
            throw new Error(json.error || (res.statusText === "Internal Server Error" ? t('error_msg') : res.statusText));
         }
         setIsSubmitted(true);
         setTimeout(() => { onClose(); setIsSubmitted(false); }, 3000);
      } catch (err: any) {
         setError(err.message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8">
         <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in"
            onClick={onClose}
         />

         {/* Modal Content */}
         <div className="relative w-[92vw] sm:w-full max-w-xl mx-auto bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in flex-shrink-0">
            {isSubmitted ? (
               <div className="p-8 lg:p-20 text-center flex flex-col items-center gap-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
                     <span className="material-symbols-outlined text-4xl lg:text-5xl">check_circle</span>
                  </div>
                  <h2 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter">{t('success_title')}</h2>
                  <p className="text-sm lg:text-base text-slate-500 font-medium px-4">{t('success_msg')}</p>
               </div>
            ) : (
               <>
                  <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10">
                     <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm"
                     >
                        <span className="material-symbols-outlined">close</span>
                     </button>
                  </div>

                  <div className="p-6 lg:p-12 overflow-y-auto max-h-[90vh]">
                     <div className="mb-6 lg:mb-10 mt-4 lg:mt-0">
                        <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] mb-3 block">{t('form_label')}</span>
                        <h2 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-tight">{t('form_title')}</h2>
                        {serviceName && (
                           <div className="mt-4 inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                              {t('service_label')}: {serviceName}
                           </div>
                        )}
                     </div>

                     <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                           <div className="space-y-2 lg:space-y-3">
                              <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">{t('name_label')}</label>
                           <input required type="text" name="name" placeholder={t('name_placeholder')} className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all shadow-inner" />
                           </div>
                           <div className="space-y-2 lg:space-y-3">
                              <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">{t('phone_label')}</label>
                              <input required type="tel" name="phone" placeholder={t('phone_placeholder')} className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all shadow-inner" />
                           </div>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                           <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">{t('message_label')}</label>
                           <textarea rows={3} name="message" defaultValue={serviceName ? t('default_message', {service: serviceName}) : ""} placeholder={t('message_placeholder')} className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all resize-none shadow-inner" />
                        </div>

                        {error && (
                           <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                              <p className="text-rose-600 text-xs font-black uppercase tracking-widest text-center">{error}</p>
                           </div>
                        )}

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-primary text-white py-5 lg:py-6 rounded-xl lg:rounded-2xl font-black text-xs lg:text-sm uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                           {isLoading ? t('btn_loading') : t('btn_submit')}
                        </button>

                        <p className="text-[9px] text-center font-bold text-slate-400 leading-relaxed max-w-sm mx-auto">
                           {t('privacy_note')}
                        </p>
                     </form>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
