"use client";

import DataTable from "@/components/admin/DataTable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminNews() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    const { data: news } = await supabase
      .from("news")
      .select("*, news_categories(name)")
      .order("created_at", { ascending: false });
    setData(news || []);
    setLoading(false);
  }

  async function handleToggleStatus(item: any) {
    const newStatus = item.status === "Published" ? "Draft" : "Published";
    await supabase.from("news").update({ status: newStatus }).eq("id", item.id);
    setData(prev => prev.map(n => n.id === item.id ? { ...n, status: newStatus } : n));
  }

  async function handleDelete(item: any) {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    await supabase.from("news").delete().eq("id", item.id);
    setData(prev => prev.filter(n => n.id !== item.id));
  }

  const columns = [
    {
      header: "Bài viết",
      accessor: "title",
      render: (value: any, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-10 rounded-xl overflow-hidden relative border border-on-surface/5 bg-slate-50 flex-none shadow-sm">
            <Image src={item.image || "/images/logo.jpg"} alt={value} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-on-surface leading-snug">{(value?.vi || value?.en || "")?.length > 50 ? (value?.vi || value?.en || "").substring(0, 50) + "..." : (value?.vi || value?.en || "")}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                {item.news_categories?.name?.vi || item.news_categories?.name?.en || ""}
              </span>
              <span className="text-[10px] text-on-surface-variant/40 font-bold">{item.date ? new Date(item.date).toLocaleDateString("vi-VN") : "..."}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Tác giả",
      accessor: "author",
      render: (value: string) => (
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{value || "Admin"}</span>
      )
    },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value: string, item: any) => (
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={value === "Published"} onChange={async () => {
              const newStatus = value === "Published" ? "Draft" : "Published";
              await supabase.from("news").update({ status: newStatus }).eq("id", item.id);
              setData(prev => prev.map(n => n.id === item.id ? { ...n, status: newStatus } : n));
            }} />
            <div className={`w-10 h-5 rounded-full transition-colors ${value === "Published" ? "bg-emerald-500" : "bg-slate-200"}`} />
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value === "Published" ? "translate-x-5" : "translate-x-0"}`} />
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${value === "Published" ? "text-emerald-600" : "text-slate-400"}`}>
            {value === "Published" ? "Đã đăng" : "Nháp"}
          </span>
        </label>
      )
    }
  ];

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable
        title="Danh sách Tin tức"
        columns={columns}
        data={data}
        onAdd={() => router.push("/admin/news/new")}
        onEdit={(item) => router.push(`/admin/news/${item.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
