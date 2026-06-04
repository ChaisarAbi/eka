"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import Moon from "@/components/Moon";
import { ChevronDown } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute top-12 sm:top-16 right-8 sm:right-16 z-10"
      >
        <Moon />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-gold tracking-tight leading-tight mb-8">
            To The Girl
            <br />
            Named Eka
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-ivory/60 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-14"
        >
          Some people celebrate birthdays with cakes and candles.
          <br />
          I wanted to celebrate yours with something a little different.
          <br />
          <span className="text-gold/80 italic">
            A collection of memories.
          </span>
          <br />
          <span className="text-gold/80 italic">
            A story.
          </span>
          <br />
          <span className="text-gold/80 italic">
            Our story.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.button
            onClick={() => router.push("/intro")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-14 py-4 bg-gold text-background font-heading font-semibold text-sm rounded-full hover:bg-[#f0d08a] transition-all duration-500 tracking-[0.2em] uppercase shadow-lg shadow-gold/20"
          >
            Begin
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </main>
  );
}
