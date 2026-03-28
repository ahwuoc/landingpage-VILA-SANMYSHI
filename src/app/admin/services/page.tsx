"use client";

import DataTable from "@/components/admin/DataTable";
import { SERVICES_LIST } from "@/constants/services";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminServices() {
  const router = useRouter();

  const columns = [
    {
      header: "Dịch vụ",
      accessor: "title",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-on-surface/5 bg-slate-50 flex-none shadow-sm">
            <Image
              src={item.image}
              alt={value}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-on-surface leading-snug">{value}</span>
            <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest line-clamp-1">
              {item.content.replace(/<[^>]*>/g, "").substring(0, 50)}...
            </span>
          </div>
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
      header: "Thông tin chi tiết",
      accessor: "details",
      render: (value: any[]) => (
        <div className="flex -space-x-2">
          {(value || []).slice(0, 3).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-on-surface-variant">
              {i + 1}
            </div>
          ))}
          {value?.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[10px] font-black text-primary">
              +{value.length - 3}
            </div>
          )}
          {(!value || value.length === 0) && (
            <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest italic ml-2">Đang cập nhật</span>
          )}
        </div>
      )
    },
    {
      header: "Lợi ích",
      accessor: "benefits",
      render: (value: any[]) => (
        <span className="text-xs font-bold text-on-surface-variant">
          {value?.length || 0} mục
        </span>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable
        title="Danh sách Dịch vụ"
        columns={columns}
        data={SERVICES_LIST}
        onAdd={() => router.push("/admin/services/new")}
        onEdit={(item) => router.push(`/admin/services/${item.id}/edit`)}
        onDelete={(item) => console.log("Delete", item)}
      />
    </div>
  );
}
