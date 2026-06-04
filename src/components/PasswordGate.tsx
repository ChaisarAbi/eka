"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";

interface PasswordGateProps {
  correctPassword: string;
  onUnlock: () => void;
  hint?: string;
}

export default function PasswordGate({
  correctPassword,
  onUnlock,
  hint = "A date worth remembering.",
}: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div
          key="gate"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={
                error
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-card border border-gold/20 mb-5"
            >
              <Lock className="w-6 h-6 text-gold" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl font-heading font-semibold text-gold mb-3 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Access Required
            </motion.h1>

            <motion.p
              className="text-muted text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              This place was made for one person only.
            </motion.p>
            <motion.p
              className="text-muted text-sm leading-relaxed mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              If you're reading this, then you're probably the reason it exists.
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Password"
                className={`w-full px-8 py-6 bg-card border rounded-xl text-foreground placeholder:text-muted/40 focus:outline-none transition-all duration-300 font-body text-base ${
                  error
                    ? "border-red-500/50 ring-1 ring-red-500/20"
                    : "border-gold/20 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-muted/60 text-xs text-center">{hint}</p>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-gradient-to-r from-gold/90 to-gold text-background font-medium rounded-xl text-base tracking-wide hover:from-gold hover:to-[#f0d08a] transition-all duration-300"
            >
              Unlock
            </motion.button>
          </motion.form>
        </motion.div>
      ) : (
        <motion.div
          key="unlocked"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(230,194,122,0.3)",
                "0 0 40px rgba(230,194,122,0.5)",
                "0 0 20px rgba(230,194,122,0.3)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 border border-gold/30 mb-5"
          >
            <Unlock className="w-8 h-8 text-gold" strokeWidth={1.5} />
          </motion.div>
          <p className="text-gold font-heading text-lg font-semibold">
            Welcome back, Eka.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
