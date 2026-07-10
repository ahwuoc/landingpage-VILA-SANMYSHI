"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

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
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
