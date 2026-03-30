"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Upload, Info, LayoutGrid, Settings, Zap, FileText, Plus } from "lucide-react";
import TiptapEditor from "./TiptapEditor";
import { supabase } from "@/lib/supabase";
import { useTemplates, useServiceCategories } from "@/hooks/useAdminData";
import { slugify } from "@/lib/slugify";

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    image: initialData?.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    content: initialData?.content || "",
    status: initialData?.status || "Active",
    category: initialData?.category || "",
  });

  const templates = useTemplates("service");
  const categories = useServiceCategories();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `services/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
    } catch (err: any) {
      alert('Lỗi upload: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        image: formData.image,
        content: formData.content,
        status: formData.status,
        category: formData.category,
        updated_at: new Date().toISOString(),
      };

      if (isEdit && initialData?.id) {
        const { error } = await supabase.from("services").update(payload).eq("id", initialData.id);
        if (error) throw error;
        alert("Cập nhật dịch vụ thành công!");
      } else {
        const id = slugify(formData.title) || `service-${Date.now()}`;
        const { error } = await supabase.from("services").insert([{ ...payload, id }]);
        if (error) throw error;
        alert("Đã tạo dịch vụ mới thành công!");
      }
      router.push("/admin/services");
      router.refresh();
    } catch (error: any) {
      alert("Lỗi khi lưu dịch vụ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md py-4 border-b border-on-surface/5">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-on-surface">{isEdit ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}</h1>
            <p className="text-xs text-on-surface-variant/60">Quản lý danh mục dịch vụ logistics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.push("/admin/services")} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-on-surface/5 rounded-xl transition-all">
            Hủy
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-glow-primary hover:brightness-110 transition-all disabled:opacity-50">
            <Save size={18} />
            {loading ? "Đang lưu..." : "Lưu dịch vụ"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-on-surface/5 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80 flex items-center gap-2">
                <LayoutGrid size={16} className="text-primary" /> Tên dịch vụ
              </label>
              <input
                type="text" required value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="VD: Vận tải đường biển quốc tế"
                className="w-full px-5 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-on-surface/80 flex items-center gap-2">
                  <Info size={16} className="text-primary" /> Nội dung chi tiết
                </label>
                <div className="relative">
                  <button type="button" onClick={() => setShowTemplates(!showTemplates)}
                    className="p-2 bg-slate-50 border border-on-surface/10 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center gap-1 text-[10px] font-black uppercase text-primary">
                    <Zap size={14} /> Dùng mẫu
                  </button>
                  {showTemplates && templates.length > 0 && (
                    <div className="absolute top-10 right-0 w-80 bg-white/95 backdrop-blur-xl border border-on-surface/5 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-300">
                      <div className="p-5 border-b border-on-surface/5 flex items-center justify-between bg-slate-50/50">
                        <h4 className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest flex items-center gap-2">
                          <Zap size={12} className="text-primary" /> Chọn mẫu nội dung
                        </h4>
                        <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{templates.length} mẫu</span>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto p-2">
                        {templates.map((t) => (
                          <button key={t.id} type="button" onClick={() => { setFormData(prev => ({ ...prev, content: t.content })); setShowTemplates(false); }}
                            className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all group flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                              <FileText size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary truncate">{t.name}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2 border-t border-on-surface/5 bg-slate-50/30">
                        <button type="button" onClick={() => router.push('/admin/templates/new')}
                          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                          <Plus size={14} /> Tạo thêm mẫu mới
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <TiptapEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Mô tả chi tiết và bảng quy cách kỹ thuật..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-6">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <Settings size={18} className="text-primary" /> Thiết lập dịch vụ
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Trạng thái xuất bản</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, status: "Active" }))}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === "Active" ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                  ✓ Công khai
                </button>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, status: "Inactive" }))}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === "Inactive" ? "bg-slate-700 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                  ✎ Nháp
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Danh mục</label>
              <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-on-surface/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer">
                <option value="">Chọn danh mục...</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <Zap size={18} className="text-primary" /> Ảnh minh họa
            </h3>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Image src={formData.image} alt="Service preview" fill className="object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Upload size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Thay ảnh</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] text-on-surface-variant/60 text-center italic">Click vào ảnh để thay đổi</p>
          </div>
        </div>
      </div>
    </form>
  );
}
