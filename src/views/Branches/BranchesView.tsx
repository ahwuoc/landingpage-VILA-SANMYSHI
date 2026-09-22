"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { VietnamMap } from "@/components/maps/VietnamMap";
import Breadcrumb from "@/components/Breadcrumb";
import { ArrowUpRight, MapPin, Mail, Phone, ArrowRight, Route } from "lucide-react";
import { useLocale } from "next-intl";
import styles from "./Branches.module.css";

interface Branch { id: string; type: string; name: string; address: string; phone: string; email: string; mapUrl: string; image: string; }
const copy = {
  vi: { breadcrumb: "Chi nhánh", tag: "Hiện diện tại Lao Bảo · Kết nối Đông Dương", title: "Một điểm tựa.", accent: "Kết nối nhiều hành trình.", intro: "Từ Lao Bảo, Quảng Trị, VILA SANMYSHI đồng hành cùng doanh nghiệp trong khai báo hải quan và vận chuyển hàng hóa Việt Nam – Lào – Thái Lan.", office: "Trụ sở chính", place: "Lao Bảo, Quảng Trị", address: "Địa chỉ", contact: "Kết nối trực tiếp", directions: "Tìm đường đến văn phòng", connect: "Trao đổi về lô hàng", routeTag: "Hành lang kinh tế Đông – Tây", routeTitle: "Am hiểu địa phương.", routeAccent: "Thông suốt kết nối.", routeBody: "Một đầu mối phối hợp hồ sơ, thủ tục cửa khẩu và vận chuyển xuyên biên giới. Trao đổi cùng đội ngũ để lựa chọn phương án phù hợp với lô hàng của bạn.", routeNote: "Các điểm kết nối vận chuyển · không phải danh sách văn phòng", services: "Khám phá dịch vụ", countries: ["Thái Lan", "Lào", "Việt Nam"], photo: "Cửa khẩu quốc tế Lao Bảo" },
  en: { breadcrumb: "Locations", tag: "Based in Lao Bao · Connected across Indochina", title: "One trusted base.", accent: "Many connected journeys.", intro: "From Lao Bao, Quang Tri, VILA SANMYSHI supports businesses with customs clearance and freight transport across Vietnam, Laos and Thailand.", office: "Head office", place: "Lao Bao, Quang Tri", address: "Address", contact: "Contact our team", directions: "Find office directions", connect: "Discuss your shipment", routeTag: "East–West Economic Corridor", routeTitle: "Local understanding.", routeAccent: "Connected journeys.", routeBody: "One point of contact for documentation, border procedures and cross-border transport. Speak with our team to find the right approach for your cargo.", routeNote: "Transport connection points · not a list of offices", services: "Explore services", countries: ["Thailand", "Laos", "Vietnam"], photo: "Lao Bao international border gate" },
  th: { breadcrumb: "ที่ตั้ง", tag: "ตั้งอยู่ที่ลาวบาว · เชื่อมต่ออินโดจีน", title: "จุดเริ่มต้นที่วางใจได้", accent: "เชื่อมต่อทุกการเดินทาง", intro: "จากลาวบาว จังหวัดกวางจิ VILA SANMYSHI สนับสนุนธุรกิจด้านพิธีการศุลกากรและการขนส่งระหว่างเวียดนาม ลาว และไทย", office: "สำนักงานใหญ่", place: "ลาวบาว กวางจิ", address: "ที่อยู่", contact: "ติดต่อทีมงาน", directions: "ค้นหาเส้นทางไปสำนักงาน", connect: "ปรึกษาเรื่องการขนส่ง", routeTag: "ระเบียงเศรษฐกิจตะวันออก–ตะวันตก", routeTitle: "เข้าใจพื้นที่", routeAccent: "เชื่อมต่ออย่างราบรื่น", routeBody: "ประสานงานเอกสาร ขั้นตอนชายแดน และการขนส่งข้ามพรมแดนผ่านผู้ติดต่อเดียว พูดคุยกับทีมงานเพื่อเลือกแนวทางที่เหมาะกับสินค้าของคุณ", routeNote: "จุดเชื่อมต่อการขนส่ง · ไม่ใช่รายชื่อสำนักงาน", services: "สำรวจบริการ", countries: ["ไทย", "ลาว", "เวียดนาม"], photo: "ด่านชายแดนนานาชาติลาวบาว" },
};

export function BranchesView({ branches }: { branches: Branch[] }) {
  const locale = useLocale();
  const text = copy[locale as keyof typeof copy] || copy.vi;
  return (
    <div className={styles.page}>
      <header className={`${styles.container} ${styles.hero}`}>
        <Breadcrumb items={[{ label: text.breadcrumb }]} />
        <div className={styles.heroGrid}>
          <div><p className={styles.eyebrow}><span />{text.tag}</p><h1>{text.title}<em>{text.accent}</em></h1></div>
          <p className={styles.intro}>{text.intro}</p>
        </div>
        <div className={styles.baseline}><span>VILA SANMYSHI / {text.office}</span><span>VN · LA · TH <ArrowUpRight size={13} /></span></div>
      </header>
      <section className={`${styles.container} ${styles.location}`} aria-label={text.office}>
        <div className={styles.map}><VietnamMap address={branches[0]?.address} /></div>
        <div className={styles.offices}>
          {branches.map((branch) => <article className={styles.office} key={branch.id} id={`branch-${branch.id}`}>
            <p className={styles.officeTag}><span />{text.office}<span className={styles.officeCode}>VN / 01</span></p>
            <h2>{text.place}</h2><p className={styles.companyName}>{branch.name}</p>
            <div className={styles.address}><MapPin size={19} /><div><span>{text.address}</span><p>{branch.address}</p></div></div>
            <div className={styles.contact}><span>{text.contact}</span><a href={`tel:${branch.phone.replace(/\s/g, "")}`}><Phone size={15} />{branch.phone}<ArrowUpRight size={14} /></a><a href={`mailto:${branch.email}`}><Mail size={15} />{branch.email}<ArrowUpRight size={14} /></a></div>
            <a className={styles.directions} href={branch.mapUrl} target="_blank" rel="noopener noreferrer">{text.directions}<ArrowUpRight size={17} /></a>
            <Link className={styles.inquiry} href="/contact">{text.connect}<ArrowRight size={15} /></Link>
          </article>)}
        </div>
      </section>
      <section className={styles.connections}>
        <div className={`${styles.container} ${styles.connectionGrid}`}>
          <div className={styles.photo}><Image src="/images/contact/hero.png" alt={text.photo} fill sizes="(max-width: 760px) 100vw, 45vw" className={styles.photoImage} /><span><MapPin size={13} />{text.photo}</span></div>
          <div className={styles.connectionCopy}><p className={styles.eyebrow}><Route size={16} />{text.routeTag}</p><h2>{text.routeTitle}<em>{text.routeAccent}</em></h2><p>{text.routeBody}</p><div className={styles.route}>{text.countries.map((country, i) => <div key={country}><span>0{i + 1}</span><strong>{country}</strong>{i < 2 && <ArrowRight size={17} />}</div>)}</div><small>{text.routeNote}</small><Link className={styles.serviceLink} href="/services">{text.services}<ArrowUpRight size={16} /></Link></div>
        </div>
      </section>
    </div>
  );
}
