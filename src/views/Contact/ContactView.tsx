"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { COMPANY_INFO, BRAND_NAME } from "@/constants/company";
import Breadcrumb from "@/components/Breadcrumb";

export default function ContactView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<{ id: string; title: string }[]>([]);

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
        throw new Error(errorData.error || "Gửi yêu cầu thất bại");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-page-dark">
        <div className="absolute inset-0">
          <Image src="/images/contact/hero.png" alt="Liên hệ tư vấn Logistics VILA SANMYSHI" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 animate-fade-up">
          <div className="flex justify-center">
            <Breadcrumb items={[{ label: "Liên hệ" }]} isDark={true} />
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-label-md">Kết nối với chuyên gia</span>
                <span className="w-10 h-[2px] bg-primary rounded-full" />
              </div>
            </div>
            <h1 className="text-display-md text-on-dark mb-8 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
              LIÊN HỆ <span className="text-primary">{BRAND_NAME}</span>
            </h1>
            <p className="text-body-xl text-white max-w-2xl mx-auto [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc về nhu cầu Logistics và XNK của bạn 24/7.
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info & Support Image */}
          <div className="space-y-12 lg:space-y-16">
            <div>
              <div className="mb-10 lg:mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-primary rounded-full" />
                  <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">Liên hệ trực tiếp</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase">Thông tin <span className="text-primary">Hỗ trợ</span></h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="p-6 lg:p-8 bg-white rounded-3xl lg:rounded-[2.5rem] shadow-xl border border-on-surface/5">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                    <span className="material-symbols-outlined text-primary text-xl lg:text-2xl">call</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-black mb-1 lg:mb-2 uppercase tracking-tight">Số điện thoại</h3>
                  <p className="text-sm lg:text-base text-on-surface-variant font-bold">{COMPANY_INFO.phone}</p>
                  <p className="text-[10px] lg:text-xs text-slate-400 mt-2 font-medium">Hỗ trợ 24/7 (Zalo/Viber)</p>
                </div>
                <div className="p-6 lg:p-8 bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] shadow-xl lg:shadow-2xl">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                    <span className="material-symbols-outlined text-white text-xl lg:text-2xl">mail</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-black mb-1 lg:mb-2 uppercase tracking-tight">Email</h3>
                  <p className="text-sm lg:text-base text-primary font-bold">{COMPANY_INFO.email}</p>
                  <p className="text-[10px] lg:text-xs text-slate-500 mt-2 font-medium">Phản hồi trong 2 giờ</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-xl lg:shadow-2xl bg-slate-900">
              <Image
                src="/images/contact/support.png"
                alt="Đội ngũ hỗ trợ khách hàng VILA SANMYSHI"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1 lg:mb-2 italic">Đội ngũ hỗ trợ</div>
                <div className="text-xl lg:text-2xl font-black tracking-tight uppercase">Tận tâm phục vụ 24/7</div>
              </div>
            </div>

            <div className="p-6 lg:p-10 bg-surface-container-high rounded-3xl lg:rounded-[3rem] border border-on-surface/5">
              <h3 className="text-lg lg:text-xl font-black mb-4 lg:mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-primary lg:text-3xl">location_on</span>
                Trụ sở chính
              </h3>
              <p className="text-sm lg:text-base text-on-surface-variant font-bold leading-relaxed">
                {COMPANY_INFO.address.split(',').slice(0, 2).join(',')}, <br />
                {COMPANY_INFO.address.split(',').slice(2).join(',')}
              </p>
              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white border border-on-surface/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
                  Chỉ đường (Google Maps)
                </button>
                <button className="flex-1 bg-white border border-on-surface/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
                  Xem văn phòng
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl lg:rounded-[4rem] p-8 md:p-12 lg:p-16 shadow-xl lg:shadow-2xl border border-on-surface/5 flex flex-col h-fit">
            <div className="mb-8 lg:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">Yêu cầu báo giá</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-3 lg:mb-4 uppercase text-slate-900">Gửi tin nhắn <span className="text-primary">ngay</span></h2>
              <p className="text-on-surface-variant text-base lg:text-xl font-medium opacity-70">Chúng tôi sẽ chủ động liên hệ lại với bạn trong thời gian sớm nhất.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-2 lg:space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Họ và Tên*</label>
                  <input name="name" type="text" required placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all shadow-inner" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Số điện thoại*</label>
                  <input name="phone" type="tel" required placeholder="090 000 0000" className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all shadow-inner" />
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Email (Không bắt buộc)</label>
                <input name="email" type="email" placeholder="email@gmail.com" className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all shadow-inner" />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Dịch vụ quan tâm</label>
                <div className="relative">
                  <select name="service" className="w-full bg-surface-container-low border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-black appearance-none focus:bg-card focus:border-primary focus:outline-none transition-all shadow-inner">
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-faint">expand_more</span>
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest ml-1 text-slate-500">Yêu cầu cụ thể</label>
                <textarea name="message" rows={4} placeholder="Vui lòng mô tả yêu cầu hoặc lô hàng của bạn..." className="w-full bg-slate-50 border border-transparent rounded-xl lg:rounded-2xl p-4 lg:p-5 text-sm font-medium focus:bg-white focus:border-primary focus:outline-none transition-all resize-none shadow-inner" />
              </div>

              {success && (
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-emerald-500 text-xs font-black uppercase tracking-widest text-center">Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm.</p>
                </div>
              )}

              {error && (
                <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                  <p className="text-rose-500 text-xs font-black uppercase tracking-widest text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-5 lg:py-6 rounded-xl lg:rounded-2xl font-black text-xs lg:text-sm uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang gửi..." : "Gửi yêu cầu ngay"}
              </button>

              <p className="text-[8px] lg:text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest mt-4">
                Cam kết bảo mật thông tin khách hàng 100%
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="mx-4 lg:mx-8 mb-20 lg:mb-32 h-[450px] lg:h-[600px] rounded-3xl lg:rounded-[4rem] overflow-hidden relative shadow-xl lg:shadow-2xl border-4 lg:border-8 border-white group">
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
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 bg-white/90 backdrop-blur-md p-4 lg:p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs group-hover:translate-y-[-10px] transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <h4 className="font-black text-xs lg:text-sm uppercase tracking-tight">Văn phòng đại diện</h4>
          </div>
          <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase leading-relaxed uppercase tracking-tighter">Cửa khẩu Lao Bảo, <br />Quảng Trị, Việt Nam</p>
        </div>
      </section>
    </div>
  );
}
