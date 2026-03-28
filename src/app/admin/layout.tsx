import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

export const metadata: Metadata = {
  title: "Admin Dashboard | VILA SANMYSHI",
  description: "Hệ thống quản trị nội dung VILA SANMYSHI",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fixed */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <AdminHeader />
        
        <main className="flex-1 p-10 bg-slate-50/50 relative overflow-y-auto">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-20 lg:-mt-10" />
          
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {children}
          </div>
        </main>

        <footer className="h-20 border-t border-on-surface/5 flex items-center justify-between px-10 bg-white/50 backdrop-blur-sm text-on-surface-variant/40 text-[10px] uppercase font-black tracking-widest">
          <p>© 2026 VILA SANMYSHI - HỆ THỐNG QUẢN TRỊ NỘI BỘ</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">Hướng dẫn sử dụng</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Liên hệ hỗ trợ kỹ thuật</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
