// src/admin/hooks/useExams.js
import { useState, useCallback, useEffect } from 'react';
import {
  getExams, getExamById, createExam,
  updateExam, updateExamPart, deleteExam,
  uploadAudio, deleteAudio,
} from '../services/examService';

// ─── Blank part templates (HUFLIT format) ────────────────────────
const blankListeningPart = (id, label) => ({
  id,
  title:          label,
  description:    '',
  type:           'listening',
  audioUrl:       '',       // URL công khai (hoặc Storage URL)
  audioStoragePath: '',     // path trong Firebase Storage
  audioName:      '',
  script:         '',
  questions:      [],
});

const blankReadingPart = (id, label) => ({
  id,
  title:       label,
  description: '',
  type:        'reading',
  text:        '',          // passage content
  questions:   [],
});

/** Default parts = 4 listening + 4 reading (giống EXAM1_DATA) */
const DEFAULT_PARTS = {
  part1: blankListeningPart('part1', 'PART 1: Short Conversations'),
  part2: blankListeningPart('part2', 'PART 2: Conversation'),
  part3: blankListeningPart('part3', 'PART 3: Monologue'),
  part4: blankListeningPart('part4', 'PART 4: Extended Conversation'),
  part5: blankReadingPart('part5',  'PART 5: Fill in the Blank'),
  part6: blankReadingPart('part6',  'PART 6: Cloze Text'),
  part7: blankReadingPart('part7',  'PART 7: Multiple Texts'),
  part8: blankReadingPart('part8',  'PART 8: Text Message Chain'),
};

const DEFAULT_FORM = {
  title:       '',
  description: '',
  category:    'IELTS',
  level:       'Trung cấp (B1-B2)',
  duration:    120,
  showResults: true,
  metadata:    {},
  parts:       DEFAULT_PARTS,
};

// ─────────────────────────────────────────────────────────────────
export const useExams = () => {
  const [exams,        setExams]        = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [lastDoc,      setLastDoc]      = useState(null);

  // Modal state: type = 'create' | 'edit' | 'delete' | 'detail' | null
  const [modalState, setModalState] = useState({ type: null, exam: null });

  // Form
  const [form, setForm] = useState(DEFAULT_FORM);

  // Audio upload progress per partId: { part1: 45, part2: 100, ... }
  const [uploadProgress, setUploadProgress] = useState({});

  // ── Fetch list ─────────────────────────────────────────────────
  const fetchExams = useCallback(async (reset = true) => {
    setLoading(true);
    setError(null);
    try {
      const { exams: data, lastDoc: last } = await getExams({
        category: activeFilter,
        lastDoc:  reset ? null : lastDoc,
      });
      setExams(reset ? data : prev => [...prev, ...data]);
      setLastDoc(last);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]); // eslint-disable-line

  useEffect(() => { fetchExams(true); }, [activeFilter]); // eslint-disable-line

  // ── Client-side search ─────────────────────────────────────────
  const filteredExams = searchQuery.trim()
    ? exams.filter(e =>
        e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exams;

  // ── Modal helpers ──────────────────────────────────────────────
  const openCreate = useCallback(() => {
    setForm(DEFAULT_FORM);
    setModalState({ type: 'create', exam: null });
  }, []);

  const openEdit = useCallback((exam) => {
    setForm({
      title:       exam.title       ?? '',
      description: exam.description ?? '',
      category:    exam.category    ?? 'IELTS',
      level:       exam.level       ?? 'Trung cấp (B1-B2)',
      duration:    exam.duration    ?? 120,
      showResults: exam.showResults ?? true,
      metadata:    exam.metadata    ?? {},
      // Merge exam.parts vào DEFAULT_PARTS để không mất keys khi exam cũ thiếu part
      parts: { ...DEFAULT_PARTS, ...exam.parts },
    });
    setModalState({ type: 'edit', exam });
  }, []);

  const openDetail = useCallback((exam) => setModalState({ type: 'detail', exam }), []);
  const openDelete = useCallback((exam) => setModalState({ type: 'delete', exam }), []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, exam: null });
    setForm(DEFAULT_FORM);
    setError(null);
  }, []);

  // ── Form mutations ─────────────────────────────────────────────
  const updateForm = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  /** Cập nhật toàn bộ 1 part */
  const updatePart = useCallback((partId, updates) => {
    setForm(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partId]: { ...prev.parts[partId], ...updates },
      },
    }));
  }, []);

  /** Thêm câu hỏi vào 1 part */
  const addQuestion = useCallback((partId, question) => {
    setForm(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partId]: {
          ...prev.parts[partId],
          questions: [
            ...(prev.parts[partId]?.questions ?? []),
            { id: `q_${Date.now()}`, ...question },
          ],
        },
      },
    }));
  }, []);

  /** Xóa câu hỏi khỏi 1 part */
  const removeQuestion = useCallback((partId, questionId) => {
    setForm(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partId]: {
          ...prev.parts[partId],
          questions: prev.parts[partId]?.questions?.filter(q => q.id !== questionId) ?? [],
        },
      },
    }));
  }, []);

  /** Cập nhật nội dung 1 câu hỏi */
  const updateQuestion = useCallback((partId, questionId, updates) => {
    setForm(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [partId]: {
          ...prev.parts[partId],
          questions: prev.parts[partId]?.questions?.map(q =>
            q.id === questionId ? { ...q, ...updates } : q
          ) ?? [],
        },
      },
    }));
  }, []);

  // ── Audio upload ───────────────────────────────────────────────
  const handleAudioUpload = useCallback(async (partId, file, examId = 'temp') => {
    setUploadProgress(prev => ({ ...prev, [partId]: 0 }));
    try {
      const result = await uploadAudio(file, examId, partId, pct =>
        setUploadProgress(prev => ({ ...prev, [partId]: pct }))
      );
      updatePart(partId, {
        audioUrl:          result.url,
        audioStoragePath:  result.path,
        audioName:         result.name,
      });
      setUploadProgress(prev => { const n = { ...prev }; delete n[partId]; return n; });
      return result;
    } catch (err) {
      setUploadProgress(prev => { const n = { ...prev }; delete n[partId]; return n; });
      setError(`Upload audio thất bại: ${err.message}`);
    }
  }, [updatePart]);

  const handleAudioDelete = useCallback(async (partId, storagePath) => {
    if (storagePath) await deleteAudio(storagePath);
    updatePart(partId, { audioUrl: '', audioStoragePath: '', audioName: '' });
  }, [updatePart]);

  // ── CRUD ───────────────────────────────────────────────────────
  const handleCreate = useCallback(async () => {
    if (!form.title.trim()) { setError('Vui lòng nhập tiêu đề bộ đề'); return; }
    setSaving(true); setError(null);
    try {
      const newExam = await createExam(form);
      setExams(prev => [newExam, ...prev]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally { setSaving(false); }
  }, [form, closeModal]);

  const handleUpdate = useCallback(async () => {
    if (!form.title.trim()) { setError('Vui lòng nhập tiêu đề bộ đề'); return; }
    if (!modalState.exam?.id) return;
    setSaving(true); setError(null);
    try {
      const updated = await updateExam(modalState.exam.id, form);
      setExams(prev => prev.map(e => e.id === updated.id ? { ...e, ...updated } : e));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally { setSaving(false); }
  }, [form, modalState.exam, closeModal]);

  const handleDelete = useCallback(async (exam) => {
    setSaving(true); setError(null);
    try {
      await deleteExam(exam.id, exam);
      setExams(prev => prev.filter(e => e.id !== exam.id));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally { setSaving(false); }
  }, [closeModal]);

  const handleSave = useCallback(() => {
    if (modalState.type === 'create') return handleCreate();
    if (modalState.type === 'edit')   return handleUpdate();
  }, [modalState.type, handleCreate, handleUpdate]);

  // ── Stats (derived) ────────────────────────────────────────────
  const stats = {
    total:     exams.length,
    ielts:     exams.filter(e => e.category === 'IELTS').length,
    toeic:     exams.filter(e => e.category === 'TOEIC').length,
    avgQ: exams.length
      ? Math.round(exams.reduce((a, e) => a + (e.questions ?? 0), 0) / exams.length * 10) / 10
      : 0,
  };

  return {
    // Data
    exams: filteredExams,
    loading, saving, error, stats,
    activeFilter, setActiveFilter,
    searchQuery, setSearchQuery,

    // Modal
    modalState,
    openCreate, openEdit, openDetail, openDelete, closeModal,

    // Form
    form, updateForm, updatePart,
    addQuestion, removeQuestion, updateQuestion,

    // Audio
    uploadProgress,
    handleAudioUpload, handleAudioDelete,

    // Actions
    handleSave, handleDelete, fetchExams,

    // Constants
    DEFAULT_PARTS,
  };
};