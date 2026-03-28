"use client";

import Image from "next/image";
import Link from "next/link";
import { SERVICES_LIST } from "@/constants/services";

export default function HomeServices() {
  // Config for gradients based on service ID
  const serviceConfigs: Record<string, { gradient: string }> = {
    "sea-freight": {
      gradient: "from-blue-500 to-indigo-600",
    },
    "cross-border": {
      gradient: "from-primary to-emerald-500",
    },
    "logistics-fulfillment": {
      gradient: "from-slate-700 to-slate-900",
    },
  };

  const homeServices = SERVICES_LIST.map((service) => ({
    id: service.id,
    title: service.title,
    image: service.image,
    gradient: serviceConfigs[service.id]?.gradient || "from-slate-500 to-slate-600",
  }));

  return (
    <section className="py-24 lg:py-48 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">
              Chúng tôi làm gì
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-tight uppercase">
            Dịch vụ Logistics <span className="text-primary">Toàn diện</span>
          </h2>
          <p className="mt-6 text-on-surface-variant font-medium text-lg lg:text-2xl max-w-2xl leading-relaxed">
            Giải pháp vận tải và khai báo hải quan chuyên nghiệp, giúp tối ưu hóa thời gian và chi phí cho doanh nghiệp.
          </p>
        </div>
        <Link
          href="/services"
          className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary mb-2"
        >
          Xem tất cả dịch vụ
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {homeServices.map((item, i) => (
          <div
            key={i}
            className="group rounded-3xl lg:rounded-[3rem] bg-surface-container-low border border-on-surface/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden relative shadow-lg"
          >
            {/* Image Container */}
            <div className="relative h-48 lg:h-64 overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} opacity-20`} />
              )}
            </div>

            {/* Content Container */}
            <div className="p-8 lg:p-10 flex flex-col flex-grow relative">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity`} />

              <h3 className="text-xl lg:text-3xl font-black mb-6 text-on-surface uppercase tracking-tight leading-tight">
                {item.title}
              </h3>

              <Link
                href={`/services/${item.id}`}
                className="inline-flex items-center gap-3 text-xs lg:text-sm font-black uppercase tracking-widest text-primary hover:gap-5 transition-all group/btn"
              >
                Khám phá ngay
                <span className="material-symbols-outlined text-lg transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
