"use client";

import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";

export interface ProgressItem {
  id: string;
  label: string;
  unlocked: boolean;
}

interface ProgressTrackerProps {
  items: ProgressItem[];
}

export default function ProgressTracker({ items }: ProgressTrackerProps) {
  const unlockedCount = items.filter((i) => i.unlocked).length;
  const percentage = Math.round((unlockedCount / items.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted text-xs uppercase tracking-widest">
          Progress
        </span>
        <motion.span
          key={percentage}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="text-gold text-sm font-semibold"
        >
          {percentage}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-card rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Progress items */}
      <div className="flex items-center justify-between gap-1">
        {items.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center gap-1.5">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                item.unlocked
                  ? "bg-success/20 border-success"
                  : "bg-card border-muted/30"
              }`}
              animate={
                item.unlocked
                  ? { scale: [1, 1.2, 1] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              {item.unlocked ? (
                <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
              ) : (
                <Lock className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
              )}
            </motion.div>
            <span
              className={`text-[10px] uppercase tracking-wider ${
                item.unlocked ? "text-ivory/80" : "text-muted/50"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
