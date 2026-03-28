import HomeView from "@/views/Home/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VILA SANMYSHI | Logistics & Khai báo Hải quan chuyên nghiệp tại Quảng Trị",
  description:
    "VILA SANMYSHI - Chuyên khai báo hải quan, vận tải quốc tế chính ngạch tại Cửa khẩu Lao Bảo (Quảng Trị). Dịch vụ UY TÍN - TẬN TÂM - GIÁ CỰC TỐT. MST: 3200659885.",
  openGraph: {
    title: "VILA SANMYSHI | Logistics & Hải quan chuyên nghiệp",
    description: "Giải pháp Logistics trọn gói tại Quảng Trị. Khai báo hải quan & Vận tải liên vận Quốc tế.",
    url: "/",
    images: ["/images/logo.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VILA SANMYSHI | Logistics & Hải quan chuyên nghiệp",
    description: "Giải pháp Logistics trọn gói tại Quảng Trị. Khai báo hải quan & Vận tải liên vận Quốc tế.",
    images: ["/images/logo.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeView />;
}
