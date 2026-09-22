"use client";

import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { COMPANY_INFO } from "@/constants/company";
import StatusShell from "./_status/StatusShell";
import styles from "./_status/Status.module.css";

const copy = {
  vi: {
    eyebrow: "Không tìm thấy trang",
    title: "Có lẽ bạn đã rẽ nhầm hướng.",
    description: "Trang bạn đang tìm có thể đã được chuyển hoặc không còn tồn tại. Hãy trở về trang chủ để tiếp tục hành trình cùng VILA SANMYSHI.",
    home: "Về trang chủ",
    support: "Bạn cần hỗ trợ?",
    hotline: "Liên hệ với chúng tôi",
    imageAlt: "Cảng container và hoạt động vận tải hàng hóa",
    caption: "Kết nối mọi hành trình.",
    captionDetail: "Việt Nam · Lào · Thái Lan",
  },
  en: {
    eyebrow: "Page not found",
    title: "A small detour in your journey.",
    description: "The page you are looking for may have moved or is no longer available. Return to our homepage to continue your journey with VILA SANMYSHI.",
    home: "Back to home",
    support: "Need a hand?",
    hotline: "Get in touch",
    imageAlt: "Container port and cargo transport operations",
    caption: "Connecting every journey.",
    captionDetail: "Vietnam · Laos · Thailand",
  },
  th: {
    eyebrow: "ไม่พบหน้าที่ต้องการ",
    title: "เส้นทางนี้อาจเปลี่ยนไปแล้ว",
    description: "หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือไม่มีอยู่อีกต่อไป กลับสู่หน้าหลักเพื่อเดินทางต่อไปกับ VILA SANMYSHI",
    home: "กลับสู่หน้าหลัก",
    support: "ต้องการความช่วยเหลือ?",
    hotline: "ติดต่อเรา",
    imageAlt: "ท่าเรือคอนเทนเนอร์และการขนส่งสินค้า",
    caption: "เชื่อมต่อทุกการเดินทาง",
    captionDetail: "เวียดนาม · ลาว · ไทย",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const text = copy[locale as keyof typeof copy] ?? copy.vi;

  return (
    <StatusShell locale={locale} image="/images/editorial/container-port.jpg" imageAlt={text.imageAlt} caption={text.caption} captionDetail={text.captionDetail}>
      <p className={styles.eyebrow}>{text.eyebrow}</p>
      <p className={styles.number} aria-hidden="true">404</p>
      <h1 className={`${styles.title} ${styles.notFoundTitle}`}>{text.title}</h1>
      <p className={styles.description}>{text.description}</p>
      <Link href="/" className={styles.button}>{text.home}<ArrowRight size={16} aria-hidden="true" /></Link>
      <div className={styles.support}>
        <p className={styles.supportTitle}>{text.support}</p>
        <a href={`tel:${COMPANY_INFO.hotline}`} className={styles.contact}>
          <Phone size={18} aria-hidden="true" />
          <div><small>{text.hotline}</small><strong>{COMPANY_INFO.hotline}</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </StatusShell>
  );
}
