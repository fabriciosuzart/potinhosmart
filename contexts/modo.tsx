// src/contexts/ModoContext.tsx
import React, { createContext, useState, useContext } from 'react';

type ModoContextType = {
  manual: boolean;
  setManual: (manual: boolean) => void;
};

const ModoContext = createContext<ModoContextType | undefined>(undefined);

export const ModoProvider = ({ children }: { children: React.ReactNode }) => {
  const [manual, setManual] = useState(false);

  return (
    <ModoContext.Provider value={{ manual, setManual }}>
      {children}
    </ModoContext.Provider>
  );
};

export const useModo = () => {
  const context = useContext(ModoContext);
  if (!context) {
    throw new Error('useModo must be used within a ModoProvider');
  }
  return context;
};
