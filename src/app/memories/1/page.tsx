"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StarField from "@/components/StarField";
import { ArrowLeft } from "lucide-react";

export default function MemoryOnePage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (!progress.includes("gate")) {
        router.push("/gate");
        return;
      }
      if (!progress.includes("memory1")) {
        const newProgress = [...progress, "memory1"];
        localStorage.setItem("eka_progress", JSON.stringify(newProgress));
      }
    }
  }, [router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 sm:pt-24">
      <StarField />

      <motion.button
        onClick={() => router.push("/vault")}
        whileHover={{ x: -3 }}
        className="absolute top-8 left-6 z-20 flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-xl overflow-hidden border border-gold/20 relative">
            <Image
              src="/photos/telegram anon.png"
              alt="Telegram anonymous chat"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, 224px"
            />
          </div>
          <p className="text-muted/40 text-xs mt-2 italic">
            Telegram anonymous chat
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-heading font-semibold text-gold mb-6"
        >
          The Unexpected Beginning
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-ivory/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10 space-y-4 text-left"
        >
          <p>We met in a place where neither of us expected to find something meaningful.</p>
          <p>A random anonymous chat on Telegram.</p>
          <p>At that time, you were carrying more pain than anyone should have to carry alone.</p>
          <p>Your heart was tired.</p>
          <p>Your days felt heavy.</p>
          <p>And the future probably looked a little darker than it should.</p>
          <p>I didn't know it then, but a simple conversation would become one of the most important moments of my life.</p>
          <p>Day after day, message after message, we talked.</p>
          <p>About sadness.</p>
          <p>About fears.</p>
          <p>About things people rarely tell anyone else.</p>
          <p>For almost two months, I tried to be the calm when everything felt chaotic.</p>
          <p>The listener when things felt overwhelming.</p>
          <p>The reminder that tomorrow might be a little better.</p>
          <p>Back then, I thought I was helping someone heal.</p>
          <p>I never realized that one day, that person would become someone I couldn't imagine losing.</p>
        </motion.div>

        {/* Navigate */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => router.push("/vault")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-14 py-4 bg-card border border-gold/20 text-gold text-base rounded-full hover:bg-gold/10 transition-all duration-300"
        >
          Continue
        </motion.button>
      </motion.div>
    </main>
  );
}
