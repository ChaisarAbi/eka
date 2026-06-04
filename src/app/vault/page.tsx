"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import ProgressTracker, { ProgressItem } from "@/components/ProgressTracker";
import MemoryCard from "@/components/MemoryCard";
import Moon from "@/components/Moon";
import { Sparkles } from "lucide-react";

export default function VaultPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<string[]>([]);
  const [logoClicks, setLogoClicks] = useState(0);
  const [secretMsg, setSecretMsg] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      localStorage.setItem("eka_progress", JSON.stringify(["gate"]));
      setProgress(["gate"]);
    }
  }, []);

  const updateProgress = (item: string) => {
    if (!progress.includes(item)) {
      const newProgress = [...progress, item];
      setProgress(newProgress);
      localStorage.setItem("eka_progress", JSON.stringify(newProgress));
    }
  };

  const handleMemoryClick = (id: string) => {
    updateProgress(id);
    router.push(`/memories/${id.replace("memory", "")}`);
  };

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === 7) {
      setSecretMsg(true);
      setTimeout(() => {
        setSecretMsg(false);
        setLogoClicks(0);
      }, 4000);
    }
  };

  const progressItems: ProgressItem[] = [
    { id: "gate", label: "Gate", unlocked: progress.includes("gate") },
    { id: "memory1", label: "M1", unlocked: progress.includes("memory1") },
    { id: "memory2", label: "M2", unlocked: progress.includes("memory2") },
    { id: "memory3", label: "M3", unlocked: progress.includes("memory3") },
    { id: "gallery", label: "Gallery", unlocked: progress.includes("gallery") },
    { id: "letter", label: "Letter", unlocked: progress.includes("letter") },
    { id: "ending", label: "End", unlocked: progress.includes("ending") },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarField />

      {/* Secret logo easter egg */}
      <motion.div
        onClick={handleLogoClick}
        className="absolute top-4 left-4 z-20 cursor-default select-none"
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-gold/40 text-xs font-heading tracking-widest hover:text-gold/60 transition-colors cursor-pointer">
          EKA
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 py-12 pt-24"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Moon />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-heading font-semibold text-gold mb-3"
          >
            Memory Vault
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted text-sm max-w-sm mx-auto leading-relaxed"
          >
            Every memory here tells a part of our story.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted text-sm max-w-sm mx-auto leading-relaxed"
          >
            Some are happy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted text-sm max-w-sm mx-auto leading-relaxed"
          >
            Some are difficult.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-muted text-sm max-w-sm mx-auto leading-relaxed"
          >
            But every single one of them led us here.
          </motion.p>
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-md mb-8"
        >
          <ProgressTracker items={progressItems} />
        </motion.div>

        {/* Memory Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-sm space-y-3"
        >
          <MemoryCard
            id="memory1"
            title="Memory 01 — The Unexpected Beginning"
            unlocked={progress.includes("gate")}
            onClick={() => handleMemoryClick("memory1")}
          />
          <MemoryCard
            id="memory2"
            title="Memory 02 — Finding You Again"
            unlocked={progress.includes("memory1")}
            onClick={() => handleMemoryClick("memory2")}
          />
          <MemoryCard
            id="memory3"
            title="Memory 03 — The Day Everything Changed"
            unlocked={progress.includes("memory2")}
            onClick={() => handleMemoryClick("memory3")}
          />
          <MemoryCard
            id="gallery"
            title="Secret Gallery — Moments We Kept"
            unlocked={progress.includes("memory3")}
            onClick={() => {
              updateProgress("gallery");
              router.push("/gallery");
            }}
          />
          <MemoryCard
            id="letter"
            title="Final Letter — For The Girl Named Eka"
            unlocked={progress.includes("gallery")}
            onClick={() => {
              updateProgress("letter");
              router.push("/letter");
            }}
          />
        </motion.div>

        {/* Secret Message Easter Egg */}
        {secretMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-card border border-gold/30 px-6 py-4 rounded-2xl shadow-2xl max-w-xs text-center">
              <Sparkles className="w-5 h-5 text-gold mx-auto mb-2" />
              <p className="text-gold text-sm font-medium leading-relaxed">
                I would make this website again just to see you smile.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
