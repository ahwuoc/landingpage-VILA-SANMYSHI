import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import TrackingView from "@/views/Tracking/TrackingView";

const metadataCopy = {
  vi: {
    title: "Theo dõi lô hàng | VILA SANMYSHI",
    description: "Tra cứu trạng thái thông quan, timeline vận chuyển và checklist hồ sơ trên tuyến Việt Nam – Lào – Thái Lan.",
  },
  en: {
    title: "Shipment tracking | VILA SANMYSHI",
    description: "Track customs clearance, shipment milestones and document readiness across Vietnam, Laos and Thailand.",
  },
  th: {
    title: "ติดตามการขนส่ง | VILA SANMYSHI",
    description: "ติดตามพิธีการศุลกากร ไทม์ไลน์ และความพร้อมของเอกสารระหว่างเวียดนาม ลาว และไทย",
  },
};

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }, { locale: "th" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const current = metadataCopy[locale as keyof typeof metadataCopy] || metadataCopy.vi;
  return {
    ...current,
    alternates: { canonical: `/${locale}/tracking` },
    openGraph: { ...current, url: `/${locale}/tracking`, images: ["/images/hero/hero-1.png"] },
  };
}

export default async function TrackingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-950" />}>
      <TrackingView />
    </Suspense>
  );
}
