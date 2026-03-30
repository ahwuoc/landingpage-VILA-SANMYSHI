"use client";

import { useState, memo } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getHierarchicalIndexes, TableOfContents as TocExtension } from "@tiptap/extension-table-of-contents";

interface TocItem {
  id: string;
  textContent: string;
  level: number;
  isActive: boolean;
  isScrolledOver: boolean;
  itemIndex: number;
}

const TocList = memo(function TocList({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem]">
      <h4 className="text-sm font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">format_list_bulleted</span>
        Các nội dung chính của bài viết
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
                  ? "text-blue-700 font-bold"
                  : item.isScrolledOver
                  ? "text-blue-400/60"
                  : "text-blue-600/80 hover:text-blue-700"
              }`}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
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
