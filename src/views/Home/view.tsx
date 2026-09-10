import Image from "next/image";
import {
  ArrowRight,
  BellRing,
  Check,
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
    heroImageAlt: "Xe hàng làm thủ tục tại Cửa khẩu Quốc tế Lao Bảo",
    corridorDesk: "Trung tâm điều phối EWEC",
    corridorStatus: "Đang kết nối",
    corridorPoints: ["Quảng Trị", "Savannakhet", "Mukdahan"],
    heroMetrics: [
      { value: "01", label: "Đầu mối chịu trách nhiệm" },
      { value: "06", label: "Nhóm chứng từ rà soát" },
      { value: "04", label: "Chặng kiểm soát lô hàng" },
      { value: "24/7", label: "Hỗ trợ vận hành" },
    ],
    trackingEyebrow: "Cổng theo dõi mới",
    trackingTitle: "Khách hàng tự xem tiến độ, hệ thống tự báo khi thông quan.",
    trackingBody: "Timeline, trạng thái hải quan và checklist chứng từ được gom vào một mã tra cứu duy nhất.",
    trackingCta: "Mở cổng theo dõi",
    trackingDemo: "Xem mã demo",
    trackingPillars: ["Cập nhật mỗi 5 giây", "Báo Zalo & email", "Không lộ thông tin liên hệ"],
    trackingMock: {
      control: "Bảng điều phối khách hàng",
      live: "Dữ liệu trực tiếp",
      status: "Đã thông quan",
      code: "VILA-EWEC-002",
      cargo: "Linh kiện điện tử · 18,4 tấn",
      route: "Đà Nẵng → Lao Bảo → Savannakhet",
      progress: "06 / 08 chặng",
      metrics: [
        { label: "Khối lượng", value: "18,4 tấn" },
        { label: "ETA Savannakhet", value: "16:45 hôm nay" },
        { label: "Chứng từ", value: "06 / 06 đã đủ" },
        { label: "Điều phối viên", value: "Nguyễn Minh Anh" },
      ],
      notificationTitle: "Thông quan lúc 10:42",
      notificationBody: "Zalo và email đã gửi tới khách hàng.",
      timeline: ["Tiếp nhận", "Mở tờ khai", "Kiểm hóa", "Thông quan", "Vận chuyển"],
    },
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
      {
        category: "Tại cửa khẩu",
        title: "Giao nhận Lao Bảo – Dansavanh",
        description: "Phối hợp phương tiện, chứng từ và bàn giao hàng tại cặp cửa khẩu trọng điểm.",
      },
      {
        category: "Tuân thủ",
        title: "Kiểm tra chính sách mặt hàng",
        description: "Rà soát giấy phép, xuất xứ, thuế và yêu cầu quản lý chuyên ngành trước khi hàng đi.",
      },
      {
        category: "Điều phối",
        title: "Theo dõi chứng từ và phương tiện",
        description: "Một đầu mối cập nhật hồ sơ, vị trí phương tiện và tiến độ bàn giao xuyên suốt.",
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
    heroImageAlt: "Cargo trucks clearing Lao Bao International Border Gate",
    corridorDesk: "EWEC operations desk",
    corridorStatus: "Live corridor",
    corridorPoints: ["Quang Tri", "Savannakhet", "Mukdahan"],
    heroMetrics: [
      { value: "01", label: "Accountable contact" },
      { value: "06", label: "Document groups reviewed" },
      { value: "04", label: "Controlled shipment stages" },
      { value: "24/7", label: "Operations support" },
    ],
    trackingEyebrow: "New tracking portal",
    trackingTitle: "Clients see progress while the system reports customs clearance.",
    trackingBody: "Timeline, customs status and document readiness are connected through one tracking code.",
    trackingCta: "Open tracking portal",
    trackingDemo: "View demo code",
    trackingPillars: ["Refreshes every 5 seconds", "Zalo & email alerts", "Contact details stay private"],
    trackingMock: {
      control: "Customer operations board",
      live: "Live data",
      status: "Customs cleared",
      code: "VILA-EWEC-002",
      cargo: "Electronic components · 18.4 tonnes",
      route: "Da Nang → Lao Bao → Savannakhet",
      progress: "06 / 08 stages",
      metrics: [
        { label: "Gross weight", value: "18.4 tonnes" },
        { label: "ETA Savannakhet", value: "16:45 today" },
        { label: "Documents", value: "06 / 06 complete" },
        { label: "Coordinator", value: "Nguyen Minh Anh" },
      ],
      notificationTitle: "Cleared at 10:42",
      notificationBody: "Zalo and email notices were sent to the client.",
      timeline: ["Received", "Declared", "Inspection", "Cleared", "In transit"],
    },
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
      { category: "Border handling", title: "Lao Bao – Dansavanh handover", description: "Coordinate vehicles, documents and cargo handover at the key border pair." },
      { category: "Compliance", title: "Commodity policy review", description: "Check permits, origin, tax and specialist requirements before cargo moves." },
      { category: "Coordination", title: "Document and vehicle tracking", description: "One contact reports document, vehicle and final handover progress throughout." },
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
    heroImageAlt: "รถบรรทุกสินค้าผ่านพิธีการที่ด่านลาวบาว",
    corridorDesk: "ศูนย์ประสานงาน EWEC",
    corridorStatus: "เชื่อมต่อเส้นทาง",
    corridorPoints: ["กวางตรี", "สะหวันนะเขต", "มุกดาหาร"],
    heroMetrics: [
      { value: "01", label: "ผู้ประสานงานรับผิดชอบ" },
      { value: "06", label: "กลุ่มเอกสารที่ตรวจสอบ" },
      { value: "04", label: "ขั้นตอนควบคุมการขนส่ง" },
      { value: "24/7", label: "สนับสนุนการดำเนินงาน" },
    ],
    trackingEyebrow: "พอร์ทัลติดตามใหม่",
    trackingTitle: "ลูกค้าดูความคืบหน้าได้ และระบบแจ้งเมื่อผ่านพิธีการ",
    trackingBody: "ไทม์ไลน์ สถานะศุลกากร และเอกสารเชื่อมต่อด้วยรหัสติดตามเดียว",
    trackingCta: "เปิดพอร์ทัลติดตาม",
    trackingDemo: "ดูรหัสทดลอง",
    trackingPillars: ["รีเฟรชทุก 5 วินาที", "แจ้งเตือน Zalo และอีเมล", "ไม่เปิดเผยข้อมูลติดต่อ"],
    trackingMock: {
      control: "หน้าควบคุมสำหรับลูกค้า",
      live: "ข้อมูลสด",
      status: "ผ่านพิธีการแล้ว",
      code: "VILA-EWEC-002",
      cargo: "ชิ้นส่วนอิเล็กทรอนิกส์ · 18.4 ตัน",
      route: "ดานัง → ลาวบาว → สะหวันนะเขต",
      progress: "06 / 08 ขั้นตอน",
      metrics: [
        { label: "น้ำหนักรวม", value: "18.4 ตัน" },
        { label: "ถึงสะหวันนะเขต", value: "16:45 วันนี้" },
        { label: "เอกสาร", value: "ครบ 06 / 06" },
        { label: "ผู้ประสานงาน", value: "Nguyen Minh Anh" },
      ],
      notificationTitle: "ผ่านพิธีการเวลา 10:42",
      notificationBody: "ส่งแจ้งเตือน Zalo และอีเมลถึงลูกค้าแล้ว",
      timeline: ["รับเอกสาร", "ยื่นใบขน", "ตรวจสินค้า", "ผ่านพิธีการ", "กำลังขนส่ง"],
    },
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
      { category: "บริการหน้าด่าน", title: "ส่งมอบลาวบาว – แดนสะหวัน", description: "ประสานรถ เอกสาร และการส่งมอบสินค้าที่คู่ด่านสำคัญ" },
      { category: "การปฏิบัติตาม", title: "ตรวจนโยบายสินค้า", description: "ตรวจใบอนุญาต ถิ่นกำเนิด ภาษี และข้อกำหนดเฉพาะก่อนขนส่ง" },
      { category: "การประสานงาน", title: "ติดตามเอกสารและยานพาหนะ", description: "ผู้ประสานงานหลักอัปเดตเอกสาร รถ และความคืบหน้าการส่งมอบตลอดงาน" },
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
  "/images/services/hub.png",
  "/images/services/fulfillment-premium.png",
  "/images/services/container-stat.png",
];
const fallbackNews: NewsItem[] = [
  {
    id: 9001,
    title: {
      vi: "Checklist hồ sơ thông quan cho lô hàng qua Lao Bảo",
      en: "A practical customs clearance checklist for Lao Bao shipments",
      th: "เช็กลิสต์เอกสารสำหรับสินค้าที่ผ่านด่านลาวบาว",
    },
    content: {
      vi: "<p>Những nhóm chứng từ nên chuẩn bị sớm để hạn chế thời gian chờ tại cửa khẩu và chủ động kế hoạch giao nhận.</p>",
      en: "<p>The document groups to prepare early so border waiting time stays predictable and delivery planning remains on track.</p>",
      th: "<p>กลุ่มเอกสารที่ควรเตรียมล่วงหน้าเพื่อลดเวลารอที่ด่านและวางแผนการส่งมอบได้ชัดเจน</p>",
    },
    image: "/images/news/regulation.png",
    author: "VILA SANMYSHI",
    category_id: 901,
    news_categories: {
      name: { vi: "Hải quan", en: "Customs", th: "ศุลกากร" },
      slug: "customs",
    },
    date: "2026-09-08",
    created_at: "2026-09-08T08:00:00.000Z",
    slug: "checklist-ho-so-thong-quan-lao-bao",
  },
  {
    id: 9002,
    title: {
      vi: "Tối ưu tuyến Việt Nam – Lào – Thái Lan theo từng loại hàng",
      en: "Choosing the right Vietnam – Laos – Thailand route by cargo type",
      th: "เลือกเส้นทางเวียดนาม – ลาว – ไทยให้เหมาะกับประเภทสินค้า",
    },
    content: {
      vi: "<p>Gợi ý cách cân đối thời gian, phương tiện và điểm bàn giao cho hàng nguyên chuyến, hàng gom và hàng cần kiểm soát đặc biệt.</p>",
      en: "<p>How to balance timing, vehicles and handover points for full loads, consolidated cargo and controlled commodities.</p>",
      th: "<p>แนวทางจัดสมดุลเวลา รถ และจุดส่งมอบสำหรับสินค้าเต็มเที่ยว สินค้ารวมเที่ยว และสินค้าที่ต้องควบคุม</p>",
    },
    image: "/images/news/featured.png",
    author: "VILA SANMYSHI",
    category_id: 902,
    news_categories: {
      name: { vi: "Thị trường", en: "Market", th: "ตลาด" },
      slug: "market",
    },
    date: "2026-09-04",
    created_at: "2026-09-04T08:00:00.000Z",
    slug: "toi-uu-tuyen-viet-lao-thai",
  },
  {
    id: 9003,
    title: {
      vi: "Theo dõi lô hàng minh bạch hơn với một mã tra cứu",
      en: "Make shipment updates clearer with one tracking code",
      th: "ติดตามการขนส่งได้ชัดเจนขึ้นด้วยรหัสเดียว",
    },
    content: {
      vi: "<p>Timeline, tình trạng chứng từ và cập nhật tại cửa khẩu được gom vào một luồng theo dõi dễ đọc cho đội ngũ xuất nhập khẩu.</p>",
      en: "<p>Timeline, document readiness and border updates are brought together in one clear view for import-export teams.</p>",
      th: "<p>รวมไทม์ไลน์ ความพร้อมเอกสาร และอัปเดตหน้าด่านไว้ในมุมมองเดียวสำหรับทีมส่งออกและนำเข้า</p>",
    },
    image: "/images/news/hero.png",
    author: "VILA SANMYSHI",
    category_id: 903,
    news_categories: {
      name: { vi: "Vận hành", en: "Operations", th: "การดำเนินงาน" },
      slug: "operations",
    },
    date: "2026-08-29",
    created_at: "2026-08-29T08:00:00.000Z",
    slug: "theo-doi-lo-hang-mot-ma-tra-cuu",
  },
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
const trackingPillarIcons = [Clock3, BellRing, ShieldCheck];
const trackingPillarTones = [
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-brand-100 text-brand-700 border-brand-200",
];

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
  const landingNews = newsList.length ? newsList : fallbackNews;

  const benefits = Array.from({ length: 4 }, (_, index) => ({
    title: coreT(`benefits.${index}.title`),
    description: coreT(`benefits.${index}.desc`),
  }));

  return (
    <div id="top" className="bg-white text-on-surface">
      <HomeMotion />
      <section className="relative overflow-hidden bg-brand-950 pt-28 text-white lg:pt-40">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-14 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-16 lg:pb-16">
          <div className="home-hero-sequence py-8 lg:py-12">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200">
              <MapPin className="text-brand-500" size={15} aria-hidden="true" />
              {current.heroEyebrow}
            </div>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.7rem,5vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.045em] text-white">
              {current.heroLead}{" "}
              <span className="text-brand-accent">{current.heroHighlight}</span>{" "}
              {current.heroTail}
            </h1>
            <p className="mt-7 max-w-xl text-base font-normal leading-8 text-white/68 lg:text-[1.05rem]">
              {current.heroBody}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="home-button-sheen inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 text-sm font-semibold text-brand-950 transition-colors hover:bg-[#dda044]"
              >
                {current.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {current.secondaryCta}
              </Link>
            </div>

            <div className="mt-9 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
              {current.trust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-xs leading-5 text-white/65">
                  <CheckCircle2 className="shrink-0 text-brand-accent" size={16} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="home-hero-media relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-brand-900">
              <Image
                src="/images/hero/hero-1.png"
                alt={current.heroImageAlt}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="home-hero-image object-cover"
              />
              <div className="absolute inset-0 bg-brand-950/15" aria-hidden="true" />

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-brand-950/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                Lao Bao · Vietnam
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-brand-950/95 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                      <Route size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">{current.corridorDesk}</p>
                      <p className="mt-1 text-xs text-white/60">{current.corridorStatus}</p>
                    </div>
                  </div>
                  <span className="rounded-md border border-white/15 px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-white/60">EWEC</span>
                </div>

                <div className="mt-5 flex items-center">
                  {current.corridorPoints.map((point, index) => (
                    <div key={point} className={`flex min-w-0 items-center ${index < current.corridorPoints.length - 1 ? "flex-1" : ""}`}>
                      <div className="min-w-0">
                        <span className="block h-2 w-2 rounded-full bg-brand-500 ring-4 ring-brand-500/20" aria-hidden="true" />
                        <span className="mt-2 block truncate text-[10px] font-semibold text-white/75 sm:text-xs">{point}</span>
                      </div>
                      {index < current.corridorPoints.length - 1 && <span className="mx-3 mb-5 h-px flex-1 bg-white/25" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-white/12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:px-8 lg:grid-cols-4">
            {current.heroMetrics.map((metric, index) => (
              <div key={metric.label} className={`py-6 pr-4 sm:py-7 lg:px-7 ${index > 0 ? "border-l border-white/12 pl-4" : "lg:pl-0"}`}>
                <strong className="block text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">{metric.value}</strong>
                <span className="mt-1 block max-w-[11rem] text-[11px] leading-5 text-white/55">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label={current.servicesEyebrow} className="home-reveal relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-14">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-white">
            <div className="flex items-center justify-between border-b border-brand-200 px-5 py-4 sm:px-6">
              <h2 className="border-l-2 border-brand-accent pl-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{current.servicesEyebrow}</h2>
              <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700">
                {current.allServices}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-px bg-brand-200 sm:grid-cols-2 lg:grid-cols-4">
              {current.quickServices.map((service, index) => {
                const Icon = quickServiceIcons[index];
                return (
                  <Link href="/services" key={service.title} className="home-service-link group bg-white p-5 transition-colors hover:bg-brand-50 lg:p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-700">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.12em] text-brand-400">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 font-bold leading-snug text-on-surface">{service.title}</h3>
                    <p className="mt-2 text-sm font-normal leading-6 text-on-surface-variant">{service.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </section>

      <section className="relative overflow-hidden border-b border-brand-200 bg-gradient-to-b from-blue-50/70 to-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div className="home-reveal-left">
            <div className="inline-flex items-center gap-3 text-label-lg">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-30" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
              </span>
              {current.trackingEyebrow}
            </div>
            <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.12] tracking-[-0.035em] sm:text-5xl">
              {current.trackingTitle}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base sm:leading-8">
              {current.trackingBody}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {current.trackingPillars.map((pillar, index) => {
                const Icon = trackingPillarIcons[index];
                return (
                  <div key={pillar} className="flex items-center gap-3 rounded-xl border border-brand-200 bg-white p-3.5 shadow-[var(--shadow-card)]">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${trackingPillarTones[index]}`}>
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold leading-5 text-on-surface">{pillar}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/tracking" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                {current.trackingCta}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/tracking?code=VILA-EWEC-002" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-brand-300 bg-white px-6 text-sm font-semibold text-on-surface transition-colors hover:border-blue-500 hover:text-blue-600">
                {current.trackingDemo}
                <span className="font-mono text-[11px] text-on-surface-variant">002</span>
              </Link>
            </div>
          </div>

          <div className="home-reveal-right relative">
            <div className="absolute -inset-3 -z-0 translate-x-3 translate-y-3 rounded-2xl border border-blue-100 bg-blue-50" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#102538] p-3 shadow-[0_24px_70px_rgba(15,35,55,0.18)] sm:p-4">
              <div className="flex items-center justify-between px-2 pb-3 text-white/55">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">{current.trackingMock.control}</span>
                <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-blue-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                  {current.trackingMock.live}
                </span>
              </div>

              <div className="rounded-xl bg-white p-5 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-blue-600">{current.trackingMock.code}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] sm:text-2xl">{current.trackingMock.cargo}</h3>
                    <p className="mt-2 inline-flex items-center gap-2 text-xs text-on-surface-variant">
                      <Route size={14} className="text-brand-600" aria-hidden="true" />
                      {current.trackingMock.route}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand-200 bg-brand-100 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-800">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    {current.trackingMock.status}
                  </span>
                </div>

                <div className="mt-7 rounded-xl border border-brand-200 bg-brand-50 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Timeline</p>
                    <p className="text-[10px] font-bold text-blue-600">{current.trackingMock.progress}</p>
                  </div>
                  <div className="mt-5 grid grid-cols-5">
                    {current.trackingMock.timeline.map((step, index) => (
                      <div key={step} className="relative min-w-0 text-center">
                        {index < current.trackingMock.timeline.length - 1 && (
                          <span className={`absolute left-1/2 top-2 h-0.5 w-full ${index < 3 ? "bg-brand-500" : "bg-brand-200"}`} aria-hidden="true" />
                        )}
                        <span className={`relative mx-auto grid h-4 w-4 place-items-center rounded-full border-2 ${index <= 3 ? "border-brand-600 bg-brand-600" : "border-brand-300 bg-white"}`}>
                          {index <= 3 && <Check size={9} className="text-white" aria-hidden="true" />}
                        </span>
                        <span className={`mt-2 block truncate px-1 text-[8px] font-semibold sm:text-[9px] ${index === 3 ? "text-brand-700" : "text-on-surface-variant"}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-brand-200 bg-brand-200 sm:grid-cols-2">
                  {current.trackingMock.metrics.map((metric, index) => (
                    <div key={metric.label} className="bg-white p-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${index === 1 ? "bg-blue-500" : index === 2 ? "bg-brand-500" : index === 3 ? "bg-amber-500" : "bg-brand-300"}`} aria-hidden="true" />
                        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">{metric.label}</p>
                      </div>
                      <p className="mt-2 text-xs font-bold text-on-surface sm:text-sm">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-900 p-4 text-white">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-600">
                    <BellRing size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold">{current.trackingMock.notificationTitle}</p>
                      <span className="rounded-md bg-blue-500/15 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-blue-100">Zalo · Email</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-5 text-white/60">{current.trackingMock.notificationBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="home-reveal grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div>
              <p className="text-label-lg">{current.servicesEyebrow}</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
                {current.servicesTitle}
              </h2>
            </div>
            <div>
              <p className="text-sm font-normal leading-7 text-on-surface-variant sm:text-base">{current.servicesBody}</p>
              <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                {current.allServices}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="home-stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {landingServices.map((service, index) => {
              const useBentoLayout = landingServices.length >= 5;
              const isSpotlight = useBentoLayout && index === 0;
              const columnSpan = !useBentoLayout
                ? "lg:col-span-4"
                : index === 0
                  ? "lg:col-span-12"
                  : index <= 3
                    ? "lg:col-span-4"
                    : "lg:col-span-6";

              return (
                <Link
                  href={service.href}
                  key={service.id}
                  className={`group overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)] transition duration-300 hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)] ${columnSpan} ${isSpotlight ? "lg:grid lg:grid-cols-[1.15fr_.85fr]" : ""}`}
                >
                  <div className={`relative overflow-hidden bg-brand-100 ${isSpotlight ? "aspect-[16/10] lg:aspect-auto lg:min-h-[23rem]" : "aspect-[16/10]"}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes={isSpotlight ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 33vw"}
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className={`p-6 lg:p-7 ${isSpotlight ? "lg:flex lg:flex-col lg:justify-center lg:p-10" : ""}`}>
                    <span className="text-label-lg inline-flex">
                      {service.category}
                    </span>
                    <h3 className={`mt-4 font-bold leading-snug tracking-[-0.025em] ${isSpotlight ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>{service.title}</h3>
                    <p className={`mt-3 text-sm font-normal leading-7 text-on-surface-variant ${isSpotlight ? "max-w-lg" : "line-clamp-3"}`}>{service.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                      {current.secondaryCta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <article className="home-reveal-left rounded-2xl border border-brand-200 bg-white p-6 sm:p-8">
            <div className="text-label-lg flex items-center gap-3">
              <FileCheck2 size={20} aria-hidden="true" />
              {current.documentsEyebrow}
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              {current.documentsTitle}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">{current.documentsBody}</p>

            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-brand-200 bg-brand-200 sm:grid-cols-2">
              {current.documents.map((document, index) => (
                <div key={document.title} className="home-document-item flex items-start gap-3 bg-white p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand-100 text-xs font-bold text-brand-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold leading-snug text-on-surface">{document.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-on-surface-variant">{document.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-4 rounded-xl bg-brand-100 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-on-surface">{current.processEyebrow}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{current.processBody}</p>
              </div>
            </div>
          </article>

          <aside className="home-reveal-right rounded-2xl bg-brand-900 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white">
                <Route size={24} aria-hidden="true" />
              </span>
              <span className="rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-white/70">EWEC</span>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{current.routesEyebrow}</p>
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

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="home-reveal-left relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-200 bg-brand-100 shadow-[var(--shadow-card)]">
            <Image
              src="/images/hero/hero-2.png"
              alt="Khu làm thủ tục tại cửa khẩu Lao Bảo"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="home-reveal-right">
            <p className="text-label-lg">{current.processEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              {current.processTitle}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-on-surface-variant">{current.processBody}</p>

            <ol className="home-stagger mt-8 grid gap-4 sm:grid-cols-2">
              {current.processSteps.map((step, index) => {
                const Icon = processIcons[index];
                return (
                  <li key={step.title} className="rounded-xl border border-brand-200 bg-white p-5 shadow-[var(--shadow-card)]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-600">
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

      <section className="bg-brand-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="home-reveal mx-auto max-w-3xl text-center">
            <p className="text-label-lg">{current.proofEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">{current.proofTitle}</h2>
            <p className="mt-5 leading-7 text-on-surface-variant">{current.proofBody}</p>
          </div>

          <div className="home-reveal mt-12 grid overflow-hidden rounded-2xl bg-brand-900 text-white sm:grid-cols-2 lg:grid-cols-4">
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
                <article key={benefit.title} className="rounded-xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)]">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-100 text-brand-600">
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

      <section className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="home-reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-label-lg">{current.newsEyebrow}</p>
                <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">{current.newsTitle}</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                {current.readMore}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="home-stagger mt-10 grid gap-6 lg:grid-cols-3">
              {landingNews.slice(0, 6).map((news) => {
                const title = news.title?.[locale] || news.title?.vi;
                const category = news.news_categories?.name?.[locale] || news.news_categories?.name?.vi || "VILA News";
                return (
                  <Link href={`/news/${news.slug || news.id}`} key={news.id} className="group rounded-2xl border border-brand-200 bg-white p-3 shadow-[var(--shadow-card)] transition hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-brand-100">
                      <Image
                        src={safeImage(news.image, "/images/news/regulation.png")}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600">{category}</span>
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

      <section className="bg-brand-50 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div className="home-reveal-left">
            <p className="text-label-lg">{current.faqEyebrow}</p>
            <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">{current.faqTitle}</h2>
            <p className="mt-5 max-w-md leading-7 text-on-surface-variant">{current.ctaBody}</p>
          </div>

          <div className="home-reveal-right border-y border-brand-200">
            {current.faqs.map((faq, index) => (
              <details key={faq.question} className="home-faq-row group border-b border-brand-200 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-6 font-bold leading-7 text-on-surface">
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

      <section className="px-6 py-20 sm:px-8 lg:py-24">
        <div className="home-cta-panel home-reveal mx-auto grid max-w-7xl gap-8 rounded-2xl bg-brand-900 p-8 text-white sm:p-10 lg:grid-cols-[1fr_.65fr] lg:items-center lg:p-14">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{current.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">{current.ctaBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact" className="home-button-sheen home-button-sheen-green inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-100">
              {current.ctaButton}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="tel:0913497246" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              0913 497 246
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
