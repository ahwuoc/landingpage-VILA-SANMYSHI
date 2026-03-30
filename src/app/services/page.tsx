import ServicesView from "@/views/Services/ServicesView";
import { getServicesList } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dịch vụ Khai báo Hải quan & Vận tải | Cửa khẩu Lao Bảo",
  description: "Dịch vụ khai báo hải quan, vận chuyển liên vận Việt - Lào - Thái, kho bãi và tư vấn XNK trọn gói tại Quảng Trị bởi VILA SANMYSHI.",
  keywords: ["dịch vụ hải quan lao bảo", "vận tải việt lào thái", "khai báo hải quan quảng trị", "logistics cửa khẩu lao bảo", "xuất nhập khẩu quảng trị", "kho bãi lao bảo", "thông quan hàng hóa"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Dịch vụ VILA SANMYSHI | Logistic & Hải quan",
    description: "Giải pháp vận tải và thông quan hàng hóa chuyên nghiệp tại Quảng Trị.",
    url: "/services",
    images: ["/images/logo.jpg"],
    type: "website",
  },
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServicesList();
  return <ServicesView services={services} />;
}
