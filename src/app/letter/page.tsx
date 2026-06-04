"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import TypewriterLetter from "@/components/TypewriterLetter";
import { letterContent } from "@/data/letter";
import { ArrowLeft } from "lucide-react";

export default function LetterPage() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (!progress.includes("gallery")) {
        router.push("/vault");
        return;
      }
    }
  }, [router]);

  // Show continue button after all fade-in animations finish
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      const saved = localStorage.getItem("eka_progress");
      if (saved) {
        const progress = JSON.parse(saved);
        if (!progress.includes("letter")) {
          const newProgress = [...progress, "letter"];
          localStorage.setItem("eka_progress", JSON.stringify(newProgress));
        }
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden py-20 pt-24">
      <StarField />

      <motion.button
        onClick={() => router.push("/vault")}
        whileHover={{ x: -3 }}
        className="absolute top-8 left-6 z-20 flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs">Back</span>
      </motion.button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <TypewriterLetter content={letterContent} />
        </motion.div>

        {/* Navigate to ending */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12"
          >
            <motion.button
              onClick={() => {
                const saved = localStorage.getItem("eka_progress");
                if (saved) {
                  const progress = JSON.parse(saved);
                  if (!progress.includes("ending")) {
                    const newProgress = [...progress, "ending"];
                    localStorage.setItem(
                      "eka_progress",
                      JSON.stringify(newProgress)
                    );
                  }
                }
                router.push("/ending");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-14 py-4 bg-gradient-to-r from-gold/90 to-gold text-background text-base font-semibold rounded-full hover:from-gold hover:to-[#f0d08a] transition-all duration-300"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
