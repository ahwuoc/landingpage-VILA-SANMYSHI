"use client";

import { useState, useEffect, FormEvent } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2, ChevronDown, ClipboardList, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import PageHero from "@/components/PageHero";
import { VietnamMap } from "@/components/maps/VietnamMap";
import { useTranslations, useLocale } from "next-intl";
import styles from "./Contact.module.css";

const contactCopy = {
  vi: {
    title: "Bắt đầu bằng",
    accent: "một cuộc trò chuyện.",
    intro: "Một lô hàng, một tuyến đường hay một câu hỏi về thủ tục. Chia sẻ với chúng tôi để cùng tìm phương án phù hợp cho doanh nghiệp của bạn.",
    image: "Cửa khẩu Quốc tế Lao Bảo, Quảng Trị",
    supportTitle: "Kết nối đúng người.",
    supportAccent: "An tâm từng bước.",
    supportDesc: "Trao đổi trực tiếp với VILA SANMYSHI về khai báo hải quan, xuất nhập khẩu và vận chuyển trên tuyến Việt Nam – Lào – Thái Lan.",
    phoneNote: "Gọi để trao đổi nhu cầu vận chuyển",
    emailNote: "Gửi thông tin lô hàng và tài liệu liên quan",
    zalo: "Trao đổi qua Zalo",
    zaloNote: "Kết nối nhanh với đội ngũ tư vấn",
    formTitle: "Kể cho chúng tôi về lô hàng của bạn.",
    formNote: "Các trường có dấu * là bắt buộc.",
    namePlaceholder: "Họ và tên của bạn",
    phonePlaceholder: "Số điện thoại liên hệ",
    emailPlaceholder: "ten@doanhnghiep.com",
    selectPlaceholder: "Chọn dịch vụ cần tư vấn",
    privacy: "Thông tin bạn gửi sẽ được sử dụng để tiếp nhận và phản hồi yêu cầu tư vấn.",
    prepareTitle: "Chuẩn bị một chút, tư vấn rõ hơn.",
    prepareItems: ["Tên hàng, số lượng và trọng lượng dự kiến", "Điểm nhận, điểm giao và thời gian mong muốn", "Chứng từ hiện có hoặc nội dung cần hỗ trợ"],
    mapLabel: "Ghé thăm chúng tôi",
    mapTitle: "Hẹn gặp tại Lao Bảo.",
    mapNote: "Vui lòng liên hệ trước khi đến để chúng tôi hướng dẫn đường đi và sắp xếp người đón tiếp.",
    error: "Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ qua điện thoại.",
    countries: "Việt Nam · Lào · Thái Lan",
    getAdvice: "Gửi yêu cầu tư vấn",
  },
  en: {
    title: "It starts with",
    accent: "a conversation.",
    intro: "A shipment, a route or a question about customs. Share your needs and let us work together on a practical solution for your business.",
    image: "Lao Bao International Border Gate, Quang Tri",
    supportTitle: "The right connection.",
    supportAccent: "Confidence at every step.",
    supportDesc: "Talk directly with VILA SANMYSHI about customs clearance, import-export and transport between Vietnam, Laos and Thailand.",
    phoneNote: "Call to discuss your transport needs",
    emailNote: "Send shipment details and related documents",
    zalo: "Chat on Zalo",
    zaloNote: "Connect with our advisory team",
    formTitle: "Tell us about your shipment.",
    formNote: "Fields marked * are required.",
    namePlaceholder: "Your full name",
    phonePlaceholder: "Your contact number",
    emailPlaceholder: "name@company.com",
    selectPlaceholder: "Choose a service",
    privacy: "The information you send will be used to review and respond to your enquiry.",
    prepareTitle: "A few details make advice more useful.",
    prepareItems: ["Goods, quantity and estimated weight", "Pickup, delivery and preferred timing", "Available documents or questions to discuss"],
    mapLabel: "Visit us",
    mapTitle: "Meet us in Lao Bao.",
    mapNote: "Please contact us before visiting so we can provide directions and arrange someone to welcome you.",
    error: "Your request could not be sent. Please try again or contact us by phone.",
    countries: "Vietnam · Laos · Thailand",
    getAdvice: "Send an enquiry",
  },
  th: {
    title: "เริ่มต้นด้วย",
    accent: "การพูดคุยกัน",
    intro: "ไม่ว่าจะเป็นสินค้า เส้นทาง หรือคำถามเกี่ยวกับพิธีการศุลกากร บอกความต้องการของคุณเพื่อร่วมกันค้นหาทางเลือกที่เหมาะสมกับธุรกิจ",
    image: "ด่านพรมแดนนานาชาติลาวบาว กวางจิ",
    supportTitle: "เชื่อมต่อกับผู้ที่เข้าใจ",
    supportAccent: "มั่นใจในทุกขั้นตอน",
    supportDesc: "พูดคุยโดยตรงกับ VILA SANMYSHI เกี่ยวกับพิธีการศุลกากร การนำเข้า-ส่งออก และการขนส่งระหว่างเวียดนาม ลาว และไทย",
    phoneNote: "โทรเพื่อปรึกษาความต้องการด้านการขนส่ง",
    emailNote: "ส่งรายละเอียดสินค้าและเอกสารที่เกี่ยวข้อง",
    zalo: "พูดคุยผ่าน Zalo",
    zaloNote: "ติดต่อทีมที่ปรึกษาของเรา",
    formTitle: "บอกเราเกี่ยวกับสินค้าของคุณ",
    formNote: "ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก",
    namePlaceholder: "ชื่อและนามสกุลของคุณ",
    phonePlaceholder: "หมายเลขโทรศัพท์ติดต่อ",
    emailPlaceholder: "name@company.com",
    selectPlaceholder: "เลือกบริการที่ต้องการปรึกษา",
    privacy: "ข้อมูลที่คุณส่งจะใช้เพื่อพิจารณาและตอบกลับคำขอคำปรึกษาของคุณ",
    prepareTitle: "เตรียมข้อมูลเล็กน้อย เพื่อคำแนะนำที่ชัดเจน",
    prepareItems: ["ชนิดสินค้า จำนวน และน้ำหนักโดยประมาณ", "จุดรับ จุดส่ง และเวลาที่ต้องการ", "เอกสารที่มีอยู่หรือคำถามที่ต้องการปรึกษา"],
    mapLabel: "เยี่ยมชมเรา",
    mapTitle: "พบกันที่ลาวบาว",
    mapNote: "กรุณาติดต่อก่อนเดินทางเพื่อรับคำแนะนำเส้นทางและให้เราจัดเตรียมผู้ต้อนรับ",
    error: "ไม่สามารถส่งคำขอได้ กรุณาลองอีกครั้งหรือติดต่อทางโทรศัพท์",
    countries: "เวียดนาม · ลาว · ไทย",
    getAdvice: "ส่งคำขอคำปรึกษา",
  },
};

export default function ContactView({ initialMessage = "", initialService = "" }: { initialMessage?: string; initialService?: string }) {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const copy = contactCopy[locale as keyof typeof contactCopy] ?? contactCopy.vi;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<{ id: string; title: Record<string, string> }[]>([]);
  const fallbackServiceNames = locale === "en"
    ? ["Customs clearance", "Cross-border transport", "Warehousing & consolidation"]
    : locale === "th"
      ? ["พิธีการศุลกากร", "ขนส่งข้ามพรมแดน", "คลังสินค้าและรวบรวมสินค้า"]
      : ["Khai báo hải quan", "Vận tải xuyên biên giới", "Kho bãi & gom hàng"];
  const serviceNames = services.length
    ? services.map(service => service.title[locale] || service.title.vi).filter(Boolean)
    : fallbackServiceNames;
  const address = locale === "vi" ? COMPANY_INFO.address : "13B Ong Ich Khiem, Lao Bao, Quang Tri, Vietnam";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`;

  useEffect(() => {
    fetch("/api/services")
      .then(response => response.json())
      .then(data => setServices(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    setLoading(true);
    setError("");
    setSuccess(false);
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        throw new Error(copy.error);
      }
    } catch {
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <PageHero
        image="/images/contact/hero.png"
        imageAlt={copy.image}
        breadcrumb={[{ label: t("page_title") }]}
        tag={t("hero_tag")}
        title={<span>{copy.title}<br /><span>{copy.accent}</span></span>}
        description={copy.intro}
      />

      <div className={styles.connectionBar}><div className={`${styles.container} ${styles.connectionInner}`}><p><MapPin size={16} aria-hidden="true" />Lao Bảo, Quảng Trị<span>{copy.countries}</span></p><a href="#inquiry">{copy.getAdvice}<ArrowDown size={16} aria-hidden="true" /></a></div></div>

      <section className={`${styles.container} ${styles.contactGrid}`}>
        <div className={styles.contactInfo}>
          <p className={styles.eyebrow}><span>01 /</span>{t("support_badge")}</p>
          <h2 className={styles.sectionTitle}>{copy.supportTitle}<em>{copy.supportAccent}</em></h2>
          <p className={styles.description}>{copy.supportDesc}</p>
          <div className={styles.contactMethods}>
            <a href={`tel:${COMPANY_INFO.phone}`}><span className={styles.methodIcon}><Phone size={19} strokeWidth={1.6} aria-hidden="true" /></span><div><span>{t("phone_label")}</span><strong>{COMPANY_INFO.phone}</strong><p>{copy.phoneNote}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={`mailto:${COMPANY_INFO.email}`}><span className={styles.methodIcon}><Mail size={19} strokeWidth={1.6} aria-hidden="true" /></span><div><span>{t("email_label")}</span><strong>{COMPANY_INFO.email}</strong><p>{copy.emailNote}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={`https://zalo.me/${COMPANY_INFO.phone}`} target="_blank" rel="noopener noreferrer"><span className={styles.methodIcon}><MessageCircle size={19} strokeWidth={1.6} aria-hidden="true" /></span><div><span>Zalo</span><strong>{copy.zalo}</strong><p>{copy.zaloNote}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className={styles.address}><MapPin size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>{t("address_title")}</h3><p>{address}</p><div className={styles.addressLinks}><a href={mapUrl} target="_blank" rel="noopener noreferrer">{t("btn_directions")}<ArrowUpRight size={14} aria-hidden="true" /></a><a href="#office-map">{t("btn_office")}<ArrowDown size={14} aria-hidden="true" /></a></div></div></div>
          <div className={styles.prepare}><ClipboardList size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>{copy.prepareTitle}</h3><ul>{copy.prepareItems.map(item => <li key={item}><CheckCircle2 size={13} aria-hidden="true" />{item}</li>)}</ul></div></div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formHeader}><p className={styles.eyebrow}><span>02 /</span>{t("form_badge")}</p><h2>{copy.formTitle}</h2><p>{t("form_desc")}</p></div>
          <form id="inquiry" onSubmit={handleSubmit} className={styles.form} aria-busy={loading}>
            <p className={styles.requiredNote}>{copy.formNote}</p>
            <div className={styles.fieldRow}>
              <div className={styles.field}><label htmlFor="contact-name">{t("field_name")}</label><input id="contact-name" name="name" type="text" required autoComplete="name" placeholder={copy.namePlaceholder} /></div>
              <div className={styles.field}><label htmlFor="contact-phone">{t("field_phone")}</label><input id="contact-phone" name="phone" type="tel" required autoComplete="tel" placeholder={copy.phonePlaceholder} /></div>
            </div>
            <div className={styles.field}><label htmlFor="contact-email">{t("field_email")}</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} /></div>
            <div className={styles.field}><label htmlFor="contact-service">{t("field_service")}</label><div className={styles.selectWrap}><select id="contact-service" name="service" defaultValue={initialService || ""}><option value="">{copy.selectPlaceholder}</option>{initialService && <option value={initialService}>{initialService}</option>}{Array.from(new Set(serviceNames)).filter(name => name !== initialService).map(name => <option key={name} value={name}>{name}</option>)}</select><ChevronDown size={17} aria-hidden="true" /></div></div>
            <div className={styles.field}><label htmlFor="contact-message">{t("field_message")}</label><textarea id="contact-message" name="message" defaultValue={initialMessage} rows={5} placeholder={t("placeholder_message")} /></div>
            {success && <div className={styles.success} role="status"><CheckCircle2 size={18} aria-hidden="true" /><p>{t("success_msg")}</p></div>}
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" disabled={loading} className={styles.submit}><span>{loading ? t("btn_loading") : t("btn_submit")}</span><Send size={17} aria-hidden="true" /></button>
            <p className={styles.privacy}>{copy.privacy}</p>
          </form>
        </div>
      </section>

      <section id="office-map" className={styles.mapSection}>
        <div className={styles.container}><div className={styles.mapHeading}><div><p className={styles.eyebrow}><span>03 /</span>{copy.mapLabel}</p><h2 className={styles.sectionTitle}>{copy.mapTitle}</h2></div><p>{copy.mapNote}</p></div><VietnamMap officeView /></div>
      </section>
    </div>
  );
}
