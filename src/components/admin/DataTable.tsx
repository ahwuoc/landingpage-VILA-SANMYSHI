"use client";

import { ReactNode } from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onAdd?: () => void;
  title: string;
  editIcon?: string;
  hideAdd?: boolean;
}

export default function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onAdd, 
  title,
  editIcon = "edit",
  hideAdd = false
}: DataTableProps) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm overflow-hidden">
      <div className="p-10 border-b border-on-surface/5 flex items-center justify-between">
        <h3 className="text-xl font-black text-on-surface uppercase tracking-tight">{title}</h3>
        <div className="flex gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">search</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="pl-12 pr-6 py-3 bg-slate-50 border border-on-surface/5 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
            />
          </div>
          {!hideAdd && (
            <button 
              onClick={onAdd}
              className="bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-glow-primary hover:scale-105 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Thêm mới
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {columns.map((col) => (
                <th key={col.accessor} className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 border-b border-on-surface/5">
                  {col.header}
                </th>
              ))}
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 border-b border-on-surface/5 text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-on-surface/5">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                {columns.map((col) => (
                  <td key={col.accessor} className="px-10 py-6">
                    {col.render ? col.render(item[col.accessor], item) : <span className="text-sm font-bold text-on-surface">{item[col.accessor]}</span>}
                  </td>
                ))}
                <td className="px-10 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit?.(item)}
                      className="w-10 h-10 rounded-lg border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                      title={editIcon === 'reply' ? 'Trả lời' : 'Chỉnh sửa'}
                    >
                      <span className="material-symbols-outlined text-lg">{editIcon}</span>
                    </button>
                    <button 
                      onClick={() => onDelete?.(item)}
                      className="w-10 h-10 rounded-lg border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 border-t border-on-surface/5 bg-slate-50/30 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
        <p>Hiển thị {data.length} bản ghi</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-on-surface/5 hover:bg-white transition-all cursor-not-allowed opacity-50">Trước</button>
          <button className="px-4 py-2 rounded-lg border border-on-surface/5 hover:bg-white transition-all">Sau</button>
        </div>
      </div>
    </div>
  );
}
