import React, { createContext, useContext, useRef } from 'react';

type NextStepModalContextType = {
  open: () => void;
  close: () => void;
  ref: React.RefObject<NextStepModalRef>;
};

const NextStepModalContext = createContext<NextStepModalContextType | undefined>(undefined);

type NextStepModalProviderProps = {
  children: React.ReactNode;
};

export type NextStepModalRef = {
  open: () => void;
  close: () => void;
};

export const NextStepModalProvider: React.FC<NextStepModalProviderProps> = ({ children }) => {
  const modalRef = useRef<NextStepModalRef>(null);

  const open = () => modalRef.current?.open();
  const close = () => modalRef.current?.close();

  return (
    <NextStepModalContext.Provider value={{ open, close, ref: modalRef }}>
      {children}
    </NextStepModalContext.Provider>
  );
};

export const useNextStepModal = () => {
  const context = useContext(NextStepModalContext);
  if (!context) {
    throw new Error('useNextStepModal must be used within a NextStepModalProvider');
  }
  return context;
};