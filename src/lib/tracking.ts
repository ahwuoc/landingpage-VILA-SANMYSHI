export const TRACKING_API_URL = (process.env.NEXT_PUBLIC_TRACKING_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

export const TRACKING_STATUS_FLOW = [
  { key: "received", label: { vi: "Đã nhận hồ sơ", en: "File received", th: "รับเอกสารแล้ว" } },
  { key: "reviewing_hs", label: { vi: "Đang tra mã HS / chính sách", en: "Reviewing HS code / policy", th: "กำลังตรวจรหัส HS / นโยบาย" } },
  { key: "declared", label: { vi: "Đã mở tờ khai hải quan", en: "Customs declaration filed", th: "ยื่นใบขนศุลกากรแล้ว" } },
  { key: "inspection", label: { vi: "Đang kiểm hoá / phân luồng", en: "Inspection / channel review", th: "กำลังตรวจสินค้า / ตรวจช่องทาง" } },
  { key: "tax_paid", label: { vi: "Đã nộp thuế / đặt bảo đảm", en: "Tax paid / guarantee placed", th: "ชำระภาษี / วางหลักประกันแล้ว" } },
  { key: "cleared", label: { vi: "ĐÃ THÔNG QUAN", en: "CUSTOMS CLEARED", th: "ผ่านพิธีการศุลกากรแล้ว" } },
  { key: "in_transit", label: { vi: "Đang vận chuyển", en: "In transit", th: "กำลังขนส่ง" } },
  { key: "delivered", label: { vi: "Đã bàn giao", en: "Delivered", th: "ส่งมอบแล้ว" } },
] as const;

export type TrackingStatus = (typeof TRACKING_STATUS_FLOW)[number]["key"];
export type TrackingLocale = "vi" | "en" | "th";

export interface ShipmentTimelineItem {
  status: TrackingStatus;
  label: string;
  at: string;
  note: string;
  by: string;
}

export interface ShipmentDocument {
  name: string;
  uploaded: boolean;
  note: string;
}

export interface ShipmentPublic {
  id: string;
  trackingCode: string;
  goods: {
    description: string;
    hsCode: string;
    origin: string;
    destination: string;
  };
  route: string;
  type: string;
  status: TrackingStatus;
  statusLabel: string;
  owner: string;
  timeline: ShipmentTimelineItem[];
  documents: ShipmentDocument[];
  updatedAt: string;
}

export interface ShipmentAdmin extends Omit<ShipmentPublic, "id"> {
  _id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    zalo: string;
  };
  tariff: number;
  value: number;
  riskFlags: string[];
  notes: string;
  createdAt: string;
}

export interface ShipmentNotification {
  _id: string;
  channel: "zalo" | "email" | "sms";
  recipient: string;
  content: string;
  triggerStatus: TrackingStatus;
  status: "queued" | "sent" | "failed";
  sentAt?: string;
  createdAt: string;
}

export interface TrackingDashboard {
  total: number;
  cleared: number;
  missingDocuments: number;
  byStatus: Partial<Record<TrackingStatus, number>>;
}

export class TrackingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TrackingApiError";
    this.status = status;
  }
}

export async function trackingApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${TRACKING_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new TrackingApiError(payload.message || "Không thể kết nối hệ thống theo dõi.", response.status);
  }
  return payload as T;
}

export function localizedStatus(status: TrackingStatus, locale: TrackingLocale) {
  return TRACKING_STATUS_FLOW.find((item) => item.key === status)?.label[locale] || status;
}
