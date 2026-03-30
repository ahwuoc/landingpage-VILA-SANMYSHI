"use client";

import { createContext, useContext, useState, memo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getHierarchicalIndexes, TableOfContents as TocExtension } from "@tiptap/extension-table-of-contents";
import { TextSelection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";

interface TocItem {
  id: string;
  textContent: string;
  level: number;
  isActive: boolean;
  isScrolledOver: boolean;
}

// Shared context giữa ArticleBody và ArticleToc
const ArticleCtx = createContext<{ editor: Editor | null; items: TocItem[] }>({
  editor: null,
  items: [],
});

// Provider — bọc cả layout content+sidebar
export function ArticleProvider({ content, children }: { content: string; children: React.ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);

  const editor = useEditor({
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
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none text-on-surface-variant leading-relaxed font-medium " +
          "prose-headings:text-on-surface prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase " +
          "prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12 " +
          "prose-p:mb-8 prose-ul:mb-12 prose-li:mb-2 " +
          "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-container-low " +
          "prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic " +
          "prose-blockquote:font-black prose-blockquote:text-on-surface",
      },
    },
  });

  return <ArticleCtx.Provider value={{ editor, items }}>{children}</ArticleCtx.Provider>;
}

// Render nội dung bài viết
export function ArticleBody() {
  const { editor } = useContext(ArticleCtx);
  return <EditorContent editor={editor} />;
}

// Render TOC sidebar
export const ArticleToc = memo(function ArticleToc() {
  const { editor, items } = useContext(ArticleCtx);

  if (!editor || items.length === 0) return null;

  const onItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`) as HTMLElement;
    if (!element) return;

    const pos = editor.view.posAtDOM(element, 0);
    const tr = editor.view.state.tr;
    tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
    editor.view.dispatch(tr);

    if (history.pushState) history.pushState(null, "", `#${id}`);
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 120,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem]">
      <h4 className="text-sm font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">format_list_bulleted</span>
        Các nội dung chính của bài viết
      </h4>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => onItemClick(e, item.id)}
              style={{ paddingLeft: `${(item.level - 2) * 14}px` }}
              className={`flex items-start gap-2 py-1 text-sm leading-snug transition-colors ${
                item.isActive && !item.isScrolledOver
                  ? "text-blue-700 font-bold"
                  : item.isScrolledOver
                  ? "text-blue-400/50"
                  : "text-blue-600/80 hover:text-blue-700"
              }`}
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              {item.textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
