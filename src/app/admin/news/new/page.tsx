"use client";

import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 w-full">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Thêm bài viết mới</h2>
        <p className="text-sm text-on-surface-variant/60 font-medium">Tạo nội dung tin tức mới cho hệ thống website VILA SANMYSHI.</p>
      </div>

      <NewsForm />
    </div>
  );
}
