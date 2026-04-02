"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-[70] transition-all duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-10 bg-slate-50/50 relative overflow-y-auto">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-20 lg:-mt-10" />

          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {children}
          </div>
        </main>

        <footer className="h-auto py-6 lg:h-20 border-t border-on-surface/5 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 bg-white/50 backdrop-blur-sm text-on-surface-variant/40 text-[10px] uppercase font-black tracking-widest gap-4 lg:gap-0">
          <p className="text-center lg:text-left">© 2026 VILA SANMYSHI - THIẾT KẾ BỞI AI</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors whitespace-nowrap">Hướng dẫn</span>
            <span className="hover:text-primary cursor-pointer transition-colors whitespace-nowrap">Hỗ trợ</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
