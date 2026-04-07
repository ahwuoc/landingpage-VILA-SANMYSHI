"use client";

import DataTable from "@/components/admin/DataTable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminServices() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("services")
      .select("*, service_categories(name)")
      .order("created_at", { ascending: false })
      .then(({ data: services }) => {
        setData(services || []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(item: any) {
    if (!confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;
    await supabase.from("services").delete().eq("id", item.id);
    setData(prev => prev.filter(s => s.id !== item.id));
  }

  const columns = [
    {
      header: "Dịch vụ",
      accessor: "title",
      render: (value: any, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-on-surface/5 bg-slate-50 flex-none shadow-sm">
            <Image src={item.image || "/images/logo.jpg"} alt={value?.vi || value?.en || ""} fill className="object-cover" />
          </div>
          <span className="text-sm font-black text-on-surface">{value?.vi || value?.en || ""}</span>
        </div>
      )
    },
    {
      header: "ID",
      accessor: "id",
      render: (value: string) => (
        <code className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
          {value}
        </code>
      )
    },
    {
      header: "Danh mục",
      accessor: "category",
      render: (_: any, item: any) => (
        <span className="text-xs font-bold text-on-surface-variant">
          {item.service_categories?.name?.vi || item.service_categories?.name?.en || "—"}
        </span>
      )
    },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value: string, item: any) => (
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={value === "Active"} onChange={async () => {
              const newStatus = value === "Active" ? "Inactive" : "Active";
              await supabase.from("services").update({ status: newStatus }).eq("id", item.id);
              setData(prev => prev.map(s => s.id === item.id ? { ...s, status: newStatus } : s));
            }} />
            <div className={`w-10 h-5 rounded-full transition-colors ${value === "Active" ? "bg-emerald-500" : "bg-slate-200"}`} />
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value === "Active" ? "translate-x-5" : "translate-x-0"}`} />
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${value === "Active" ? "text-emerald-600" : "text-slate-400"}`}>
            {value === "Active" ? "Công khai" : "Nháp"}
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
        title="Danh sách Dịch vụ"
        columns={columns}
        data={data}
        onAdd={() => router.push("/admin/services/new")}
        onEdit={(item) => router.push(`/admin/services/${item.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
