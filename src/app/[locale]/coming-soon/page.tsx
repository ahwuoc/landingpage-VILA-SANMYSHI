import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { COMPANY_INFO } from "@/constants/company";
import StatusShell from "../_status/StatusShell";
import styles from "../_status/Status.module.css";

const copy = {
  vi: {
    metadataTitle: "Sắp ra mắt | VILA SANMYSHI",
    eyebrow: "Một trải nghiệm mới đang đến",
    title: "Hành trình mới.",
    highlight: "Kết nối vươn xa.",
    description: "Chúng tôi đang hoàn thiện trải nghiệm trực tuyến của VILA SANMYSHI, giúp bạn tiếp cận các dịch vụ vận tải, kho bãi và khai báo hải quan dễ dàng hơn.",
    notice: "Website đang trong giai đoạn chuẩn bị.",
    noticeDetail: "Ngày ra mắt sẽ được cập nhật tại đây. Bạn có thể liên hệ trực tiếp để được tư vấn dịch vụ ngay hôm nay.",
    support: "Trao đổi cùng đội ngũ VILA",
    hotline: "Gọi cho chúng tôi",
    email: "Gửi yêu cầu qua email",
    home: "Về trang chủ",
    imageAlt: "Cảng container kết nối mạng lưới vận tải hàng hóa",
    caption: "Sẵn sàng cho chặng tiếp theo.",
    captionDetail: "Việt Nam · Lào · Thái Lan",
  },
  en: {
    metadataTitle: "Coming soon | VILA SANMYSHI",
    eyebrow: "A new experience is on the way",
    title: "A new chapter.",
    highlight: "A wider connection.",
    description: "We are preparing a new online experience for VILA SANMYSHI, making our transport, warehousing and customs declaration services easier to explore.",
    notice: "Our website is taking shape.",
    noticeDetail: "The launch date will be announced here. You can contact our team directly for service enquiries today.",
    support: "Talk to the VILA team",
    hotline: "Give us a call",
    email: "Send us an email",
    home: "Back to home",
    imageAlt: "Container port connecting cargo transport networks",
    caption: "Ready for the next journey.",
    captionDetail: "Vietnam · Laos · Thailand",
  },
  th: {
    metadataTitle: "เร็ว ๆ นี้ | VILA SANMYSHI",
    eyebrow: "ประสบการณ์ใหม่กำลังจะมาถึง",
    title: "เริ่มต้นการเดินทางใหม่",
    highlight: "เชื่อมต่อได้ไกลกว่าเดิม",
    description: "เรากำลังเตรียมประสบการณ์ออนไลน์ใหม่ของ VILA SANMYSHI เพื่อให้คุณเข้าถึงบริการขนส่ง คลังสินค้า และพิธีการศุลกากรได้สะดวกยิ่งขึ้น",
    notice: "เว็บไซต์ของเราอยู่ระหว่างการเตรียมความพร้อม",
    noticeDetail: "เราจะประกาศวันเปิดตัวที่นี่ คุณสามารถติดต่อทีมงานเพื่อสอบถามบริการได้ตั้งแต่วันนี้",
    support: "พูดคุยกับทีมงาน VILA",
    hotline: "โทรหาเรา",
    email: "ส่งอีเมลถึงเรา",
    home: "กลับสู่หน้าหลัก",
    imageAlt: "ท่าเรือคอนเทนเนอร์ที่เชื่อมต่อเครือข่ายการขนส่งสินค้า",
    caption: "พร้อมสำหรับการเดินทางครั้งต่อไป",
    captionDetail: "เวียดนาม · ลาว · ไทย",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = copy[locale as keyof typeof copy] ?? copy.vi;

  return {
    title: text.metadataTitle,
    description: text.description,
    robots: { index: false, follow: false },
  };
}

export default async function ComingSoonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = copy[locale as keyof typeof copy] ?? copy.vi;

  return (
    <StatusShell locale={locale} route="/coming-soon" image="/images/editorial/container-port.jpg" imageAlt={text.imageAlt} caption={text.caption} captionDetail={text.captionDetail}>
      <p className={styles.eyebrow}>{text.eyebrow}</p>
      <h1 className={styles.title}>{text.title}<em>{text.highlight}</em></h1>
      <p className={styles.description}>{text.description}</p>
      <div className={styles.notice}>
        <strong>{text.notice}</strong>
        <p>{text.noticeDetail}</p>
      </div>
      <div className={styles.support}>
        <p className={styles.supportTitle}>{text.support}</p>
        <a href={`tel:${COMPANY_INFO.hotline}`} className={styles.contact}>
          <Phone size={18} aria-hidden="true" />
          <div><small>{text.hotline}</small><strong>{COMPANY_INFO.hotline}</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a href={`mailto:${COMPANY_INFO.email}`} className={styles.contact}>
          <Mail size={18} aria-hidden="true" />
          <div><small>{text.email}</small><strong>{COMPANY_INFO.email}</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <Link href="/" className={styles.textLink}>{text.home}<ArrowRight size={15} aria-hidden="true" /></Link>
    </StatusShell>
  );
}
