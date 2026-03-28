"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, Plus, Trash2,
  Edit2, Save, X, Loader2,
  Package, Link as LinkIcon
} from "lucide-react";

export default function ServiceCategoriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase
      .from("service_categories")
      .select("*")
      .order("created_at", { ascending: false });
    setCategories(data || []);
    setLoading(false);
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  async function handleSave() {
    if (!formData.name || !formData.slug) return;

    if (editingId) {
      const { error } = await supabase
        .from("service_categories")
        .update(formData)
        .eq("id", editingId);
      if (error) alert(error.message);
      else {
        setEditingId(null);
        fetchCategories();
      }
    } else {
      const { error } = await supabase
        .from("service_categories")
        .insert([formData]);
      if (error) alert(error.message);
      else {
        setIsAdding(false);
        fetchCategories();
      }
    }
    setFormData({ name: "", slug: "" });
  }

  async function handleDelete(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);
      if (error) alert(error.message);
      else fetchCategories();
    }
  }

  const startEdit = (cat: any) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, slug: cat.slug });
    setIsAdding(true);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 bg-white rounded-2xl border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-1">Danh mục Dịch vụ</h2>
            <p className="text-sm text-on-surface-variant/60 font-medium italic">Quản lý các nhóm dịch vụ logistics.</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setFormData({ name: "", slug: "" });
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow-primary hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} /> Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center p-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-20 border border-dashed border-on-surface/20 flex flex-col items-center text-center">
              <Package size={48} className="text-on-surface-variant/20 mb-4" />
              <p className="text-on-surface-variant/60 font-medium italic">Chưa có danh mục nào được tạo.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-on-surface/5">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Tên danh mục</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Slug</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/5">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-on-surface">{cat.name}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-mono text-on-surface-variant/60">{cat.slug}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEdit(cat)}
                            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-2 text-on-surface-variant hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form Column */}
        <div className="lg:col-span-1">
          {isAdding && (
            <div className="bg-white rounded-[2.5rem] p-8 border border-on-surface/5 shadow-2xl shadow-primary/5 sticky top-28 animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                  {editingId ? "Sửa danh mục" : "Thêm mới danh mục"}
                </h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Tên danh mục</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="VD: Logistics Quốc Tế"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl p-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1 flex items-center gap-2">
                    <LinkIcon size={12} /> Đường dẫn (Slug)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-slate-50 border border-transparent rounded-2xl p-4 text-xs font-mono focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                  <p className="text-[10px] text-on-surface-variant/40 italic ml-1">* Tự động tạo từ tên danh mục.</p>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                >
                  <Save size={18} /> {editingId ? "Cập nhật" : "Lưu danh mục"}
                </button>
              </div>
            </div>
          )}

          {!isAdding && (
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-dashed border-on-surface/10 flex flex-col items-center text-center sticky top-28">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm">
                <Package size={24} />
              </div>
              <p className="text-xs font-bold text-on-surface mb-2 uppercase tracking-tight text-center">Tạo nhóm dịch vụ mới?</p>
              <p className="text-[10px] text-on-surface-variant/60 font-medium italic mb-6 text-center">Phân loại dịch vụ giúp khách hàng dễ dàng tìm kiếm và lựa chọn các gói giải pháp logistics phù hợp.</p>
              <button
                onClick={() => setIsAdding(true)}
                className="px-8 py-3 bg-white border border-on-surface/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Bắt đầu ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
