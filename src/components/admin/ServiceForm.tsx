"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Save, Upload,
  Info, LayoutGrid, Server,
  Settings, Zap, ChevronDown, Check,
  FileText, Plus
} from "lucide-react";
import TiptapEditor from "./TiptapEditor";
import { supabase } from "@/lib/supabase";

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Vận tải",
    image: initialData?.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    description: initialData?.description || "",
    detailedContent: initialData?.detailedContent || "",
    status: initialData?.status || "Active",
    features: initialData?.features || ["Vận chuyển nhanh", "Bảo hiểm 100%", "Theo dõi 24/7"]
  });

  const [templates, setTemplates] = useState<any[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);

  async function fetchTemplates() {
    try {
      const { data } = await supabase
        .from("templates")
        .select("*")
        .eq("type", "service")
        .order("name");
      setTemplates(data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await supabase
        .from("service_categories")
        .select("*")
        .order("name");
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleApplyTemplate = (content: string) => {
    setFormData({ ...formData, detailedContent: content });
    setShowTemplates(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/services");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20 w-full animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md py-4 border-b border-on-surface/5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-on-surface/5 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-on-surface">
              {isEdit ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
            </h1>
            <p className="text-xs text-on-surface-variant/60">
              Quản lý danh mục dịch vụ logistics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-on-surface/5 rounded-xl transition-all"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-glow-primary hover:brightness-110 transition-all disabled:opacity-50"
          >
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
                <LayoutGrid size={16} className="text-primary" />
                Tên dịch vụ
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Vận tải đường biển quốc tế"
                className="w-full px-5 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                Mô tả ngắn
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả tóm tắt về dịch vụ..."
                className="w-full px-5 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface/80 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Server size={16} className="text-primary" />
                  Nội dung chi tiết & Thông số kỹ thuật
                </span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="p-2 bg-slate-50 border border-on-surface/10 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center gap-1 text-[10px] font-black uppercase text-primary"
                  >
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

                      <div className="max-h-[320px] overflow-y-auto p-2 custom-scrollbar">
                        {templates.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleApplyTemplate(t.content)}
                            className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all group flex items-start gap-3"
                          >
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                              <FileText size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                                {t.name}
                              </p>
                              <p className="text-[10px] text-on-surface-variant/40 italic truncate">
                                Click để áp dụng nội dung này
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="p-2 border-t border-on-surface/5 bg-slate-50/30">
                        <button
                          type="button"
                          onClick={() => router.push('/admin/templates/new')}
                          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
                        >
                          <Plus size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Tạo thêm mẫu mới
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </label>
              <div className="tiptap-wrapper">
                <TiptapEditor
                  value={formData.detailedContent}
                  onChange={(content) => setFormData({ ...formData, detailedContent: content })}
                  placeholder="Mô tả chi tiết và bảng quy cách kỹ thuật..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Status & Options */}
          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-6">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <Settings size={18} className="text-primary" />
              Thiết lập dịch vụ
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider flex items-center gap-2">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-on-surface/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="Active">Đang hoạt động</option>
                  <option value="Inactive">Tạm ngưng</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider flex items-center gap-2">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-on-surface/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer"
                >
                  <option value="">Chọn danh mục...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/services/categories')}
                    className="text-[10px] font-black uppercase text-primary hover:underline"
                  >
                    + Quản lý danh mục
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-3xl border border-on-surface/5 shadow-sm space-y-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <Zap size={18} className="text-primary" />
              Ảnh minh họa
            </h3>
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-100 group">
              <Image
                src={formData.image}
                alt="Service preview"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="p-2 bg-white rounded-full text-on-surface shadow-lg hover:scale-110 transition-transform"
                >
                  <Upload size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
