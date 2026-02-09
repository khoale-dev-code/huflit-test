import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen } from 'lucide-react';

import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

// Helper function để lấy audio path
const getAudioPath = (examId, partId) => {
  if (!examId || !partId) return null;
  return `/public/data/audio/${examId}/listening/${partId}.mp3`;
};

// ========================================
// HELPER COMPONENT: InfoCard
// ========================================
const InfoCard = memo(({ icon: Icon, label, value, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50',
    purple: 'text-purple-600 bg-purple-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50',
  };

  return (
    <div className="flex items-center gap-2 p-2 md:p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
      <div className={`p-1.5 md:p-2 rounded-lg ${colorMap[color]}`}>
        <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4`} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</p>
        <p className="text-xs md:text-sm font-bold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

// ========================================
// MAIN COMPONENT: Listening Content
// ========================================
const ListeningContent = memo(({ 
  partData, 
  selectedPart,
  testType,
  examId,
  isPartPlayed,
  onAudioStart,    // ← NEW PROP: Called when audio starts
  onAudioEnd,      // ← EXISTING: Called when audio ends
}) => {
  const partNumber = selectedPart.replace('part', '');
  
  // Script extraction logic
  const script = useMemo(() => {
    if (!partData) {
      console.warn('❌ partData is null');
      return '';
    }
    
    console.log('📋 partData keys:', Object.keys(partData));
    
    if (partData.script) {
      console.log('✅ Found script in partData.script');
      return partData.script;
    }
    
    if (partData.text) {
      console.log('✅ Found text in partData.text');
      return partData.text;
    }
    
    if (partData.questions && Array.isArray(partData.questions)) {
      console.log(`📍 Found ${partData.questions.length} questions, extracting scripts...`);
      
      const scripts = partData.questions
        .filter(q => q.script)
        .map(q => q.script)
        .join('\n\n---\n\n');
      
      if (scripts.trim()) {
        console.log('✅ Extracted scripts from questions');
        return scripts;
      }
    }
    
    if (partData.description) {
      console.log('✅ Using description as fallback');
      return partData.description;
    }
    
    console.warn('⚠️ No script found in any property');
    return '';
  }, [partData]);

  // Audio URL - Ưu tiên từ partData, nếu không thì tạo mặc định
  const audioUrl = useMemo(() => {
    if (!examId) return null;
    
    if (partData?.audioUrl) {
      return partData.audioUrl;
    }
    
    return getAudioPath(examId, selectedPart);
  }, [examId, selectedPart, partData]);

  const partTitle = useMemo(() => {
    return partData?.title || `Part ${partNumber} - Phần Nghe`;
  }, [partData, partNumber]);

  if (!script) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl md:rounded-2xl border-2 border-slate-200 p-6 md:p-8 text-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
          <Headphones className="w-7 h-7 md:w-8 md:h-8 text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-base md:text-lg">Chưa có kịch bản</p>
        <p className="text-slate-600 text-sm mt-1 md:mt-2">Kịch bản cho phần này sẽ sớm có</p>
        <p className="text-slate-500 text-xs mt-3">Part: {partNumber}</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full relative z-20">
      <ScriptDisplay 
        script={script}
        audioUrl={audioUrl}
        partTitle={partTitle}
        isPartPlayed={isPartPlayed}              // ← NEW PROP
        onAudioStart={onAudioStart}              // ← NEW PROP
        onAudioEnd={onAudioEnd}                  // ← EXISTING PROP
      />
    </div>
  );
});

ListeningContent.displayName = 'ListeningContent';

// ========================================
// MAIN COMPONENT: Empty State
// ========================================
const EmptyState = memo(({ type = 'no-part' }) => {
  const states = {
    'no-part': {
      icon: AlertCircle,
      iconColor: 'text-slate-400',
      bgColor: 'from-slate-50 to-white',
      borderColor: 'border-slate-200',
      title: 'Chọn Part để bắt đầu',
      description: 'Vui lòng chọn một phần thi từ danh sách trên'
    },
    'no-content': {
      icon: FileText,
      iconColor: 'text-amber-600',
      bgColor: 'from-amber-50 to-white',
      borderColor: 'border-amber-200',
      title: 'Không có nội dung',
      description: 'Nội dung cho phần này chưa được tải hoặc cập nhật'
    }
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className={`bg-gradient-to-br ${state.bgColor} rounded-xl md:rounded-2xl border-2 ${state.borderColor} p-6 md:p-12 animate-in fade-in duration-300 w-full`}>
      <div className="text-center py-8 md:py-12">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm">
          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${state.iconColor}`} strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-lg md:text-xl mb-1 md:mb-2">
          {state.title}
        </p>
        <p className="text-slate-600 text-sm md:text-base">
          {state.description}
        </p>
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

// ========================================
// MAIN COMPONENT: ContentDisplay
// ========================================
/**
 * ContentDisplay Component
 * 
 * Props:
 * - partData: Object - Dữ liệu của phần thi
 * - selectedPart: String - Phần được chọn (e.g., 'part1', 'part5')
 * - currentQuestionIndex: Number - Index câu hỏi hiện tại
 * - testType: String - Loại thi ('listening' hoặc 'reading')
 * - examId: String - ID đề thi
 * - isPartPlayed: Boolean - Có nghe xong audio phần này chưa
 * - onAudioStart: Function - Callback khi audio bắt đầu phát
 * - onAudioEnd: Function - Callback khi audio kết thúc
 */
const ContentDisplay = memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  examId,
  isPartPlayed,        // ← NEW PROP
  onAudioStart,        // ← NEW PROP: Callback when audio starts
  onAudioEnd,          // ← EXISTING: Callback when audio ends
}) => {
  
  // Extract content
  const content = useMemo(() => {
    if (!partData) return '';

    if (testType === 'listening') {
      if (partData.script) {
        return partData.script;
      }
      if (partData.text) {
        return partData.text;
      }
      if (partData.questions && Array.isArray(partData.questions)) {
        const scripts = partData.questions
          .filter(q => q.script)
          .map(q => q.script)
          .join('\n\n');
        return scripts;
      }
      return '';
    }
    
    return partData.text || '';
  }, [partData, testType]);

  // CASE 1: Hide for reading part 5
  if (testType === 'reading' && selectedPart === 'part5') {
    return null;
  }

  // CASE 2: No part data
  if (!partData) {
    return <EmptyState type="no-part" />;
  }

  // CASE 3: No content
  if (!content.trim()) {
    return <EmptyState type="no-content" />;
  }

  // ========================================
  // RENDER: READING PARTS
  // ========================================
  if (testType === 'reading') {
    return (
      <ReadingDisplay data={partData} />
    );
  }

  // ========================================
  // RENDER: LISTENING PARTS
  // ========================================
  if (testType === 'listening') {
    return (
      <ListeningContent 
        partData={partData}
        selectedPart={selectedPart}
        testType={testType}
        examId={examId}
        isPartPlayed={isPartPlayed}              // ← PASS NEW PROP
        onAudioStart={onAudioStart}              // ← PASS NEW PROP
        onAudioEnd={onAudioEnd}                  // ← PASS EXISTING PROP
      />
    );
  }

  return null;
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;