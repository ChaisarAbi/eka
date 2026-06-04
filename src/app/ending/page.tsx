"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import ConfettiEffect from "@/components/ConfettiEffect";
import { RotateCcw, Stars } from "lucide-react";

export default function EndingPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [showFinalLine, setShowFinalLine] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 500);
    const timer2 = setTimeout(() => {
      setShowFinalLine(true);
    }, 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-24">
      {/* Confetti */}
      <ConfettiEffect />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f1a2e] to-[#1a1020] z-0" />

      {/* Soft gold overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent z-0" />

      <StarField />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        {/* Decorative stars */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="text-gold/40 mb-6"
        >
          <Stars className="w-10 h-10 mx-auto" strokeWidth={1} />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 sm:p-10 shadow-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl mb-6"
          >
            🎂
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl font-heading font-semibold text-gold mb-6 leading-snug"
          >
            Happy Birthday, Eka Cahyani 🎂
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-ivory/70 text-sm leading-relaxed mb-2"
          >
            The world changed a little on the day you were born.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-ivory/70 text-sm leading-relaxed mb-6"
          >
            Mine changed when I met you.
          </motion.p>

          <AnimatePresence>
            {showFinalLine && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mt-8 pt-6 border-t border-gold/10"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-gold/80 text-sm italic leading-relaxed"
                >
                  And if I had to choose again, through every goodbye, every distance, and every waiting period...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-gold text-base sm:text-lg font-heading font-semibold mt-4"
                >
                  I would still choose you.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                  className="text-gold text-sm mt-2"
                >
                  Every single time. ❤️
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="mt-8 space-y-3"
        >
          <motion.button
            onClick={() => {
              localStorage.setItem(
                "eka_progress",
                JSON.stringify(["gate"])
              );
              router.push("/intro");
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-14 py-4 bg-card border border-gold/20 text-gold text-base rounded-full hover:bg-gold/10 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Replay Our Story
          </motion.button>
        </motion.div>

        {/* Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 4 }}
          className="text-muted/30 text-xs mt-12"
        >
          Made with ❤️ — For Eka
        </motion.p>
      </motion.div>
    </main>
  );
}
