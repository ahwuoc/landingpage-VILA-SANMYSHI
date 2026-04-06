"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

interface NavService { name: string; href: string; }

export default function ClientLayout({
  children,
  navServices = [],
}: {
  children: React.ReactNode;
  navServices?: NavService[];
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
      <Navbar navServices={navServices} />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
