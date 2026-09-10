"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceItem } from "@/lib/data";
import ConsultationModal from "@/components/ConsultationModal";
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import ImageExtension from "@tiptap/extension-image";
import { Link as LinkExtension } from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";

const fallbackServices: ServiceItem[] = [
  {
    id: "fallback-customs",
    title: { vi: "Tư vấn hồ sơ và mã HS", en: "Document and HS code advice", th: "ให้คำปรึกษาเอกสารและรหัส HS" },
    image: "/images/services/customs.png",
    content: {
      vi: "<p>Kiểm tra chính sách mặt hàng, thuế, mã HS và bộ chứng từ trước khi mở tờ khai.</p>",
      en: "<p>Review commodity policy, tax, HS codes and document sets before filing.</p>",
      th: "<p>ตรวจนโยบายสินค้า ภาษี รหัส HS และชุดเอกสารก่อนยื่นใบขน</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Khai báo hải quan", en: "Customs", th: "ศุลกากร" }, slug: "customs" },
  },
  {
    id: "fallback-cross-border",
    title: { vi: "Vận chuyển Việt Nam – Lào – Thái Lan", en: "Vietnam – Laos – Thailand transport", th: "ขนส่งเวียดนาม – ลาว – ไทย" },
    image: "/images/services/cross-border-premium.png",
    content: {
      vi: "<p>Điều phối phương tiện và lịch trình xuyên suốt hành lang kinh tế Đông – Tây.</p>",
      en: "<p>Coordinate vehicles and schedules across the East–West Economic Corridor.</p>",
      th: "<p>ประสานรถและกำหนดการตลอดระเบียงเศรษฐกิจตะวันออก–ตะวันตก</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Vận tải quốc tế", en: "Transport", th: "ขนส่ง" }, slug: "transport" },
  },
  {
    id: "fallback-warehousing",
    title: { vi: "Kho bãi, gom hàng và giao nhận", en: "Storage, consolidation and delivery", th: "จัดเก็บ รวบรวม และส่งมอบ" },
    image: "/images/services/warehouse.png",
    content: {
      vi: "<p>Phương án lưu kho và gom chuyến linh hoạt theo nhu cầu của từng lô hàng.</p>",
      en: "<p>Flexible storage and consolidation plans tailored to each shipment.</p>",
      th: "<p>แผนจัดเก็บและรวมเที่ยวที่ยืดหยุ่นตามความต้องการของแต่ละงาน</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Kho vận", en: "Warehousing", th: "คลังสินค้า" }, slug: "warehousing" },
  },
  {
    id: "fallback-border-handover",
    title: { vi: "Giao nhận Lao Bảo – Dansavanh", en: "Lao Bao – Dansavanh handover", th: "ส่งมอบลาวบาว – แดนสะหวัน" },
    image: "/images/services/hub.png",
    content: {
      vi: "<p>Phối hợp phương tiện, chứng từ và bàn giao hàng tại cặp cửa khẩu trọng điểm.</p>",
      en: "<p>Coordinate vehicles, documents and cargo handover at the key border pair.</p>",
      th: "<p>ประสานรถ เอกสาร และการส่งมอบสินค้าที่คู่ด่านสำคัญ</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Tại cửa khẩu", en: "Border handling", th: "บริการหน้าด่าน" }, slug: "border-handling" },
  },
  {
    id: "fallback-compliance",
    title: { vi: "Kiểm tra chính sách mặt hàng", en: "Commodity policy review", th: "ตรวจนโยบายสินค้า" },
    image: "/images/services/fulfillment-premium.png",
    content: {
      vi: "<p>Rà soát giấy phép, xuất xứ, thuế và yêu cầu quản lý chuyên ngành trước khi hàng đi.</p>",
      en: "<p>Check permits, origin, tax and specialist requirements before cargo moves.</p>",
      th: "<p>ตรวจใบอนุญาต ถิ่นกำเนิด ภาษี และข้อกำหนดเฉพาะก่อนขนส่ง</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Tuân thủ", en: "Compliance", th: "การปฏิบัติตาม" }, slug: "compliance" },
  },
  {
    id: "fallback-tracking",
    title: { vi: "Theo dõi chứng từ và phương tiện", en: "Document and vehicle tracking", th: "ติดตามเอกสารและยานพาหนะ" },
    image: "/images/services/container-stat.png",
    content: {
      vi: "<p>Một đầu mối cập nhật hồ sơ, vị trí phương tiện và tiến độ bàn giao xuyên suốt.</p>",
      en: "<p>One contact reports document, vehicle and final handover progress throughout.</p>",
      th: "<p>ผู้ประสานงานหลักอัปเดตเอกสาร รถ และความคืบหน้าการส่งมอบตลอดงาน</p>",
    },
    created_at: "",
    service_categories: { name: { vi: "Điều phối", en: "Coordination", th: "การประสานงาน" }, slug: "coordination" },
  },
];

function ServicesViewInner({ services, id, categorySlug, categoryName }: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
  catSlugMap?: Record<string, string>;
}) {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const activeCategory = selectedCategory || searchParams.get("category") || "all";
  const displayServices = useMemo(() => services.length > 0 ? services : fallbackServices, [services]);

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const categories = useMemo(() => {
    const unique = new Map<string, { name: string; slug: string }>();
    displayServices.forEach(s => {
      if (s.service_categories) {
        const name = s.service_categories.name[locale] || s.service_categories.name['vi'];
        unique.set(name, { name, slug: s.service_categories.slug });
      }
    });
    return Array.from(unique.values());
  }, [displayServices, locale]);

  const filtered = useMemo(() => {
    if (id) return displayServices.filter(s => s.id === id);
    if (activeCategory === "all") return displayServices;
    return displayServices.filter(s => s.service_categories?.slug === activeCategory);
  }, [displayServices, id, activeCategory]);

  const isSingle = !!id && filtered.length === 1;
  const singleService = isSingle ? filtered[0] : null;

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      <PageHero
        image={singleService?.image || "/images/services/sea-freight-premium.png"}
        imageAlt={(
          singleService?.title[locale] || singleService?.title['vi']
        ) || t('page_title')}
        overlay="bg-brand-950/60"
        imageOpacity="opacity-60"
        breadcrumb={[
          { label: t('page_title'), href: "/services" },
          ...(categorySlug && categoryName ? [{ label: categoryName, href: `/services/${categorySlug}` }] : []),
          ...(isSingle && singleService ? [{ label: singleService.title[locale] || singleService.title['vi'] }] : [{ label: categoryName || t('breadcrumb_all') }]),
        ]}
        tag={t('hero_tag')}
        title={isSingle
          ? <span dangerouslySetInnerHTML={{ __html: t.raw('hero_title_detail') }} />
          : <span dangerouslySetInnerHTML={{ __html: t.raw('hero_title_list') }} />
        }
      />

      {!isSingle && categories.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${activeCategory === "all" ? "border-primary bg-primary text-white" : "border-brand-200 bg-white text-on-surface-variant hover:border-brand-400 hover:text-on-surface"}`}
            >
              {t('filter_all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-xl border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${activeCategory === cat.slug ? "border-primary bg-primary text-white" : "border-brand-200 bg-white text-on-surface-variant hover:border-brand-400 hover:text-on-surface"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {isSingle && singleService ? (
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-12">
                  <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {categoryName}
                  </span>
                  <h1 className="mb-8 text-4xl font-bold leading-tight tracking-[-0.03em] text-on-surface lg:text-6xl">
                    {singleService.title[locale] || singleService.title['vi']}
                  </h1>

                  <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-2xl border border-brand-200 shadow-[var(--shadow-card)]">
                    <Image
                      src={singleService.image}
                      alt={singleService.title[locale] || singleService.title['vi']}
                      fill
                      className="object-cover"
                      preload
                    />
                  </div>

                  <ServiceContent content={singleService.content[locale] || singleService.content['vi'] || ""} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-96 flex-shrink-0">
                <div className="sticky top-32 space-y-8">
                  <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white lg:p-10">
                    <h3 className="relative z-10 mb-4 text-2xl font-bold tracking-[-0.02em]">{t('cta_expert')}</h3>
                    <p className="relative z-10 mb-8 text-sm font-normal leading-7 text-white/65">
                      {t('cta_desc')}
                    </p>
                    <button
                      onClick={() => openModal(singleService.title[locale] || singleService.title['vi'])}
                      className="relative z-10 w-full rounded-xl bg-primary py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700"
                    >
                      {t('cta_expert')}
                    </button>

                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4 relative z-10">
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        {t('sidebar_cta_check1')}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        {t('sidebar_cta_check2')}
                      </div>
                    </div>
                  </div>

                  {/* Related Services Links or Other Info */}
                  <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8">
                    <h4 className="mb-6 text-sm font-bold tracking-[-0.01em] text-on-surface">{t('category_title')}</h4>
                    <div className="space-y-3">
                      <Link
                        href="/services"
                        className={`block w-full rounded-xl px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${activeCategory === "all" ? "bg-primary text-white" : "border border-brand-200 bg-white text-on-surface-variant hover:border-brand-300 hover:text-on-surface"}`}
                      >
                        {t('filter_all')}
                      </Link>
                      {categories.map(cat => {
                        return (
                          <Link
                            key={cat.slug}
                            href={`/services/${cat.slug}`}
                            className={`block w-full rounded-xl px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${activeCategory === cat.slug ? "bg-primary text-white" : "border border-brand-200 bg-white text-on-surface-variant hover:border-brand-300 hover:text-on-surface"}`}
                          >
                            {cat.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((service, index) => {
                    const title = service.title[locale] || service.title['vi'];
                    const content = service.content[locale] || service.content['vi'];

                    return (
                      <Link
                        key={service.id}
                        href={service.id.startsWith("fallback-") ? "/contact" : `/services/${categorySlug || service.service_categories?.slug || "all"}/${service.id}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)] transition duration-300 hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)] animate-fade-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Image Wrap */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={service.image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          {/* Category Tag */}
                          <div className="absolute top-6 left-6">
                            <span className="rounded-lg border border-brand-200 bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary shadow-[var(--shadow-card)]">
                              {service.service_categories?.name[locale] || service.service_categories?.name['vi'] || t('page_title')}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-10 flex flex-col flex-1">
                          <h3 className="mb-4 text-xl font-bold leading-tight tracking-[-0.02em] text-on-surface transition-colors group-hover:text-primary lg:text-2xl">
                            {title}
                          </h3>
                          <div
                            className="mb-8 flex-1 line-clamp-3 text-sm font-normal leading-7 text-on-surface-variant lg:text-base"
                            dangerouslySetInnerHTML={{ __html: (content || "").replace(/<[^>]*>/g, "").substring(0, 120) + "..." }}
                          />

                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                              {t('view_solution')}
                            </span>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-on-surface-variant transition-colors group-hover:bg-primary group-hover:text-white">
                              <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50 py-32 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">inventory_2</span>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{t('not_found')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* Global Bottom CTA */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-center lg:py-24">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="mb-8 text-display-md text-on-dark">
            <span dangerouslySetInnerHTML={{ __html: t.raw('cta_title') }} />
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-body-xl text-on-dark-muted">
            {t('cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => openModal("General Logistics")}
              className="w-full rounded-xl bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700 sm:w-auto"
            >
              {t('cta_expert')}
            </button>
            <button className="w-full rounded-xl border border-white/20 px-10 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:w-auto">
              {t('cta_process')}
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

function ServiceContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-brand-200 shadow-[var(--shadow-card)] my-12',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline font-bold',
        },
      }),
      Typography,
    ],
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg prose-slate max-w-none " +
          "prose-headings:font-bold prose-headings:tracking-[-0.03em] " +
          "prose-h2:text-3xl prose-h3:text-2xl " +
          "prose-p:text-slate-600 prose-p:leading-relaxed " +
          "prose-strong:text-slate-900 prose-strong:font-bold " +
          "prose-li:text-slate-600 " +
          "prose-table:border-collapse prose-table:my-8 " +
          "prose-th:bg-slate-50 prose-th:p-4 prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-th:border prose-th:border-slate-100 " +
          "prose-td:p-4 prose-td:border prose-td:border-slate-100 prose-td:text-sm",
      },
    },
  });

  return (
    <div className="tiptap-content">
      <style jsx global>{`
        .tiptap-content .overflow-x-auto {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .tiptap-content table {
          min-width: 700px;
          width: 100%;
        }
      `}</style>
      <div className="overflow-x-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default function ServicesView(props: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
  catSlugMap?: Record<string, string>;
}) {
  return (
    <Suspense fallback={null}>
      <ServicesViewInner {...props} />
    </Suspense>
  );
}
