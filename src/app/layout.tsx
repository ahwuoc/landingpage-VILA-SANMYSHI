import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vila-sanmyshi.com"),
  title: {
    default: "VILA SANMYSHI | Logistics & Khai báo Hải quan chuyên nghiệp tại Quảng Trị",
    template: "%s | VILA SANMYSHI",
  },
  description:
    "VILA SANMYSHI - Chuyên khai báo hải quan, vận tải quốc tế chính ngạch, tiểu ngạch tại Cửa khẩu Lao Bảo (Quảng Trị). Dịch vụ UY TÍN - TẬN TÂM - GIÁ CỰC TỐT.",
  keywords: [
    "khai báo hải quan quảng trị",
    "logistics lao bảo",
    "vận tải quốc tế quảng trị",
    "xuất nhập khẩu lao bảo",
    "thông quan hàng hóa quảng trị",
    "vận chuyển hàng đi lào",
    "vila sanmyshi",
  ],
  authors: [{ name: "VILA SANMYSHI" }],
  creator: "VILA SANMYSHI",
  publisher: "VILA SANMYSHI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: "VILA SANMYSHI | Logistics & Hải quan chuyên nghiệp",
    description: "Giải pháp Logistics trọn gói tại Quảng Trị. Khai báo hải quan & Vận tải liên vận Quốc tế.",
    url: "https://vila-sanmyshi.com",
    siteName: "VILA SANMYSHI",
    images: [
      {
        url: '/images/logo.jpg',
        width: 1200,
        height: 630,
        alt: "VILA SANMYSHI Logistics",
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "VILA SANMYSHI | Logistics & Hải quan",
    description: "Dịch vụ vận tải & XNK tại Quảng Trị, uy tín và chuyên nghiệp.",
    images: ['/images/logo.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

import { getServicesList } from "@/lib/data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = await getServicesList();
  const navServices = services.map(s => ({ name: s.title, href: `/services/${s.id}` }));
  return (
    <html lang="vi" className={`${roboto.variable} light scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container font-sans antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "CÔNG TY TNHH TMDV XNK VILA SANMYSHI",
              "image": "https://vila-sanmyshi.com/images/logo.jpg",
              "@id": "https://vila-sanmyshi.com",
              "url": "https://vila-sanmyshi.com",
              "telephone": "0913 497 246",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Cửa khẩu Lao Bảo",
                "addressLocality": "Hướng Hóa",
                "addressRegion": "Quảng Trị",
                "postalCode": "520000",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 16.6321,
                "longitude": 106.5744
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61580846237727"
              ],
              "description": "Chuyên dịch vụ khai báo hải quan, vận tải quốc tế chính ngạch tại Cửa khẩu Lao Bảo, Quảng Trị."
            }),
          }}
        />
        <ClientLayout navServices={navServices}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
