import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Headphones,
  MapPin,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NewsItem, ServiceItem } from "@/lib/data";
import HomeMotion from "./HomeMotion";

const copy = {
  vi: {
    heroEyebrow: "Logistics và khai báo hải quan tại Lao Bảo",
    heroLead: "Vận tải xuyên biên giới",
    heroHighlight: "và khai báo hải quan",
    heroTail: "thuận lợi hơn.",
    heroBody:
      "Một đầu mối xử lý chứng từ, thủ tục và vận chuyển trên tuyến Việt Nam – Lào – Thái Lan. Quy trình rõ ràng, phản hồi nhanh và luôn có người theo sát lô hàng.",
    primaryCta: "Nhận tư vấn miễn phí",
    secondaryCta: "Xem dịch vụ",
    trust: ["Đại lý hải quan được công nhận", "Hỗ trợ 24/7", "Tuyến Việt Nam – Lào – Thái Lan"],
    quickServices: [
      { title: "Khai báo hải quan", description: "Kiểm tra hồ sơ, mã HS và mở tờ khai chính xác." },
      { title: "Vận tải xuyên biên giới", description: "Điều phối tuyến Việt Nam – Lào – Thái Lan xuyên suốt." },
      { title: "Kho bãi & gom hàng", description: "Lưu kho, gom chuyến và giao nhận linh hoạt." },
      { title: "Giao nhận tại cửa khẩu", description: "Theo sát phương tiện, chứng từ và tiến độ thông quan." },
    ],
    documentsEyebrow: "Bộ hồ sơ thường gặp",
    documentsTitle: "Chuẩn bị đúng chứng từ ngay từ đầu",
    documentsBody: "Danh mục thực tế có thể thay đổi theo mặt hàng và loại hình xuất nhập khẩu. Chúng tôi sẽ rà soát trước khi mở tờ khai.",
    documents: [
      { title: "Hóa đơn thương mại", meta: "Commercial Invoice" },
      { title: "Phiếu đóng gói", meta: "Packing List" },
      { title: "Hợp đồng ngoại thương", meta: "Sales Contract" },
      { title: "Chứng từ vận tải", meta: "Bill of Lading / CMR" },
      { title: "Chứng nhận xuất xứ", meta: "C/O nếu áp dụng" },
      { title: "Giấy phép chuyên ngành", meta: "Theo chính sách mặt hàng" },
    ],
    routesEyebrow: "Phạm vi kết nối",
    routesTitle: "Một đầu mối trên hành lang Việt Nam – Lào – Thái Lan",
    routesBody: "Lộ trình được tư vấn theo loại hàng, điểm nhận giao và yêu cầu thời gian của từng lô.",
    routes: [
      { title: "Lao Bảo ↔ Dansavanh", description: "Phối hợp chứng từ và giao nhận tại cặp cửa khẩu." },
      { title: "Quảng Trị ↔ Savannakhet", description: "Điều phối vận chuyển và tiến độ bàn giao." },
      { title: "Việt Nam ↔ Lào ↔ Thái Lan", description: "Tư vấn phương án xuyên biên giới theo từng lô hàng." },
    ],
    servicesEyebrow: "Dịch vụ trọng tâm",
    servicesTitle: "Giải pháp trọn gói cho từng lô hàng",
    servicesBody: "Từ kiểm tra hồ sơ đến giao hàng, mỗi bước đều có người phụ trách và thời gian xử lý cụ thể.",
    allServices: "Xem tất cả dịch vụ",
    fallbackServices: [
      {
        category: "Khai báo hải quan",
        title: "Tư vấn hồ sơ và mã HS",
        description: "Kiểm tra chính sách mặt hàng, thuế và chứng từ trước khi mở tờ khai.",
      },
      {
        category: "Vận tải quốc tế",
        title: "Vận chuyển Việt Nam – Lào – Thái Lan",
        description: "Điều phối phương tiện và lịch trình xuyên suốt tuyến hành lang kinh tế Đông – Tây.",
      },
      {
        category: "Kho vận",
        title: "Kho bãi, gom hàng và giao nhận",
        description: "Phương án lưu kho và gom chuyến linh hoạt, giúp giảm thời gian chờ và chi phí.",
      },
    ],
    processEyebrow: "Quy trình minh bạch",
    processTitle: "Bạn luôn biết hồ sơ đang ở bước nào",
    processBody: "Đội ngũ VILA SANMYSHI phối hợp chứng từ và phương tiện trong cùng một luồng công việc.",
    processSteps: [
      { title: "Tiếp nhận thông tin", description: "Kiểm tra invoice, packing list, hợp đồng và yêu cầu giao nhận." },
      { title: "Rà soát hồ sơ", description: "Đối chiếu mã HS, giấy phép, thuế và chính sách chuyên ngành." },
      { title: "Khai báo và điều phối", description: "Mở tờ khai, bố trí xe và cập nhật tiến độ tại cửa khẩu." },
      { title: "Bàn giao và đối soát", description: "Hoàn tất giao hàng, chứng từ và chi phí minh bạch." },
    ],
    proofEyebrow: "Lý do khách hàng lựa chọn",
    proofTitle: "Kinh nghiệm thực tế, quy trình rõ ràng",
    proofBody: "Sự an tâm đến từ một đội ngũ hiểu tuyến đường, nắm thủ tục và phản hồi đúng lúc.",
    stats: [
      { value: "2018", label: "Năm thành lập" },
      { value: "24/7", label: "Hỗ trợ vận hành" },
      { value: "03", label: "Thị trường kết nối" },
      { value: "01", label: "Đầu mối xuyên suốt" },
    ],
    newsEyebrow: "Kiến thức chuyên ngành",
    newsTitle: "Cập nhật chính sách và thị trường",
    readMore: "Đọc bài viết",
    faqEyebrow: "Thông tin cần biết",
    faqTitle: "Câu hỏi trước khi gửi hồ sơ",
    faqs: [
      {
        question: "Cần gửi những gì để được kiểm tra hồ sơ?",
        answer: "Bạn có thể gửi invoice, packing list, hợp đồng, mô tả hàng hóa và tuyến dự kiến. Đội ngũ sẽ phản hồi nếu cần bổ sung chứng từ.",
      },
      {
        question: "VILA SANMYSHI có hỗ trợ tra mã HS không?",
        answer: "Có. Chúng tôi tiếp nhận thông tin hàng hóa, đối chiếu chính sách và tư vấn mã HS phù hợp trước khi khai báo.",
      },
      {
        question: "Có thể kết hợp khai báo và vận chuyển xuyên biên giới?",
        answer: "Có. Phương án được xây dựng theo loại hàng, điểm nhận giao, phương tiện và yêu cầu thời gian của từng lô.",
      },
      {
        question: "Tiến độ lô hàng được cập nhật như thế nào?",
        answer: "Mỗi lô hàng có một đầu mối theo sát hồ sơ, phương tiện, tình trạng tại cửa khẩu và thời điểm bàn giao.",
      },
    ],
    ctaTitle: "Cần kiểm tra hồ sơ trước khi mở tờ khai?",
    ctaBody: "Gửi thông tin lô hàng, đội ngũ của chúng tôi sẽ phản hồi phương án phù hợp và dễ hiểu.",
    ctaButton: "Liên hệ tư vấn",
  },
  en: {
    heroEyebrow: "Logistics and customs support at Lao Bao",
    heroLead: "Cross-border transport",
    heroHighlight: "and customs clearance",
    heroTail: "made simpler.",
    heroBody:
      "One team handles documents, customs procedures and transport across Vietnam, Laos and Thailand with clear updates at every step.",
    primaryCta: "Get free advice",
    secondaryCta: "View services",
    trust: ["Licensed customs agent", "24/7 support", "Vietnam – Laos – Thailand route"],
    quickServices: [
      { title: "Customs clearance", description: "Accurate document, HS code and declaration support." },
      { title: "Cross-border transport", description: "Coordinated Vietnam – Laos – Thailand routes." },
      { title: "Warehousing & consolidation", description: "Flexible storage, consolidation and delivery." },
      { title: "Border-gate handling", description: "Close tracking of vehicles, documents and clearance." },
    ],
    documentsEyebrow: "Common document set",
    documentsTitle: "Prepare the right documents from the start",
    documentsBody: "Requirements vary by commodity and customs regime. Our team reviews the file before the declaration is submitted.",
    documents: [
      { title: "Commercial invoice", meta: "Transaction value and terms" },
      { title: "Packing list", meta: "Packing, weight and quantity" },
      { title: "Sales contract", meta: "Commercial agreement" },
      { title: "Transport document", meta: "Bill of Lading / CMR" },
      { title: "Certificate of origin", meta: "When applicable" },
      { title: "Specialist permits", meta: "Based on commodity policy" },
    ],
    routesEyebrow: "Connected corridors",
    routesTitle: "One contact across Vietnam, Laos and Thailand",
    routesBody: "Each route is planned around the cargo type, pickup and delivery points, and required timeline.",
    routes: [
      { title: "Lao Bao ↔ Dansavanh", description: "Document and border-gate delivery coordination." },
      { title: "Quang Tri ↔ Savannakhet", description: "Transport planning and delivery progress." },
      { title: "Vietnam ↔ Laos ↔ Thailand", description: "Cross-border options tailored to each shipment." },
    ],
    servicesEyebrow: "Core services",
    servicesTitle: "Complete support for every shipment",
    servicesBody: "From document review to final delivery, every step has a clear owner and timeline.",
    allServices: "Explore all services",
    fallbackServices: [
      { category: "Customs", title: "Document and HS code advice", description: "Review commodity policy, tax and documents before filing." },
      { category: "Transport", title: "Vietnam – Laos – Thailand transport", description: "Coordinate vehicles and schedules across the East–West Economic Corridor." },
      { category: "Warehousing", title: "Storage, consolidation and delivery", description: "Flexible storage and consolidation plans that reduce waiting time and cost." },
    ],
    processEyebrow: "A transparent process",
    processTitle: "You always know what happens next",
    processBody: "VILA SANMYSHI coordinates documents and vehicles in one consistent workflow.",
    processSteps: [
      { title: "Receive information", description: "Review invoices, packing lists, contracts and delivery needs." },
      { title: "Check documents", description: "Verify HS codes, permits, taxes and specialist policies." },
      { title: "File and coordinate", description: "Submit declarations, arrange trucks and report border progress." },
      { title: "Deliver and reconcile", description: "Complete delivery, documents and cost reconciliation." },
    ],
    proofEyebrow: "Why clients choose us",
    proofTitle: "Practical experience and a clear process",
    proofBody: "Confidence comes from a team that knows the route, understands the procedure and responds on time.",
    stats: [
      { value: "2018", label: "Established" },
      { value: "24/7", label: "Operations support" },
      { value: "03", label: "Connected markets" },
      { value: "01", label: "Single contact point" },
    ],
    newsEyebrow: "Industry knowledge",
    newsTitle: "Policy and market updates",
    readMore: "Read article",
    faqEyebrow: "Useful information",
    faqTitle: "Questions before sending your file",
    faqs: [
      {
        question: "What should I send for a document review?",
        answer: "Send the invoice, packing list, contract, cargo description and planned route. Our team will identify any missing documents.",
      },
      {
        question: "Can VILA SANMYSHI advise on HS codes?",
        answer: "Yes. We review the cargo information, relevant policy and suitable HS code before the declaration is filed.",
      },
      {
        question: "Can customs and cross-border transport be combined?",
        answer: "Yes. The plan is prepared around the cargo, pickup and delivery points, vehicle needs and shipment timeline.",
      },
      {
        question: "How is shipment progress reported?",
        answer: "A single contact tracks the documents, vehicle, border status and final delivery for each shipment.",
      },
    ],
    ctaTitle: "Need your documents checked before filing?",
    ctaBody: "Send your shipment details and our team will return a practical, easy-to-understand plan.",
    ctaButton: "Contact our team",
  },
  th: {
    heroEyebrow: "บริการโลจิสติกส์และศุลกากรที่ลาวบาว",
    heroLead: "การขนส่งข้ามพรมแดน",
    heroHighlight: "และพิธีการศุลกากร",
    heroTail: "ที่ง่ายขึ้น",
    heroBody: "ทีมเดียวดูแลเอกสาร พิธีการ และการขนส่งระหว่างเวียดนาม ลาว และไทย พร้อมอัปเดตที่ชัดเจนทุกขั้นตอน",
    primaryCta: "รับคำปรึกษาฟรี",
    secondaryCta: "ดูบริการ",
    trust: ["ตัวแทนศุลกากรที่ได้รับอนุญาต", "สนับสนุน 24/7", "เส้นทางเวียดนาม – ลาว – ไทย"],
    quickServices: [
      { title: "พิธีการศุลกากร", description: "ตรวจเอกสาร รหัส HS และยื่นใบขนอย่างถูกต้อง" },
      { title: "ขนส่งข้ามพรมแดน", description: "ประสานเส้นทางเวียดนาม – ลาว – ไทยตลอดสาย" },
      { title: "คลังสินค้าและรวมสินค้า", description: "จัดเก็บ รวมเที่ยว และส่งมอบอย่างยืดหยุ่น" },
      { title: "บริการที่ด่านชายแดน", description: "ติดตามรถ เอกสาร และความคืบหน้าพิธีการ" },
    ],
    documentsEyebrow: "ชุดเอกสารที่ใช้บ่อย",
    documentsTitle: "เตรียมเอกสารให้ถูกต้องตั้งแต่ต้น",
    documentsBody: "เอกสารจริงขึ้นอยู่กับประเภทสินค้าและรูปแบบศุลกากร ทีมงานจะตรวจสอบก่อนยื่นใบขน",
    documents: [
      { title: "ใบกำกับสินค้า", meta: "Commercial Invoice" },
      { title: "รายการบรรจุสินค้า", meta: "Packing List" },
      { title: "สัญญาซื้อขาย", meta: "Sales Contract" },
      { title: "เอกสารการขนส่ง", meta: "Bill of Lading / CMR" },
      { title: "หนังสือรับรองถิ่นกำเนิด", meta: "เมื่อจำเป็น" },
      { title: "ใบอนุญาตเฉพาะทาง", meta: "ตามนโยบายสินค้า" },
    ],
    routesEyebrow: "ขอบเขตการเชื่อมต่อ",
    routesTitle: "ผู้ประสานงานเดียวระหว่างเวียดนาม ลาว และไทย",
    routesBody: "เส้นทางจะวางตามประเภทสินค้า จุดรับส่ง และกรอบเวลาของแต่ละเที่ยว",
    routes: [
      { title: "ลาวบาว ↔ แดนสะหวัน", description: "ประสานเอกสารและการส่งมอบที่ด่าน" },
      { title: "กวางตรี ↔ สะหวันนะเขต", description: "วางแผนขนส่งและติดตามการส่งมอบ" },
      { title: "เวียดนาม ↔ ลาว ↔ ไทย", description: "เสนอทางเลือกข้ามพรมแดนสำหรับแต่ละเที่ยว" },
    ],
    servicesEyebrow: "บริการหลัก",
    servicesTitle: "ดูแลครบทุกขั้นตอนของการขนส่ง",
    servicesBody: "ตั้งแต่ตรวจเอกสารจนถึงส่งมอบ ทุกขั้นตอนมีผู้รับผิดชอบและกรอบเวลาชัดเจน",
    allServices: "ดูบริการทั้งหมด",
    fallbackServices: [
      { category: "ศุลกากร", title: "ให้คำปรึกษาเอกสารและรหัส HS", description: "ตรวจนโยบายสินค้า ภาษี และเอกสารก่อนยื่นใบขน" },
      { category: "ขนส่ง", title: "ขนส่งเวียดนาม – ลาว – ไทย", description: "ประสานรถและกำหนดการตลอดเส้นทางระเบียงเศรษฐกิจตะวันออก–ตะวันตก" },
      { category: "คลังสินค้า", title: "จัดเก็บ รวบรวม และส่งมอบ", description: "แผนคลังสินค้าและรวมเที่ยวที่ยืดหยุ่น ช่วยลดเวลาและต้นทุน" },
    ],
    processEyebrow: "ขั้นตอนโปร่งใส",
    processTitle: "คุณทราบขั้นตอนถัดไปเสมอ",
    processBody: "VILA SANMYSHI ประสานเอกสารและยานพาหนะในขั้นตอนการทำงานเดียวกัน",
    processSteps: [
      { title: "รับข้อมูล", description: "ตรวจใบแจ้งหนี้ รายการบรรจุ สัญญา และความต้องการส่งมอบ" },
      { title: "ตรวจเอกสาร", description: "ตรวจรหัส HS ใบอนุญาต ภาษี และนโยบายเฉพาะ" },
      { title: "ยื่นและประสานงาน", description: "ยื่นใบขน จัดรถ และรายงานความคืบหน้าที่ด่าน" },
      { title: "ส่งมอบและตรวจสอบ", description: "ส่งสินค้าและสรุปเอกสารกับค่าใช้จ่าย" },
    ],
    proofEyebrow: "เหตุผลที่ลูกค้าเลือกเรา",
    proofTitle: "ประสบการณ์จริงและขั้นตอนที่ชัดเจน",
    proofBody: "ความมั่นใจมาจากทีมที่รู้เส้นทาง เข้าใจพิธีการ และตอบสนองตรงเวลา",
    stats: [
      { value: "2018", label: "ปีที่ก่อตั้ง" },
      { value: "24/7", label: "สนับสนุนการดำเนินงาน" },
      { value: "03", label: "ตลาดที่เชื่อมต่อ" },
      { value: "01", label: "ผู้ประสานงานหลัก" },
    ],
    newsEyebrow: "ความรู้เฉพาะทาง",
    newsTitle: "ข่าวนโยบายและตลาด",
    readMore: "อ่านบทความ",
    faqEyebrow: "ข้อมูลที่ควรรู้",
    faqTitle: "คำถามก่อนส่งเอกสาร",
    faqs: [
      {
        question: "ต้องส่งอะไรบ้างเพื่อตรวจเอกสาร",
        answer: "ส่งใบกำกับสินค้า รายการบรรจุ สัญญา รายละเอียดสินค้า และเส้นทางที่คาดไว้ ทีมงานจะแจ้งเอกสารที่ต้องเพิ่ม",
      },
      {
        question: "VILA SANMYSHI ให้คำปรึกษารหัส HS หรือไม่",
        answer: "ให้บริการ ทีมงานจะตรวจข้อมูลสินค้า นโยบายที่เกี่ยวข้อง และรหัส HS ที่เหมาะสมก่อนยื่นใบขน",
      },
      {
        question: "รวมพิธีการกับขนส่งข้ามพรมแดนได้หรือไม่",
        answer: "ได้ แผนงานจะจัดตามสินค้า จุดรับส่ง ประเภทรถ และกรอบเวลาของแต่ละเที่ยว",
      },
      {
        question: "ติดตามความคืบหน้าของสินค้าอย่างไร",
        answer: "แต่ละเที่ยวมีผู้ประสานงานหลักติดตามเอกสาร รถ สถานะที่ด่าน และการส่งมอบ",
      },
    ],
    ctaTitle: "ต้องการตรวจเอกสารก่อนยื่นใบขนหรือไม่",
    ctaBody: "ส่งรายละเอียดสินค้า แล้วทีมงานจะเสนอแผนที่เหมาะสมและเข้าใจง่าย",
    ctaButton: "ติดต่อทีมงาน",
  },
} as const;

const fallbackImages = [
  "/images/services/customs.png",
  "/images/services/cross-border-premium.png",
  "/images/services/warehouse.png",
];
const supportedRemoteHosts = [
  "images.unsplash.com",
  "lh3.googleusercontent.com",
  "i.pravatar.cc",
  "xhtkvralkhnvohxjrmgq.supabase.co",
];
const processIcons = [FileCheck2, ShieldCheck, Truck, PackageCheck];
const benefitIcons = [ShieldCheck, Clock3, Headphones, Route];
const quickServiceIcons = [FileCheck2, Truck, Warehouse, Route];

function safeImage(src: string | undefined, fallback: string) {
  if (!src) return fallback;
  if (src.startsWith("/")) return src;
  try {
    return supportedRemoteHosts.includes(new URL(src).hostname) ? src : fallback;
  } catch {
    return fallback;
  }
}

function plainText(value: string | undefined) {
  return value?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
}

export default function HomeView({ services = [], newsList = [] }: { services?: ServiceItem[]; newsList?: NewsItem[] }) {
  const locale = useLocale();
  const current = copy[locale as keyof typeof copy] || copy.vi;
  const servicesT = useTranslations("Home.services");
  const coreT = useTranslations("Home.core_values");

  const landingServices = services.length
    ? services.slice(0, 6).map((service, index) => {
        const fallback = current.fallbackServices[index % current.fallbackServices.length];
        return {
          id: service.id,
          category: service.service_categories?.name?.[locale] || service.service_categories?.name?.vi || fallback.category,
          title: service.title?.[locale] || service.title?.vi || fallback.title,
          description: plainText(service.content?.[locale] || service.content?.vi).slice(0, 150) || servicesT("item_default_desc"),
          image: safeImage(service.image, fallbackImages[index % fallbackImages.length]),
          href: `/services/${service.service_categories?.slug || "all"}/${service.id}`,
        };
      })
    : current.fallbackServices.map((service, index) => ({
        id: `fallback-${index}`,
        ...service,
        image: fallbackImages[index],
        href: "/services",
      }));

  const benefits = Array.from({ length: 4 }, (_, index) => ({
    title: coreT(`benefits.${index}.title`),
    description: coreT(`benefits.${index}.desc`),
  }));

  return (
    <div id="top" className="bg-white text-brand-900">
      <HomeMotion />
      <section className="relative overflow-hidden border-b border-brand-100 bg-brand-50 pt-36 lg:pt-52">
        <div className="home-orb-a absolute -right-24 top-28 h-80 w-80 rounded-full bg-brand-200/55 blur-3xl" />
        <div className="home-orb-b absolute -left-32 top-1/2 h-72 w-72 rounded-full bg-white blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-8 lg:pb-20">
          <div className="home-hero-sequence">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 shadow-sm">
              <MapPin size={15} aria-hidden="true" />
              {current.heroEyebrow}
            </div>
            <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.16] tracking-[-0.035em] text-brand-950 sm:text-5xl">
              {current.heroLead}{" "}
              <span className="text-brand-600">{current.heroHighlight}</span>{" "}
              {current.heroTail}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-on-surface-variant lg:text-lg">
              {current.heroBody}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="home-button-sheen inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand-700 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-900/15 transition hover:bg-brand-800"
              >
                {current.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-100"
              >
                {current.secondaryCta}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-on-surface-variant">
              {current.trust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="text-brand-600" size={17} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="home-hero-media relative pb-10">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border-8 border-white bg-brand-200 shadow-2xl shadow-brand-900/15">
              <Image
                src="/images/hero/hero-1.png"
                alt="Xe hàng làm thủ tục tại Cửa khẩu Quốc tế Lao Bảo"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="home-hero-image object-cover"
              />
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-brand-800 shadow-lg backdrop-blur">
                <Route size={15} aria-hidden="true" />
                {current.trust[2]}
              </div>
            </div>

            <div className="home-document-card absolute bottom-0 left-4 right-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-xl shadow-brand-900/10 sm:left-6 sm:right-auto sm:w-[23rem]">
              <div className="flex items-center gap-3">
                <span className="home-stamp-pulse grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <FileCheck2 size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-brand-600">{current.processEyebrow}</p>
                  <p className="mt-1 font-bold leading-snug text-brand-900">{current.processSteps[1].title}</p>
                </div>
                <span className="text-xs font-semibold text-brand-400">02/04</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{current.processSteps[1].description}</p>
            </div>
          </div>
        </div>

        <nav aria-label={current.servicesEyebrow} className="home-reveal relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-bold text-brand-900">{current.servicesEyebrow}</h2>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                {current.allServices}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-px bg-brand-100 sm:grid-cols-2 lg:grid-cols-4">
              {current.quickServices.map((service, index) => {
                const Icon = quickServiceIcons[index];
                return (
                  <Link href="/services" key={service.title} className="home-service-link group bg-white p-5 hover:bg-brand-50 lg:p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <ArrowRight className="text-brand-400 transition-transform group-hover:translate-x-1" size={17} aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-bold leading-snug text-brand-900">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{service.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="home-reveal grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-brand-600">{current.servicesEyebrow}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
                {current.servicesTitle}
              </h2>
            </div>
            <div>
              <p className="leading-7 text-on-surface-variant">{current.servicesBody}</p>
              <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                {current.allServices}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="home-stagger mt-12 grid gap-6 lg:grid-cols-3">
            {landingServices.map((service) => (
              <Link
                href={service.href}
                key={service.id}
                className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {service.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug tracking-[-0.015em] lg:text-2xl">{service.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-on-surface-variant">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    {current.secondaryCta}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-100 bg-brand-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <article className="home-reveal-left rounded-3xl border border-brand-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3 text-sm font-semibold text-brand-600">
              <FileCheck2 size={20} aria-hidden="true" />
              {current.documentsEyebrow}
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
              {current.documentsTitle}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">{current.documentsBody}</p>

            <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-brand-100 bg-brand-100 sm:grid-cols-2">
              {current.documents.map((document, index) => (
                <div key={document.title} className="home-document-item flex items-start gap-3 bg-white p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold leading-snug text-brand-900">{document.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-on-surface-variant">{document.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-4 rounded-2xl bg-brand-50 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-brand-900">{current.processEyebrow}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{current.processBody}</p>
              </div>
            </div>
          </article>

          <aside className="home-reveal-right rounded-3xl bg-brand-800 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-brand-100">
                <Route size={24} aria-hidden="true" />
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-brand-100">EWEC</span>
            </div>
            <p className="mt-7 text-sm font-semibold text-brand-200">{current.routesEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.025em]">{current.routesTitle}</h2>
            <p className="mt-4 leading-7 text-white/70">{current.routesBody}</p>

            <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {current.routes.map((route, index) => (
                <li key={route.title} className="home-route-step grid grid-cols-[2.5rem_1fr] gap-3 px-1 py-5">
                  <span className="text-sm font-bold text-brand-200">0{index + 1}</span>
                  <div>
                    <h3 className="font-bold leading-snug">{route.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{route.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="home-reveal-left relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-brand-200 shadow-xl shadow-brand-900/10">
            <Image
              src="/images/hero/hero-2.png"
              alt="Khu làm thủ tục tại cửa khẩu Lao Bảo"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="home-reveal-right">
            <p className="text-sm font-semibold text-brand-600">{current.processEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
              {current.processTitle}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-on-surface-variant">{current.processBody}</p>

            <ol className="home-stagger mt-8 grid gap-4 sm:grid-cols-2">
              {current.processSteps.map((step, index) => {
                const Icon = processIcons[index];
                return (
                  <li key={step.title} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold text-brand-500">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 font-bold leading-snug">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="home-reveal mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-brand-600">{current.proofEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{current.proofTitle}</h2>
            <p className="mt-5 leading-7 text-on-surface-variant">{current.proofBody}</p>
          </div>

          <div className="home-reveal mt-12 grid overflow-hidden rounded-3xl bg-brand-700 text-white sm:grid-cols-2 lg:grid-cols-4">
            {current.stats.map((stat) => (
              <div key={stat.label} className="border-white/10 p-7 text-center sm:border-r last:border-r-0 lg:p-8">
                <strong className="text-3xl font-bold lg:text-4xl">{stat.value}</strong>
                <span className="mt-2 block text-xs font-medium text-white/70">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="home-stagger mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article key={benefit.title} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-bold leading-snug">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {newsList.length > 0 && (
        <section className="bg-brand-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="home-reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-600">{current.newsEyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{current.newsTitle}</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                {current.readMore}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="home-stagger mt-10 grid gap-6 lg:grid-cols-3">
              {newsList.slice(0, 6).map((news) => {
                const title = news.title?.[locale] || news.title?.vi;
                const category = news.news_categories?.name?.[locale] || news.news_categories?.name?.vi || "VILA News";
                return (
                  <Link href={`/news/${news.slug || news.id}`} key={news.id} className="group rounded-3xl border border-brand-100 bg-white p-3 shadow-sm transition hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-100">
                      <Image
                        src={safeImage(news.image, "/images/news/regulation.png")}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-brand-600">{category}</span>
                      <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.015em]">{title}</h3>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                        {current.readMore}
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-brand-100 bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div className="home-reveal-left">
            <p className="text-sm font-semibold text-brand-600">{current.faqEyebrow}</p>
            <h2 className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{current.faqTitle}</h2>
            <p className="mt-5 max-w-md leading-7 text-on-surface-variant">{current.ctaBody}</p>
          </div>

          <div className="home-reveal-right border-y border-brand-200">
            {current.faqs.map((faq, index) => (
              <details key={faq.question} className="home-faq-row group border-b border-brand-100 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-bold leading-7 text-brand-900">
                  <span className="flex gap-4">
                    <span className="text-sm font-semibold text-brand-400">0{index + 1}</span>
                    {faq.question}
                  </span>
                  <span className="text-xl font-medium text-brand-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-6 pl-10 pr-8 text-sm leading-7 text-on-surface-variant">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="home-cta-panel home-reveal mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-brand-900 p-8 text-white shadow-xl shadow-brand-900/15 sm:p-10 lg:grid-cols-[1fr_.65fr] lg:items-center lg:p-14">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{current.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">{current.ctaBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact" className="home-button-sheen home-button-sheen-green inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-900 transition hover:bg-brand-50">
              {current.ctaButton}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="tel:0913497246" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white">
              0913 497 246
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
