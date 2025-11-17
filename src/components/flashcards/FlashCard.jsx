import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function FlashCard({ card, state, onClick }) {
  const { flipped, enlarged, completed, flippedPrev } = state;
  const audioRef = useRef(null);

  // Suona al flip (solo quando si scopre)
  useEffect(() => {
    if (flipped && !flippedPrev && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [flipped, flippedPrev]);

  const handleClick = () => {
    if (completed) return;
    onClick();
  };

  return (
    <>
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
          className={`w-full h-full ${completed ? "cursor-default" : "cursor-pointer"} select-none`}
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
            {/* Retro (numero grande) - visibile solo se NON flipped */}
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${card.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 border-4 border-white rounded-lg rotate-45" />
                </div>
                <div className="text-8xl md:text-9xl font-black text-white drop-shadow-2xl">
                  {card.number}
                </div>
              </div>
            </div>

            {/* Fronte (domanda) - rimane visibile anche quando piccola */}
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${card.color} flex flex-col items-center justify-center p-4 md:p-6 relative`}>
                {/* Testo domanda (più piccolo quando non ingrandita) */}
                <div className="text-center flex-1 flex items-center">
                  <h2 className={`font-bold text-white drop-shadow-lg leading-tight ${
                    enlarged ? "text-3xl md:text-4xl" : "text-sm md:text-lg"
                  }`}>
                    {card.question}
                  </h2>
                </div>

                {/* Timbro bandiera francese + ✓ (sempre visibile quando completed) */}
                {completed && (
                  <div className={`${
                    enlarged ? "top-6 right-6 w-16 h-16" : "top-2 right-2 w-10 h-10"
                  } absolute rounded-full shadow-lg overflow-hidden border-4 border-white`}>
                    <div className="w-full h-full flex">
                      <div className="w-1/3 bg-[#0055A4]" />
                      <div className="w-1/3 bg-white flex items-center justify-center">
                        <Check className={`${enlarged ? "w-8 h-8" : "w-5 h-5"} text-[#EF4135]`} strokeWidth={4} />
                      </div>
                      <div className="w-1/3 bg-[#EF4135]" />
                    </div>
                  </div>
                )}

                {/* Pulsante chiusura (solo quando ingrandita) */}
                {enlarged && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-6"
                  >
                    <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Clicca per chiudere
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
