"use client";

import { useState, useEffect } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 pt-10 border-t border-on-surface/5 flex flex-wrap items-center gap-4">
      <span className="text-xs font-black uppercase tracking-widest text-slate-400 mr-4">Chia sẻ bài viết:</span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all group shadow-sm"
        title="Chia sẻ lên Facebook"
      >
        <span className="text-xl font-bold">f</span>
      </a>

      {/* Email Share */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
        className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-white transition-all group shadow-sm"
        title="Gửi qua Email"
      >
        <span className="material-symbols-outlined text-xl">mail</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-surface-container-high hover:bg-slate-900 hover:text-white'
          }`}
        title="Sao chép đường dẫn"
      >
        <span className="material-symbols-outlined text-xl">
          {copied ? 'done' : 'content_copy'}
        </span>
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
            Đã sao chép!
          </span>
        )}
      </button>

      {/* Zalo Share (Visual Placeholder as Zalo needs specific SDK/API) */}
      <button
        className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center hover:bg-[#0068FF] hover:text-white transition-all group shadow-sm"
        title="Chia sẻ lên Zalo"
      >
        <span className="text-xs font-black">Zalo</span>
      </button>
    </div>
  );
}
