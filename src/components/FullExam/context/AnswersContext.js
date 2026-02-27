 
import { createContext, useContext } from 'react';

// Context object
export const AnswersContext = createContext(null);

// Hook tiện dụng để consume context
export const useAnswers = () => {
  const ctx = useContext(AnswersContext);
  if (ctx === null) {
    throw new Error('useAnswers must be used inside <AnswersContext.Provider>');
  }
  return ctx;
};