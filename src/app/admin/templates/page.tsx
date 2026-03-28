"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import { supabase } from "@/lib/supabase";

export default function AdminTemplates() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const { data: templates, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(templates || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách mẫu:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (item: any) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mẫu này?")) return;

    try {
      const { error } = await supabase
        .from("templates")
        .delete()
        .eq("id", item.id);

      if (error) throw error;
      setData(data.filter(d => d.id !== item.id));
    } catch (error) {
      alert("Lỗi khi xóa mẫu");
    }
  };

  const TYPE_LABELS: Record<string, { label: string, color: string }> = {
    reply: { label: "Phản hồi", color: "bg-blue-50 text-blue-600" },
    service: { label: "Dịch vụ", color: "bg-emerald-50 text-emerald-600" },
    news: { label: "Tin tức", color: "bg-amber-50 text-amber-600" },
  };

  const columns = [
    {
      header: "Tên Mẫu",
      accessor: "name",
      render: (value: string) => (
        <span className="text-sm font-black text-on-surface leading-snug">{value}</span>
      )
    },
    {
      header: "Loại Mẫu",
      accessor: "type",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${TYPE_LABELS[value || 'reply']?.color}`}>
          {TYPE_LABELS[value || 'reply']?.label}
        </span>
      )
    },
    {
      header: "Ngày tạo",
      accessor: "created_at",
      render: (value: string) => (
        <span className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest">
          {value ? new Date(value).toLocaleDateString('vi-VN') : "..."}
        </span>
      )
    }
  ];

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Quản lý Mẫu</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Tạo và quản lý các mẫu phản hồi email chuyên nghiệp.</p>
        </div>
        <button
          onClick={() => router.push("/admin/templates/new")}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow-primary hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus size={18} /> Thêm Mẫu
        </button>
      </div>

      <DataTable
        title="Danh sách Mẫu phản hồi"
        columns={columns}
        data={data}
        onEdit={(item) => router.push(`/admin/templates/${item.id}`)}
        onDelete={handleDelete}
        hideAdd={true}
      />
    </div>
  );
}
