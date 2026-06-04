"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import { Heart, ArrowRight } from "lucide-react";

export default function IntroPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24">
      <StarField />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20">
            <Heart className="w-7 h-7 text-gold" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-3xl sm:text-4xl font-semibold text-gold mb-8 leading-snug"
        >
          A Memory Vault
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-7 text-ivory/70 font-body text-base sm:text-lg leading-[1.8] max-w-md mx-auto mb-14"
        >
          <p>
            Ini adalah tempat di mana setiap momen yang pernah kita lalui bersama
            disimpan dengan hati-hati.
          </p>
          <p>
            Kamu akan menemukan kisah-kisah kecil yang mungkin sudah kamu lupakan,
            tapi tidak pernah benar-benar hilang dariku.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => router.push("/gate")}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-3 px-14 py-4 bg-gold text-background font-heading font-semibold text-sm rounded-full hover:bg-[#f0d08a] transition-all duration-300 tracking-[0.15em] uppercase shadow-lg shadow-gold/20"
          >
            Continue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
