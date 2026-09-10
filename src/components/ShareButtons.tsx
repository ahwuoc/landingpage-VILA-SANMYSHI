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
    <div className="mt-20 flex flex-wrap items-center gap-3 border-t border-brand-200 pt-10">
      <span className="mr-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Chia sẻ bài viết:</span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200 bg-white transition-colors hover:border-primary hover:bg-primary hover:text-white"
        title="Chia sẻ lên Facebook"
      >
        <span className="text-xl font-bold">f</span>
      </a>

      {/* Email Share */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
        className="group flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200 bg-white transition-colors hover:border-primary hover:bg-primary hover:text-white"
        title="Gửi qua Email"
      >
        <span className="material-symbols-outlined text-xl">mail</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${copied ? 'border-primary bg-primary text-white' : 'border-brand-200 bg-white hover:border-brand-900 hover:bg-brand-900 hover:text-white'
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
        className="group flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200 bg-white transition-colors hover:border-primary hover:bg-primary hover:text-white"
        title="Chia sẻ lên Zalo"
      >
        <span className="text-xs font-black">Zalo</span>
      </button>
    </div>
  );
}
