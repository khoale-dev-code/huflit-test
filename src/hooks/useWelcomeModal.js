import { useState, useEffect, useCallback } from 'react';

const WELCOME_MODAL_KEY = 'huflit-welcome-shown';
const WELCOME_VERSION = 'v1'; // Increment when changing modal content

/**
 * useWelcomeModal Hook
 * 
 * Manages welcome modal display logic:
 * - Shows modal only on first visit (using localStorage)
 * - Provides open/close handlers
 * - Supports version-based re-display on content updates
 */
export const useWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Initialize modal state on mount
  useEffect(() => {
    const checkWelcomeStatus = () => {
      try {
        const storedVersion = localStorage.getItem(WELCOME_MODAL_KEY);
        
        // Show modal if:
        // 1. First time visitor (no stored version)
        // 2. OR version has changed (content updated)
        const shouldShow = !storedVersion || storedVersion !== WELCOME_VERSION;
        
        setIsOpen(shouldShow);
      } catch (error) {
        console.warn('Failed to check welcome modal status:', error);
        // Default to showing on error
        setIsOpen(true);
      }
      
      setHasChecked(true);
    };

    checkWelcomeStatus();
  }, []);

  // Handle closing modal
  const handleClose = useCallback(() => {
    setIsOpen(false);
    
    try {
      localStorage.setItem(WELCOME_MODAL_KEY, WELCOME_VERSION);
    } catch (error) {
      console.warn('Failed to save welcome modal status:', error);
    }
  }, []);

  // Force show modal (for testing or admin)
  const forceShow = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Reset modal (for debugging)
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(WELCOME_MODAL_KEY);
      setIsOpen(true);
    } catch (error) {
      console.warn('Failed to reset welcome modal:', error);
    }
  }, []);

  return {
    isOpen,
    hasChecked,
    onClose: handleClose,
    forceShow,
    reset,
  };
};

export default useWelcomeModal;