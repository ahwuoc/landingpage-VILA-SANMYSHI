"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const skipLabel: Record<string, string> = { vi: "Bỏ qua, tới nội dung chính", en: "Skip to main content", th: "ข้ามไปยังเนื้อหาหลัก" };

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname?.split("/") || [];
  const isAdminPage = segments.includes("admin");
  const isMaintenancePage = segments.includes("maintenance");
  const isComingSoonPage = segments.includes("coming-soon");

  if (isAdminPage || isMaintenancePage || isComingSoonPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">{skipLabel[segments[1]] || skipLabel.vi}</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
