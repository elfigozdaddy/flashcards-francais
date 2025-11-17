import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function FlashCard({ card, state, onClick }) {
  const { flipped, enlarged, completed, flippedPrev } = state;
  const audioRef = useRef(null);

  // Riproduce l’audio solo quando la carta si gira la prima volta
  useEffect(() => {
    if (flipped && !flippedPrev && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // evita errori su alcuni browser/mobile
    }
  }, [flipped, flippedPrev]);

  const handleClick = () => {
    if (completed) return;
    onClick();
  };

  return (
    <>
      {/* Audio nascosto */}
      <audio ref={audioRef} src="/Flip-golden.mp3" preload="auto" />

      {/* Overlay scuro */}
      {enlarged && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={handleClick}
        />
      )}

      {/* Carta */}
      <motion.div
        className={`${enlarged
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-md h-[70vh] max-h-[500px] rounded-3xl shadow-2xl overflow-hidden"
          : "w-full h-full"
        }`}
        animate={{ x: enlarged ? "-50%" : "0%", y: enlarged ? "-50%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className={`w-full h-full ${completed ? "cursor-not-allowed" : "cursor-pointer"} select-none`}
          style={{ perspective: "1000px" }}
          onClick={handleClick}
          whileHover={!completed && !enlarged ? { scale: 1.08 } : {}}
          whileTap={!completed ? { scale: 0.98 } : {}}
        >
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Retro */}
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
              <div className={`w-full h-full bg-gradient-to-br ${card.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 border-4 border-white rounded-lg rotate-45" />
                </div>
                <div className="text-8xl md:text-9xl font-black text-white drop-shadow-2xl">
                  {card.number}
                </div>
                {completed && (
                  <div className="absolute top-4 right-4 rounded-full shadow-lg overflow-hidden w-12 h-12">
                    <div className="w-full h-full flex">
                      <div className="w-1/3 bg-[#0055A4]" />
                      <div className="w-1/3 bg-white flex items-center justify-center">
                        <Check className="w-5 h-5 text-[#EF4135]" strokeWidth={3} />
                      </div>
                      <div className="w-1/3 bg-[#EF4135]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fronte */}
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <div className={`w-full h-full bg-gradient-to-br ${card.color} flex items-center justify-center p-6 md:p-8 relative`}>
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="2" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
                    <span className="text-white text-sm font-semibold">Question {card.number}</span>
                  </div>
                  <h2 className={`font-bold text-white drop-shadow-lg leading-tight ${enlarged ? "text-3xl md:text-4xl" : "text-lg md:text-xl"}`}>
                    {card.question}
                  </h2>
                </div>

                {enlarged && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                  >
                    <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Clicca per chiudere
                    </div>
                  </motion.div>
                )}

                {completed && (
                  <div className="absolute top-4 right-4 rounded-full shadow-lg overflow-hidden w-12 h-12">
                    <div className="w-full h-full flex">
                      <div className="w-1/3 bg-[#0055A4]" />
                      <div className="w-1/3 bg-white flex items-center justify-center">
                        <Check className="w-5 h-5 text-[#EF4135]" strokeWidth={3} />
                      </div>
                      <div className="w-1/3 bg-[#EF4135]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
