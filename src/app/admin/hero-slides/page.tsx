"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/admin/DataTable";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import Image from "next/image";
import { toast } from "sonner";
import { HeroSlide } from "@/lib/data";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setSlides(data || []);
    } catch (error: any) {
      toast.error("Lỗi khi tải dữ liệu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async (item: HeroSlide) => {
    if (!confirm("Bạn có chắc chắn muốn xóa slide này?")) return;
    try {
      const { error } = await supabase.from("hero_slides").delete().eq("id", item.id);
      if (error) throw error;
      toast.success("Xóa slide thành công");
      fetchSlides();
    } catch (error: any) {
      toast.error("Lỗi khi xóa: " + error.message);
    }
  };

  const handleEdit = (item: HeroSlide) => {
    setEditingSlide(item);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingSlide(null);
    setIsFormOpen(true);
  };

  const columns = [
    {
      header: "Hình ảnh",
      accessor: "image",
      render: (val: string) => (
        <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-on-surface/5 bg-slate-100">
          <Image src={val} alt="Slide" fill className="object-cover" />
        </div>
      ),
    },
    {
      header: "Tiêu đề",
      accessor: "title",
      render: (val: string) => (
        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-on-surface">
          {val.replace(/<[^>]*>/g, "")}
        </div>
      ),
    },
    {
      header: "Thứ tự",
      accessor: "display_order",
    },
    {
      header: "Hiển thị",
      accessor: "is_visible",
      render: (val: boolean) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${val ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
          {val ? "Hiện" : "Ẩn"}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Slide Trang Chủ</h1>
          <p className="text-on-surface-variant font-medium text-sm">Quản lý nội dung hiển thị tại phần Hero Carousel trên trang chủ.</p>
        </div>
      </div>

      <DataTable
        title="Danh sách Slides"
        columns={columns}
        data={slides}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <HeroSlideForm
          slide={editingSlide}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            fetchSlides();
          }}
        />
      )}
    </div>
  );
}
