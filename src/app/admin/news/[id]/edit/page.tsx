"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { supabase } from "@/lib/supabase";

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [newsItem, setNewsItem] = useState<any>(null);

  useEffect(() => {
    fetchNewsItem();
  }, [id]);

  async function fetchNewsItem() {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setNewsItem(data);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="text-center py-20 bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm">
        <h3 className="text-xl font-black text-on-surface-variant/40 uppercase tracking-widest mb-4">
          Không tìm thấy bài viết
        </h3>
        <button
          onClick={() => router.push("/admin/news")}
          className="text-primary font-bold hover:underline"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Chỉnh sửa bài viết</h2>
        <p className="text-sm text-on-surface-variant/60 font-medium italic">
          Cập nhật nội dung cho bài viết: <span className="text-primary font-bold">"{newsItem.title}"</span>
        </p>
      </div>

      <NewsForm initialData={newsItem} isEdit={true} />
    </div>
  );
}
