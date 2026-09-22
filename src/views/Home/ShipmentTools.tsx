"use client";

import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Box, Check, CheckCheck, ClipboardCheck, FileText, PackageCheck, RotateCcw, Route } from "lucide-react";
import { Link } from "@/i18n/routing";
import styles from "./ShipmentTools.module.css";

const translations = {
  vi: {
    label: "Tiện ích cho lô hàng", title: "Chuẩn bị kỹ hơn.", emphasis: "Khởi hành tự tin hơn.", intro: "Lên nhu cầu vận chuyển, tính thể tích và rà soát chứng từ — ngay tại đây, trước khi trao đổi cùng đội ngũ.",
    tabs: ["Lên nhu cầu vận chuyển", "Tính thể tích CBM", "Checklist chứng từ"],
    plannerTitle: "Lô hàng của bạn cần gì?", plannerIntro: "Chọn tuyến và nhu cầu để xem những thông tin nên chuẩn bị.", origin: "Nơi gửi", destination: "Nơi nhận", countries: { VN: "Việt Nam", LA: "Lào", TH: "Thái Lan" }, cargo: "Hình thức hàng hóa", cargos: { general: "Hàng thông thường", pallet: "Hàng đóng pallet", fragile: "Hàng dễ vỡ" }, service: "Dịch vụ cần hỗ trợ", services: { customs: "Thủ tục hải quan", transport: "Vận chuyển", both: "Hải quan & vận chuyển" }, planAction: "Xem gợi ý chuẩn bị", sameCountry: "Vui lòng chọn hai quốc gia khác nhau cho tuyến xuyên biên giới.", routeLabel: "Tuyến dự kiến", prepareTitle: "Bắt đầu từ một kế hoạch rõ ràng.", prepareIntro: "Xác định tuyến, đặc điểm hàng và dịch vụ. Đội ngũ sẽ cùng bạn làm rõ phương án phù hợp.", resultTitle: "Gợi ý cho nhu cầu của bạn", cargoHints: { general: "Chuẩn bị mô tả mặt hàng, số kiện, kích thước đóng gói và tổng khối lượng.", pallet: "Ghi kích thước ngoài cùng của từng pallet, khối lượng và khả năng xếp chồng.", fragile: "Mô tả vật liệu, mức độ dễ vỡ; cung cấp ảnh và yêu cầu chèn lót, bốc xếp." }, serviceHints: { customs: "Chuẩn bị thông tin người gửi, người nhận và bộ chứng từ thương mại để trao đổi về thủ tục.", transport: "Xác định địa chỉ nhận/giao, thời điểm mong muốn và điều kiện bốc dỡ ở hai đầu.", both: "Chuẩn bị bộ chứng từ thương mại cùng địa chỉ nhận/giao để phối hợp thủ tục và vận chuyển." }, routeHint: "Các điểm nhận/giao cụ thể sẽ được xác nhận khi tư vấn tuyến.", contact: "Trao đổi về lô hàng này", planNote: "Đây là gợi ý chuẩn bị. Lịch trình, khả năng tiếp nhận và chi phí cần được xác nhận theo lô hàng thực tế.",
    calculatorTitle: "Tính thể tích hàng đóng gói", calculatorIntro: "Áp dụng cho các kiện có cùng kích thước ngoài cùng, sau khi đóng gói.", length: "Chiều dài", width: "Chiều rộng", height: "Chiều cao", count: "Số kiện cùng kích thước", weight: "Tổng khối lượng thực tế", optional: "Không bắt buộc", cm: "cm", kg: "kg", packages: "kiện", calculate: "Tính thể tích", dimensionError: "Nhập kích thước lớn hơn 0.", countError: "Nhập số kiện là số nguyên dương hợp lệ.", weightError: "Nhập khối lượng lớn hơn 0 hoặc để trống.", volumeError: "Giá trị vượt phạm vi tính toán. Vui lòng kiểm tra lại kích thước và số kiện.", volumeLabel: "Tổng thể tích", volumeEmpty: "Kết quả thể tích", volumeEmptyText: "Nhập kích thước và số kiện để quy đổi sang mét khối.", perPackage: "Thể tích mỗi kiện", actualWeight: "Khối lượng thực tế", formula: "Dài × Rộng × Cao × Số kiện ÷ 1.000.000", volumeNote: "CBM là thể tích hình học, không phải khối lượng tính cước. Quy cách xếp hàng và phương thức vận chuyển có thể ảnh hưởng cách tính chi phí.", mixedSizes: "Có nhiều cỡ kiện? Tính từng nhóm kích thước rồi cộng các kết quả.",
    checklistTitle: "Rà soát trước khi gửi hàng", checklistIntro: "Đánh dấu các hạng mục đã kiểm tra để chuẩn bị cuộc trao đổi với đội ngũ.", documents: ["Hóa đơn thương mại (Invoice)", "Phiếu đóng gói (Packing list)", "Hợp đồng thương mại", "Chứng từ vận tải", "Chứng nhận xuất xứ — nếu áp dụng", "Giấy phép / kiểm tra chuyên ngành — nếu áp dụng"], documentHints: ["Đối chiếu mô tả, số lượng và giá trị hàng.", "Kiểm tra số kiện, trọng lượng và kích thước.", "Đối chiếu các bên và điều kiện giao dịch.", "Kiểm tra thông tin giao nhận theo phương thức vận chuyển.", "Xác định nhu cầu chứng minh xuất xứ hàng hóa.", "Trao đổi theo mặt hàng và loại hình xuất nhập khẩu."], checked: "hạng mục đã rà soát", progressLabel: "Tiến độ rà soát chứng từ", checklistNote: "Danh sách mang tính tham khảo. Bộ chứng từ cần thiết phụ thuộc mặt hàng, tuyến vận chuyển và loại hình xuất nhập khẩu; đội ngũ sẽ xác nhận theo hồ sơ thực tế.", reset: "Bỏ chọn tất cả", allChecked: "Đã rà soát đủ 6 hạng mục", checklistNext: "Sẵn sàng trao đổi về bộ hồ sơ?", checklistHelp: "Gửi thông tin hàng hóa để đội ngũ hỗ trợ làm rõ các giấy tờ cần thiết.", reviewAction: "Nhờ hỗ trợ rà soát",
  },
  en: {
    label: "Shipment essentials", title: "Prepare with clarity.", emphasis: "Move with confidence.", intro: "Plan your shipment, calculate its volume and review your documents before speaking with our team.",
    tabs: ["Plan a shipment", "Calculate CBM", "Document checklist"],
    plannerTitle: "What does your shipment need?", plannerIntro: "Choose a route and service to see what to prepare.", origin: "Origin", destination: "Destination", countries: { VN: "Vietnam", LA: "Laos", TH: "Thailand" }, cargo: "Cargo format", cargos: { general: "General cargo", pallet: "Palletized cargo", fragile: "Fragile cargo" }, service: "Support needed", services: { customs: "Customs procedures", transport: "Transportation", both: "Customs & transportation" }, planAction: "Show preparation tips", sameCountry: "Choose two different countries for a cross-border route.", routeLabel: "Planned route", prepareTitle: "A clearer plan for your next shipment.", prepareIntro: "Define your route, cargo and service needs. Our team can then discuss a suitable approach with you.", resultTitle: "Preparation for your shipment", cargoHints: { general: "Prepare a goods description, package count, packed dimensions and total gross weight.", pallet: "Record the external dimensions and weight of each pallet, plus whether it can be stacked.", fragile: "Describe the materials and fragility; provide photos and your cushioning and handling requirements." }, serviceHints: { customs: "Prepare sender and recipient details and commercial documents for a discussion of customs procedures.", transport: "Identify pickup and delivery addresses, your preferred timing and loading conditions at both ends.", both: "Prepare commercial documents and pickup/delivery addresses to coordinate customs and transport." }, routeHint: "Specific pickup and delivery points will be confirmed when discussing the route.", contact: "Discuss this shipment", planNote: "These are preparation suggestions. Timing, acceptance and charges require confirmation for your actual shipment.",
    calculatorTitle: "Calculate packed cargo volume", calculatorIntro: "For packages with identical external dimensions, measured after packing.", length: "Length", width: "Width", height: "Height", count: "Packages of this size", weight: "Total gross weight", optional: "Optional", cm: "cm", kg: "kg", packages: "packages", calculate: "Calculate volume", dimensionError: "Enter a dimension greater than zero.", countError: "Enter a valid positive whole number of packages.", weightError: "Enter a weight greater than zero or leave blank.", volumeError: "These values exceed the calculation range. Check your dimensions and package count.", volumeLabel: "Total volume", volumeEmpty: "Your volume result", volumeEmptyText: "Enter the dimensions and package count to convert to cubic metres.", perPackage: "Volume per package", actualWeight: "Gross weight", formula: "Length × Width × Height × Packages ÷ 1,000,000", volumeNote: "CBM measures geometric volume, not chargeable weight. Stowage and transport method may affect how charges are calculated.", mixedSizes: "Different package sizes? Calculate each size group and add the results.",
    checklistTitle: "Review before you ship", checklistIntro: "Check off the items you have reviewed before discussing your shipment with the team.", documents: ["Commercial invoice", "Packing list", "Sales contract", "Transport document", "Certificate of origin — if applicable", "Permits / specialist inspection — if applicable"], documentHints: ["Check the description, quantity and value of the goods.", "Verify the package count, weight and dimensions.", "Check the parties and commercial terms.", "Review shipment details for the transport method.", "Identify any need to document the origin of goods.", "Discuss requirements for the goods and customs procedure."], checked: "items reviewed", progressLabel: "Document review progress", checklistNote: "This is a reference checklist. Required documents depend on the goods, route and customs procedure; our team will confirm them for your actual shipment.", reset: "Clear checklist", allChecked: "All 6 items reviewed", checklistNext: "Ready to discuss your documents?", checklistHelp: "Share your cargo details so our team can help clarify the documents needed.", reviewAction: "Ask for document support",
  },
  th: {
    label: "เครื่องมือเตรียมการขนส่ง", title: "เตรียมพร้อมให้ชัดเจน", emphasis: "ส่งต่ออย่างมั่นใจ", intro: "วางแผนการขนส่ง คำนวณปริมาตร และตรวจทานเอกสารก่อนพูดคุยกับทีมงานของเรา",
    tabs: ["วางแผนการขนส่ง", "คำนวณปริมาตร CBM", "รายการตรวจเอกสาร"],
    plannerTitle: "สินค้าของคุณต้องการบริการใด?", plannerIntro: "เลือกเส้นทางและบริการเพื่อดูข้อมูลที่ควรเตรียม", origin: "ประเทศต้นทาง", destination: "ประเทศปลายทาง", countries: { VN: "เวียดนาม", LA: "ลาว", TH: "ไทย" }, cargo: "รูปแบบสินค้า", cargos: { general: "สินค้าทั่วไป", pallet: "สินค้าบนพาเลท", fragile: "สินค้าแตกหักง่าย" }, service: "บริการที่ต้องการ", services: { customs: "พิธีการศุลกากร", transport: "การขนส่ง", both: "ศุลกากรและการขนส่ง" }, planAction: "ดูคำแนะนำการเตรียมสินค้า", sameCountry: "กรุณาเลือกประเทศต้นทางและปลายทางที่แตกต่างกันสำหรับเส้นทางข้ามแดน", routeLabel: "เส้นทางที่วางแผน", prepareTitle: "เริ่มต้นด้วยแผนการขนส่งที่ชัดเจน", prepareIntro: "ระบุเส้นทาง ลักษณะสินค้า และบริการที่ต้องการ เพื่อให้ทีมงานช่วยพิจารณาแนวทางที่เหมาะสม", resultTitle: "คำแนะนำสำหรับสินค้าของคุณ", cargoHints: { general: "เตรียมรายละเอียดสินค้า จำนวนหีบห่อ ขนาดหลังบรรจุ และน้ำหนักรวม", pallet: "บันทึกขนาดภายนอกและน้ำหนักของแต่ละพาเลท รวมถึงความสามารถในการวางซ้อน", fragile: "ระบุวัสดุและความเปราะบาง พร้อมภาพถ่ายและข้อกำหนดในการกันกระแทกและขนย้าย" }, serviceHints: { customs: "เตรียมข้อมูลผู้ส่ง ผู้รับ และเอกสารทางการค้าเพื่อหารือเกี่ยวกับพิธีการศุลกากร", transport: "ระบุที่อยู่รับและส่ง เวลาที่ต้องการ และเงื่อนไขการขนถ่ายทั้งสองฝั่ง", both: "เตรียมเอกสารทางการค้าและที่อยู่รับส่งเพื่อประสานงานศุลกากรและการขนส่ง" }, routeHint: "จุดรับและส่งที่แน่นอนจะได้รับการยืนยันระหว่างการปรึกษาเส้นทาง", contact: "ปรึกษาเกี่ยวกับสินค้านี้", planNote: "ข้อมูลนี้เป็นคำแนะนำในการเตรียมตัว กำหนดการ การรับสินค้า และค่าใช้จ่ายต้องยืนยันตามสินค้าจริง",
    calculatorTitle: "คำนวณปริมาตรสินค้าหลังบรรจุ", calculatorIntro: "สำหรับหีบห่อที่มีขนาดภายนอกเท่ากัน โดยวัดหลังบรรจุสินค้าแล้ว", length: "ความยาว", width: "ความกว้าง", height: "ความสูง", count: "จำนวนหีบห่อขนาดเดียวกัน", weight: "น้ำหนักรวมจริง", optional: "ไม่บังคับ", cm: "ซม.", kg: "กก.", packages: "หีบห่อ", calculate: "คำนวณปริมาตร", dimensionError: "กรุณาระบุขนาดที่มากกว่าศูนย์", countError: "กรุณาระบุจำนวนหีบห่อเป็นจำนวนเต็มบวกที่ถูกต้อง", weightError: "กรุณาระบุน้ำหนักที่มากกว่าศูนย์หรือเว้นว่าง", volumeError: "ค่าเกินขอบเขตการคำนวณ กรุณาตรวจสอบขนาดและจำนวนหีบห่อ", volumeLabel: "ปริมาตรรวม", volumeEmpty: "ผลการคำนวณปริมาตร", volumeEmptyText: "ระบุขนาดและจำนวนหีบห่อเพื่อแปลงเป็นลูกบาศก์เมตร", perPackage: "ปริมาตรต่อหีบห่อ", actualWeight: "น้ำหนักรวมจริง", formula: "ยาว × กว้าง × สูง × จำนวนหีบห่อ ÷ 1,000,000", volumeNote: "CBM คือปริมาตรทางเรขาคณิต ไม่ใช่น้ำหนักที่ใช้คิดค่าขนส่ง วิธีจัดวางและวิธีขนส่งอาจส่งผลต่อการคำนวณค่าใช้จ่าย", mixedSizes: "หีบห่อมีหลายขนาด? คำนวณทีละกลุ่มขนาดแล้วรวมผลลัพธ์",
    checklistTitle: "ตรวจทานก่อนส่งสินค้า", checklistIntro: "ทำเครื่องหมายรายการที่ตรวจทานแล้วเพื่อเตรียมพูดคุยกับทีมงาน", documents: ["ใบกำกับสินค้าทางการค้า (Invoice)", "รายการบรรจุหีบห่อ (Packing list)", "สัญญาซื้อขาย", "เอกสารการขนส่ง", "หนังสือรับรองถิ่นกำเนิด — หากเกี่ยวข้อง", "ใบอนุญาต / การตรวจเฉพาะทาง — หากเกี่ยวข้อง"], documentHints: ["ตรวจสอบรายละเอียด จำนวน และมูลค่าสินค้า", "ตรวจสอบจำนวนหีบห่อ น้ำหนัก และขนาด", "ตรวจสอบคู่สัญญาและเงื่อนไขการค้า", "ตรวจทานข้อมูลรับส่งตามวิธีการขนส่ง", "พิจารณาความจำเป็นในการแสดงถิ่นกำเนิดสินค้า", "ปรึกษาตามประเภทสินค้าและพิธีการนำเข้าส่งออก"], checked: "รายการที่ตรวจทานแล้ว", progressLabel: "ความคืบหน้าการตรวจเอกสาร", checklistNote: "รายการนี้ใช้เป็นข้อมูลอ้างอิง เอกสารที่จำเป็นขึ้นอยู่กับสินค้า เส้นทาง และพิธีการศุลกากร ทีมงานจะยืนยันตามข้อมูลสินค้าจริง", reset: "ล้างรายการที่เลือก", allChecked: "ตรวจทานครบทั้ง 6 รายการแล้ว", checklistNext: "พร้อมปรึกษาเกี่ยวกับเอกสารหรือยัง?", checklistHelp: "ส่งรายละเอียดสินค้าเพื่อให้ทีมงานช่วยชี้แจงเอกสารที่จำเป็น", reviewAction: "ขอความช่วยเหลือด้านเอกสาร",
  },
};

type Country = "VN" | "LA" | "TH";
type Cargo = "general" | "pallet" | "fragile";
type Service = "customs" | "transport" | "both";
type Dimensions = { length: string; width: string; height: string; count: string; weight: string };
type Volume = { total: number; each: number; count: number; weight: number | null };
const tabIcons = [Route, Box, ClipboardCheck];
const dimensionKeys = ["length", "width", "height"] as const;

export default function ShipmentTools({ locale }: { locale: string }) {
  const language = locale === "en" || locale === "th" ? locale : "vi";
  const c = translations[language];
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [origin, setOrigin] = useState<Country>("VN");
  const [destination, setDestination] = useState<Country>("LA");
  const [cargo, setCargo] = useState<Cargo>("general");
  const [service, setService] = useState<Service>("both");
  const [planReady, setPlanReady] = useState(false);
  const [planError, setPlanError] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({ length: "", width: "", height: "", count: "1", weight: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Dimensions | "total", string>>>({});
  const [volume, setVolume] = useState<Volume | null>(null);
  const [checked, setChecked] = useState<number[]>([]);
  const formatNumber = (value: number) => new Intl.NumberFormat(language, { maximumSignificantDigits: 7 }).format(value);
  const contactHref = { pathname: "/contact", query: { route: `${origin}-${destination}`, cargo, service } };

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  }

  function planShipment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlanError(origin === destination);
    setPlanReady(origin !== destination);
  }

  function updateDimension(key: keyof Dimensions, value: string) {
    setDimensions((previous) => ({ ...previous, [key]: value }));
    setErrors({});
    setVolume(null);
  }

  function calculateVolume(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    const numbers = Object.fromEntries(Object.entries(dimensions).map(([key, value]) => [key, Number(value)])) as Record<keyof Dimensions, number>;
    for (const key of dimensionKeys) {
      if (!dimensions[key].trim() || !Number.isFinite(numbers[key]) || numbers[key] <= 0) nextErrors[key] = c.dimensionError;
    }
    if (!Number.isSafeInteger(numbers.count) || numbers.count <= 0) nextErrors.count = c.countError;
    if (dimensions.weight.trim() && (!Number.isFinite(numbers.weight) || numbers.weight <= 0)) nextErrors.weight = c.weightError;
    const each = (numbers.length / 100) * (numbers.width / 100) * (numbers.height / 100);
    const total = each * numbers.count;
    if (!Object.keys(nextErrors).length && (!Number.isFinite(total) || total <= 0)) nextErrors.total = c.volumeError;
    setErrors(nextErrors);
    setVolume(Object.keys(nextErrors).length ? null : { each, total, count: numbers.count, weight: dimensions.weight.trim() ? numbers.weight : null });
  }

  return (
    <section id="shipment-tools" className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}><span />{c.label}</p><h2 id={`${id}-heading`}>{c.title}<br /><em>{c.emphasis}</em></h2></div>
          <p className={styles.intro}>{c.intro}</p>
        </div>
        <div className={styles.toolkit}>
          <div className={styles.tabs} role="tablist" aria-label={c.label}>
            {c.tabs.map((label, index) => {
              const Icon = tabIcons[index];
              return <button type="button" key={label} ref={(element) => { tabRefs.current[index] = element; }} id={`${id}-tab-${index}`} role="tab" aria-selected={activeTab === index} aria-controls={`${id}-panel-${index}`} tabIndex={activeTab === index ? 0 : -1} onClick={() => setActiveTab(index)} onKeyDown={(event) => navigateTabs(event, index)}><span className={styles.tabNumber}>0{index + 1}</span><Icon size={17} aria-hidden="true" /><span>{label}</span></button>;
            })}
          </div>

          <div id={`${id}-panel-0`} role="tabpanel" aria-labelledby={`${id}-tab-0`} hidden={activeTab !== 0} tabIndex={0}>
            <div className={styles.panelGrid}>
              <form className={styles.form} onSubmit={planShipment} onChange={() => { setPlanReady(false); setPlanError(false); }}>
                <div className={styles.panelHeading}><Route size={20} aria-hidden="true" /><div><h3>{c.plannerTitle}</h3><p>{c.plannerIntro}</p></div></div>
                <div className={styles.fieldGrid}>
                  <label className={styles.field} htmlFor={`${id}-origin`}><span>{c.origin}</span><select id={`${id}-origin`} value={origin} onChange={(event) => setOrigin(event.target.value as Country)}>{Object.entries(c.countries).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                  <label className={styles.field} htmlFor={`${id}-destination`}><span>{c.destination}</span><select id={`${id}-destination`} value={destination} onChange={(event) => setDestination(event.target.value as Country)} aria-invalid={planError} aria-describedby={planError ? `${id}-route-error` : undefined}>{Object.entries(c.countries).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                  <label className={styles.field} htmlFor={`${id}-cargo`}><span>{c.cargo}</span><select id={`${id}-cargo`} value={cargo} onChange={(event) => setCargo(event.target.value as Cargo)}>{Object.entries(c.cargos).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                  <label className={styles.field} htmlFor={`${id}-service`}><span>{c.service}</span><select id={`${id}-service`} value={service} onChange={(event) => setService(event.target.value as Service)}>{Object.entries(c.services).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                </div>
                {planError && <p id={`${id}-route-error`} role="alert" className={styles.error}>{c.sameCountry}</p>}
                <button type="submit" className={styles.primaryButton}>{c.planAction}<ArrowRight size={16} aria-hidden="true" /></button>
                <p className={styles.note}>{c.planNote}</p>
              </form>
              <aside className={styles.result} aria-live="polite" aria-atomic="true">
                <p className={styles.resultLabel}>{c.routeLabel}</p>
                <div className={styles.route}><span>{c.countries[origin]}</span><span className={styles.routeArrow}><i /><ArrowRight size={17} aria-hidden="true" /></span><span>{c.countries[destination]}</span></div>
                {planReady ? <><h3 className={styles.resultTitle}>{c.resultTitle}</h3><ul className={styles.suggestions}>{[c.cargoHints[cargo], c.serviceHints[service], c.routeHint].map((hint) => <li key={hint}><Check size={15} aria-hidden="true" /><span>{hint}</span></li>)}</ul><Link href={contactHref} className={styles.lightButton}>{c.contact}<ArrowUpRight size={16} aria-hidden="true" /></Link></> : <><div className={styles.routeMotif} aria-hidden="true"><span>VN</span><i /><span>LA</span><i /><span>TH</span></div><h3 className={styles.emptyTitle}>{c.prepareTitle}</h3><p className={styles.resultDescription}>{c.prepareIntro}</p></>}
              </aside>
            </div>
          </div>

          <div id={`${id}-panel-1`} role="tabpanel" aria-labelledby={`${id}-tab-1`} hidden={activeTab !== 1} tabIndex={0}>
            <div className={styles.panelGrid}>
              <form className={styles.form} onSubmit={calculateVolume} noValidate>
                <div className={styles.panelHeading}><Box size={20} aria-hidden="true" /><div><h3>{c.calculatorTitle}</h3><p>{c.calculatorIntro}</p></div></div>
                <div className={styles.dimensionGrid}>
                  {dimensionKeys.map((key) => <label className={styles.field} key={key} htmlFor={`${id}-${key}`}><span>{c[key]}</span><span className={styles.inputWithUnit}><input id={`${id}-${key}`} type="number" inputMode="decimal" min="0.001" step="any" required value={dimensions[key]} placeholder="0" onChange={(event) => updateDimension(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${id}-${key}-error` : undefined} /><span>{c.cm}</span></span>{errors[key] && <small id={`${id}-${key}-error`} className={styles.error}>{errors[key]}</small>}</label>)}
                </div>
                <div className={styles.fieldGrid}>
                  <label className={styles.field} htmlFor={`${id}-count`}><span>{c.count}</span><span className={styles.inputWithUnit}><input id={`${id}-count`} type="number" inputMode="numeric" min="1" step="1" required value={dimensions.count} onChange={(event) => updateDimension("count", event.target.value)} aria-invalid={Boolean(errors.count)} aria-describedby={errors.count ? `${id}-count-error` : undefined} /><span>{c.packages}</span></span>{errors.count && <small id={`${id}-count-error`} className={styles.error}>{errors.count}</small>}</label>
                  <label className={styles.field} htmlFor={`${id}-weight`}><span>{c.weight}<small>{c.optional}</small></span><span className={styles.inputWithUnit}><input id={`${id}-weight`} type="number" inputMode="decimal" min="0.001" step="any" value={dimensions.weight} placeholder="—" onChange={(event) => updateDimension("weight", event.target.value)} aria-invalid={Boolean(errors.weight)} aria-describedby={errors.weight ? `${id}-weight-error` : undefined} /><span>{c.kg}</span></span>{errors.weight && <small id={`${id}-weight-error`} className={styles.error}>{errors.weight}</small>}</label>
                </div>
                {Object.keys(errors).length > 0 && <p role="alert" className={styles.error}>{[...new Set(Object.values(errors))].join(" ")}</p>}
                <button type="submit" className={styles.primaryButton}>{c.calculate}<ArrowRight size={16} aria-hidden="true" /></button>
                <p className={styles.note}>{c.mixedSizes}</p>
              </form>
              <aside className={`${styles.result} ${styles.volumeResult}`} aria-live="polite" aria-atomic="true">
                <Box size={37} strokeWidth={1} className={styles.volumeIcon} aria-hidden="true" />
                <p className={styles.resultLabel}>{volume ? c.volumeLabel : c.volumeEmpty}</p>
                <p className={styles.volumeNumber}>{volume ? formatNumber(volume.total) : "—"}<span>m³</span></p>
                {volume ? <dl className={styles.volumeDetails}><div><dt>{c.perPackage}</dt><dd>{formatNumber(volume.each)} m³ × {formatNumber(volume.count)}</dd></div>{volume.weight !== null && <div><dt>{c.actualWeight}</dt><dd>{formatNumber(volume.weight)} {c.kg}</dd></div>}</dl> : <p className={styles.resultDescription}>{c.volumeEmptyText}</p>}
                <p className={styles.formula}>{c.formula}</p>
                <p className={styles.resultNote}>{c.volumeNote}</p>
              </aside>
            </div>
          </div>

          <div id={`${id}-panel-2`} role="tabpanel" aria-labelledby={`${id}-tab-2`} hidden={activeTab !== 2} tabIndex={0}>
            <div className={styles.panelGrid}>
              <div className={styles.form}>
                <div className={styles.panelHeading}><ClipboardCheck size={20} aria-hidden="true" /><div><h3>{c.checklistTitle}</h3><p>{c.checklistIntro}</p></div></div>
                <div className={styles.checklist}>
                  {c.documents.map((document, index) => <label key={document} className={styles.checkItem}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked((previous) => previous.includes(index) ? previous.filter((value) => value !== index) : [...previous, index])} /><span className={styles.checkbox} aria-hidden="true"><Check size={13} /></span><span><strong>{document}</strong><small>{c.documentHints[index]}</small></span></label>)}
                </div>
                <button type="button" onClick={() => setChecked([])} disabled={checked.length === 0} className={styles.resetButton}><RotateCcw size={13} aria-hidden="true" />{c.reset}</button>
              </div>
              <aside className={styles.result}>
                <PackageCheck size={34} strokeWidth={1} className={styles.volumeIcon} aria-hidden="true" />
                <p className={styles.progressCount} aria-live="polite"><strong>{checked.length}<span>/ 6</span></strong><span>{c.checked}</span></p>
                <div role="progressbar" aria-label={c.progressLabel} aria-valuemin={0} aria-valuemax={6} aria-valuenow={checked.length} className={styles.progress}><span style={{ width: `${checked.length / 6 * 100}%` }} /></div>
                {checked.length === 6 && <p className={styles.completed} role="status"><CheckCheck size={16} aria-hidden="true" />{c.allChecked}</p>}
                <h3 className={styles.resultTitle}>{c.checklistNext}</h3>
                <p className={styles.resultDescription}>{c.checklistHelp}</p>
                <Link href={{ pathname: "/contact", query: { service: "customs" } }} className={styles.lightButton}>{c.reviewAction}<ArrowUpRight size={16} aria-hidden="true" /></Link>
                <p className={styles.resultNote}><FileText size={14} aria-hidden="true" />{c.checklistNote}</p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
