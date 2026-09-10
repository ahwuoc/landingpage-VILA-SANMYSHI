"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  FileCheck2,
  Loader2,
  Mail,
  PackageCheck,
  RefreshCw,
  Route,
  Search,
  Send,
  Truck,
} from "lucide-react";
import {
  ShipmentAdmin,
  ShipmentNotification,
  TRACKING_STATUS_FLOW,
  TrackingDashboard,
  TrackingStatus,
  trackingApi,
} from "@/lib/tracking";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function statusLabel(status: TrackingStatus) {
  return TRACKING_STATUS_FLOW.find((item) => item.key === status)?.label.vi || status;
}

function statusTone(status: TrackingStatus) {
  if (status === "cleared" || status === "delivered") return "border-brand-200 bg-brand-100 text-brand-800";
  if (status === "inspection" || status === "reviewing_hs") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "in_transit") return "border-blue-100 bg-blue-50 text-blue-600";
  return "border-brand-200 bg-brand-50 text-on-surface-variant";
}

const overviewTones = [
  "border-blue-100 bg-blue-50 text-blue-600",
  "border-brand-200 bg-brand-100 text-brand-700",
  "border-amber-200 bg-amber-50 text-amber-700",
  "border-violet-500/20 bg-violet-500/10 text-violet-500",
];

export default function ShipmentAdminView() {
  const [shipments, setShipments] = useState<ShipmentAdmin[]>([]);
  const [dashboard, setDashboard] = useState<TrackingDashboard>({ total: 0, cleared: 0, missingDocuments: 0, byStatus: {} });
  const [selected, setSelected] = useState<ShipmentAdmin | null>(null);
  const [notifications, setNotifications] = useState<ShipmentNotification[]>([]);
  const [query, setQuery] = useState("");
  const [statusChoice, setStatusChoice] = useState<TrackingStatus>("received");
  const [statusNote, setStatusNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadOverview = useCallback(async () => {
    setError("");
    try {
      const [shipmentList, stats] = await Promise.all([
        trackingApi<ShipmentAdmin[]>("/shipments"),
        trackingApi<TrackingDashboard>("/dashboard"),
      ]);
      setShipments(shipmentList);
      setDashboard(stats);
      setSelected((current) => current ? shipmentList.find((item) => item._id === current._id) || null : null);
    } catch {
      setError("Không kết nối được MongoDB tracking API. Hãy chạy `bun run tracking:server` ở port 4000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  const filteredShipments = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return shipments;
    return shipments.filter((shipment) =>
      [shipment.trackingCode, shipment.customer.name, shipment.statusLabel, shipment.owner]
        .some((value) => value?.toLowerCase().includes(normalized)),
    );
  }, [query, shipments]);

  const selectShipment = async (shipment: ShipmentAdmin) => {
    setSelected(shipment);
    setStatusChoice(shipment.status);
    setStatusNote("");
    try {
      setNotifications(await trackingApi<ShipmentNotification[]>(`/shipments/${shipment._id}/notifications`));
    } catch {
      setNotifications([]);
    }
  };

  const updateStatus = async (nextStatus: TrackingStatus) => {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const result = await trackingApi<{ shipment: ShipmentAdmin; notifications: ShipmentNotification[] }>(`/shipments/${selected._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus, note: statusNote, by: "Admin VILA SANMYSHI" }),
      });
      setSelected(result.shipment);
      setStatusChoice(result.shipment.status);
      setStatusNote("");
      const history = await trackingApi<ShipmentNotification[]>(`/shipments/${selected._id}/notifications`);
      setNotifications(history);
      await loadOverview();
    } catch {
      setError("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  };

  const updateDocument = async (index: number, uploaded: boolean) => {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const shipment = await trackingApi<ShipmentAdmin>(`/shipments/${selected._id}/documents`, {
        method: "PATCH",
        body: JSON.stringify({ index, uploaded }),
      });
      setSelected(shipment);
      await loadOverview();
    } catch {
      setError("Không thể cập nhật checklist hồ sơ.");
    } finally {
      setBusy(false);
    }
  };

  const currentIndex = selected ? TRACKING_STATUS_FLOW.findIndex((item) => item.key === selected.status) : -1;
  const nextStatus = currentIndex >= 0 && currentIndex < TRACKING_STATUS_FLOW.length - 1
    ? TRACKING_STATUS_FLOW[currentIndex + 1]
    : null;
  const missingCount = selected?.documents.filter((document) => !document.uploaded).length || 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-label-lg">MongoDB · Clearance tracker</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-on-surface sm:text-5xl">Điều phối lô hàng</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">Cập nhật timeline, kiểm soát chứng từ và xem thông báo tự động từ một màn hình vận hành.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadOverview()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-5 text-xs font-semibold uppercase tracking-[0.1em] text-on-surface transition-colors hover:border-brand-400"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Làm mới dữ liệu
        </button>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} aria-hidden="true" />
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Tổng lô", value: dashboard.total, icon: PackageCheck },
          { label: "Đã thông quan", value: dashboard.cleared, icon: CheckCircle2 },
          { label: "Hồ sơ còn thiếu", value: dashboard.missingDocuments, icon: FileCheck2 },
          { label: "Đang vận chuyển", value: dashboard.byStatus.in_transit || 0, icon: Truck },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-2xl border border-brand-200 bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl border ${overviewTones[index]}`}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="text-3xl font-bold tracking-[-0.03em]">{item.value}</span>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">{item.label}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-brand-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-600">Luồng xử lý hôm nay</p>
            <h2 className="mt-1 text-lg font-bold">Phân bổ lô hàng theo trạng thái</h2>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8 lg:max-w-4xl">
            {TRACKING_STATUS_FLOW.map((status) => (
              <div key={status.key} className={`rounded-xl border px-3 py-2.5 ${statusTone(status.key)}`}>
                <strong className="block text-lg leading-none">{dashboard.byStatus[status.key] || 0}</strong>
                <span className="mt-1.5 block truncate text-[9px] font-semibold uppercase tracking-[0.06em] opacity-75">{status.label.vi}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 2xl:grid-cols-[1.15fr_.85fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-4 border-b border-brand-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">Danh sách lô hàng</h2>
              <p className="mt-1 text-xs text-on-surface-variant">{filteredShipments.length} bản ghi vận hành</p>
            </div>
            <label className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Mã lô, khách hàng, trạng thái…"
                className="h-10 w-full rounded-xl border border-brand-200 bg-brand-50 pl-9 pr-3 text-xs outline-none focus:border-brand-600 focus:bg-white"
              />
            </label>
          </div>

          {loading ? (
            <div className="grid min-h-72 place-items-center"><Loader2 className="animate-spin text-brand-600" size={28} aria-label="Đang tải" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-brand-50 text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                  <tr>
                    <th className="px-5 py-4">Mã lô</th>
                    <th className="px-5 py-4">Khách hàng</th>
                    <th className="px-5 py-4">Trạng thái</th>
                    <th className="px-5 py-4">Phụ trách</th>
                    <th className="px-5 py-4">Cập nhật</th>
                    <th className="w-12 px-3 py-4"><span className="sr-only">Mở</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-200">
                  {filteredShipments.map((shipment) => (
                    <tr
                      key={shipment._id}
                      onClick={() => void selectShipment(shipment)}
                      className={`cursor-pointer transition-colors hover:bg-brand-50 ${selected?._id === shipment._id ? "bg-brand-100" : ""}`}
                    >
                      <td className="px-5 py-4 text-xs font-bold text-brand-700">{shipment.trackingCode}</td>
                      <td className="px-5 py-4 text-sm font-semibold">{shipment.customer.name}</td>
                      <td className="px-5 py-4"><span className={`rounded-lg border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] ${statusTone(shipment.status)}`}>{statusLabel(shipment.status)}</span></td>
                      <td className="px-5 py-4 text-xs text-on-surface-variant">{shipment.owner}</td>
                      <td className="px-5 py-4 text-xs text-on-surface-variant">{formatDate(shipment.updatedAt)}</td>
                      <td className="px-3 py-4"><ChevronRight size={17} className="text-brand-500" aria-hidden="true" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="rounded-2xl bg-[linear-gradient(155deg,#0e2a1c_0%,#102f3e_55%,#12233f_100%)] p-6 text-white shadow-[var(--shadow-card)] sm:p-7">
          {!selected ? (
            <div className="grid min-h-[32rem] place-items-center text-center">
              <div>
                <Route className="mx-auto text-brand-500" size={34} aria-hidden="true" />
                <h2 className="mt-5 text-xl font-bold">Chọn một lô hàng</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/55">Chi tiết timeline, checklist và thao tác cập nhật sẽ hiển thị tại đây.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-500">{selected.trackingCode}</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em]">{selected.customer.name}</h2>
                  <p className="mt-2 text-sm text-white/55">{selected.goods.description}</p>
                </div>
                <span className="rounded-lg border border-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]">{statusLabel(selected.status)}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/12 bg-white/12">
                <div className="bg-brand-950 p-4"><p className="text-[9px] uppercase tracking-[0.1em] text-white/40">Phụ trách</p><p className="mt-1 text-xs font-semibold">{selected.owner}</p></div>
                <div className="bg-brand-950 p-4"><p className="text-[9px] uppercase tracking-[0.1em] text-white/40">Hồ sơ thiếu</p><p className="mt-1 text-xs font-semibold">{missingCount}</p></div>
                <div className="bg-brand-950 p-4"><p className="text-[9px] uppercase tracking-[0.1em] text-white/40">Điện thoại</p><p className="mt-1 text-xs font-semibold">{selected.customer.phone || "—"}</p></div>
                <div className="bg-brand-950 p-4"><p className="text-[9px] uppercase tracking-[0.1em] text-white/40">Email</p><p className="mt-1 truncate text-xs font-semibold">{selected.customer.email || "—"}</p></div>
              </div>

              {selected.riskFlags.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-2 text-amber-100">
                    <AlertTriangle size={16} aria-hidden="true" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em]">Điểm cần theo dõi</p>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-white/65">{selected.riskFlags.join(" · ")}</p>
                </div>
              )}

              <div className="mt-7 border-t border-white/12 pt-6">
                <div className="flex items-center justify-between"><h3 className="text-sm font-bold">Cập nhật trạng thái</h3><Clock3 size={17} className="text-brand-500" aria-hidden="true" /></div>
                <select
                  value={statusChoice}
                  onChange={(event) => setStatusChoice(event.target.value as TrackingStatus)}
                  className="mt-4 h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-semibold text-white outline-none focus:border-brand-500"
                >
                  {TRACKING_STATUS_FLOW.map((status) => <option key={status.key} value={status.key} className="text-on-surface">{status.label.vi}</option>)}
                </select>
                <textarea
                  value={statusNote}
                  onChange={(event) => setStatusNote(event.target.value)}
                  placeholder="Ghi chú cho mốc timeline mới…"
                  rows={3}
                  className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-xs leading-6 text-white outline-none placeholder:text-white/35 focus:border-brand-500"
                />
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void updateStatus(statusChoice)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                  >
                    {busy ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                    Lưu trạng thái
                  </button>
                  <button
                    type="button"
                    disabled={busy || !nextStatus}
                    onClick={() => nextStatus && void updateStatus(nextStatus.key)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-40"
                  >
                    Bước tiếp theo
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {selected && (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-xl font-bold">Checklist hồ sơ</h2><p className="mt-1 text-xs text-on-surface-variant">Tick từng chứng từ, thay đổi được lưu ngay vào MongoDB.</p></div>
              <FileCheck2 className="text-brand-600" size={23} aria-hidden="true" />
            </div>
            <ul className="mt-6 divide-y divide-brand-200 border-y border-brand-200">
              {selected.documents.map((document, index) => (
                <li key={document.name} className="flex items-center gap-4 py-4">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void updateDocument(index, !document.uploaded)}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${document.uploaded ? "border-brand-600 bg-brand-600 text-white" : "border-brand-300 bg-white text-on-surface-variant"}`}
                    aria-label={`${document.uploaded ? "Bỏ đánh dấu" : "Đánh dấu"} ${document.name}`}
                  >
                    {document.uploaded ? <Check size={15} /> : <Circle size={10} />}
                  </button>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{document.name}</p>{document.note && <p className="mt-1 text-xs text-on-surface-variant">{document.note}</p>}</div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">{document.uploaded ? "Đã đủ" : "Còn thiếu"}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-brand-200 bg-white p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-xl font-bold">Thông báo đã gửi</h2><p className="mt-1 text-xs text-on-surface-variant">Mock Zalo/email được tạo tự động ở các mốc cần báo.</p></div>
              <BellRing className="text-brand-600" size={23} aria-hidden="true" />
            </div>
            <div className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <article key={notification._id} className={`rounded-xl border p-4 ${notification.channel === "email" ? "border-blue-100 bg-blue-50" : "border-brand-200 bg-brand-50"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-700">
                      {notification.channel === "email" ? <Mail size={14} /> : <BellRing size={14} />}
                      {notification.channel} · {notification.status}
                    </span>
                    <time className="text-[10px] text-on-surface-variant">{formatDate(notification.sentAt || notification.createdAt)}</time>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-on-surface-variant">{notification.content}</p>
                </article>
              ))}
              {notifications.length === 0 && <p className="rounded-xl border border-dashed border-brand-300 py-12 text-center text-sm text-on-surface-variant">Chưa có thông báo cho lô hàng này.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
