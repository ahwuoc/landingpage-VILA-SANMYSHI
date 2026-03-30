"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ServiceItem } from "@/lib/data";
import PageHero from "@/components/PageHero";

export default function ServiceCategoryView({ services, categorySlug, categoryName }: {
  services: ServiceItem[];
  categorySlug: string;
  categoryName: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.content?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-surface text-on-surface">
      <PageHero
        image={services[0]?.image || "/images/services/sea-freight-premium.png"}
        imageAlt={categoryName}
        overlay="bg-black/30"
        imageOpacity="opacity-60"
        breadcrumb={[
          { label: "Dịch vụ", href: "/services" },
          { label: categoryName },
        ]}
        tag="VILA SANMYSHI LOGISTICS"
        title={<>Danh mục <br /><span className="text-primary">{categoryName}</span></>}
        description={`Khám phá các giải pháp ${categoryName.toLowerCase()} chuyên nghiệp tại Cửa khẩu Lao Bảo.`}
      />

      <section className="py-20 max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-label-md font-black uppercase tracking-widest">
              {filtered.length} dịch vụ{search && ` cho "${search}"`}
            </span>
          </div>
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-xl">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm dịch vụ..."
              className="w-full pl-12 pr-4 py-3 bg-surface-container-high border border-on-surface/5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-on-surface/5">
          {filtered.length === 0 && (
            <p className="text-muted text-center py-16 text-body-md">Không tìm thấy dịch vụ nào.</p>
          )}
          {filtered.map((service) => (
            <Link
              key={service.id}
              href={`/services/${categorySlug}/${service.id}`}
              className="group flex gap-6 py-6 hover:bg-surface-container-low rounded-2xl px-4 -mx-4 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative w-32 h-24 lg:w-48 lg:h-36 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="200px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {categoryName}
                    </span>
                  </div>
                  <h3 className="text-base lg:text-xl font-black tracking-tight leading-snug group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-body-sm text-muted line-clamp-2 hidden sm:block"
                    dangerouslySetInnerHTML={{ __html: service.content?.replace(/<[^>]*>/g, "").substring(0, 120) + "..." }}
                  />
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  Xem chi tiết
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
