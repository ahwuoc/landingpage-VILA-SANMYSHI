"use client";

import Image from "next/image";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardCheck, FileText, PackageCheck, Phone, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { ServiceItem } from "@/lib/data";
import { COMPANY_INFO } from "@/constants/company";
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
import styles from "./Services.module.css";

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


const copy = {
  vi: {
    hero: "Mỗi nhu cầu,", heroAccent: "một giải pháp.", heroDescription: "Từ hồ sơ hải quan đến vận chuyển xuyên biên giới. Chọn dịch vụ phù hợp, cùng chúng tôi làm rõ từng bước cho lô hàng của bạn.", catalog: "Dịch vụ theo nhu cầu", catalogAccent: "Đồng hành từ đầu đến cuối.", catalogIntro: "Khám phá từng giải pháp hoặc tìm nhanh theo công việc bạn cần hỗ trợ.", browse: "Khám phá dịch vụ", clear: "Xóa tìm kiếm", clearFilters: "Đặt lại bộ lọc", filter: "Lọc theo dịch vụ", results: "giải pháp", empty: "Chưa có dịch vụ phù hợp với tìm kiếm này.", emptyDescription: "Thử một từ khóa khác hoặc trao đổi trực tiếp để đội ngũ hỗ trợ xác định nhu cầu.", inquire: "Tư vấn dịch vụ này", back: "Tất cả dịch vụ", detailLabel: "Thông tin dịch vụ", contentEmpty: "Hãy chia sẻ tuyến vận chuyển, loại hàng và yêu cầu của bạn để đội ngũ tư vấn cụ thể về dịch vụ này.", prepare: "Để buổi tư vấn hữu ích hơn", prepareItems: ["Tuyến gửi và nơi nhận hàng", "Loại hàng, số kiện, khối lượng", "Chứng từ hiện có và thời gian dự kiến"], advisor: "Cùng làm rõ", advisorAccent: "lô hàng của bạn.", advisorDescription: "Một cuộc trao đổi để xác định phạm vi công việc và những thông tin cần chuẩn bị.", related: "Khám phá thêm", processLabel: "Cách chúng tôi phối hợp", processTitle: "Rõ ràng từng bước.", processDescription: "Phương án được trao đổi theo đặc điểm hàng hóa và yêu cầu thực tế.", steps: ["Chia sẻ nhu cầu", "Thống nhất phương án", "Phối hợp thực hiện"], stepDetails: ["Gửi thông tin hàng hóa, tuyến đường, thời điểm dự kiến và hồ sơ đang có.", "Cùng rà soát phạm vi công việc, điều kiện thực hiện và các chi phí cần xác nhận.", "Phối hợp hồ sơ, phương tiện và các đầu mối giao nhận theo phương án đã thống nhất."], cta: "Bạn có một lô hàng.", ctaAccent: "Chúng tôi sẵn sàng lắng nghe.", ctaDescription: "Bắt đầu bằng những thông tin bạn đang có. Đội ngũ VILA SANMYSHI sẽ cùng bạn làm rõ bước tiếp theo.", tools: "Chuẩn bị lô hàng", categoryIntro: "Khám phá các dịch vụ trong nhóm này và trao đổi phương án phù hợp cho lô hàng của bạn.",
  },
  en: {
    hero: "Every shipment,", heroAccent: "a considered solution.", heroDescription: "From customs documents to cross-border transport. Find the support you need and work through each step with our team.", catalog: "Services for your needs", catalogAccent: "Support from start to finish.", catalogIntro: "Explore our solutions or search for the task you need help with.", browse: "Explore services", clear: "Clear search", clearFilters: "Reset filters", filter: "Filter services", results: "solutions", empty: "No services match this search.", emptyDescription: "Try another keyword, or speak with our team to clarify the support you need.", inquire: "Discuss this service", back: "All services", detailLabel: "About this service", contentEmpty: "Share your route, cargo and requirements so our team can discuss this service with you in detail.", prepare: "Make the most of our conversation", prepareItems: ["Origin and destination", "Cargo type, package count and weight", "Available documents and preferred timing"], advisor: "Let’s understand", advisorAccent: "your shipment.", advisorDescription: "A conversation to define the scope of work and the information to prepare.", related: "Explore more", processLabel: "How we work together", processTitle: "Clarity at every step.", processDescription: "We discuss a plan based on your goods and actual requirements.", steps: ["Share your needs", "Agree on an approach", "Coordinate the shipment"], stepDetails: ["Send your cargo details, route, preferred timing and available documents.", "Review the scope, operating conditions and costs that need confirmation together.", "Coordinate documents, vehicles and handover contacts according to the agreed plan."], cta: "You have a shipment.", ctaAccent: "We’re here to listen.", ctaDescription: "Start with the details you have. The VILA SANMYSHI team will help clarify your next step.", tools: "Prepare your shipment", categoryIntro: "Explore services in this category and discuss a suitable approach for your shipment.",
  },
  th: {
    hero: "ทุกความต้องการ", heroAccent: "มีแนวทางที่เหมาะสม", heroDescription: "ตั้งแต่เอกสารศุลกากรถึงการขนส่งข้ามแดน เลือกบริการที่ตรงความต้องการและวางแผนแต่ละขั้นตอนร่วมกับเรา", catalog: "บริการตามความต้องการ", catalogAccent: "เคียงข้างตั้งแต่ต้นจนจบ", catalogIntro: "สำรวจบริการหรือค้นหางานที่คุณต้องการความช่วยเหลือ", browse: "สำรวจบริการ", clear: "ล้างการค้นหา", clearFilters: "รีเซ็ตตัวกรอง", filter: "กรองบริการ", results: "บริการ", empty: "ไม่พบบริการที่ตรงกับการค้นหานี้", emptyDescription: "ลองคำค้นอื่นหรือพูดคุยกับทีมงานเพื่อระบุบริการที่คุณต้องการ", inquire: "ปรึกษาเกี่ยวกับบริการนี้", back: "บริการทั้งหมด", detailLabel: "ข้อมูลบริการ", contentEmpty: "แจ้งเส้นทาง สินค้า และข้อกำหนดของคุณ เพื่อให้ทีมงานปรึกษารายละเอียดบริการนี้", prepare: "เตรียมข้อมูลเพื่อการปรึกษาที่เป็นประโยชน์", prepareItems: ["ประเทศต้นทางและจุดหมายปลายทาง", "ประเภทสินค้า จำนวนหีบห่อ และน้ำหนัก", "เอกสารที่มีและเวลาที่ต้องการ"], advisor: "มาทำความเข้าใจ", advisorAccent: "สินค้าของคุณ", advisorDescription: "พูดคุยเพื่อกำหนดขอบเขตงานและข้อมูลที่ต้องเตรียม", related: "สำรวจเพิ่มเติม", processLabel: "ขั้นตอนการทำงานร่วมกัน", processTitle: "ชัดเจนในทุกขั้นตอน", processDescription: "หารือแนวทางตามลักษณะสินค้าและความต้องการจริง", steps: ["แจ้งความต้องการ", "ตกลงแนวทาง", "ประสานการดำเนินงาน"], stepDetails: ["ส่งรายละเอียดสินค้า เส้นทาง เวลาที่ต้องการ และเอกสารที่มี", "ร่วมทบทวนขอบเขตงาน เงื่อนไขการดำเนินงาน และค่าใช้จ่ายที่ต้องยืนยัน", "ประสานเอกสาร ยานพาหนะ และผู้รับส่งสินค้าตามแนวทางที่ตกลง"], cta: "คุณมีสินค้าที่ต้องส่ง", ctaAccent: "เราพร้อมรับฟัง", ctaDescription: "เริ่มด้วยข้อมูลที่คุณมี ทีมงาน VILA SANMYSHI จะช่วยทำให้ขั้นตอนต่อไปชัดเจนขึ้น", tools: "เตรียมการขนส่ง", categoryIntro: "สำรวจบริการในหมวดนี้และปรึกษาแนวทางที่เหมาะสมสำหรับสินค้าของคุณ",
  },
};

function plainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}
function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLocaleLowerCase();
}

type ServicesProps = {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
  catSlugMap?: Record<string, string>;
  categoryPage?: boolean;
};

function ServicesViewInner({ services, id, categorySlug, categoryName, categoryPage = false }: ServicesProps) {
  const t = useTranslations("Services");
  const locale = useLocale();
  const c = copy[locale === "en" || locale === "th" ? locale : "vi"];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const activeCategory = categoryPage ? "all" : searchParams.get("category") || "all";
  const displayServices = useMemo(() => {
    if (services.length || id) return services;
    if (categoryPage && categorySlug !== "all") return fallbackServices.filter((service) => service.service_categories?.slug === categorySlug);
    return fallbackServices;
  }, [services, id, categoryPage, categorySlug]);
  const localize = (value: Record<string, string>) => value[locale] || value.vi || "";
  const categories = useMemo(() => {
    const unique = new Map<string, { name: string; slug: string; count: number }>();
    displayServices.forEach((service) => {
      const category = service.service_categories;
      if (!category?.slug) return;
      const existing = unique.get(category.slug);
      unique.set(category.slug, { name: category.name[locale] || category.name.vi, slug: category.slug, count: (existing?.count || 0) + 1 });
    });
    return [...unique.values()];
  }, [displayServices, locale]);
  const filtered = displayServices.filter((service) => {
    if (id) return service.id === id;
    const matchesCategory = activeCategory === "all" || service.service_categories?.slug === activeCategory;
    const text = [localize(service.title), plainText(localize(service.content)), service.service_categories ? localize(service.service_categories.name) : ""].join(" ");
    return matchesCategory && normalizeSearch(text).includes(normalizeSearch(search.trim()));
  });
  const singleService = id ? filtered[0] : undefined;
  const isSingle = Boolean(singleService);
  const title = singleService ? localize(singleService.title) : "";

  function openModal(serviceName?: string) {
    setSelectedService(serviceName);
    setModalOpen(true);
  }
  function chooseCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  }
  function resetFilters() {
    setSearch("");
    chooseCategory("all");
  }
  const stepIcons = [FileText, ClipboardCheck, PackageCheck];

  return (
    <div className={styles.page}>
      <PageHero
        image={singleService?.image || (categoryPage ? displayServices[0]?.image : undefined) || "/images/services/cross-border-premium.png"}
        imageAlt={title || categoryName || t("page_title")}
        breadcrumb={[
          { label: t("page_title"), href: "/services" },
          ...(isSingle && categorySlug && categoryName ? [{ label: categoryName, href: `/services?category=${categorySlug}` }] : []),
          { label: title || categoryName || t("breadcrumb_all") },
        ]}
        tag={isSingle ? categoryName || t("hero_tag") : t("hero_tag")}
        title={isSingle ? title : categoryPage ? <>{t("category_label")}<br /><em>{categoryName}</em></> : <>{c.hero}<br /><em>{c.heroAccent}</em></>}
        description={isSingle ? plainText(localize(singleService!.content)).slice(0, 200) || c.contentEmpty : categoryPage ? c.categoryIntro : c.heroDescription}
      />

      <div className={styles.contextBar}>
        <div className={styles.container}>
          {isSingle || categoryPage ? <Link href="/services"><ArrowLeft size={14} aria-hidden="true" />{c.back}</Link> : <a href="#service-catalog">{c.browse}<ArrowDown size={14} aria-hidden="true" /></a>}
          <span>VIETNAM <i /> LAOS <i /> THAILAND</span>
          <Link href="/#shipment-tools">{c.tools}<ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>

      {singleService ? (
        <section className={`${styles.container} ${styles.detailLayout}`}>
          <article className={styles.article}>
            <p className={styles.eyebrow}><span />{c.detailLabel}</p>
            <h2 className={styles.articleTitle}>{title}</h2>
            {localize(singleService.content).trim() ? <ServiceContent key={`${singleService.id}-${locale}`} content={localize(singleService.content)} /> : <p className={styles.articleIntro}>{c.contentEmpty}</p>}
            <div className={styles.preparation}><h3><ClipboardCheck size={19} aria-hidden="true" />{c.prepare}</h3><ul>{c.prepareItems.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul><Link href="/#shipment-tools">{c.tools}<ArrowUpRight size={14} aria-hidden="true" /></Link></div>
          </article>
          <aside className={styles.sidebar}>
            <div className={styles.advisor}><p className={styles.eyebrow}>VILA SANMYSHI</p><h2>{c.advisor}<br /><em>{c.advisorAccent}</em></h2><p>{c.advisorDescription}</p><button type="button" className={styles.lightButton} onClick={() => openModal(title)}>{t("cta_expert")}<ArrowUpRight size={16} aria-hidden="true" /></button><a className={styles.advisorPhone} href={`tel:${COMPANY_INFO.phone}`}><Phone size={15} aria-hidden="true" />{COMPANY_INFO.phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</a></div>
            <nav className={styles.related} aria-label={c.related}><h3>{c.related}</h3><Link href="/services">{c.back}<ArrowRight size={13} aria-hidden="true" /></Link>{categories.map((category) => <Link key={category.slug} href={{ pathname: "/services", query: { category: category.slug } }}>{category.name}<ArrowRight size={13} aria-hidden="true" /></Link>)}</nav>
          </aside>
        </section>
      ) : (
        <section id="service-catalog" className={`${styles.container} ${styles.catalog}`} aria-labelledby="service-catalog-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><span />{categoryPage ? categoryName : c.catalog}</p><h2 id="service-catalog-title">{categoryPage ? categoryName : c.catalogAccent}</h2></div><p>{c.catalogIntro}</p></div>
          <div className={styles.toolbar}>
            <div className={styles.search}><Search size={16} aria-hidden="true" /><label className="sr-only" htmlFor="services-search">{t("search_placeholder")}</label><input id="services-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("search_placeholder")} />{search && <button type="button" onClick={() => setSearch("")} aria-label={c.clear}><X size={16} aria-hidden="true" /></button>}</div>
            <p className={styles.resultCount} aria-live="polite"><strong>{filtered.length.toString().padStart(2, "0")}</strong>{c.results}</p>
          </div>
          {!categoryPage && categories.length > 0 && <div className={styles.filters} role="group" aria-label={c.filter}><SlidersHorizontal size={15} aria-hidden="true" /><button type="button" onClick={() => chooseCategory("all")} aria-pressed={activeCategory === "all"}>{t("filter_all")}<span>{displayServices.length}</span></button>{categories.map((category) => <button key={category.slug} type="button" onClick={() => chooseCategory(category.slug)} aria-pressed={activeCategory === category.slug}>{category.name}<span>{category.count}</span></button>)}</div>}
          {filtered.length ? <div className={styles.serviceGrid}>
            {filtered.map((service, index) => {
              const serviceTitle = localize(service.title);
              const description = plainText(localize(service.content));
              const isFallback = service.id.startsWith("fallback-");
              const href = `/services/${service.service_categories?.slug || categorySlug || "all"}/${service.id}`;
              return <article key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceImage}><Image src={service.image || "/images/services/cross-border-premium.png"} alt={serviceTitle} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.coverImage} /><span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span></div>
                <div className={styles.serviceBody}><p className={styles.category}>{service.service_categories ? localize(service.service_categories.name) : categoryName || t("page_title")}</p><h3>{isFallback ? serviceTitle : <Link href={href}>{serviceTitle}</Link>}</h3><p className={styles.description}>{description || c.contentEmpty}</p>{isFallback ? <button type="button" className={styles.cardAction} onClick={() => openModal(serviceTitle)}>{c.inquire}<ArrowUpRight size={17} aria-hidden="true" /></button> : <Link href={href} className={styles.cardAction}>{t("view_detail")}<ArrowUpRight size={17} aria-hidden="true" /></Link>}</div>
              </article>;
            })}
          </div> : <div className={styles.emptyState}><Search size={31} strokeWidth={1} aria-hidden="true" /><h3>{c.empty}</h3><p>{c.emptyDescription}</p><div>{(search || activeCategory !== "all") && <button type="button" className={styles.primaryButton} onClick={resetFilters}>{c.clearFilters}<X size={14} aria-hidden="true" /></button>}<button type="button" className={styles.textButton} onClick={() => openModal(categoryName)}>{t("cta_expert")}<ArrowUpRight size={15} aria-hidden="true" /></button></div></div>}
        </section>
      )}

      <section id="service-process" className={styles.process} aria-labelledby="service-process-title"><div className={styles.container}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}><span />{c.processLabel}</p><h2 id="service-process-title">{c.processTitle}</h2></div><p>{c.processDescription}</p></div><div className={styles.processGrid}>{c.steps.map((step, index) => { const Icon = stepIcons[index]; return <article key={step}><div className={styles.stepTop}><span>0{index + 1}</span><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></div><h3>{step}</h3><p>{c.stepDetails[index]}</p></article>; })}</div></div></section>
      <section className={styles.cta}><div className={styles.container}><div><p className={styles.eyebrow}>LET’S TALK LOGISTICS</p><h2>{c.cta}<br /><em>{c.ctaAccent}</em></h2><p>{c.ctaDescription}</p></div><div className={styles.ctaActions}><button type="button" className={styles.lightButton} onClick={() => openModal(title || categoryName)}>{t("cta_expert")}<ArrowUpRight size={17} aria-hidden="true" /></button><a className={styles.ctaProcess} href="#service-process">{t("cta_process")}<ArrowUpRight size={14} aria-hidden="true" /></a></div></div></section>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceName={selectedService} />
    </div>
  );
}

function ServiceContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: false }), Table.configure({ resizable: false, renderWrapper: true }), TableRow, TableHeader, TableCell, ImageExtension, LinkExtension.configure({ openOnClick: true, HTMLAttributes: { rel: "noopener noreferrer" } }), Typography],
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: { attributes: { class: styles.richContent } },
  });
  return <div className={styles.reader}>{editor ? <EditorContent editor={editor} /> : <p>{plainText(content)}</p>}</div>;
}

export default function ServicesView(props: ServicesProps) {
  return <Suspense fallback={<div className={styles.loading} aria-busy="true"><span /></div>}><ServicesViewInner {...props} /></Suspense>;
}
