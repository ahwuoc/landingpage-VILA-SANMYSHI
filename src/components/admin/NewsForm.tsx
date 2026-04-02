"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Upload, User, Tag, Zap, FileText, Plus } from "lucide-react";
import TiptapEditor from "./TiptapEditor";
import { supabase } from "@/lib/supabase";
import { useUsers, useNewsCategories, useTemplates } from "@/hooks/useAdminData";
import { slugify } from "@/lib/slugify";

interface NewsFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function NewsForm({ initialData, isEdit = false }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Tin tức",
    author: initialData?.author || "Admin",
    image: initialData?.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    summary: initialData?.excerpt || initialData?.summary || "",
    content: initialData?.content || "",
    status: initialData?.status || "Published",
  });

  const users = useUsers();
  const categories = useNewsCategories();
  const templates = useTemplates("news");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `news/${Date.now()}.${ext}`;
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

  const handleApplyTemplate = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
    setShowTemplates(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        excerpt: formData.summary,
        content: formData.content,
        image: formData.image,
        author: formData.author,
        category: formData.category,
        status: formData.status,
        updated_at: new Date().toISOString(),
      };

      let finalSlug = "";

      if (isEdit && initialData?.id) {
        finalSlug = formData.title !== initialData?.title ? slugify(formData.title) : initialData.slug;
        const slugPayload = formData.title !== initialData?.title ? { ...payload, slug: finalSlug } : payload;
        const { error } = await supabase.from("news").update(slugPayload).eq("id", initialData.id);
        if (error) throw error;
        alert("Cập nhật bài viết thành công!");
      } else {
        finalSlug = slugify(formData.title) || `bai-viet-${Date.now()}`;
        const { error } = await supabase.from("news").insert([{ ...payload, slug: finalSlug, date: new Date().toISOString() }]);
        if (error) throw error;
        alert("Đã tạo bài viết mới thành công!");
      }

      if (formData.status === "Published") {
        fetch("/api/send-newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            slug: finalSlug,
            excerpt: formData.summary,
            image: formData.image
          })
        }).catch(err => console.error("Newsletter error:", err)); // Chạy ngầm, không chặn UI
      }

      router.push("/admin/news");
      router.refresh();
    } catch (error: any) {
      alert("Lỗi khi lưu bài viết: " + error.message);
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
            <h1 className="text-xl font-bold text-on-surface">{isEdit ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}</h1>
            <p className="text-xs text-on-surface-variant/60">Quản lý nội dung và hiển thị bài viết</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.push("/admin/news")} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-on-surface/5 rounded-xl transition-all">
            Hủy
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-glow-primary hover:brightness-110 transition-all disabled:opacity-50">
            <Save size={18} />
            {loading ? "Đang lưu..." : "Lưu bài viết"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-on-surface/5 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80">Tiêu đề bài viết</label>
              <input
                type="text" required value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="VD: Vila Sanmyshi mở rộng mạng lưới vận chuyển quốc tế..."
                className="w-full px-5 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80">Tóm tắt ngắn gọn</label>
              <textarea
                required rows={3} value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Mô tả ngắn hiển thị trên danh sách tin bài..."
                className="w-full px-5 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80 flex items-center justify-between">
                <span>Nội dung chi tiết</span>
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
                          <button key={t.id} type="button" onClick={() => handleApplyTemplate(t.content)}
                            className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all group flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                              <FileText size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">{t.name}</p>
                              <p className="text-[10px] text-on-surface-variant/40 italic truncate">Click để áp dụng nội dung này</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2 border-t border-on-surface/5 bg-slate-50/30">
                        <button type="button" onClick={() => router.push('/admin/templates/new')}
                          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group">
                          <Plus size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Tạo thêm mẫu mới
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </label>
              <TiptapEditor value={formData.content} onChange={(content) => setFormData(prev => ({ ...prev, content }))} placeholder="Viết nội dung bài viết tại đây..." />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-6">
            <h3 className="font-bold text-on-surface">Thông tin bổ sung</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Trạng thái xuất bản</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, status: "Published" }))}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === "Published" ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                    ✓ Công khai
                  </button>
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, status: "Draft" }))}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === "Draft" ? "bg-slate-700 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                    ✎ Nháp
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={12} /> Danh mục
                </label>
                <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-on-surface/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer">
                  <option value="">Chọn danh mục...</option>
                  {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <div className="flex justify-end pt-1">
                  <button type="button" onClick={() => router.push('/admin/news/categories')} className="text-[10px] font-black uppercase text-primary hover:underline">
                    + Quản lý danh mục
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider flex items-center gap-2">
                  <User size={12} /> Tác giả
                </label>
                <select value={formData.author} onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-on-surface/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-bold appearance-none">
                  <option value="">Chọn tác giả...</option>
                  {users.map((u) => <option key={u.id} value={u.full_name || u.email}>{u.full_name || u.email}</option>)}
                </select>
                <p className="text-[10px] text-on-surface-variant/40 italic">* Tên tác giả hiển thị trên bài viết.</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-4">
            <h3 className="font-bold text-on-surface">Ảnh bìa bài viết</h3>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Image src={formData.image} alt="Banner preview" fill className="object-cover transition-transform group-hover:scale-105" />
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
            <p className="text-[10px] text-on-surface-variant/60 text-center italic">
              Click vào ảnh để thay đổi — Kích thước đề xuất: 1200x630px
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
