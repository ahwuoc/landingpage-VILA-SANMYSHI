"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  BellRing,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  FileCheck2,
  MapPin,
  PackageCheck,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  localizedStatus,
  ShipmentPublic,
  TRACKING_STATUS_FLOW,
  TrackingApiError,
  TrackingLocale,
  trackingApi,
} from "@/lib/tracking";

const copy = {
  vi: {
    eyebrow: "Cổng theo dõi thông quan · EWEC",
    title: "Biết chính xác lô hàng đang ở đâu.",
    body: "Tra cứu trạng thái hải quan, tiến độ vận chuyển và bộ hồ sơ trong một màn hình. Hệ thống tự làm mới mỗi 5 giây.",
    placeholder: "Nhập mã, ví dụ VILA-EWEC-003",
    button: "Tra cứu lô hàng",
    demo: "Mã demo",
    live: "Cập nhật trực tiếp",
    lastUpdate: "Cập nhật gần nhất",
    route: "Hành trình",
    cargo: "Thông tin lô hàng",
    hs: "Mã HS",
    owner: "Người phụ trách",
    timeline: "Timeline xử lý",
    timelineBody: "Mọi thay đổi trạng thái đều được lưu, không ghi đè lịch sử.",
    documents: "Checklist hồ sơ",
    documentsBody: "Các chứng từ đã tiếp nhận và mục còn cần bổ sung.",
    complete: "Bộ hồ sơ đã đủ",
    missing: "Còn thiếu",
    clearedTitle: "Lô hàng đã thông quan",
    clearedBody: "Đội ngũ VILA SANMYSHI tiếp tục theo dõi vận chuyển đến khi bàn giao.",
    emptyTitle: "Theo dõi thời gian thực, không cần hỏi lại nhiều lần.",
    emptyBody: "Nhập mã tracking được cung cấp bởi điều phối viên để xem toàn bộ tiến độ công khai.",
    pillars: [
      { title: "Theo dõi thời gian thực", body: "Trạng thái và timeline đồng bộ trên một luồng." },
      { title: "Báo ngay khi thông quan", body: "Mốc cleared tự tạo thông báo Zalo và email." },
      { title: "Minh bạch hồ sơ", body: "Nhìn rõ chứng từ đã đủ và mục đang chờ bổ sung." },
    ],
    notFound: "Không tìm thấy mã này. Kiểm tra lại mã tracking hoặc liên hệ điều phối viên.",
    offline: "Chưa kết nối được tracking API. Hãy bảo đảm Express đang chạy ở port 4000.",
  },
  en: {
    eyebrow: "Customs tracking portal · EWEC",
    title: "Know exactly where your shipment stands.",
    body: "Track customs status, transport milestones and document readiness in one view. Data refreshes every 5 seconds.",
    placeholder: "Enter a code, e.g. VILA-EWEC-003",
    button: "Track shipment",
    demo: "Demo code",
    live: "Live updates",
    lastUpdate: "Last updated",
    route: "Route",
    cargo: "Shipment details",
    hs: "HS code",
    owner: "Coordinator",
    timeline: "Processing timeline",
    timelineBody: "Every status change is appended and never overwrites history.",
    documents: "Document checklist",
    documentsBody: "Documents received and items still waiting for completion.",
    complete: "Document set complete",
    missing: "Missing",
    clearedTitle: "Shipment customs cleared",
    clearedBody: "VILA SANMYSHI continues tracking transport through final delivery.",
    emptyTitle: "Live tracking without repeated follow-ups.",
    emptyBody: "Enter the tracking code supplied by your coordinator to see the public shipment timeline.",
    pillars: [
      { title: "Real-time tracking", body: "Status and milestones stay in one reliable flow." },
      { title: "Clearance notifications", body: "The cleared milestone triggers Zalo and email notices." },
      { title: "Document transparency", body: "See what is complete and what still needs attention." },
    ],
    notFound: "This tracking code was not found. Check the code or contact your coordinator.",
    offline: "The tracking API is unavailable. Make sure the Express server is running on port 4000.",
  },
  th: {
    eyebrow: "พอร์ทัลติดตามพิธีการ · EWEC",
    title: "ทราบสถานะของสินค้าได้อย่างชัดเจน",
    body: "ติดตามสถานะศุลกากร การขนส่ง และความพร้อมของเอกสารในหน้าจอเดียว ระบบรีเฟรชทุก 5 วินาที",
    placeholder: "กรอกรหัส เช่น VILA-EWEC-003",
    button: "ติดตามสินค้า",
    demo: "รหัสทดลอง",
    live: "อัปเดตแบบสด",
    lastUpdate: "อัปเดตล่าสุด",
    route: "เส้นทาง",
    cargo: "ข้อมูลการขนส่ง",
    hs: "รหัส HS",
    owner: "ผู้ประสานงาน",
    timeline: "ไทม์ไลน์การดำเนินงาน",
    timelineBody: "ทุกการเปลี่ยนสถานะจะถูกบันทึกโดยไม่ลบประวัติเดิม",
    documents: "รายการเอกสาร",
    documentsBody: "เอกสารที่ได้รับแล้วและรายการที่ยังต้องเพิ่มเติม",
    complete: "เอกสารครบแล้ว",
    missing: "ยังขาด",
    clearedTitle: "สินค้าผ่านพิธีการศุลกากรแล้ว",
    clearedBody: "ทีม VILA SANMYSHI จะติดตามการขนส่งต่อจนถึงการส่งมอบ",
    emptyTitle: "ติดตามแบบสดโดยไม่ต้องสอบถามซ้ำ",
    emptyBody: "กรอกรหัสที่ได้รับจากผู้ประสานงานเพื่อดูไทม์ไลน์สาธารณะ",
    pillars: [
      { title: "ติดตามแบบเรียลไทม์", body: "สถานะและทุกเหตุการณ์อยู่ในขั้นตอนเดียว" },
      { title: "แจ้งเตือนเมื่อผ่านพิธีการ", body: "สถานะ cleared จะสร้างข้อความ Zalo และอีเมล" },
      { title: "เอกสารโปร่งใส", body: "เห็นรายการที่ครบและรายการที่ต้องเพิ่มเติม" },
    ],
    notFound: "ไม่พบรหัสนี้ กรุณาตรวจสอบอีกครั้งหรือติดต่อผู้ประสานงาน",
    offline: "ยังเชื่อมต่อ tracking API ไม่ได้ โปรดตรวจสอบว่า Express ทำงานที่พอร์ต 4000",
  },
} as const;

const pillarIcons = [RefreshCw, BellRing, FileCheck2];
const pillarTones = [
  "border-blue-500/25 bg-blue-500/10 text-blue-100",
  "border-amber-500/25 bg-amber-500/10 text-amber-100",
  "border-brand-500/25 bg-brand-500/10 text-white",
];
const detailTones = [
  "border-blue-100 bg-blue-50 text-blue-600",
  "border-amber-200 bg-amber-50 text-amber-700",
  "border-brand-200 bg-brand-100 text-brand-700",
];
const demoShipments = [
  { code: "VILA-EWEC-002", status: "cleared" as const },
  { code: "VILA-EWEC-004", status: "inspection" as const },
  { code: "VILA-EWEC-006", status: "in_transit" as const },
];

function statusTone(status: ShipmentPublic["status"]) {
  if (status === "cleared" || status === "delivered") return "border-brand-200 bg-brand-100 text-brand-800";
  if (status === "inspection" || status === "reviewing_hs") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "in_transit") return "border-blue-100 bg-blue-50 text-blue-600";
  return "border-brand-200 bg-brand-50 text-on-surface";
}

function formatDate(value: string, locale: TrackingLocale) {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : locale === "th" ? "th-TH" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function TrackingView() {
  const locale = (useLocale() as TrackingLocale) || "vi";
  const current = copy[locale] || copy.vi;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialCode = searchParams.get("code")?.trim().toUpperCase() || "";
  const [code, setCode] = useState(initialCode);
  const [activeCode, setActiveCode] = useState(initialCode);
  const [shipment, setShipment] = useState<ShipmentPublic | null>(null);
  const [loading, setLoading] = useState(Boolean(initialCode));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadShipment = useCallback(async (trackingCode: string, silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError("");

    try {
      const result = await trackingApi<ShipmentPublic>(`/track/${encodeURIComponent(trackingCode)}`);
      setShipment(result);
    } catch (requestError) {
      setShipment(null);
      setError(requestError instanceof TrackingApiError && requestError.status === 404 ? current.notFound : current.offline);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [current.notFound, current.offline]);

  useEffect(() => {
    if (!activeCode) return;
    void loadShipment(activeCode);
  }, [activeCode, loadShipment]);

  useEffect(() => {
    if (!activeCode) return;
    const timer = window.setInterval(() => void loadShipment(activeCode, true), 5000);
    return () => window.clearInterval(timer);
  }, [activeCode, loadShipment]);

  const statusIndex = shipment ? TRACKING_STATUS_FLOW.findIndex((item) => item.key === shipment.status) : -1;
  const missingDocuments = useMemo(() => shipment?.documents.filter((document) => !document.uploaded) || [], [shipment]);
  const hasCleared = shipment?.timeline.some((item) => item.status === "cleared") || false;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;
    setCode(normalized);
    setActiveCode(normalized);
    router.replace(`${pathname}?code=${encodeURIComponent(normalized)}`, { scroll: false });
  };

  const applyDemo = (demoCode = "VILA-EWEC-002") => {
    setCode(demoCode);
    setActiveCode(demoCode);
    router.replace(`${pathname}?code=${demoCode}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-white text-on-surface">
      <section className="bg-[linear-gradient(135deg,#0e2a1c_0%,#102f3e_55%,#12233f_100%)] pb-16 pt-32 text-white lg:pb-20 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
              <MapPin className="text-brand-500" size={15} aria-hidden="true" />
              {current.eyebrow}
            </div>
            <h1 className="mt-6 max-w-2xl text-[clamp(2.8rem,5.4vw,5.2rem)] font-bold leading-[1.03] tracking-[-0.045em]">
              {current.title}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{current.body}</p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white p-3 text-on-surface shadow-[0_24px_70px_rgba(4,18,32,0.32)] sm:p-4">
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Tracking code</span>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={20} aria-hidden="true" />
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder={current.placeholder}
                  autoComplete="off"
                  className="h-14 w-full rounded-xl border border-brand-200 bg-brand-50 pl-12 pr-4 text-sm font-semibold uppercase tracking-[0.04em] outline-none transition focus:border-brand-600 focus:bg-white"
                />
              </label>
              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} aria-hidden="true" /> : <PackageCheck size={18} aria-hidden="true" />}
                {current.button}
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-3 text-xs text-on-surface-variant">
              <span className="font-semibold text-on-surface">{current.demo}</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" aria-hidden="true" />
                {current.live}{refreshing ? "…" : ""}
              </span>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {demoShipments.map((demo) => (
                <button
                  key={demo.code}
                  type="button"
                  onClick={() => applyDemo(demo.code)}
                  className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <span className="block font-mono text-[9px] font-bold tracking-[0.06em] text-blue-600">{demo.code}</span>
                  <span className="mt-1 block truncate text-[10px] font-semibold text-on-surface-variant">{localizedStatus(demo.status, locale)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-3 px-6 sm:grid-cols-3 sm:px-8">
          {current.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <article key={pillar.title} className={`rounded-2xl border p-6 backdrop-blur-sm sm:p-7 ${pillarTones[index]}`}>
                <Icon size={22} aria-hidden="true" />
                <h2 className="mt-5 text-base font-bold">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">{pillar.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {error && (
            <div className="mx-auto max-w-3xl rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
              <AlertTriangle className="mx-auto text-brand-600" size={28} aria-hidden="true" />
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{error}</p>
            </div>
          )}

          {!shipment && !error && !loading && (
            <div className="mx-auto max-w-3xl py-12 text-center">
              <Route className="mx-auto text-brand-600" size={36} aria-hidden="true" />
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{current.emptyTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">{current.emptyBody}</p>
            </div>
          )}

          {shipment && (
            <div className="space-y-8">
              {hasCleared && (
                <div className="flex flex-col gap-5 rounded-2xl bg-brand-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600"><Check size={24} aria-hidden="true" /></span>
                    <div>
                      <h2 className="text-xl font-bold tracking-[-0.02em]">{current.clearedTitle}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/65">{current.clearedBody}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]">{shipment.trackingCode}</span>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
                <article className="overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)]">
                  <div className="h-1 bg-gradient-to-r from-brand-500 via-blue-500 to-amber-500" aria-hidden="true" />
                  <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">{shipment.trackingCode}</p>
                      <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{localizedStatus(shipment.status, locale)}</h2>
                      <p className="mt-3 text-sm text-on-surface-variant">{shipment.type}</p>
                    </div>
                    <span className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${statusTone(shipment.status)}`}>
                      <Clock3 size={16} aria-hidden="true" />
                      {current.lastUpdate}: {formatDate(shipment.updatedAt, locale)}
                    </span>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                      <span>{current.timeline}</span>
                      <span className="text-blue-600">{String(statusIndex + 1).padStart(2, "0")} / {String(TRACKING_STATUS_FLOW.length).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-8 gap-1.5" aria-hidden="true">
                      {TRACKING_STATUS_FLOW.map((step, index) => (
                        <span key={step.key} className={`h-1.5 rounded-full ${index <= statusIndex ? index === statusIndex ? "bg-blue-500" : "bg-brand-500" : "bg-brand-200"}`} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 border-t border-brand-200 pt-7 sm:grid-cols-3">
                    {[
                      { icon: Truck, label: current.cargo, value: shipment.goods.description },
                      { icon: ShieldCheck, label: current.hs, value: shipment.goods.hsCode || "—" },
                      { icon: Route, label: current.owner, value: shipment.owner },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className={`rounded-xl border p-4 ${detailTones[index]}`}>
                          <Icon size={18} aria-hidden="true" />
                          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] opacity-70">{item.label}</p>
                          <p className="mt-1 text-xs font-bold leading-5 text-on-surface">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </article>

                <aside className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8">
                  <p className="text-label-lg">{current.route}</p>
                  <div className="mt-7 grid grid-cols-[1.25rem_1fr] gap-x-4">
                    <div className="flex flex-col items-center pt-1" aria-hidden="true">
                      <span className="h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                      <span className="my-2 w-px flex-1 bg-gradient-to-b from-blue-500 to-brand-500" />
                      <span className="h-3 w-3 rounded-full bg-brand-600 ring-4 ring-brand-100" />
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-600">Origin</p>
                        <p className="mt-1 font-bold">{shipment.goods.origin || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-700">Destination</p>
                        <p className="mt-1 font-bold">{shipment.goods.destination || "—"}</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-7 rounded-xl border border-blue-100 bg-white p-4 text-sm leading-6 text-on-surface-variant">{shipment.route}</p>
                </aside>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
                <article className="rounded-2xl border border-brand-200 bg-white p-6 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-[-0.025em]">{current.timeline}</h2>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{current.timelineBody}</p>
                  <ol className="mt-8">
                    {TRACKING_STATUS_FLOW.map((step, index) => {
                      const event = [...shipment.timeline].reverse().find((item) => item.status === step.key);
                      const complete = index <= statusIndex;
                      const currentStep = index === statusIndex;
                      return (
                        <li key={step.key} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-7 last:pb-0">
                          {index < TRACKING_STATUS_FLOW.length - 1 && <span className={`absolute bottom-0 left-[15px] top-7 w-px ${complete ? "bg-brand-600" : "bg-brand-200"}`} aria-hidden="true" />}
                          <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border ${complete ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 bg-white text-brand-300"}`}>
                            {complete ? <Check size={14} aria-hidden="true" /> : <Circle size={10} aria-hidden="true" />}
                          </span>
                          <div className={currentStep ? "-mt-2 rounded-xl border border-blue-100 bg-blue-50 p-4" : "pt-1"}>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className={`text-sm font-bold ${complete ? "text-on-surface" : "text-on-surface-variant"}`}>{step.label[locale]}</h3>
                              {event && <time className="text-[10px] text-on-surface-variant">{formatDate(event.at, locale)}</time>}
                            </div>
                            {event?.note && <p className="mt-2 text-xs leading-6 text-on-surface-variant">{event.note}</p>}
                            {event?.by && <p className="mt-1 text-[10px] font-semibold text-brand-700">{event.by}</p>}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </article>

                <article className="rounded-2xl border border-brand-200 bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-[-0.025em]">{current.documents}</h2>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{current.documentsBody}</p>
                    </div>
                    <FileCheck2 className="shrink-0 text-brand-600" size={26} aria-hidden="true" />
                  </div>

                  <div className={`mt-7 rounded-xl border p-4 ${missingDocuments.length ? "border-amber-200 bg-amber-50 text-amber-900" : "border-brand-900 bg-brand-900 text-white"}`}>
                    <p className="text-sm font-bold">{missingDocuments.length ? `${current.missing}: ${missingDocuments.length}` : current.complete}</p>
                    {missingDocuments.length > 0 && <p className="mt-2 text-xs leading-6 text-amber-800">{missingDocuments.map((document) => document.name).join(" · ")}</p>}
                  </div>

                  <ul className="mt-6 divide-y divide-brand-200 border-y border-brand-200">
                    {shipment.documents.map((document) => (
                      <li key={document.name} className="flex items-start gap-3 py-4">
                        {document.uploaded
                          ? <CheckCircle2 className="mt-0.5 shrink-0 text-brand-600" size={19} aria-hidden="true" />
                          : <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={19} aria-hidden="true" />}
                        <div>
                          <p className="text-sm font-semibold">{document.name}</p>
                          {document.note && <p className="mt-1 text-xs leading-5 text-on-surface-variant">{document.note}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
