"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceItem } from "@/lib/data";
import ConsultationModal from "@/components/ConsultationModal";
import PageHero from "@/components/PageHero";

function ServicesViewInner({ services, id, categorySlug, categoryName }: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(() => searchParams.get("category") || "all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const categories = useMemo(() => {
    const cats = [...new Set(services.map(s => s.category).filter(Boolean))];
    return cats as string[];
  }, [services]);

  const filtered = useMemo(() => {
    if (id) return services.filter(s => s.id === id);
    if (activeCategory === "all") return services;
    return services.filter(s => s.category === activeCategory);
  }, [services, id, activeCategory]);

  const isSingle = !!id && filtered.length === 1;
  const singleService = isSingle ? filtered[0] : null;

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      <PageHero
        image={singleService?.image || "/images/services/sea-freight-premium.png"}
        imageAlt={singleService?.title || "Dịch vụ VILA SANMYSHI"}
        overlay="bg-black/30"
        imageOpacity="opacity-60"
        breadcrumb={[
          { label: "Dịch vụ", href: "/services" },
          ...(categorySlug && categoryName ? [{ label: categoryName, href: `/services/${categorySlug}` }] : []),
          ...(isSingle && singleService ? [{ label: singleService.title }] : [{ label: categoryName || "Tất cả giải pháp" }]),
        ]}
        tag="VILA SANMYSHI LOGISTICS"
        title={isSingle
          ? <>Chi tiết <br /><span className="text-primary">Dịch vụ</span></>
          : <>Giải pháp <br /><span className="text-primary">Logistics</span> <br />Toàn diện</>
        }
      />

      {/* Category Filter Tabs — chỉ hiện khi xem tất cả */}
      {!isSingle && categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === "all" ? "bg-primary text-white shadow-glow-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary"}`}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-primary text-white shadow-glow-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

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
                  <button
                    onClick={() => openModal(service.title)}
                    className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[0.98] transition-all shadow-glow-primary active:scale-95"
                  >
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

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}

export default function ServicesView(props: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
}) {
  return (
    <Suspense fallback={null}>
      <ServicesViewInner {...props} />
    </Suspense>
  );
}
