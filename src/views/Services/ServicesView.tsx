"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ServiceItem } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";

export default function ServicesView({ services, id }: { services: ServiceItem[]; id?: string }) {
  const filtered = useMemo(() => {
    if (!id) return services;
    return services.filter(s => s.id === id);
  }, [services, id]);

  const isSingle = !!id && filtered.length === 1;
  const singleService = isSingle ? filtered[0] : null;

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-page-dark">
        <div className="absolute inset-0 opacity-40">
          <Image src={singleService?.image || "/images/services/sea-freight-premium.png"} alt={singleService?.title || "Dịch vụ VILA SANMYSHI"} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
          <Breadcrumb
            items={[
              { label: "Dịch vụ", href: "/services" },
              { label: singleService?.title || "Tất cả giải pháp" }
            ]}
            isDark={true}
          />
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">
              VILA SANMYSHI LOGISTICS
            </span>
          </div>
          <h1 className="text-display-lg text-on-dark mb-8">
            {isSingle ? (
              <>
                Chi tiết <br />
                <span className="text-primary text-outline-white">Dịch vụ</span>
              </>
            ) : (
              <>
                Giải pháp <br />
                <span className="text-primary text-outline-white">Logistics</span> <br />
                Toàn diện
              </>
            )}
          </h1>
        </div>
      </header>

      {/* Services Sections */}
      <section className="py-20 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32 lg:space-y-64">
          {filtered.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col gap-16 lg:gap-24 scroll-mt-32 lg:scroll-mt-48 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Service Meta & Image Block */}
              <div className="lg:w-2/5 space-y-8">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                  {!isSingle && (
                    <div className="absolute bottom-10 left-10">
                      <span className="text-6xl lg:text-8xl font-black text-white/20">0{index + 1}</span>
                    </div>
                  )}
                </div>

                <div className="p-10 bg-surface-container-low rounded-[2.5rem] border border-on-surface/5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Cam kết chất lượng</h4>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Chúng tôi đảm bảo tính minh bạch, an toàn và tiến độ hỏa tốc cho mọi lô hàng thuộc tuyến {service.title}.
                  </p>
                </div>
              </div>

              {/* Service Content Block */}
              <div className="lg:w-3/5">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-[2px] bg-primary rounded-full" />
                  <span className="text-primary text-xs font-black uppercase tracking-widest">
                    {isSingle ? "Thông tin chi tiết" : "Dịch vụ cốt lõi"}
                  </span>
                </div>

                <h2 className="text-heading-lg text-on-surface mb-12">
                  {service.title}
                </h2>

                <article
                  className="prose prose-base max-w-none
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase
                    prose-h3:text-lg prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-primary
                    prose-p:mb-4 prose-p:leading-relaxed
                    prose-ul:mb-6 prose-li:mb-1
                    prose-table:text-sm prose-table:my-8
                    prose-th:bg-surface-container-high prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-on-surface/10
                    prose-strong:text-on-surface prose-strong:font-bold"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />

                <div className="mt-16 pt-12 border-t border-on-surface/10">
                  <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[0.98] transition-all shadow-glow-primary active:scale-95">
                    Nhận báo giá {service.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Global Bottom CTA */}
      <section className="bg-page-dark py-32 lg:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary rounded-full blur-[200px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-display-md text-on-dark mb-12">
            Bắt đầu hành trình <br /> <span className="text-primary">Vươn tầm quốc tế</span>
          </h2>
          <p className="text-body-xl text-on-dark-muted mb-12 max-w-2xl mx-auto">
            Kết nối mạng lưới logistics toàn cầu với VILA SANMYSHI. Chúng tôi đồng hành cùng sự thành công của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-glow-primary transition-all w-full sm:w-auto">
              Liên hệ chuyên gia
            </button>
            <button className="px-10 py-5 bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto">
              Tìm hiểu quy trình
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
