import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goToTest: useCallback(() => navigate(ROUTES.TEST), [navigate]),
    goToTest: useCallback(() => navigate(ROUTES.HOME), [navigate]),
    goToFullExam: useCallback(() => navigate(ROUTES.FULL_EXAM), [navigate]),
    goToGrammar: useCallback(() => navigate(ROUTES.GRAMMAR), [navigate]),
    goToVocabulary: useCallback(() => navigate(ROUTES.VOCABULARY), [navigate]),
    goToProfile: useCallback(() => navigate(ROUTES.PROFILE), [navigate]),
    goToAnswers: useCallback(() => navigate(ROUTES.ANSWERS), [navigate]),
  };
};