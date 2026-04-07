import { supabase } from "@/lib/supabase";

export interface NewsItem {
  id: number;
  title: Record<string, string>;
  content: Record<string, string>;
  image: string;
  author: string;
  category_id: number;
  news_categories: { name: Record<string, string>; slug: string };
  date: string;
  created_at: string;
  slug?: string;
}

export interface ServiceItem {
  id: string;
  title: Record<string, string>;
  image: string;
  content: Record<string, string>;
  created_at: string;
  category_id?: number;
  service_categories?: { name: Record<string, string>; slug: string };
}

export interface HeroSlide {
  id: number;
  tag: Record<string, string>;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  image: string;
  cta_primary: Record<string, string>;
  cta_primary_action: "modal" | "href";
  cta_primary_service?: string;
  cta_primary_href?: string;
  cta_secondary?: Record<string, string>;
  cta_secondary_action?: "modal" | "href";
  cta_secondary_service?: string;
  cta_secondary_href?: string;
  display_order: number;
  is_visible: boolean;
}

export async function getNewsList(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from("news").select("*, news_categories(name, slug)").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as any || [];
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data } = await supabase.from("news").select("*, news_categories(name, slug)").eq("id", id).single();
  return data as any || null;
}

export async function getNewsCategories(): Promise<{ id: number; name: Record<string, string>; slug: string }[]> {
  const { data, error } = await supabase.from("news_categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getServicesList(): Promise<ServiceItem[]> {
  const { data, error } = await supabase.from("services").select("*, service_categories(name, slug)").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as any || [];
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const { data } = await supabase.from("services").select("*, service_categories(name, slug)").eq("id", id).single();
  return data as any || null;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: { vi: "Đại lý Khai báo Hải quan Uy tín tại Quảng Trị", en: "Reputable Customs Declaration Agency in Quang Tri", th: "หน่วยงานสำแดงศุลกากรที่มีชื่อเสียงในกวางจี" },
    title: {
      vi: "VILA <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>SANMYSHI</span> <br /> LOGISTICS",
      en: "VILA <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>SANMYSHI</span> <br /> LOGISTICS",
      th: "VILA <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>SANMYSHI</span> <br /> LOGISTICS"
    },
    subtitle: {
      vi: "Giải pháp khai báo hải quan chuyên nghiệp tại cửa khẩu Lao Bảo. Vila Sanmyshi cam kết tối ưu hóa quy trình XNK, rút ngắn thời gian thông quan cho doanh nghiệp của bạn.",
      en: "Professional customs declaration solutions at Lao Bao border gate. Vila Sanmyshi is committed to optimizing processes and shortening clearance time for your business.",
      th: "โซลูชันการสำแดงศุลกากรมืออาชีพที่ด่านลาวบาว Vila Sanmyshi มุ่งมั่นที่จะเพิ่มประสิทธิภาพกระบวนการนำเข้าและส่งออก และลดระยะเวลาในการเดินพิธีการศุลกากรสำหรับธุรกิจของคุณ"
    },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    cta_primary: { vi: "Bắt đầu ngay", en: "Start Now", th: "เริ่มเลย" },
    cta_primary_action: "href",
    cta_primary_href: "/contact",
    display_order: 1,
    is_visible: true
  },
  {
    id: 2,
    tag: { vi: "Chuyên gia Hành lang Kinh tế Đông - Tây", en: "Expert in East-West Economic Corridor", th: "ผู้เชี่ยวชาญในระเบียงเศรษฐกิจตะวันออก-ตะวันตก" },
    title: {
      vi: "KẾT NỐI <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>LỤC ĐỊA</span> <br /> XUYÊN BIÊN GIỚI",
      en: "CONNECTING <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>CONTINENTS</span> <br /> ACROSS BORDERS",
      th: "เชื่อมต่อ <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>ทวีป</span> <br /> ข้ามพรมแดน"
    },
    subtitle: {
      vi: "Chúng tôi là cầu nối chiến lược trên tuyến EWEC, kết nối Việt Nam - Lào - Thái Lan với quy trình vận tải đa phương thức an toàn và tiết kiệm chi phí nhất.",
      en: "We are a strategic bridge on the EWEC route, connecting Vietnam - Laos - Thailand with the safest and most cost-effective multimodal transport process.",
      th: "เราเป็นสะพานเชื่อมเชิงยุทธศาสตร์บนเส้นทาง EWEC เชื่อมต่อเวียดนาม - ลาว - ไทย ด้วยกระบวนการขนส่งต่อเนื่องหลายรูปแบบที่ปลอดภัยและประหยัดต้นทุนที่สุด"
    },
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
    cta_primary: { vi: "Xem dịch vụ", en: "Our Services", th: "บริการของเรา" },
    cta_primary_action: "href",
    cta_primary_href: "/services",
    display_order: 2,
    is_visible: true
  },
  {
    id: 3,
    tag: { vi: "Hệ thống Kho bãi đạt chuẩn Quốc tế", en: "International Standard Warehouse System", th: "ระบบคลังสินค้ามาตรฐานสากล" },
    title: {
      vi: "DỊCH VỤ <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>KHO VẬN</span> <br /> HIỆN ĐẠI",
      en: "MODERN <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>LOGISTICS</span> <br /> SERVICES",
      th: "บริการ <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary'>โลจิสติกส์</span> <br /> ที่ทันสมัย"
    },
    subtitle: {
      vi: "Tối ưu hóa chuỗi cung ứng với hệ thống kho ngoại quan và kho CFS tại Lao Bảo. Theo dõi hàng hóa 24/7 với công nghệ quản lý kho thông minh WMS.",
      en: "Optimize supply chain with bonded warehouse and CFS warehouse system in Lao Bao. Track goods 24/7 with smart warehouse management technology WMS.",
      th: "เพิ่มประสิทธิภาพห่วงโซ่อุปทานด้วยระบบคลังสินค้าทัณฑ์บนและคลังสินค้า CFS ในลาวบาว ติดตามสินค้าตลอด 24 ชั่วโมงด้วยเทคโนโลยีการจัดการคลังสินค้าอัจฉริยะ WMS"
    },
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
    cta_primary: { vi: "Tư vấn ngay", en: "Consult Now", th: "ปรึกษาตอนนี้" },
    cta_primary_action: "modal",
    display_order: 3,
    is_visible: true
  }
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return HERO_SLIDES;
}
