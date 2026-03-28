import ServicesView from "@/views/Services/ServicesView";
import { getServicesList } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dịch vụ Khai báo Hải quan & Vận tải | Cửa khẩu Lao Bảo",
  description: "Dịch vụ khai báo hải quan, vận chuyển liên vận Việt - Lào - Thái, kho bãi và tư vấn XNK trọn gói tại Quảng Trị bởi VILA SANMYSHI.",
  openGraph: {
    title: "Dịch vụ VILA SANMYSHI | Logistic & Hải quan",
    description: "Giải pháp vận tải và thông quan hàng hóa chuyên nghiệp tại Quảng Trị.",
    url: "/services",
    images: ["/images/logo.jpg"],
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await getServicesList();
  return <ServicesView services={services} />;
}
