import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle } from "lucide-react";
import FlashCard from "./components/flashcards/FlashCard";

const cardData = [
  { id: 1, number: 1, question: "Tu as quel âge?", color: "from-pink-400 to-pink-600" },
  { id: 2, number: 2, question: "Comment tu t'appelles?", color: "from-purple-400 to-purple-600" },
  { id: 3, number: 3, question: "Quelle est ta matière préférée?", color: "from-blue-400 to-blue-600" },
  { id: 4, number: 4, question: "Tu aimes la musique?", color: "from-cyan-400 to-cyan-600" },
  { id: 5, number: 5, question: "Où tu habites?", color: "from-green-400 to-green-600" },
  { id: 6, number: 6, question: "Comment ça va?", color: "from-yellow-400 to-yellow-600" },
  { id: 7, number: 7, question: "Tu es de quelle nationalité?", color: "from-orange-400 to-orange-600" },
  { id: 8, number: 8, question: "Quelle est ta profession?", color: "from-red-400 to-red-600" },
];

export default function App() {
  const [cardStates, setCardStates] = useState(
    cardData.reduce((acc, card) => {
      acc[card.id] = { flipped: false, enlarged: false, completed: false, flippedPrev: false };
      return acc;
    }, {})
  );

  const handleCardClick = (cardId) => {
    const currentState = cardStates[cardId];
    if (currentState.completed) return;

    setCardStates(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        flipped: !prev[cardId].flipped,
        enlarged: !prev[cardId].flipped,
        completed: prev[cardId].enlarged,
        flippedPrev: prev[cardId].flipped
      }
    }));
  };

  const resetAll = () => {
    setCardStates(
      cardData.reduce((acc, card) => {
        acc[card.id] = { flipped: false, enlarged: false, completed: false, flippedPrev: false };
        return acc;
      }, {})
    );
  };

  const allCompleted = Object.values(cardStates).every(state => state.completed);
  const completedCount = Object.values(cardStates).filter(state => state.completed).length;

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col bg-gradient-to-b from-sky-100 to-pink-100">
      {/* Sfondo Parigi (ridotto e fisso) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: "url('/Paris-HD.jpg')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay per leggibilità */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      {/* Contenuto principale */}
      <div className="relative z-10 flex flex-col h-full p-4 md:p-6 max-w-7xl mx-auto w-full">
        
        {/* Header compatto */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-sm">
            Flashcards Français
          </h1>
          <p className="text-gray-700 text-sm md:text-base mt-1">
            Clicca per scoprire!
          </p>
        </motion.div>

        {/* Contatore e reset (in fila) */}
        <div className="flex items-center justify-center gap-3 mb-3 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="font-medium text-gray-700">
              {completedCount} / {cardData.length}
            </span>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow text-sm font-medium hover:bg-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ricomincia
          </button>
        </div>

        {/* Griglia carte (adattabile) */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 min-h-0">
          {cardData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <FlashCard
                card={card}
                state={cardStates[card.id] || {}}
                onClick={() => handleCardClick(card.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Messaggio finale (sovrapposto) */}
        <AnimatePresence>
          {allCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            >
              <h1 
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-2xl text-center"
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                Excellent travail!
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
