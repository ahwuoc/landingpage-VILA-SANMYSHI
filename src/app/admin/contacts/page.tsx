"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { CONTACT_STATUS_COLORS, CONTACT_STATUS_LABELS } from "@/constants/contacts";
import { supabase } from "@/lib/supabase";
import { useContacts } from "@/hooks/useAdminData";

export default function AdminConsultations() {
  const router = useRouter();
  const { contacts: data, loading, setContacts: setData } = useContacts();

  const handleDelete = async (item: any) => {
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", item.id);

      if (error) throw error;
      setData(data.filter(d => d.id !== item.id));
    } catch (error) {
      alert("Lỗi khi xóa yêu cầu");
    }
  };

  const columns = [
    {
      header: "Khách hàng",
      accessor: "name",
      render: (value: string, item: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-black text-on-surface leading-snug">{value}</span>
          <span className="text-[10px] text-on-surface-variant/60 font-medium tracking-wide">{item.email || "Không cung cấp"}</span>
        </div>
      )
    },
    {
      header: "Số điện thoại",
      accessor: "phone",
      render: (value: string) => (
        <span className="text-xs font-bold text-on-surface-variant font-mono">{value}</span>
      )
    },
    {
      header: "Nội dung yêu cầu",
      accessor: "subject",
      render: (value: string, item: any) => (
        <div className="flex flex-col max-w-md">
          <span className="text-xs font-black text-on-surface mb-1 line-clamp-1">{value}</span>
          <p className="text-[10px] text-on-surface-variant/60 font-medium line-clamp-1 italic">"{item.message}"</p>
        </div>
      )
    },
    {
      header: "Ngày nhận",
      accessor: "date",
      render: (value: string) => (
        <span className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest">
          {value ? new Date(value).toLocaleDateString('vi-VN') : "..."}
        </span>
      )
    },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${CONTACT_STATUS_COLORS[value] || "bg-slate-300"}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">
            {CONTACT_STATUS_LABELS[value] || value}
          </span>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-3xl border border-on-surface/5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tổng yêu cầu tư vấn</p>
          <h4 className="text-3xl font-black text-on-surface">{data.length}</h4>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-on-surface/5 shadow-sm border-l-4 border-l-rose-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Chưa xử lý (Mới)</p>
          <h4 className="text-3xl font-black text-rose-500">{data.filter(m => m.status === 'new').length}</h4>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-on-surface/5 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Đã hoàn thành</p>
          <h4 className="text-3xl font-black text-emerald-500">{data.filter(m => m.status === 'replied').length}</h4>
        </div>
      </div>

      <DataTable
        title="Danh sách Yêu cầu Tư vấn"
        columns={columns}
        data={data}
        onEdit={(item) => router.push(`/admin/contacts/${item.id}/reply`)}
        onDelete={handleDelete}
        editIcon="reply"
        hideAdd={true}
      />
    </div>
  );
}
