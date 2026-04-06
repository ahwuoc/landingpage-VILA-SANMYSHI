"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUnreadContacts } from "@/hooks/useAdminData";
import {
  Bell, LogOut, User,
  ExternalLink, Search,
  LayoutDashboard
} from "lucide-react";

export default function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const unreadCount = useUnreadContacts();

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
    <header className="sticky top-0 h-20 lg:h-24 bg-surface/80 backdrop-blur-3xl z-40 px-4 lg:px-10 flex items-center justify-between border-b border-on-surface/5">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
        >
          <Search size={20} className="hidden" /> {/* Placeholder just to show how I use icons */}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-0.5">Quản trị</p>
          <h1 className="text-xl lg:text-2xl font-black text-on-surface tracking-tight uppercase line-clamp-1">{getHeaderTitle()}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-6">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-on-surface/10 text-on-surface hover:bg-on-surface/5 transition-all group shadow-sm bg-gradient-to-tr from-surface via-surface to-white"
        >
          <ExternalLink size={16} />
          <span className="text-xs font-black uppercase tracking-widest">Web</span>
        </Link>

        <div className="hidden lg:block w-[1px] h-10 bg-on-surface/10" />

        <div className="flex items-center gap-2 lg:gap-4">
          <Link
            href="/admin/contacts"
            className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl border border-on-surface/10 flex items-center justify-center text-on-surface hover:bg-white transition-all shadow-sm group"
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
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow-primary hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <User size={18} />
          </Link>

          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 rounded-xl border border-on-surface/10 items-center justify-center text-on-surface hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm active:scale-95"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
