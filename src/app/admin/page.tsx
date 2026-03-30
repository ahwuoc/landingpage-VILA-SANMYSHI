"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardStats } from "@/hooks/useAdminData";

export default function AdminDashboard() {
  const router = useRouter();
  const { stats, recentActivities, loading } = useDashboardStats();

  const DASHBOARD_STATS = [
    { label: "Dịch vụ", count: stats.services, icon: "inventory_2", color: "bg-blue-500", href: "/admin/services" },
    { label: "Tin tức", count: stats.news, icon: "newspaper", color: "bg-emerald-500", href: "/admin/news" },
    { label: "Chưa đọc", count: stats.newContacts, icon: "mark_email_unread", color: "bg-amber-500", href: "/admin/contacts" },
    { label: "Templates", count: stats.templates, icon: "description", color: "bg-violet-500", href: "/admin/templates" },
    { label: "Liên hệ", count: stats.contacts, icon: "mail", color: "bg-rose-500", href: "/admin/contacts" },
  ];

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-8 rounded-[2rem] border border-on-surface/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] rounded-bl-[5rem] -mr-8 -mt-8`} />

            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                <span className="material-symbols-outlined text-3xl font-black">{stat.icon}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface/20 group-hover:text-primary transition-colors">arrow_forward</span>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-on-surface tracking-tighter">{stat.count}</h3>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-on-surface/5 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-on-surface uppercase tracking-tight">Hoạt động mới nhất</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Xem tất cả</button>
          </div>

          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-on-surface/5 group hover:bg-white hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-white border border-on-surface/5 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined font-black">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface mb-0.5">{activity.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
                    {new Date(activity.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                  </p>
                </div>
                <div className={`text-[9px] font-black ${activity.color} px-4 py-2 rounded-full uppercase tracking-widest`}>
                  {activity.status}
                </div>
              </div>
            ))}
            {recentActivities.length === 0 && (
              <p className="text-center text-on-surface-variant/40 italic py-10">Chưa có hoạt động nào gần đây.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />

          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-10 relative z-10">Thao tác nhanh</h3>

          <div className="grid grid-cols-1 gap-4 relative z-10">
            <button
              onClick={() => router.push("/admin/services/new")}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-primary hover:border-primary transition-all group/btn"
            >
              <span className="material-symbols-outlined text-primary group-hover/btn:text-white transition-colors">add_circle</span>
              <span className="text-xs font-black tracking-widest uppercase">Thêm dịch vụ mới</span>
            </button>
            <button
              onClick={() => router.push("/admin/news/new")}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-primary hover:border-primary transition-all group/btn"
            >
              <span className="material-symbols-outlined text-primary group-hover/btn:text-white transition-colors">post_add</span>
              <span className="text-xs font-black tracking-widest uppercase">Viết bài mới</span>
            </button>
            <button
              onClick={() => router.push("/admin/settings/email")}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-slate-800 transition-all group/btn"
            >
              <span className="material-symbols-outlined text-white/40 group-hover/btn:text-white transition-colors">settings</span>
              <span className="text-xs font-black tracking-widest uppercase">Cấu hình hệ thống</span>
            </button>
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Trạng thái máy chủ</p>
            <div className="flex items-center gap-3">
              <div className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <p className="text-xs font-bold text-white tracking-widest">HOẠT ĐỘNG TỐT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
