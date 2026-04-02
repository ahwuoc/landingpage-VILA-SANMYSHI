"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { X, Save, Upload, Edit3, Type, MousePointer2, Image as ImageIcon, LayoutGrid, Check, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { HeroSlide } from "@/lib/data";

interface HeroSlideFormProps {
  slide: HeroSlide | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function HeroSlideForm({ slide, onClose, onSuccess }: HeroSlideFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    tag: slide?.tag || "",
    title: slide?.title || "",
    subtitle: slide?.subtitle || "",
    image: slide?.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    cta_primary: slide?.cta_primary || "",
    cta_primary_action: slide?.cta_primary_action || "modal",
    cta_primary_service: slide?.cta_primary_service || "",
    cta_primary_href: slide?.cta_primary_href || "",
    cta_secondary: slide?.cta_secondary || "",
    cta_secondary_action: slide?.cta_secondary_action || "href",
    cta_secondary_service: slide?.cta_secondary_service || "",
    cta_secondary_href: slide?.cta_secondary_href || "",
    display_order: slide?.display_order ?? 0,
    is_visible: slide?.is_visible ?? true,
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `hero/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      toast.success("Tải ảnh lên thành công");
    } catch (err: any) {
      toast.error("Lỗi upload: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (slide) {
        const { error } = await supabase
          .from("hero_slides")
          .update(formData)
          .eq("id", slide.id);
        if (error) throw error;
        toast.success("Cập nhật slide thành công");
      } else {
        const { error } = await supabase.from("hero_slides").insert([formData]);
        if (error) throw error;
        toast.success("Thêm slide mới thành công");
      }
      onSuccess();
    } catch (error: any) {
      toast.error("Lỗi khi lưu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-white h-screen shadow-[-20px_0_80px_-15px_rgba(0,0,0,0.15)] flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {slide ? <Edit3 size={20} /> : <LayoutGrid size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {slide ? "Chỉnh sửa Slide" : "Thêm Slide mới"}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Thiết lập chi tiết</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
          {/* Section: Visuals */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <ImageIcon size={18} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Hình ảnh & Hiển thị</h3>
            </div>

            <div className="space-y-4">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <div
                className="aspect-video relative rounded-3xl overflow-hidden bg-slate-100 group cursor-pointer border border-slate-100 shadow-inner"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image src={formData.image} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[2px]">
                  {uploading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Thay đổi ảnh</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thứ tự</label>
                  <input
                    type="number" value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                    className="w-full bg-transparent font-black text-slate-900 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, is_visible: !prev.is_visible }))}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${formData.is_visible
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-red-50 border-red-100 text-red-600"
                    }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {formData.is_visible ? "Đang hiện" : "Đang ẩn"}
                  </span>
                  {formData.is_visible ? <Check size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          </section>

          {/* Section: Content */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Type size={18} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Nội dung văn bản</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tagline</label>
                <input
                  type="text" required value={formData.tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                  placeholder="VD: Dịch vụ uy tín..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm"
                />
              </div>

              <div className="space-y-1.5 px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiêu đề (Hỗ trợ HTML)</label>
                <textarea
                  required rows={2} value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5 px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả ngắn</label>
                <textarea
                  required rows={3} value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium leading-relaxed"
                />
              </div>
            </div>
          </section>

          {/* Section: Call to Actions */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <MousePointer2 size={18} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Nút hành động</h3>
            </div>

            <div className="space-y-6">
              {/* Primary CTA */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">CTA Chính</span>
                  <select
                    value={formData.cta_primary_action}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta_primary_action: e.target.value as any }))}
                    className="text-[10px] font-black uppercase bg-white border border-slate-200 px-3 py-1 rounded-lg outline-none"
                  >
                    <option value="modal">Mở Form</option>
                    <option value="href">Dẫn Link</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <input
                    type="text" placeholder="Tên nút (VD: Bắt đầu ngay)"
                    value={formData.cta_primary} onChange={(e) => setFormData(prev => ({ ...prev, cta_primary: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:border-primary outline-none transition-all"
                  />
                  {formData.cta_primary_action === "modal" ? (
                    <input
                      type="text" placeholder="Dịch vụ mặc định (VD: Khai báo hải quan)"
                      value={formData.cta_primary_service} onChange={(e) => setFormData(prev => ({ ...prev, cta_primary_service: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none transition-all"
                    />
                  ) : (
                    <input
                      type="text" placeholder="Link URL (VD: /services)"
                      value={formData.cta_primary_href} onChange={(e) => setFormData(prev => ({ ...prev, cta_primary_href: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none transition-all"
                    />
                  )}
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CTA Phụ</span>
                  <select
                    value={formData.cta_secondary_action}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary_action: e.target.value as any }))}
                    className="text-[10px] font-black uppercase bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg outline-none"
                  >
                    <option value="modal">Mở Form</option>
                    <option value="href">Dẫn Link</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <input
                    type="text" placeholder="Tên nút (Không bắt buộc)"
                    value={formData.cta_secondary} onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-primary outline-none transition-all"
                  />
                  {formData.cta_secondary_action === "modal" ? (
                    <input
                      type="text" placeholder="Dịch vụ mặc định"
                      value={formData.cta_secondary_service} onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary_service: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none transition-all"
                    />
                  ) : (
                    <input
                      type="text" placeholder="Link URL"
                      value={formData.cta_secondary_href} onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary_href: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none transition-all"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </form>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            onClick={handleSubmit}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-glow-primary hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : slide ? "Lưu thay đổi" : "Tạo slide ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
