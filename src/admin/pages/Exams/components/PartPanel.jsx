// src/admin/pages/Exams/components/PartPanel.jsx
import React, { useState, useRef } from 'react';
import {
  ChevronDown, ChevronRight, Headphones, BookOpen,
  Music, Upload, Trash2, Plus, PenTool, Mic
} from 'lucide-react';
import { QuestionItem, AddQuestionForm } from './QuestionItem';

// ─── Cấu hình linh hoạt cho từng loại Part ─────────────────────────
const TYPE_CONFIG = {
  listening: { 
    icon: Headphones, color: 'text-blue-600', bg: 'bg-blue-100', badge: 'bg-blue-100 text-blue-700', 
    label: 'LISTENING', textLabel: 'Script / Transcript', hasAudio: true, hasText: true 
  },
  reading: { 
    icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-100', badge: 'bg-amber-100 text-amber-700', 
    label: 'READING', textLabel: 'Nội dung đoạn văn / Email / Bài đọc', hasAudio: false, hasText: true 
  },
  writing: { 
    icon: PenTool, color: 'text-emerald-600', bg: 'bg-emerald-100', badge: 'bg-emerald-100 text-emerald-700', 
    label: 'WRITING', textLabel: 'Đề bài (Writing Prompt)', hasAudio: false, hasText: true 
  },
  speaking: { 
    icon: Mic, color: 'text-purple-600', bg: 'bg-purple-100', badge: 'bg-purple-100 text-purple-700', 
    label: 'SPEAKING', textLabel: 'Đề bài / Script (Speaking Prompt)', hasAudio: true, hasText: true 
  },
};

// ─── AudioUploader ─────────────────────────────────────────────────
const AudioUploader = ({ part, partId, onUpload, onDelete, progress }) => {
  const fileRef = useRef();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(partId, file);
    e.target.value = '';
  };

  if (part.audioUrl) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Music className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{part.audioName}</p>
            <p className="text-xs text-green-600 font-medium mt-0.5">✓ Đã tải lên thành công</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            Đổi file
          </button>
          <button
            onClick={() => onDelete(partId, part.audioStoragePath)}
            className="p-2 text-red-400 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleChange} />
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => progress === undefined && fileRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-300 hover:bg-blue-50/10 transition-colors cursor-pointer"
      >
        {progress !== undefined ? (
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span className="font-medium">Đang tải lên...</span>
              <span className="font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-300 mb-3" />
            <p className="text-sm font-bold text-gray-700">
              Kéo thả hoặc <span className="text-blue-600">chọn tệp</span>
            </p>
            <p className="text-xs text-gray-400 mt-1 uppercase font-medium">MP3, WAV tối đa 50MB</p>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleChange} />
    </>
  );
};

// ─── PartPanel (accordion) ─────────────────────────────────────────
const PartPanel = ({
  partId, part,
  isExpanded, onToggle,
  onUpdatePart, onAddQuestion, onRemoveQuestion,
  onUpdateQuestion,
  onAudioUpload, onAudioDelete,
  uploadProgress,
}) => {
  const [showAddQ, setShowAddQ] = useState(false);
  
  // Lấy cấu hình dựa trên part.type, mặc định fallback về reading nếu không tìm thấy
  const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
  const Icon = config.icon;
  const qCount = part.questions?.length ?? 0;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${isExpanded ? 'border-blue-200 shadow-sm' : 'border-gray-100'}`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${isExpanded ? 'bg-slate-50' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
          <Icon className={`w-4 h-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{part.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {qCount} câu hỏi
            {config.hasAudio && part.audioName && ` · 🎧 ${part.audioName}`}
            {config.hasText && part.text && ` · 📄 ${part.text.length} ký tự`}
          </p>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${config.badge}`}>
          {config.label}
        </span>
        {isExpanded
          ? <ChevronDown  className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>

      {/* Body */}
      {isExpanded && (
        <div className="p-5 border-t border-gray-100 space-y-5 bg-white">

          {/* Part title */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Tiêu đề phần thi</label>
            <input
              value={part.title ?? ''}
              onChange={e => onUpdatePart(partId, { title: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              placeholder="VD: PART 1: Short Conversations"
            />
          </div>

          {/* Instruction */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Hướng dẫn / Yêu cầu</label>
            <input
              value={part.description ?? part.instruction ?? ''}
              onChange={e => onUpdatePart(partId, { description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Mô tả ngắn hoặc yêu cầu bài làm..."
            />
          </div>

          {/* Audio Section (Hiển thị nếu loại part có audio) */}
          {config.hasAudio && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-blue-600" />
                <label className="text-xs font-bold text-gray-700">File âm thanh</label>
              </div>
              <AudioUploader
                part={part} partId={partId}
                onUpload={onAudioUpload} onDelete={onAudioDelete}
                progress={uploadProgress[partId]}
              />
            </div>
          )}

          {/* Text Section (Hiển thị nếu loại part có text) */}
          {config.hasText && (
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">
                {config.textLabel}
              </label>
              <textarea
                value={part.text ?? part.script ?? ''}
                onChange={e => onUpdatePart(partId, { text: e.target.value, script: e.target.value })}
                rows={6}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-y"
                placeholder="Nhập nội dung vào đây..."
              />
            </div>
          )}

          {/* Questions Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-gray-700">Câu hỏi ({qCount})</label>
              {!showAddQ && (
                <button
                  onClick={() => setShowAddQ(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
                </button>
              )}
            </div>
            <div className="space-y-3">
              {(part.questions ?? []).map((q, i) => (
                <QuestionItem
                  key={q.id} question={q} index={i}
                  onRemove={qid => onRemoveQuestion(partId, qid)}
                  onUpdate={updates => onUpdateQuestion && onUpdateQuestion(partId, q.id, updates)} 
                />
              ))}

              {showAddQ && (
                <AddQuestionForm
                  onAdd={q => { onAddQuestion(partId, q); setShowAddQ(false); }}
                  onCancel={() => setShowAddQ(false)}
                />
              )}

              {!showAddQ && (
                <button
                  onClick={() => setShowAddQ(true)}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Thêm câu hỏi mới
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default PartPanel;