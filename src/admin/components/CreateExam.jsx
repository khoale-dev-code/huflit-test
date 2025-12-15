// src/admin/components/CreateExam.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, X, Plus, Trash2, ChevronDown, ChevronUp,
  FileText, Clock, BookOpen, AlertCircle, ArrowLeft,
  Volume2, Eye, ArrowUp, ArrowDown, Settings, BarChart2
} from 'lucide-react';
import { 
  createExam, 
  updateExam, 
  getExamById 
} from '../services/examManagementService'; 

// --- Constants & Helpers ---
const EXAM_TYPES = [
  { value: 'TOEIC', label: 'TOEIC' },
  { value: 'IELTS', label: 'IELTS' },
  { value: 'Grammar', label: 'Ngữ pháp' },
  { value: 'Vocabulary', label: 'Từ vựng' },
  { value: 'custom', label: 'Khác (tạo mới)' },
];

const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Dễ' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'hard', label: 'Khó' },
];

const initialPartState = {
  title: 'PART: Untitled',
  description: '',
  type: 'reading',
  script: '',
  text: '',
  duration: 0, 
  questions: []
};

// --- Component QuestionItem ---
const QuestionItem = ({ partIndex, qIndex, question, handleUpdateQuestion, handleDeleteQuestion }) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="bg-white p-4 rounded-xl border-2 border-amber-100 shadow-sm transition-all hover:shadow-lg hover:border-amber-300">
      <div className="flex items-start justify-between mb-3 border-b-2 border-amber-100 pb-3">
        <span className="font-bold text-lg bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Câu {question.id}
        </span>
        <button
          type="button"
          onClick={() => handleDeleteQuestion(partIndex, qIndex)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Xóa câu hỏi"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nội dung Câu hỏi *
          </label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleUpdateQuestion(partIndex, qIndex, { question: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-amber-50/30"
            placeholder="Nhập câu hỏi..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Các lựa chọn và Đáp án *
          </label>
          <div className="space-y-2">
            {question.options.map((option, optIndex) => (
              <div 
                key={optIndex} 
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  question.correct === optIndex 
                    ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-500 shadow-sm' 
                    : 'bg-gray-50 border-gray-200 hover:border-amber-300'
                }`}
              >
                <input
                  type="radio"
                  name={`correct-${partIndex}-${qIndex}`}
                  checked={question.correct === optIndex}
                  onChange={() => handleUpdateQuestion(partIndex, qIndex, { correct: optIndex })}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  title="Đặt làm đáp án đúng"
                />
                <span className={`font-bold text-sm w-6 ${
                  question.correct === optIndex ? 'text-amber-700' : 'text-gray-600'
                }`}>
                  ({letters[optIndex]})
                </span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[optIndex] = e.target.value;
                    handleUpdateQuestion(partIndex, qIndex, { options: newOptions });
                  }}
                  className="flex-1 px-3 py-1 border-2 border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
                  placeholder={`Lựa chọn ${letters[optIndex]}`}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Giải thích
          </label>
          <textarea
            value={question.explanation}
            onChange={(e) => handleUpdateQuestion(partIndex, qIndex, { explanation: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all bg-amber-50/30"
            rows="2"
            placeholder="Giải thích chi tiết đáp án..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Script cho câu hỏi này (Listening)
          </label>
          <textarea
            value={question.script || ''}
            onChange={(e) => handleUpdateQuestion(partIndex, qIndex, { script: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono transition-all bg-amber-50/30"
            rows="2"
            placeholder="(Tuỳ chọn) Script âm thanh cho câu hỏi này..."
          />
        </div>
      </div>
    </div>
  );
};

// --- Component PartItem ---
const PartItem = ({ part, partIndex, expanded, toggleExpansion, handleUpdatePart, handleDeletePart, handleMovePart, handleAddQuestion, handleUpdateQuestion, handleDeleteQuestion, totalParts }) => {
  const isListening = part.type === 'listening';
  const isReading = part.type === 'reading';

  return (
    <div className="border-2 border-amber-200 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md hover:shadow-lg transition-all">
      {/* Part Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-amber-400 to-yellow-400 rounded-t-xl hover:from-amber-500 hover:to-yellow-500 transition-all"
        onClick={() => toggleExpansion(partIndex)}
      >
        <div className="flex items-center gap-3">
          <span className="p-2 bg-white/30 text-amber-900 rounded-full">
            {isListening ? <Volume2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </span>
          <div>
            <h3 className="font-bold text-xl text-amber-900">{part.title}</h3>
            <p className="text-sm text-amber-800 mt-0.5">
              {part.questions?.length || 0} câu • {isListening ? '🎧 Listening' : '📖 Reading'} • {part.duration || 0} phút
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleMovePart(partIndex, 'up'); }}
            disabled={partIndex === 0}
            className="p-2 hover:bg-white/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Di chuyển lên"
          >
            <ArrowUp className="w-4 h-4 text-amber-900" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleMovePart(partIndex, 'down'); }}
            disabled={partIndex === totalParts - 1}
            className="p-2 hover:bg-white/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Di chuyển xuống"
          >
            <ArrowDown className="w-4 h-4 text-amber-900" />
          </button>
          
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleDeletePart(partIndex); }}
            className="p-2 hover:bg-red-200/50 rounded-full transition-colors"
            title="Xóa phần thi"
          >
            <Trash2 className="w-4 h-4 text-red-700" />
          </button>
          
          <button type="button" className="p-2 text-amber-900 hover:text-amber-950">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Part Content */}
      {expanded && (
        <div className="p-6 border-t-2 border-amber-200 space-y-6 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-b-xl">
          {/* Part Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề phần *</label>
              <input
                type="text"
                value={part.title}
                onChange={(e) => handleUpdatePart(partIndex, { title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Loại *</label>
              <select
                value={part.type}
                onChange={(e) => handleUpdatePart(partIndex, { type: e.target.value, script: '', text: '' })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
              >
                <option value="listening">🎧 Listening</option>
                <option value="reading">📖 Reading</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Thời gian (phút)</label>
              <input
                type="number"
                value={part.duration || 0}
                onChange={(e) => handleUpdatePart(partIndex, { duration: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả hướng dẫn</label>
            <textarea
              value={part.description}
              onChange={(e) => handleUpdatePart(partIndex, { description: e.target.value })}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all bg-white"
              rows="2"
              placeholder="Mô tả hoặc hướng dẫn cho phần thi này..."
            />
          </div>

          {/* Media/Text Content */}
          <div className="p-4 bg-white border-2 border-dashed border-amber-300 rounded-xl">
            <h4 className="font-bold text-md text-amber-900 mb-3 flex items-center gap-2">
              {isListening ? <Volume2 className="w-5 h-5 text-amber-600" /> : <FileText className="w-5 h-5 text-amber-600" />}
              {isListening ? '🎧 Script âm thanh' : '📖 Văn bản đọc'} *
            </h4>
            
            <textarea
              value={isListening ? part.script || '' : part.text || ''}
              onChange={(e) => handleUpdatePart(partIndex, { [isListening ? 'script' : 'text']: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm transition-all bg-amber-50/50"
              rows={isListening ? "4" : "6"}
              placeholder={isListening ? "Nhập script nghe tại đây..." : "Nhập văn bản đọc tại đây..."}
              required
            />
            {isListening && <p className="text-xs text-gray-500 mt-2">💡 Script sẽ được hiển thị trong ScriptDisplay</p>}
          </div>

          {/* Questions Section */}
          <div className="border-t-2 border-amber-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg text-amber-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Quản lý Câu hỏi ({part.questions?.length || 0})
              </h4>
              <button
                type="button"
                onClick={() => handleAddQuestion(partIndex)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Thêm câu hỏi
              </button>
            </div>

            {part.questions?.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl border-2 border-dashed border-amber-300">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-amber-400" />
                <p className="text-md text-gray-600">Phần này chưa có câu hỏi. Hãy thêm câu hỏi đầu tiên!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {part.questions?.map((q, qIndex) => (
                  <QuestionItem
                    key={qIndex}
                    partIndex={partIndex}
                    qIndex={qIndex}
                    question={q}
                    handleUpdateQuestion={handleUpdateQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Component CreateExam ---
const CreateExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const isEditMode = !!examId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedParts, setExpandedParts] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'TOEIC',
    customType: '', 
    duration: 120,
    totalQuestions: 0,
    difficulty: 'medium',
    isPublished: false,
    parts: [] 
  });

  const calculateTotals = useCallback((parts) => {
    const totalQuestions = parts.reduce((sum, part) => sum + (part.questions?.length || 0), 0);
    const totalDuration = parts.reduce((sum, part) => sum + (part.duration || 0), 0);
    return { totalQuestions, totalDuration };
  }, []);

  const { totalQuestions, totalDuration } = useMemo(() => calculateTotals(formData.parts), [formData.parts, calculateTotals]);

  // Load Exam Data
  useEffect(() => {
    const loadExam = async () => {
      if (!isEditMode) return;
      
      setLoading(true);
      const result = await getExamById(examId);
      if (result.success) {
        const partsArray = Object.entries(result.exam.parts || {}).map(([key, part], index) => ({
          ...part,
          key: key, 
          questions: part.questions?.map((q, qIndex) => ({ ...q, id: qIndex + 1 })) || []
        }));
        
        const existingType = result.exam.type;
        const isCustomType = !EXAM_TYPES.some(t => t.value === existingType);
        
        setFormData({
          ...result.exam,
          type: isCustomType ? 'custom' : existingType,
          customType: isCustomType ? existingType : '',
          parts: partsArray,
        });

        const expanded = {};
        partsArray.forEach((_, index) => {
          expanded[index] = true;
        });
        setExpandedParts(expanded);
      } else {
        alert('❌ Lỗi khi tải đề thi: ' + result.error);
        navigate('/admin/exams');
      }
      setLoading(false);
    };

    loadExam();
  }, [examId, isEditMode, navigate]);

  // Handlers for main form
  const handleMainFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('❌ Vui lòng nhập tên đề thi');
      return;
    }
    if (formData.type === 'custom' && !formData.customType.trim()) {
      alert('❌ Vui lòng nhập loại đề thi tùy chỉnh');
      return;
    }

    // ✅ Validate script/text trước khi save
    for (let i = 0; i < formData.parts.length; i++) {
      const part = formData.parts[i];
      
      if (part.type === 'listening' && !part.script?.trim()) {
        alert(`❌ Part ${i + 1}: Vui lòng nhập script cho phần Listening`);
        setExpandedParts(prev => ({ ...prev, [i]: true }));
        return;
      }
      
      if (part.type === 'reading' && !part.text?.trim()) {
        alert(`❌ Part ${i + 1}: Vui lòng nhập văn bản cho phần Reading`);
        setExpandedParts(prev => ({ ...prev, [i]: true }));
        return;
      }
      
      if (!part.questions || part.questions.length === 0) {
        alert(`❌ Part ${i + 1}: Vui lòng thêm ít nhất 1 câu hỏi`);
        setExpandedParts(prev => ({ ...prev, [i]: true }));
        return;
      }

      // Validate mỗi câu hỏi
      for (let j = 0; j < part.questions.length; j++) {
        const q = part.questions[j];
        if (!q.question?.trim()) {
          alert(`❌ Part ${i + 1}, Câu ${j + 1}: Vui lòng nhập nội dung câu hỏi`);
          setExpandedParts(prev => ({ ...prev, [i]: true }));
          return;
        }
        if (!q.options || q.options.some(opt => !opt?.trim())) {
          alert(`❌ Part ${i + 1}, Câu ${j + 1}: Vui lòng nhập đầy đủ các lựa chọn`);
          setExpandedParts(prev => ({ ...prev, [i]: true }));
          return;
        }
      }
    }

    const dataToSave = {
      ...formData,
      type: formData.type === 'custom' ? formData.customType : formData.type,
      duration: totalDuration,
      totalQuestions: totalQuestions,
      // ✅ Convert parts array to object
      parts: formData.parts.reduce((obj, part, index) => {
        const partToSave = {
          title: part.title || `Part ${index + 1}`,
          description: part.description || '',
          type: part.type, // ✅ IMPORTANT: 'listening' or 'reading'
          duration: part.duration || 0,
        };

        // ✅ Save script if listening
        if (part.type === 'listening') {
          partToSave.script = part.script || '';
        }
        
        // ✅ Save text if reading
        if (part.type === 'reading') {
          partToSave.text = part.text || '';
        }

        // ✅ Process questions
        partToSave.questions = part.questions.map((q, qIdx) => ({
          id: qIdx + 1,
          question: q.question || '',
          options: q.options || ['', '', '', ''],
          correct: typeof q.correct === 'number' ? q.correct : 0,
          explanation: q.explanation || '',
          script: q.script || ''
        }));

        const partKey = part.key || `part${index + 1}`;
        obj[partKey] = partToSave;
        return obj;
      }, {})
    };

    console.log('📤 Saving exam data:', JSON.stringify(dataToSave, null, 2));

    setSaving(true);
    const result = isEditMode 
      ? await updateExam(examId, dataToSave)
      : await createExam(dataToSave);
    
    if (result.success) {
      alert(isEditMode ? '✅ Cập nhật đề thi thành công!' : '✅ Tạo đề thi thành công!');
      navigate('/admin/exams');
    } else {
      alert('❌ Lỗi: ' + result.error);
      console.error('Save error:', result.error);
    }
    setSaving(false);
  };

  // Handlers for Parts
  const handleAddPart = () => {
    const newPart = {
      ...initialPartState,
      title: `PART ${formData.parts.length + 1}: Untitled`
    };
    
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, newPart]
    }));
    setExpandedParts(prev => ({ ...prev, [formData.parts.length]: true }));
  };

  const handleDeletePart = (partIndex) => {
    if (!window.confirm('❓ Bạn có chắc muốn xóa phần này? Mọi câu hỏi sẽ bị mất.')) return;
    
    setFormData(prev => {
      const newParts = prev.parts.filter((_, i) => i !== partIndex);
      return { ...prev, parts: newParts };
    });
    setExpandedParts(prev => {
      const newExpanded = {};
      Object.keys(prev).forEach(key => {
        const index = parseInt(key);
        if (index < partIndex) {
          newExpanded[index] = prev[key];
        } else if (index > partIndex) {
          newExpanded[index - 1] = prev[key];
        }
      });
      return newExpanded;
    });
  };

  const handleUpdatePart = (partIndex, updates) => {
    setFormData(prev => {
      const updatedParts = [...prev.parts];
      updatedParts[partIndex] = {
        ...updatedParts[partIndex],
        ...updates
      };
      return { ...prev, parts: updatedParts };
    });
  };

  const handleMovePart = (partIndex, direction) => {
    setFormData(prev => {
      const updatedParts = [...prev.parts];
      const newIndex = direction === 'up' ? partIndex - 1 : partIndex + 1;
      
      if (newIndex >= 0 && newIndex < updatedParts.length) {
        [updatedParts[partIndex], updatedParts[newIndex]] = [updatedParts[newIndex], updatedParts[partIndex]];
        
        setExpandedParts(prevExpanded => {
          const newExpanded = { ...prevExpanded };
          newExpanded[partIndex] = prevExpanded[newIndex];
          newExpanded[newIndex] = prevExpanded[partIndex];
          return newExpanded;
        });

        return { ...prev, parts: updatedParts };
      }
      return prev;
    });
  };

  const togglePartExpansion = (partIndex) => {
    setExpandedParts(prev => ({
      ...prev,
      [partIndex]: !prev[partIndex]
    }));
  };

  // Handlers for Questions
  const handleAddQuestion = (partIndex) => {
    const currentPart = formData.parts[partIndex];
    const questionNumber = (currentPart.questions?.length || 0) + 1;
    
    const newQuestion = {
      id: questionNumber,
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: '',
      script: ''
    };

    handleUpdatePart(partIndex, {
      questions: [...(currentPart.questions || []), newQuestion]
    });
  };

  const handleUpdateQuestion = (partIndex, questionIndex, updates) => {
    setFormData(prev => {
      const updatedParts = [...prev.parts];
      const updatedQuestions = [...updatedParts[partIndex].questions];
      
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        ...updates
      };
      
      updatedParts[partIndex] = {
        ...updatedParts[partIndex],
        questions: updatedQuestions
      };
      return { ...prev, parts: updatedParts };
    });
  };

  const handleDeleteQuestion = (partIndex, questionIndex) => {
    if (!window.confirm('❓ Bạn có chắc muốn xóa câu hỏi này?')) return;
    
    setFormData(prev => {
      const updatedParts = [...prev.parts];
      let updatedQuestions = updatedParts[partIndex].questions.filter((_, i) => i !== questionIndex);
      
      updatedQuestions = updatedQuestions.map((q, index) => ({ ...q, id: index + 1 }));
      
      updatedParts[partIndex] = {
        ...updatedParts[partIndex],
        questions: updatedQuestions
      };
      return { ...prev, parts: updatedParts };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-yellow-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-300 border-b-4 border-b-amber-700 mx-auto mb-4"></div>
          <p className="text-lg font-bold text-amber-800">Đang tải dữ liệu đề thi...</p>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
    {/* Header - Sticky Navigation */}
    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 border-b-2 border-amber-600 sticky top-0 z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Top - Title & Navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Back Button & Title */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Back Button */}
            <button
              onClick={() => navigate('/admin/exams')}
              className="flex-shrink-0 p-2.5 text-white hover:bg-amber-600/30 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              title="Quay lại danh sách đề thi"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Title & Stats */}
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white truncate">
                {isEditMode ? '✏️ Chỉnh Sửa Đề Thi' : '➕ Tạo Đề Thi Mới'}
              </h1>
              <p className="text-xs sm:text-sm text-amber-100 mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-bold">{formData.parts.length}</span>
                  <span>phần</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-bold">{totalQuestions}</span>
                  <span>câu</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-bold">{totalDuration}</span>
                  <span>phút</span>
                </span>
              </p>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate('/admin/exams')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-white rounded-lg text-white bg-amber-600/20 hover:bg-amber-700/40 transition-all duration-200 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Hủy</span>
            </button>

            {/* Save/Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-amber-700 font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-xs sm:text-sm"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">
                {saving ? '⏳ Đang lưu...' : (isEditMode ? '💾 Cập nhật' : '💾 Tạo mới')}
              </span>
              <span className="inline sm:hidden">
                {saving ? '⏳' : (isEditMode ? '💾' : '💾')}
              </span>
            </button>
          </div>
        </div>

        {/* Header Bottom - Progress Bar */}
        {formData.parts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-semibold text-white">Tiến độ điền thông tin</span>
              <span className="text-xs sm:text-sm font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">
                {Math.round(((formData.parts.length + totalQuestions) / (formData.parts.length * 5)) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                style={{ width: `${Math.round(((formData.parts.length + totalQuestions) / (formData.parts.length * 5)) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>

  {/* Main Form Content */}
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* ===== SECTION 1: BASIC INFO ===== */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-200 hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-amber-600" />
                  📝 Thông tin cơ bản
                </h2>
                
                <div className="space-y-5">
                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tên đề thi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleMainFormChange('title', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-amber-50/30 placeholder-gray-400"
                      placeholder="Ví dụ: TOEIC Full Test 2024 - Vol. 1"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">Nhập tên dễ nhận biết cho đề thi của bạn</p>
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleMainFormChange('description', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-amber-50/30 placeholder-gray-400 resize-none"
                      rows="4"
                      placeholder="Mô tả mục tiêu, nội dung chính, đối tượng học sinh... của đề thi này"
                    />
                    <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 ký tự</p>
                  </div>
                </div>
              </div>

              {/* ===== SECTION 2: EXAM STRUCTURE ===== */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-amber-900 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                    📚 Cấu trúc Đề thi
                  </h2>
                  <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-amber-900">{formData.parts.length}</span>
                    <span className="text-xs text-amber-800">phần</span>
                  </div>
                </div>

                {formData.parts.length === 0 ? (
                  <div className="text-center py-12 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-dashed border-amber-300 rounded-xl">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-300" />
                    <p className="text-lg font-bold text-amber-900 mb-2">Chưa có phần thi nào</p>
                    <p className="text-sm text-amber-700 mb-4">Bấm nút "Thêm Phần thi" bên dưới để bắt đầu xây dựng nội dung đề thi</p>
                    <button
                      type="button"
                      onClick={handleAddPart}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5" />
                      Thêm Phần thi đầu tiên
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.parts.map((part, partIndex) => (
                      <PartItem
                        key={partIndex}
                        part={part}
                        partIndex={partIndex}
                        expanded={expandedParts[partIndex]}
                        toggleExpansion={togglePartExpansion}
                        handleUpdatePart={handleUpdatePart}
                        handleDeletePart={handleDeletePart}
                        handleMovePart={handleMovePart}
                        handleAddQuestion={handleAddQuestion}
                        handleUpdateQuestion={handleUpdateQuestion}
                        handleDeleteQuestion={handleDeleteQuestion}
                        totalParts={formData.parts.length}
                      />
                    ))}
                    
                    {/* Add More Parts Button */}
                    <button
                      type="button"
                      onClick={handleAddPart}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl mt-6"
                    >
                      <Plus className="w-5 h-5" />
                      Thêm Phần thi
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-[180px] space-y-6">
                
                {/* ===== SETTINGS PANEL ===== */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-200 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-amber-900 mb-5 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-600" />
                    ⚙️ Cài đặt Chung
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Exam Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Loại đề thi <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleMainFormChange('type', e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white font-medium text-gray-700"
                      >
                        {EXAM_TYPES.map(type => (
                          <option key={type.value} value={type.value} className="text-gray-700">
                            {type.label}
                          </option>
                        ))}
                      </select>
                      
                      {formData.type === 'custom' && (
                        <input
                          type="text"
                          value={formData.customType}
                          onChange={(e) => handleMainFormChange('customType', e.target.value)}
                          className="w-full mt-3 px-4 py-2.5 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-amber-50/30 placeholder-gray-400"
                          placeholder="Nhập loại đề thi mới..."
                          required
                        />
                      )}
                    </div>

                    {/* Difficulty Level */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Độ khó <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => handleMainFormChange('difficulty', e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white font-medium text-gray-700"
                      >
                        {DIFFICULTY_LEVELS.map(level => (
                          <option key={level.value} value={level.value} className="text-gray-700">
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Published Toggle */}
                    <div className="bg-amber-50/70 border-2 border-amber-200 rounded-lg p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          id="isPublished"
                          checked={formData.isPublished}
                          onChange={(e) => handleMainFormChange('isPublished', e.target.checked)}
                          className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 border-2 border-amber-300 cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-bold text-amber-900">📢 Xuất bản ngay</p>
                          <p className="text-xs text-amber-700">Cho phép người dùng xem đề thi này</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* ===== STATISTICS PANEL ===== */}
                <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl p-6 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-amber-900 mb-5 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-amber-700" />
                    📊 Thống kê
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Parts Count */}
                    <div className="flex items-center justify-between bg-white/80 p-3 rounded-lg border-2 border-amber-200 hover:border-amber-300 transition-colors">
                      <span className="text-sm font-bold text-amber-800 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Số phần
                      </span>
                      <span className="font-extrabold text-2xl bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        {formData.parts.length}
                      </span>
                    </div>

                    {/* Questions Count */}
                    <div className="flex items-center justify-between bg-white/80 p-3 rounded-lg border-2 border-amber-200 hover:border-amber-300 transition-colors">
                      <span className="text-sm font-bold text-amber-800 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Tổng câu hỏi
                      </span>
                      <span className="font-extrabold text-2xl bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        {totalQuestions}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between bg-white/80 p-3 rounded-lg border-2 border-amber-200 hover:border-amber-300 transition-colors">
                      <span className="text-sm font-bold text-amber-800 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Tổng thời gian
                      </span>
                      <span className="font-extrabold text-2xl bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        {totalDuration} phút
                      </span>
                    </div>
                  </div>
                </div>

                {/* ===== TIPS PANEL ===== */}
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-5 border-2 border-yellow-300 shadow-lg">
                  <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2 text-sm">
                    <AlertCircle className="w-5 h-5 text-yellow-700" />
                    💡 Hướng dẫn
                  </h4>
                  <ul className="text-xs text-amber-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-700 font-bold mt-0.5">✓</span>
                      <span>Nhập đầy đủ <strong>script</strong> cho Listening hoặc <strong>text</strong> cho Reading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-700 font-bold mt-0.5">✓</span>
                      <span>Điền tất cả <strong>4 lựa chọn</strong> cho mỗi câu hỏi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-700 font-bold mt-0.5">✓</span>
                      <span>Chọn <strong>đáp án đúng</strong> bằng radio button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-700 font-bold mt-0.5">✓</span>
                      <span>Viết <strong>giải thích</strong> để giúp học sinh hiểu rõ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-700 font-bold mt-0.5">✓</span>
                      <span>Bấm <strong>Xuất bản</strong> để cho phép người dùng xem</span>
                    </li>
                  </ul>
                </div>

                {/* ===== SAVE STATUS ===== */}
                {saving && (
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 animate-pulse">
                    <p className="text-sm font-bold text-blue-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      Đang lưu dữ liệu...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default CreateExam;
