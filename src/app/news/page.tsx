import NewsView from "@/views/News/NewsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức & Thị trường XNK | Vila Sanmyshi",
  description: "Cập nhật các tin tức mới nhất về chính sách Hải quan, thị trường xuất nhập khẩu và các hoạt động của Vila Sanmyshi tại Quảng Trị.",
  keywords: ["tin tức hải quan", "chính sách xuất nhập khẩu", "thị trường logistics việt lào", "tin tức vila sanmyshi", "cập nhật hải quan quảng trị"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Tin tức XNK & Logistics | Vila Sanmyshi",
    description: "Theo dõi biến động chính sách Hải quan, xu hướng logistics và tin tức doanh nghiệp.",
    url: "/news",
    images: ["/images/logo.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/logo.jpg"],
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return <NewsView />;
}
