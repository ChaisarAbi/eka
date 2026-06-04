"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StarField from "@/components/StarField";
import { ArrowLeft } from "lucide-react";

export default function MemoryThreePage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (!progress.includes("memory2")) {
        router.push("/vault");
        return;
      }
      if (!progress.includes("memory3")) {
        const newProgress = [...progress, "memory3"];
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
              src="/photos/Bandung.jpeg"
              alt="Bandung"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, 224px"
            />
          </div>
          <p className="text-muted/40 text-xs mt-2 italic">
            Bandung
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-heading font-semibold text-gold mb-6"
        >
          The Day Everything Changed
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-ivory/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10 space-y-4 text-left"
        >
          <p>November 6th, 2025.</p>
          <p>A date I will probably remember for the rest of my life.</p>
          <p>Three days in Bandung.</p>
          <p>Three days filled with conversations, laughter, awkward moments, comfort, and certainty.</p>
          <p>Not certainty that we were perfect.</p>
          <p>But certainty that we were worth trying for.</p>
          <p>We discovered similarities.</p>
          <p>We discovered differences.</p>
          <p>We found things we liked.</p>
          <p>We found things we disagreed on.</p>
          <p>Yet neither of us walked away.</p>
          <p>Because love isn't about finding someone without flaws.</p>
          <p>It's about finding someone worth understanding.</p>
          <p>And somewhere between the roads of Bandung, the cafés, the conversations, and the quiet moments,</p>
          <p>I realized something.</p>
          <p>I didn't want another goodbye.</p>
          <p>I wanted a future.</p>
          <p>With you.</p>
        </motion.div>

        {/* Navigate */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => router.push("/gallery")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-14 py-4 bg-card border border-gold/20 text-gold text-base rounded-full hover:bg-gold/10 transition-all duration-300"
        >
          Open Gallery
        </motion.button>
      </motion.div>
    </main>
  );
}
