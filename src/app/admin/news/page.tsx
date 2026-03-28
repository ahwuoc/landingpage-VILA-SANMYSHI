"use client";

import DataTable from "@/components/admin/DataTable";
import { NEWS_LIST } from "@/constants/news";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminNews() {
  const router = useRouter();
  const columns = [
    {
      header: "Bài viết",
      accessor: "title",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-10 rounded-xl overflow-hidden relative border border-on-surface/5 bg-slate-50 flex-none shadow-sm">
            <Image
              src={item.image}
              alt={value}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-on-surface leading-snug">{value.length > 50 ? value.substring(0, 50) + "..." : value}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">{item.category}</span>
              <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">{item.date}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Tác giả",
      accessor: "author",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden relative grayscale">
            <Image
              src={`https://i.pravatar.cc/100?u=${item.id}`}
              alt={value}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{value}</span>
        </div>
      )
    },
    {
      header: "Nội dung",
      accessor: "excerpt",
      render: (value: string) => (
        <p className="text-[10px] text-on-surface-variant/60 font-medium max-w-xs">{value.substring(0, 60)}...</p>
      )
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable
        title="Danh sách Tin tức"
        columns={columns}
        data={NEWS_LIST}
        onAdd={() => router.push("/admin/news/new")}
        onEdit={(item) => router.push(`/admin/news/${item.id}/edit`)}
        onDelete={(item) => console.log("Delete", item)}
      />
    </div>
  );
}
