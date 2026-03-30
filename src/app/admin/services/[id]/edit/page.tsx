import ServiceForm from "@/components/admin/ServiceForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: serviceItem } = await supabase.from("services").select("*").eq("id", id).single();

  if (!serviceItem) notFound();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Chỉnh sửa dịch vụ</h2>
        <p className="text-sm text-on-surface-variant/60 font-medium">
          Cập nhật thông tin cho dịch vụ: <span className="text-primary font-bold">"{serviceItem.title}"</span>
        </p>
      </div>
      <ServiceForm initialData={serviceItem} isEdit={true} />
    </div>
  );
}
