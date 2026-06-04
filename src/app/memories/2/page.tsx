"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StarField from "@/components/StarField";
import { ArrowLeft } from "lucide-react";

export default function MemoryTwoPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (!progress.includes("memory1")) {
        router.push("/vault");
        return;
      }
      if (!progress.includes("memory2")) {
        const newProgress = [...progress, "memory2"];
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
              src="/photos/Reconnected.jpeg"
              alt="Reconnected"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, 224px"
            />
          </div>
          <p className="text-muted/40 text-xs mt-2 italic">
            Reconnected
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-heading font-semibold text-gold mb-6"
        >
          Finding You Again
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-ivory/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10 space-y-4 text-left"
        >
          <p>Then life happened.</p>
          <p>We stopped talking.</p>
          <p>We each continued our own journey.</p>
          <p>Different lives.</p>
          <p>Different stories.</p>
          <p>Different people.</p>
          <p>And for a while, it felt like our chapter had ended.</p>
          <p>But somehow, fate wasn't finished with us.</p>
          <p>In February 2024, our paths crossed again.</p>
          <p>Not because we planned it.</p>
          <p>Not because we forced it.</p>
          <p>But because some people are simply meant to return.</p>
          <p>What followed wasn't easy.</p>
          <p>It wasn't a fairytale.</p>
          <p>It wasn't instant.</p>
          <p>It took almost two years.</p>
          <p>Two years of conversations.</p>
          <p>Two years of learning each other.</p>
          <p>Two years of understanding strengths, weaknesses, dreams, fears, and everything in between.</p>
          <p>We weren't rushing.</p>
          <p>We were building something real.</p>
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
