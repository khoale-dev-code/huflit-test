import { useState, useCallback, useRef } from 'react';

const MAX_HISTORY = 50;

export const useQuestionDnD = (initialQuestions = []) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const historyRef = useRef({ past: [], future: [] });

  const pushToHistory = useCallback((newQuestions) => {
    historyRef.current = {
      past: [...historyRef.current.past, questions].slice(-MAX_HISTORY),
      future: []
    };
    setQuestions(newQuestions);
  }, [questions]);

  const undo = useCallback(() => {
    if (historyRef.current.past.length === 0) return;
    
    const previous = historyRef.current.past[historyRef.current.past.length - 1];
    historyRef.current = {
      past: historyRef.current.past.slice(0, -1),
      future: [questions, ...historyRef.current.future]
    };
    setQuestions(previous);
  }, [questions]);

  const redo = useCallback(() => {
    if (historyRef.current.future.length === 0) return;
    
    const next = historyRef.current.future[0];
    historyRef.current = {
      past: [...historyRef.current.past, questions],
      future: historyRef.current.future.slice(1)
    };
    setQuestions(next);
  }, [questions]);

  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;

  const moveQuestion = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    
    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, moved);
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const moveQuestionToGroup = useCallback((questionId, fromGroupId, toGroupId, toIndex) => {
    const newQuestions = [...questions];
    const fromGroupIdx = newQuestions.findIndex(q => q.id === fromGroupId);
    const toGroupIdx = newQuestions.findIndex(q => q.id === toGroupId);
    
    if (fromGroupIdx === -1 || toGroupIdx === -1) return;

    const fromGroup = newQuestions[fromGroupIdx];
    const toGroup = newQuestions[toGroupIdx];
    
    const questionIdx = fromGroup.subQuestions?.findIndex(sq => sq.id === questionId);
    if (questionIdx === -1) return;

    const [movedQuestion] = fromGroup.subQuestions.splice(questionIdx, 1);
    
    const updatedFromGroup = {
      ...fromGroup,
      subQuestions: [...fromGroup.subQuestions]
    };

    const updatedToGroup = {
      ...toGroup,
      subQuestions: [
        ...(toGroup.subQuestions || []).slice(0, toIndex),
        movedQuestion,
        ...(toGroup.subQuestions || []).slice(toIndex)
      ]
    };

    newQuestions[fromGroupIdx] = updatedFromGroup;
    newQuestions[toGroupIdx] = updatedToGroup;
    
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const reorderGroups = useCallback((oldIndex, newIndex) => {
    if (oldIndex === newIndex) return;
    
    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(oldIndex, 1);
    newQuestions.splice(newIndex, 0, moved);
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const duplicateQuestion = useCallback((questionId, groupId) => {
    const newQuestions = [...questions];
    const groupIdx = newQuestions.findIndex(q => q.id === groupId);
    
    if (groupIdx === -1) return;
    
    const group = newQuestions[groupIdx];
    const questionIdx = group.subQuestions?.findIndex(sq => sq.id === questionId);
    
    if (questionIdx === -1) return;
    
    const originalQuestion = group.subQuestions[questionIdx];
    const duplicatedQuestion = {
      ...originalQuestion,
      id: `sq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    const updatedGroup = {
      ...group,
      subQuestions: [
        ...group.subQuestions.slice(0, questionIdx + 1),
        duplicatedQuestion,
        ...group.subQuestions.slice(questionIdx + 1)
      ]
    };

    newQuestions[groupIdx] = updatedGroup;
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const deleteQuestion = useCallback((questionId, groupId) => {
    const newQuestions = [...questions];
    const groupIdx = newQuestions.findIndex(q => q.id === groupId);
    
    if (groupIdx === -1) return;
    
    const group = newQuestions[groupIdx];
    const updatedGroup = {
      ...group,
      subQuestions: (group.subQuestions || []).filter(sq => sq.id !== questionId)
    };

    newQuestions[groupIdx] = updatedGroup;
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const addQuestion = useCallback((groupId, newQuestion) => {
    const newQuestions = [...questions];
    const groupIdx = newQuestions.findIndex(q => q.id === groupId);
    
    if (groupIdx === -1) return;
    
    const group = newQuestions[groupIdx];
    const updatedGroup = {
      ...group,
      subQuestions: [
        ...(group.subQuestions || []),
        { ...newQuestion, id: `sq_${Date.now()}` }
      ]
    };

    newQuestions[groupIdx] = updatedGroup;
    pushToHistory(newQuestions);
  }, [questions, pushToHistory]);

  const updateQuestion = useCallback((questionId, groupId, updates) => {
    const newQuestions = [...questions];
    const groupIdx = newQuestions.findIndex(q => q.id === groupId);
    
    if (groupIdx === -1) return;
    
    const group = newQuestions[groupIdx];
    const updatedGroup = {
      ...group,
      subQuestions: (group.subQuestions || []).map(sq => 
        sq.id === questionId ? { ...sq, ...updates } : sq
      )
    };

    newQuestions[groupIdx] = updatedGroup;
    setQuestions(newQuestions);
  }, [questions]);

  const getStatistics = useCallback(() => {
    let totalQuestions = 0;
    let totalPoints = 0;
    const typeCount = {
      multiple_choice: 0,
      fill_in: 0,
      matching: 0,
      true_false: 0
    };

    questions.forEach(q => {
      if (q.type === 'group') {
        (q.subQuestions || []).forEach(sq => {
          if (!sq.isExample) {
            totalQuestions++;
            totalPoints += sq.points || 1;
            if (sq.questionType) {
              typeCount[sq.questionType] = (typeCount[sq.questionType] || 0) + 1;
            }
          }
        });
      } else if (!q.isExample) {
        totalQuestions++;
        totalPoints += q.points || 1;
        if (q.questionType) {
          typeCount[q.questionType] = (typeCount[q.questionType] || 0) + 1;
        }
      }
    });

    return { totalQuestions, totalPoints, typeCount };
  }, [questions]);

  return {
    questions,
    setQuestions,
    moveQuestion,
    moveQuestionToGroup,
    reorderGroups,
    duplicateQuestion,
    deleteQuestion,
    addQuestion,
    updateQuestion,
    getStatistics,
    undo,
    redo,
    canUndo,
    canRedo
  };
};

export default useQuestionDnD;
