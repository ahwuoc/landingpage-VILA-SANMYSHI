"use client";

import { useState, memo } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getHierarchicalIndexes, TableOfContents as TocExtension } from "@tiptap/extension-table-of-contents";
import { useTranslations } from "next-intl";

interface TocItem {
  id: string;
  textContent: string;
  level: number;
  isActive: boolean;
  isScrolledOver: boolean;
  itemIndex: number;
}

const TocList = memo(function TocList({ items }: { items: TocItem[] }) {
  const t = useTranslations("NewsDetail");
  if (items.length === 0) return null;

  return (
    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem]">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">format_list_bulleted</span>
        {t('toc_title')}
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
              className={`flex items-start gap-2 py-1 text-sm leading-snug transition-colors ${
                item.isActive
                  ? "text-primary font-black uppercase tracking-tight"
                  : item.isScrolledOver
                  ? "text-slate-300 pointer-events-none"
                  : "text-slate-500 hover:text-primary font-bold"
              }`}
            >
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.isActive ? 'bg-primary shadow-glow-primary' : 'bg-slate-200'}`} />
              {item.textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEditor({
    extensions: [
      StarterKit,
      TocExtension.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(anchors) {
          setItems(anchors as TocItem[]);
        },
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return <TocList items={items} />;
}
