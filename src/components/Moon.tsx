"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MoonProps {
  onEasterEgg?: () => void;
}

export default function Moon({ onEasterEgg }: MoonProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setShowMessage(true);
      onEasterEgg?.();
      setTimeout(() => {
        setShowMessage(false);
        setClickCount(0);
      }, 4000);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          filter: [
            "drop-shadow(0 0 20px rgba(230,194,122,0.3))",
            "drop-shadow(0 0 40px rgba(230,194,122,0.5))",
            "drop-shadow(0 0 20px rgba(230,194,122,0.3))",
          ],
        }}
        transition={{
          filter: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Moon glow layers */}
        <div className="absolute -inset-10 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -inset-6 rounded-full bg-gold/10 blur-2xl" />
        <div className="absolute -inset-3 rounded-full bg-gold/15 blur-xl" />

        {/* Moon body */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-ivory via-[#e8dcc8] to-[#c9b896] shadow-lg">
          <div className="absolute top-3 left-4 w-4 h-4 rounded-full bg-[#c9b896]/40" />
          <div className="absolute top-8 left-7 w-2.5 h-2.5 rounded-full bg-[#c9b896]/30" />
          <div className="absolute bottom-5 right-5 w-3 h-3 rounded-full bg-[#c9b896]/35" />
          <div className="absolute top-5 right-3 w-1.5 h-1.5 rounded-full bg-[#c9b896]/25" />
        </div>
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-50"
          >
            <div className="bg-card border border-gold/30 px-6 py-3 rounded-xl shadow-xl">
              <p className="text-gold text-sm font-medium text-center">
                You're still exploring? ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
