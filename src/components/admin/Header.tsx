"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Bell, LogOut, User,
  ExternalLink, Search,
  LayoutDashboard
} from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts'
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchUnreadCount() {
    const { count, error } = await supabase
      .from("contacts")
      .select("*", { count: 'exact', head: true })
      .eq("status", "new");

    if (!error) {
      setUnreadCount(count || 0);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const getHeaderTitle = () => {
    if (pathname.includes("/admin/services")) return "Quản lý Dịch vụ";
    if (pathname.includes("/admin/news")) return "Quản lý Tin tức";
    if (pathname.includes("/admin/templates")) return "Quản lý Template";
    if (pathname.includes("/admin/contacts")) return "Quản lý Tư vấn";
    if (pathname.includes("/admin/settings")) return "Cài đặt Hệ thống";
    return "Tổng quan Hệ thống";
  };

  if (pathname === "/admin/login") return null;

  return (
    <header className="sticky top-0 h-24 bg-surface/80 backdrop-blur-3xl z-40 px-10 flex items-center justify-between border-b border-on-surface/5">
      <div className="flex flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Hệ quản trị</p>
        <h1 className="text-2xl font-black text-on-surface tracking-tight uppercase">{getHeaderTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-on-surface/10 text-on-surface hover:bg-on-surface/5 transition-all group shadow-sm bg-gradient-to-tr from-surface via-surface to-white"
        >
          <ExternalLink size={16} />
          <span className="text-xs font-black uppercase tracking-widest">Xem Website</span>
        </Link>

        <div className="w-[1px] h-10 bg-on-surface/10" />

        <div className="flex items-center gap-4">
          <Link
            href="/admin/contacts"
            className="relative w-12 h-12 rounded-xl border border-on-surface/10 flex items-center justify-center text-on-surface hover:bg-white transition-all shadow-sm group"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-primary rounded-full ring-4 ring-surface text-[10px] font-black text-white flex items-center justify-center px-1 animate-in zoom-in slide-in-from-top-2 duration-300 shadow-lg shadow-primary/40">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}

            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-1 ring-white animate-ping opacity-75" />
            )}
          </Link>

          <Link
            href="/admin/profile"
            className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-glow-primary cursor-pointer hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            {/* Replace with actual image in profile update */}
            <User size={20} />
          </Link>

          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="w-12 h-12 rounded-xl border border-on-surface/10 flex items-center justify-center text-on-surface hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm active:scale-95"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
