import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen, Zap, Target, Clock, BarChart3 } from 'lucide-react';

// Import các component con
import Part6Display from './ReadingPart6Display';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
      <div className={`p-2 rounded-lg ${colorMap[color]}`}>
        <Icon className={`w-4 h-4`} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-900 truncate">{value}</p>
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
  testType
}) => {
  const partNumber = selectedPart.replace('part', '');
  
  // ✅ IMPROVED: Multiple fallbacks for script extraction
  const script = useMemo(() => {
    if (!partData) {
      console.warn('❌ partData is null');
      return '';
    }
    
    console.log('📋 partData keys:', Object.keys(partData));
    
    // 1️⃣ Try direct script property
    if (partData.script) {
      console.log('✅ Found script in partData.script');
      return partData.script;
    }
    
    // 2️⃣ Try text property (fallback)
    if (partData.text) {
      console.log('✅ Found text in partData.text');
      return partData.text;
    }
    
    // 3️⃣ Try extracting from questions
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
    
    // 4️⃣ Try description as fallback
    if (partData.description) {
      console.log('✅ Using description as fallback');
      return partData.description;
    }
    
    console.warn('⚠️ No script found in any property');
    return '';
  }, [partData]);

  const partTitle = useMemo(() => {
    return partData?.title || `Part ${partNumber} - Phần Nghe`;
  }, [partData, partNumber]);

  if (!script) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 p-8 text-center">
        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Headphones className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-lg">Chưa có kịch bản</p>
        <p className="text-slate-600 text-sm mt-2">Kịch bản cho phần này sẽ sớm có</p>
        <p className="text-slate-500 text-xs mt-4">Part: {partNumber}</p>
      </div>
    );
  }

  return (
  <div className="animate-in fade-in duration-300 w-full relative z-20">
      <ScriptDisplay 
        script={script}
        partTitle={partTitle}
        showByDefault={true}
      />
    </div>
  );
});

ListeningContent.displayName = 'ListeningContent';

// ========================================
// MAIN COMPONENT: Reading Content
// ========================================
const ReadingContent = memo(({ partData, content, selectedPart }) => {
  const partNumber = selectedPart.replace('part', '');
  
  const readingTime = useMemo(() => {
    return Math.ceil(content.length / 1250);
  }, [content.length]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full">
      
      {/* ===== READING SECTION HEADER ===== */}
      <div className="flex items-center gap-3 px-1">
        <div className="p-2.5 rounded-lg bg-emerald-100">
          <BookOpen className="w-5 h-5 text-emerald-700" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Phần Đọc</h2>
          <p className="text-sm text-slate-500 mt-0.5">Part {partNumber}</p>
        </div>
      </div>

      {/* ===== INFO PANEL ===== */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-emerald-700" strokeWidth={2} />
          <p className="text-sm font-bold text-emerald-900 uppercase tracking-wider">Thông tin</p>
        </div>
        <div className="space-y-2">
          <InfoCard 
            icon={Target} 
            label="Part" 
            value={partNumber}
            color="indigo"
          />
          <InfoCard 
            icon={FileText} 
            label="Độ dài" 
            value={`${content.length} ký tự`}
            color="amber"
          />
          <InfoCard 
            icon={Clock} 
            label="Thời gian dự tính" 
            value={`~${readingTime} phút`}
            color="emerald"
          />
        </div>
      </div>

      {/* ===== READING CONTENT ===== */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Nội dung</p>
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-visible w-full">
          
          {/* Content Title Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <p className="text-sm font-bold text-slate-900">
              {partData.title || `Nội dung Part ${partNumber}`}
            </p>
          </div>

          {/* Text Container */}
          <div className="p-6 max-h-[40rem] overflow-y-auto">
            <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-800 break-words font-medium">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ReadingContent.displayName = 'ReadingContent';

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
    <div className={`bg-gradient-to-br ${state.bgColor} rounded-2xl border-2 ${state.borderColor} p-8 sm:p-12 animate-in fade-in duration-300 w-full`}>
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Icon className={`w-10 h-10 ${state.iconColor}`} strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-xl mb-2">
          {state.title}
        </p>
        <p className="text-slate-600 text-base">
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
const ContentDisplay = memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  onPlayScript = null,
  isPlayingScript = false
}) => {
  
  // ===== EXTRACT CONTENT =====
  const content = useMemo(() => {
    if (!partData) return '';

    if (testType === 'listening') {
      // Cho phần nghe, lấy script từ partData
      if (partData.script) {
        return partData.script;
      }
      // Hoặc từ text
      if (partData.text) {
        return partData.text;
      }
      // Hoặc từ questions nếu partData không có script chung
      if (partData.questions && Array.isArray(partData.questions)) {
        const scripts = partData.questions
          .filter(q => q.script)
          .map(q => q.script)
          .join('\n\n');
        return scripts;
      }
      return '';
    }
    
    // Cho phần đọc
    return partData.text || '';
  }, [partData, testType]);

  // ===== CASE 1: HIDE FOR READING PART 5 =====
  if (testType === 'reading' && selectedPart === 'part5') {
    return null;
  }

  // ===== CASE 2: NO PART DATA =====
  if (!partData) {
    return <EmptyState type="no-part" />;
  }

  // ===== CASE 3: NO CONTENT =====
  if (!content.trim()) {
    return <EmptyState type="no-content" />;
  }

  // ========================================
  // RENDER: READING PARTS (Special Cases)
  // ========================================
  if (testType === 'reading') {
    
    if (selectedPart === 'part6') {
      return (
        <div className="animate-in fade-in duration-300 overflow-visible w-full">
          <Part6Display part6={partData} />
        </div>
      );
    }

    if (selectedPart === 'part7') {
      return (
        <div className="animate-in fade-in duration-300 overflow-visible w-full">
          <ReadingPart7Display text={content} type="reading" />
        </div>
      );
    }

    if (selectedPart === 'part8') {
      return (
        <div className="animate-in fade-in duration-300 overflow-visible w-full">
          <ReadingPart8Display text={content} type="reading" />
        </div>
      );
    }
    
    // Default Reading Content (Part 1-4)
    return (
      <ReadingContent 
        partData={partData} 
        content={content} 
        selectedPart={selectedPart} 
      />
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
      />
    );
  }

  return null;
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;