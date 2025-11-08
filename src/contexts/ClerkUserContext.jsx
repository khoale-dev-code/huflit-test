import React, { createContext, useContext } from 'react';
import { useClerkAuthentication } from '../hooks/useClerkAuth';

const ClerkUserContext = createContext();

export const ClerkUserProvider = ({ children }) => {
  const auth = useClerkAuthentication();

  return (
    <ClerkUserContext.Provider value={auth}>
      {children}
    </ClerkUserContext.Provider>
  );
};

export const useClerkUser = () => {
  const context = useContext(ClerkUserContext);
  if (!context) {
    throw new Error('useClerkUser must be used within ClerkUserProvider');
  }
  return context;
};
