import type { NewsItem } from "@/lib/data";

export const FALLBACK_NEWS: NewsItem[] = [
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
