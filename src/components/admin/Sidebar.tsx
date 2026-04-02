"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown, ChevronRight, LayoutDashboard,
  Package, Newspaper, Handshake,
  Headset, Settings, FileText,
  Tags, Grid, Mail
} from "lucide-react";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItemType {
  label: string;
  href?: string;
  icon: any;
  children?: NavSubItem[];
}

const NAV_ITEMS: NavItemType[] = [
  { label: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { label: "Slide trang chủ", href: "/admin/hero-slides", icon: Grid },
  {
    label: "Quản lý Dịch vụ",
    icon: Package,
    children: [
      { label: "Tất cả dịch vụ", href: "/admin/services" },
      { label: "Danh mục dịch vụ", href: "/admin/services/categories" },
    ]
  },
  {
    label: "Quản lý Tin tức",
    icon: Newspaper,
    children: [
      { label: "Tất cả bài viết", href: "/admin/news" },
      { label: "Danh mục tin tức", href: "/admin/news/categories" },
    ]
  },
  { label: "Quản lý Mẫu", href: "/admin/templates", icon: FileText },
  { label: "Quản lý Đối tác", href: "/admin/partners", icon: Handshake },
  { label: "Quản lý Tư vấn", href: "/admin/contacts", icon: Headset },
  {
    label: "Cấu hình",
    icon: Settings,
    children: [
      { label: "Cài đặt chung", href: "/admin/settings/general" },
      { label: "Cài đặt Email", href: "/admin/settings/email" },
      { label: "Hồ sơ cá nhân", href: "/admin/profile" },
    ]
  },
];

function NavItem({ item, pathname }: { item: NavItemType, pathname: string }) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => pathname === child.href) || false
  );

  const isActive = item.href === pathname ||
    item.children?.some(child => pathname === child.href);

  const Icon = item.icon;

  if (item.children) {
    return (
      <li className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
        >
          <Icon size={20} className={isActive ? "text-primary" : ""} />
          <span className="font-bold text-sm tracking-wide flex-1 text-left">{item.label}</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {isOpen && (
          <ul className="pl-14 space-y-1 animate-in slide-in-from-top-2 duration-300">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`block py-3 text-xs font-medium transition-colors ${pathname === child.href ? "text-primary font-bold" : "text-white/40 hover:text-white"
                    }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href!}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive ? "bg-primary text-white shadow-glow-primary" : "text-white/40 hover:bg-white/5 hover:text-white"
          }`}
      >
        <Icon size={20} />
        <span className="font-bold text-sm tracking-wide">{item.label}</span>
        {isActive && !item.children && (
          <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        )}
      </Link>
    </li>
  );
}

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="h-full w-72 bg-slate-950 text-white border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col">
      <div className="p-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-glow-primary/20">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              fill
              className="object-cover"
              loading="eager"
              priority
            />
          </div>
          <span className="font-black tracking-tighter text-xl uppercase">Admin <span className="text-primary">Vila</span></span>
        </Link>
      </div>

      <nav className="p-4 mt-6">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} onClick={onClose}>
              <NavItem item={item} pathname={pathname} />
            </div>
          ))}
        </ul>
      </nav>

      {!isLoginPage && (
        <div className="p-8 mt-auto">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white">Administrator</p>
                <p className="text-[10px] text-slate-400">admin@vilasanmyshi.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/5 hover:border-red-500/20"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
