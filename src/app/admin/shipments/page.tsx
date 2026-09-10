import type { Metadata } from "next";
import ShipmentAdminView from "@/views/Tracking/ShipmentAdminView";

export const metadata: Metadata = {
  title: "Quản lý lô hàng | VILA SANMYSHI Admin",
  description: "Cập nhật trạng thái thông quan, checklist hồ sơ và lịch sử thông báo.",
  robots: { index: false, follow: false },
};

export default function AdminShipmentsPage() {
  return <ShipmentAdminView />;
}
