import React, { createContext, useContext, useState } from 'react';

interface ModoContextData {
  modo: 'manual' | 'setHora';
  setModo: (modo: 'manual' | 'setHora') => void;
}

const ModoContext = createContext<ModoContextData>({} as ModoContextData);

export const ModoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modo, setModo] = useState<'manual' | 'setHora'>('setHora');

  return (
    <ModoContext.Provider value={{ modo, setModo }}>
      {children}
    </ModoContext.Provider>
  );
};

export function useModo() {
  return useContext(ModoContext);
}
