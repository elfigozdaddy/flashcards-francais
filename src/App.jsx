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
      acc[card.id] = { flipped: false, enlarged: false, completed: false };
      return acc;
    }, {})
  );

  const handleCardClick = (cardId) => {
    const currentState = cardStates[cardId];
    if (currentState.completed) return;

    if (!currentState.flipped) {
      setCardStates(prev => ({
        ...prev,
        [cardId]: { flipped: true, enlarged: true, completed: false }
      }));
    } else if (currentState.enlarged) {
      setCardStates(prev => ({
        ...prev,
        [cardId]: { flipped: true, enlarged: false, completed: true }
      }));
    }
  };

  const resetAll = () => {
    setCardStates(
      cardData.reduce((acc, card) => {
        acc[card.id] = { flipped: false, enlarged: false, completed: false };
        return acc;
      }, {})
    );
  };

  const allCompleted = Object.values(cardStates).every(state => state.completed);
  const completedCount = Object.values(cardStates).filter(state => state.completed).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Paris-HD.jpg')",
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white/80 backdrop-blur-[2px]" />

      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <h1 
              className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-2xl text-center px-8"
              style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', cursive" }}
            >
              Excellent travail!
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 drop-shadow-lg">
              Flashcards Français
            </h1>
            <p className="text-gray-700 text-lg mb-6 font-medium drop-shadow">
              Clicca sulle carte per scoprire le domande!
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-gray-700">
                  {completedCount} / {cardData.length} completate
                </span>
              </div>
              
              <button
                onClick={resetAll}
                className="flex items-center gap-2 rounded-full shadow-lg hover:shadow-xl transition-all bg-white/90 backdrop-blur-md border border-white/50 hover:bg-white px-6 py-3 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Ricomincia
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FlashCard
                  card={card}
                  state={cardStates[card.id]}
                  onClick={() => handleCardClick(card.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
