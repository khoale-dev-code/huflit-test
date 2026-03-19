import React, { useCallback, useRef, useState, useEffect } from 'react';

// ─── TIPTAP CORE & EXTENSIONS ───
import { useEditor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Highlight } from '@tiptap/extension-highlight';

import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

// ─── ICONS ───
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, 
  List, ListOrdered, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, 
  Loader2, Trash2, Palette, Highlighter, ChevronDown, AlertCircle,
  Table as TableIcon, Columns, Rows, Combine, ArrowLeftToLine, ArrowRightToLine, 
  ArrowUpToLine, ArrowDownToLine, Trash
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// ─── SERVICES ───
import { uploadImage } from '../../services/examService'; 

/* ==============================================================================
   CUSTOM EXTENSION: Font Size
   ============================================================================== */
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
          renderHTML: attributes => {
            if (!attributes.fontSize) return {};
            return { style: `font-size: ${attributes.fontSize}` };
          },
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).run(),
    };
  },
});

/* ==============================================================================
   CONSTANTS & CONFIG
   ============================================================================== */
const EDITOR_STYLES = `
  prose prose-slate max-w-none focus:outline-none min-h-[400px] p-6 sm:p-8 
  font-nunito font-bold text-slate-700 text-[17px] leading-[1.8] 
  [&_h1]:text-[32px] [&_h1]:font-black [&_h1]:text-[#1CB0F6] [&_h1]:leading-tight [&_h1]:mb-6 
  [&_h2]:text-[26px] [&_h2]:font-black [&_h2]:text-slate-800 [&_h2]:border-b-4 [&_h2]:border-slate-100 [&_h2]:pb-2 [&_h2]:mt-10 [&_h2]:mb-5 
  [&_ul]:list-disc [&_ol]:list-decimal [&_li]:marker:text-[#1CB0F6] [&_li]:mb-2
  
  /* 🎨 STYLE CHO TABLE GAMIFICATION */
  [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border-2 [&_table]:border-[#BAE3FB] [&_table]:shadow-sm
  [&_th]:border-2 [&_th]:border-[#BAE3FB] [&_th]:bg-[#EAF6FE] [&_th]:text-[#1CB0F6] [&_th]:font-black [&_th]:p-3 [&_th]:text-left
  [&_td]:border-2 [&_td]:border-slate-200 [&_td]:p-3 [&_td]:relative
  [&_td.selectedCell]:bg-blue-100/50
  
  /* Style chuẩn cho TipTap Placeholder */
  [&_p.is-editor-empty:first-child::before]:text-slate-300 
  [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] 
  [&_p.is-editor-empty:first-child::before]:float-left 
  [&_p.is-editor-empty:first-child::before]:h-0 
  [&_p.is-editor-empty:first-child::before]:pointer-events-none
`.replace(/\s+/g, ' ').trim();

const ToolbarButton = ({ onClick, isActive, disabled, children, title, className = '' }) => (
  <button
    type="button" title={title} onClick={onClick} disabled={disabled}
    className={`h-11 rounded-xl flex items-center justify-center border-2 transition-all outline-none shrink-0 ${
      isActive 
        ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#1CB0F6] border-b-2 translate-y-[2px] shadow-inner' 
        : 'bg-white text-slate-500 border-slate-200 border-b-[4px] hover:bg-slate-50 hover:text-slate-700 active:border-b-2 active:translate-y-[2px]'
    } ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
  >
    {children}
  </button>
);

/* ==============================================================================
   MAIN COMPONENT: GamifiedEditor
   ============================================================================== */
const GamifiedEditor = ({ value, onChange, placeholder = "Viết nội dung bài giảng tại đây..." }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [editorError, setEditorError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editorError) {
      const timer = setTimeout(() => setEditorError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [editorError]);

  const uploadFileToEditor = useCallback(async (file, coordinates = null, currentEditor) => {
    if (!file || !currentEditor) return;
    setIsUploading(true);
    setEditorError('');
    try {
      const result = await uploadImage(file, 'new', 'lesson_content');
      
      if (coordinates) {
        currentEditor.chain().focus().insertContentAt(coordinates.pos, {
          type: 'image',
          attrs: { src: result.url }
        }).run();
      } else {
        currentEditor.chain().focus().setImage({ src: result.url }).run();
      }
    } catch {
      setEditorError('Lỗi khi chèn ảnh vào nội dung bài viết!');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit, TextStyle, Color, FontFamily, FontSize,
      Highlight.configure({ multicolor: true }), 
      Placeholder.configure({ placeholder }), 
      Table.configure({ resizable: true }), // Bật tính năng kéo dãn cột
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        HTMLAttributes: { class: 'rounded-2xl border-2 border-slate-200 shadow-sm max-w-full h-auto my-5 mx-auto block' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[#1CB0F6] underline font-extrabold cursor-pointer' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: EDITOR_STYLES },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        if (imageItem) {
          const file = imageItem.getAsFile();
          if (file) {
            event.preventDefault(); 
            uploadFileToEditor(file, null, editor);
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault(); 
            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
            uploadFileToEditor(file, coordinates, editor);
            return true;
          }
        }
        return false;
      }
    },
  });

  const handleInsertImageBtn = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      uploadFileToEditor(file, null, editor);
      e.target.value = ''; 
    }
  }, [editor, uploadFileToEditor]);

  if (!editor) return null;

  return (
    <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm flex flex-col relative overflow-hidden">
      
      <AnimatePresence>
        {isUploading && (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-[28px]">
            <Loader2 size={36} strokeWidth={3} className="text-[#1CB0F6] animate-spin mb-3" />
            <span className="font-nunito font-black text-[14px] text-[#1CB0F6] uppercase tracking-widest">Đang tải ảnh lên...</span>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-wrap gap-2.5 p-4 sm:p-5 bg-slate-50 border-b-2 border-slate-200 relative z-10">
        
        {/* Các tuỳ chọn cơ bản: Font, Cỡ chữ, Căn lề... */}
        <div className="relative flex items-center shrink-0">
          <select onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()} value={editor.getAttributes('textStyle').fontFamily || ''} className="h-11 pl-4 pr-9 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl text-[14px] font-nunito font-black text-slate-600 outline-none appearance-none hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer shadow-sm w-36">
            <option value="">Font mặc định</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier</option>
            <option value="'Baloo 2', cursive">Baloo 2</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" strokeWidth={3} />
        </div>

        <div className="relative flex items-center shrink-0">
          <select onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()} value={editor.getAttributes('textStyle').fontSize || ''} className="h-11 pl-4 pr-9 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl text-[14px] font-nunito font-black text-slate-600 outline-none appearance-none hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer shadow-sm w-[110px]">
            <option value="">Cỡ chuẩn</option>
            <option value="12px">Nhỏ (12px)</option>
            <option value="14px">Vừa (14px)</option>
            <option value="18px">Lớn (18px)</option>
            <option value="24px">Rất lớn (24)</option>
            <option value="32px">Khổng lồ (32)</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" strokeWidth={3} />
        </div>

        <div className="w-1 h-9 bg-slate-200 rounded-full mx-0.5 self-center hidden lg:block" />

        <div className="flex gap-2.5">
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Căn trái"><AlignLeft size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Căn giữa"><AlignCenter size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Căn phải"><AlignRight size={20} strokeWidth={3} /></ToolbarButton>
        </div>

        <div className="w-1 h-9 bg-slate-200 rounded-full mx-0.5 self-center hidden xl:block" />

        <div className="flex gap-2.5">
          <div className="relative group w-11 h-11" title="Màu chữ">
            <ToolbarButton className="w-full h-full pointer-events-none" isActive={editor.isActive('textStyle', { color: editor.getAttributes('textStyle').color })}>
              <Palette size={20} strokeWidth={3} style={{ color: editor.getAttributes('textStyle').color || '#64748B' }} />
            </ToolbarButton>
            <input type="color" onInput={event => editor.chain().focus().setColor(event.target.value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>

          <div className="relative group w-11 h-11" title="Màu bôi nền (Highlight)">
            <ToolbarButton className="w-full h-full pointer-events-none" isActive={editor.isActive('highlight')}>
              <Highlighter size={20} strokeWidth={3} style={{ color: editor.getAttributes('highlight').color || '#64748B' }} />
            </ToolbarButton>
            <input type="color" onInput={event => editor.chain().focus().setHighlight({ color: event.target.value }).run()} value={editor.getAttributes('highlight').color || '#ffff00'} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>
        </div>

        <div className="w-full xl:hidden h-px bg-slate-200 my-1" />

        <div className="flex gap-2.5 flex-wrap">
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Tiêu đề chính (H1)"><Heading1 size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Tiêu đề phụ (H2)"><Heading2 size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="In đậm"><Bold size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="In nghiêng"><Italic size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Gạch ngang"><Strikethrough size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Danh sách chấm"><List size={20} strokeWidth={3} /></ToolbarButton>
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Danh sách số"><ListOrdered size={20} strokeWidth={3} /></ToolbarButton>
        </div>

        <div className="w-1 h-9 bg-slate-200 rounded-full mx-0.5 self-center hidden sm:block" />

        <div className="flex gap-2.5 ml-auto sm:ml-0">
          {/* ✅ NÚT THÊM BẢNG */}
          <ToolbarButton className="w-11" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} isActive={editor.isActive('table')} title="Chèn Bảng (Table)">
            <TableIcon size={20} strokeWidth={3} className={editor.isActive('table') ? "text-[#1CB0F6]" : "text-slate-500"} />
          </ToolbarButton>

          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleInsertImageBtn} className="hidden" />
          <ToolbarButton className="w-11" onClick={() => fileInputRef.current?.click()} isActive={false} title="Chèn hình ảnh từ máy tính">
            <ImageIcon size={20} strokeWidth={3} className="text-[#58CC02]" />
          </ToolbarButton>
          
          {editor.isActive('image') && (
             <ToolbarButton className="w-11 bg-[#FFF0F0] border-[#ffd6d6] text-[#FF4B4B]" onClick={() => editor.chain().focus().deleteSelection().run()} isActive={false} title="Xóa ảnh đang chọn">
               <Trash2 size={20} strokeWidth={3} />
             </ToolbarButton>
          )}
        </div>
      </div>

      {/* ✅ BÍ QUYẾT: CONTEXTUAL TOOLBAR CHỈ HIỆN KHI BẤM VÀO BẢNG */}
      <AnimatePresence>
        {editor.isActive('table') && (
          <Motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="bg-[#EAF6FE] border-b-2 border-[#BAE3FB] px-5 py-2.5 flex items-center gap-2 flex-wrap"
          >
            <span className="font-nunito font-black text-[12px] text-[#1CB0F6] uppercase tracking-widest mr-2">Công cụ Bảng:</span>
            
            {/* Chèn cột/dòng */}
            <ToolbarButton className="w-9 h-9 rounded-lg" onClick={() => editor.chain().focus().addColumnBefore().run()} title="Thêm cột bên trái"><ArrowLeftToLine size={16} strokeWidth={3} /></ToolbarButton>
            <ToolbarButton className="w-9 h-9 rounded-lg" onClick={() => editor.chain().focus().addColumnAfter().run()} title="Thêm cột bên phải"><ArrowRightToLine size={16} strokeWidth={3} /></ToolbarButton>
            <ToolbarButton className="w-9 h-9 rounded-lg bg-[#FFF0F0] border-[#ffd6d6] text-[#FF4B4B]" onClick={() => editor.chain().focus().deleteColumn().run()} title="Xóa cột hiện tại"><Columns size={16} strokeWidth={3} className="mb-0.5" /><Trash size={12} strokeWidth={4} className="absolute bottom-1 right-1" /></ToolbarButton>
            
            <div className="w-px h-6 bg-[#BAE3FB] mx-1" />

            <ToolbarButton className="w-9 h-9 rounded-lg" onClick={() => editor.chain().focus().addRowBefore().run()} title="Thêm dòng bên trên"><ArrowUpToLine size={16} strokeWidth={3} /></ToolbarButton>
            <ToolbarButton className="w-9 h-9 rounded-lg" onClick={() => editor.chain().focus().addRowAfter().run()} title="Thêm dòng bên dưới"><ArrowDownToLine size={16} strokeWidth={3} /></ToolbarButton>
            <ToolbarButton className="w-9 h-9 rounded-lg bg-[#FFF0F0] border-[#ffd6d6] text-[#FF4B4B]" onClick={() => editor.chain().focus().deleteRow().run()} title="Xóa dòng hiện tại"><Rows size={16} strokeWidth={3} className="mb-0.5" /><Trash size={12} strokeWidth={4} className="absolute bottom-1 right-1" /></ToolbarButton>
            
            <div className="w-px h-6 bg-[#BAE3FB] mx-1" />
            
            {/* Gộp ô & Xóa bảng */}
            <ToolbarButton className="w-9 h-9 rounded-lg" onClick={() => editor.chain().focus().mergeCells().run()} title="Gộp các ô đã chọn (Quét khối để gộp)"><Combine size={16} strokeWidth={3} /></ToolbarButton>
            <ToolbarButton className="w-9 h-9 rounded-lg bg-[#FF4B4B] border-[#c93535] text-white hover:bg-[#d93535] hover:text-white" onClick={() => editor.chain().focus().deleteTable().run()} title="Xóa toàn bộ bảng"><Trash2 size={16} strokeWidth={3} /></ToolbarButton>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editorError && (
          <Motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="bg-[#FFF0F0] px-5 py-2.5 flex items-center gap-2 text-[13px] font-bold text-[#FF4B4B] border-b-2 border-[#ffd6d6] shadow-inner">
            <AlertCircle size={16} strokeWidth={3} /> {editorError}
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white relative" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} className="relative z-10" />
      </div>
    </div>
  );
};

export default GamifiedEditor;