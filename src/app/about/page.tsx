import AboutView from "@/views/About/AboutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu VILA SANMYSHI | Đơn vị Logistics chuyên nghiệp tại Quảng Trị",
  description: "Tìm hiểu về hành trình, sứ mệnh và năng lực vận tải, kho bãi vượt trội tại Cửa khẩu Lao Bảo của VILA SANMYSHI.",
  openGraph: {
    title: "Về VILA SANMYSHI | Logistics & Hải quan",
    description: "Câu chuyện và sứ mệnh trở thành đối tác tin cậy hàng đầu tại Quảng Trị & EWEC.",
    url: "/about",
    images: ["/images/logo.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/logo.jpg"],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
