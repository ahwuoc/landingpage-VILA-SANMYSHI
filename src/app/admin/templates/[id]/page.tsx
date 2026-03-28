"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Info } from "lucide-react";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { supabase } from "@/lib/supabase";

export default function TemplateFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [type, setType] = useState("reply");

  const TYPE_OPTIONS = [
    { value: "reply", label: "Phản hồi Tư vấn" },
    { value: "service", label: "Mẫu Dịch vụ" },
    { value: "news", label: "Mẫu Tin tức" },
  ];

  useEffect(() => {
    if (!isNew) {
      fetchTemplate();
    }
  }, [id]);

  async function fetchTemplate() {
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setName(data.name);
      setContent(data.content);
      setType(data.type || "reply");
    } catch (error) {
      console.error("Lỗi khi tải mẫu:", error);
      alert("Không tìm thấy mẫu");
      router.push("/admin/templates");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!name || !content) {
      alert("Vui lòng nhập đầy đủ tên và nội dung");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        content,
        type,
        updated_at: new Date().toISOString()
      };

      if (isNew) {
        const { error } = await supabase
          .from("templates")
          .insert([payload]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("templates")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      }

      alert("Lưu mẫu thành công!");
      router.push("/admin/templates");
    } catch (error: any) {
      alert("Lỗi khi lưu: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white rounded-2xl border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-1">
            {isNew ? "Tạo Mẫu mới" : "Chỉnh sửa Mẫu"}
          </h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Soạn thảo các mẫu chuẩn cho Phản hồi, Dịch vụ hoặc Tin tức.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] border border-on-surface/5 shadow-sm p-8 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Info size={14} /> Thông tin chung
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Tên Mẫu</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Phản hồi báo giá FCL"
                className="w-full bg-slate-50 border border-transparent rounded-xl p-4 text-sm font-bold focus:bg-white focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Loại Mẫu</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-transparent rounded-xl p-4 text-sm font-bold focus:bg-white focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <p className="text-[10px] text-on-surface-variant/50 leading-relaxed italic">
              * Tên này giúp bạn dễ dàng chọn lại mẫu khi trả lời tư vấn khách hàng.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm p-10">
            <h3 className="text-xl font-black text-on-surface uppercase tracking-tight flex items-center gap-3 mb-8">
              <FileText className="text-primary" /> Nội dung mẫu
            </h3>

            <TiptapEditor
              value={content}
              onChange={setContent}
              placeholder="Nhập nội dung HTML cho mẫu phản hồi tại đây..."
            />

            <div className="mt-10 flex justify-end gap-4">
              <button
                onClick={() => router.back()}
                className="px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 hover:bg-slate-50 rounded-2xl transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-glow-primary hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                LƯU MẪU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
