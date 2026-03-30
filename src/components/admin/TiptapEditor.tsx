"use client";

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image as TiptapImage } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { Youtube } from '@tiptap/extension-youtube';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Typography } from '@tiptap/extension-typography';
import { CharacterCount } from '@tiptap/extension-character-count';
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Undo, Redo, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, Grid3X3,
  PlusSquare, Trash2, Video,
  Highlighter, CheckSquare, Subscript as SubIcon,
  Superscript as SupIcon, Palette, Type, Quote, Code,
  HelpCircle, MoreVertical, Link as LinkIcon, Unlink
} from 'lucide-react';

interface TiptapEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  children,
  title,
  disabled = false
}: {
  onClick: () => void,
  isActive?: boolean,
  children: React.ReactNode,
  title?: string,
  disabled?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-2 rounded-lg transition-all flex items-center justify-center disabled:opacity-30 ${isActive
      ? 'bg-primary text-white shadow-glow-primary'
      : 'text-on-surface-variant/60 hover:bg-slate-100 hover:text-on-surface'
      }`}
  >
    {children}
  </button>
);

const Separator = () => <div className="w-px h-6 bg-on-surface/10 mx-1 self-center" />;

export default function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      TiptapImage,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: placeholder || 'Bắt đầu viết nội dung...',
      }),
      Youtube,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Subscript,
      Superscript,
      Typography,
      CharacterCount,
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-slate max-w-none focus:outline-none min-h-[400px] p-8',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="tiptap-editor-container border border-on-surface/10 rounded-2xl bg-white overflow-hidden flex flex-col shadow-sm">
      {/* TOOLBAR */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 p-2 bg-slate-100 border-b border-on-surface/5 backdrop-blur-md bg-opacity-90">
        {/* History */}
        <div className="flex items-center gap-1">
          <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác">
            <Undo size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại">
            <Redo size={16} />
          </MenuButton>
        </div>
        <Separator />
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="In đậm (Ctrl+B)"
          >
            <Bold size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="In nghiêng (Ctrl+I)"
          >
            <Italic size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Gạch chân (Ctrl+U)"
          >
            <UnderlineIcon size={16} />
          </MenuButton>
        </div>

        <Separator />

        {/* Formats */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive('subscript')}
            title="Chỉ số dưới"
          >
            <SubIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive('superscript')}
            title="Chỉ số trên"
          >
            <SupIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive('highlight')}
            title="Tô sáng màu vàng"
          >
            <Highlighter size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => {
              const color = window.prompt('Nhập mã màu HEX (VD: #24e87d):');
              if (color) editor.chain().focus().setColor(color).run();
            }}
            title="Màu chữ"
            isActive={editor.isActive('textStyle', { color: true })}
          >
            <Palette size={16} />
          </MenuButton>
        </div>

        <Separator />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Tiêu đề to (H2)"
          >
            <span className="text-[10px] font-black">H1</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Tiêu đề nhỏ (H3)"
          >
            <span className="text-[10px] font-black">H2</span>
          </MenuButton>
        </div>

        <Separator />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Căn trái"
          >
            <AlignLeft size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Căn giữa"
          >
            <AlignCenter size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Căn phải"
          >
            <AlignRight size={16} />
          </MenuButton>
        </div>

        <Separator />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Danh sách dấu chấm"
          >
            <List size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Danh sách số"
          >
            <ListOrdered size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive('taskList')}
            title="Duyệt kết quả"
          >
            <CheckSquare size={16} />
          </MenuButton>
        </div>

        <Separator />

        {/* Media */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => {
              const url = window.prompt('Nhập URL hình ảnh:');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            title="Chèn ảnh"
          >
            <ImageIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => {
              const url = window.prompt('Nhập URL Youtube:');
              if (url) {
                // @ts-ignore
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
              }
            }}
            title="Chèn Youtube Video"
          >
            <Video size={16} />
          </MenuButton>
        </div>

        <Separator />

        {/* Link */}
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => {
              const url = window.prompt('Nhập URL liên kết:', editor.getAttributes('link').href || '');
              if (url === null) return;
              if (url === '') {
                editor.chain().focus().unsetLink().run();
              } else {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            isActive={editor.isActive('link')}
            title="Gắn liên kết"
          >
            <LinkIcon size={16} />
          </MenuButton>
          {editor.isActive('link') && (
            <MenuButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Gỡ liên kết"
            >
              <Unlink size={16} />
            </MenuButton>
          )}
        </div>

        <Separator />
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            title="Chèn bảng kỹ thuật"
            isActive={editor.isActive('table')}
          >
            <Grid3X3 size={16} />
          </MenuButton>
          {editor.isActive('table') && (
            <div className="flex items-center gap-0.5 ml-1 bg-white/60 p-0.5 rounded-lg border border-on-surface/5 animate-in fade-in zoom-in duration-200">
              <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Thêm cột"><PlusSquare size={14} /></MenuButton>
              <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Thêm hàng"><PlusSquare size={14} className="rotate-90" /></MenuButton>
              <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} title="Xóa bảng"><Trash2 size={14} className="text-red-500" /></MenuButton>
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Stats and Help */}
        <div className="flex items-center gap-2 pr-2">
          <div className="hidden md:flex px-3 py-1 bg-white/50 rounded-full border border-on-surface/5 text-[10px] font-medium text-on-surface-variant/70 items-center gap-2">
            <span>{editor.storage.characterCount.words()} từ</span>
            <div className="w-1 h-1 bg-on-surface/10 rounded-full" />
            <span>{editor.storage.characterCount.characters()} ký tự</span>
          </div>
          <MenuButton onClick={() => window.open('https://tiptap.dev/docs', '_blank')} title="Trợ giúp">
            <HelpCircle size={16} />
          </MenuButton>
        </div>
      </div>

      {/* EDITOR CONTENT */}
      <div className="flex-1 max-h-[700px] overflow-y-auto custom-scrollbar bg-slate-50/10">
        <div className="w-full bg-white min-h-full">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2 bg-slate-100 border-t border-on-surface/5 flex items-center justify-between text-[9px] font-bold text-on-surface-variant/30 uppercase tracking-widest">
        <span>Headless CMS Engine @ Tiptap 2.x</span>
        <span>VILA SANMYSHI Logistics Administrative Workspace</span>
      </div>
    </div>
  );
}
