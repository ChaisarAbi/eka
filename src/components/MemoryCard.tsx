"use client";

import { motion } from "framer-motion";
import { Lock, Check, ChevronRight } from "lucide-react";

interface MemoryCardProps {
  id: string;
  title: string;
  unlocked: boolean;
  onClick: () => void;
}

export default function MemoryCard({
  id,
  title,
  unlocked,
  onClick,
}: MemoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!unlocked}
      whileHover={unlocked ? { scale: 1.02, x: 4 } : {}}
      whileTap={unlocked ? { scale: 0.98 } : {}}
        className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
        unlocked
          ? "bg-card border-gold/20 hover:border-gold/40 cursor-pointer"
          : "bg-card/50 border-muted/10 cursor-not-allowed opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            unlocked ? "bg-success/20" : "bg-card"
          }`}
        >
          {unlocked ? (
            <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
          ) : (
            <Lock className="w-4 h-4 text-muted" strokeWidth={2} />
          )}
        </div>
        <span
          className={`font-heading text-base ${
            unlocked ? "text-foreground" : "text-muted"
          }`}
        >
          {title}
        </span>
      </div>
      {unlocked && (
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-gold"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      )}
    </motion.button>
  );
}
