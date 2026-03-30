import ContactView from "@/views/Contact/ContactView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ VILA SANMYSHI | Tư vấn Logistics & Hải quan 24/7",
  description: "Giải quyết mọi khó khăn về thủ tục Hải quan và vận chuyển Việt - Lào - Thái cùng VILA SANMYSHI. Liên hệ đội ngũ chuyên gia tại Quảng Trị để nhận giải pháp Logistics trọn gói, tiết kiệm chi phí.",
  keywords: ["liên hệ vila sanmyshi", "tư vấn hải quan quảng trị", "hotline logistics lao bảo", "tư vấn xuất nhập khẩu", "liên hệ đại lý hải quan"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Liên hệ | Vila Sanmyshi",
    description: "Tư vấn Logistics và Khai báo Hải quan tại Quảng Trị 24/7.",
    url: "/contact",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "vi_VN",
    siteName: "Vila Sanmyshi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên hệ | Vila Sanmyshi",
    description: "Tư vấn Logistics và Khai báo Hải quan tại Quảng Trị 24/7.",
    images: ["/images/logo.jpg"],
  },
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return <ContactView />;
}
