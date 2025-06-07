import { createContext, useContext, useState } from 'react';
import { publishMessage } from '@/services/mqttServices';

interface Card {
  hora: string;
  titulo: string;
  repetir: string;
  notificar: number;
}

interface CardContextData {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (index: number) => void;
}

const CardContext = createContext<CardContextData | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (card: Card) => {
    setCards(prevCards => [...prevCards, card]);
  };

  const removeCard = (index: number) => {
    setCards(prevCards => prevCards.filter((_, i) => i !== index));
    // Enviar comando de limpeza
    sendClearScheduleCommand(index);
  };
  
  const sendClearScheduleCommand = (index: number) => {
    const message = `{cmd: "clear_schedule", id: ${index}}`;
    
    publishMessage(message);
  
    // Se for via Bluetooth, WebSocket, HTTP ou outro protocolo, insira a chamada correta aqui.
  };  

  return (
    <CardContext.Provider value={{ cards, addCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
};


export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
