"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Search, ExternalLink, ShieldCheck } from "lucide-react";
import { INITIAL_PARTNERS, Partner } from "@/constants/partners";

export default function PartnerManagementPage() {
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: "", logo: "", website: "" });

  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    const partner: Partner = {
      id: Math.random().toString(36).substr(2, 9),
      ...newPartner
    };
    setPartners([partner, ...partners]);
    setNewPartner({ name: "", logo: "", website: "" });
    setIsAdding(false);
  };

  const handleDeletePartner = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đối tác này?")) {
      setPartners(partners.filter(p => p.id !== id));
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Quản lý Đối tác</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Hiển thị mạng lưới kết nối toàn cầu của VILA SANMYSHI.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-glow-primary hover:scale-105 transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          THÊM ĐỐI TÁC
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm đối tác..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
        />
      </div>

      {/* ADD FORM MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 relative animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black text-on-surface mb-8 uppercase tracking-tight">Thêm đối tác mới</h3>
            <form onSubmit={handleAddPartner} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant/60 uppercase tracking-widest ml-1">Tên đối tác</label>
                <input
                  required
                  type="text"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                  placeholder="VD: MAERSK"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant/60 uppercase tracking-widest ml-1">Link Logo (URL)</label>
                <input
                  required
                  type="text"
                  value={newPartner.logo}
                  onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-on-surface/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-4 text-sm font-black text-on-surface-variant/60 hover:bg-slate-50 rounded-2xl transition-all uppercase tracking-widest"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-glow-primary hover:brightness-110 transition-all uppercase tracking-widest"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PARTNERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="group bg-white rounded-[2rem] border border-on-surface/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
            <div className="aspect-square p-8 bg-slate-50/50 flex items-center justify-center relative group-hover:bg-white transition-colors">
              <div className="relative w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => handleDeletePartner(partner.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-white border border-on-surface/5 rounded-xl flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-red-50"
                title="Xóa đối tác"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-6 flex items-center justify-between bg-white border-t border-on-surface/5">
              <div>
                <h4 className="font-black text-on-surface uppercase tracking-tight">{partner.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={10} className="text-primary" />
                  <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider">Verified Partner</span>
                </div>
              </div>
              <button className="p-2 text-on-surface-variant/20 hover:text-primary transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}

        {filteredPartners.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant/20">
              <Search size={40} />
            </div>
            <p className="text-on-surface-variant/60 font-medium italic">Không tìm thấy đối tác nào phù hợp...</p>
          </div>
        )}
      </div>
    </div>
  );
}
