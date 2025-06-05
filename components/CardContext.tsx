import React, { createContext, useContext, useState } from 'react';

export interface Card {
  titulo: string;
  hora: string;
  repetir: string;
  notificar: string;
}

interface CardContextData {
  cards: Card[];
  addCard: (card: Card) => void;
}

const CardContext = createContext<CardContextData>({} as CardContextData);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);

  function addCard(card: Card) {
    setCards(prev => [...prev, card]);
  }

  return (
    <CardContext.Provider value={{ cards, addCard }}>
      {children}
    </CardContext.Provider>
  );
};

export function useCard() {
  return useContext(CardContext);
}
