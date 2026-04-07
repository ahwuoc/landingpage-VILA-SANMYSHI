import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import NewsForm from "@/components/admin/NewsForm";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: newsItem, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !newsItem) notFound();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Chỉnh sửa bài viết</h2>
        <p className="text-sm text-on-surface-variant/60 font-medium italic">
          Cập nhật nội dung cho bài viết: <span className="text-primary font-bold">"{newsItem.title?.vi || newsItem.title?.en || ""}"</span>
        </p>
      </div>
      <NewsForm initialData={newsItem} isEdit={true} />
    </div>
  );
}
