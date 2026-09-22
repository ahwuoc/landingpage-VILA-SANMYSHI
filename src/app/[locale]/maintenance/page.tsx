import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { COMPANY_INFO } from "@/constants/company";
import StatusShell from "../_status/StatusShell";
import styles from "../_status/Status.module.css";

const copy = {
  vi: {
    home: "Về trang chủ",
    imageAlt: "Không gian kho hàng và lưu trữ hàng hóa",
    caption: "Luôn sẵn sàng kết nối.",
    captionDetail: "Việt Nam · Lào · Thái Lan",
  },
  en: {
    home: "Back to home",
    imageAlt: "Warehouse and cargo storage facilities",
    caption: "Always here to connect.",
    captionDetail: "Vietnam · Laos · Thailand",
  },
  th: {
    home: "กลับสู่หน้าหลัก",
    imageAlt: "พื้นที่คลังสินค้าและการจัดเก็บสินค้า",
    caption: "พร้อมเชื่อมต่อกับคุณเสมอ",
    captionDetail: "เวียดนาม · ลาว · ไทย",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });

  return {
    title: t("metadata_title"),
    robots: { index: false, follow: false },
  };
}

export default async function MaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });
  const text = copy[locale as keyof typeof copy] ?? copy.vi;

  return (
    <StatusShell locale={locale} route="/maintenance" image="/images/editorial/warehouse.jpg" imageAlt={text.imageAlt} caption={text.caption} captionDetail={text.captionDetail}>
      <p className={styles.eyebrow}>{t("status_badge")}</p>
      <h1 className={styles.title}>{t("title_part1")}<em>{t("title_highlight")}</em></h1>
      <p className={styles.description}>{t("description")}</p>
      <div className={styles.support}>
        <p className={styles.supportTitle}>{t("channels_label")}</p>
        <a href={`tel:${COMPANY_INFO.hotline}`} className={styles.contact}>
          <Phone size={18} aria-hidden="true" />
          <div><small>{t("hotline_label")}</small><strong>{COMPANY_INFO.hotline}</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a href={`mailto:${COMPANY_INFO.email}`} className={styles.contact}>
          <Mail size={18} aria-hidden="true" />
          <div><small>{t("email_label")}</small><strong>{COMPANY_INFO.email}</strong></div>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <Link href="/" className={styles.textLink}>{text.home}<ArrowRight size={15} aria-hidden="true" /></Link>
    </StatusShell>
  );
}
