"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import PasswordGate from "@/components/PasswordGate";

export default function GatePage() {
  const router = useRouter();

  const handleUnlock = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eka_unlocked", "true");
    }
    setTimeout(() => {
      router.push("/vault");
    }, 1500);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24">
      <StarField />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <PasswordGate
          correctPassword="15072005"
          hint="A date worth remembering."
          onUnlock={handleUnlock}
        />
      </motion.div>
    </main>
  );
}
