"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import PolaroidCard from "@/components/PolaroidCard";
import { galleryItems } from "@/data/gallery";
import { ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("eka_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (!progress.includes("memory3")) {
        router.push("/vault");
        return;
      }
    }
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden py-20 px-4 pt-24">
      <StarField />

      <motion.button
        onClick={() => router.push("/vault")}
        whileHover={{ x: -3 }}
        className="absolute top-8 left-6 z-20 flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs">Back</span>
      </motion.button>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-gold mb-3">
            Secret Gallery
          </h1>
          <p className="text-muted text-sm max-w-sm mx-auto">
            Distance became a recurring character in our story.
          </p>
          <p className="text-muted text-sm max-w-sm mx-auto mt-1">
            But somehow, every goodbye carried the promise of another hello.
          </p>
        </motion.div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <PolaroidCard
              key={item.id}
              image={item.image}
              date={item.date}
              location={item.location}
              memory={item.memory}
              index={index}
            />
          ))}
        </div>

        {/* Navigate to letter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => {
              const saved = localStorage.getItem("eka_progress");
              if (saved) {
                const progress = JSON.parse(saved);
                if (!progress.includes("gallery")) {
                  const newProgress = [...progress, "gallery"];
                  localStorage.setItem(
                    "eka_progress",
                    JSON.stringify(newProgress)
                  );
                }
              }
              router.push("/letter");
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-14 py-4 bg-card border border-gold/20 text-gold text-base rounded-full hover:bg-gold/10 transition-all duration-300"
          >
            Continue to Final Letter →
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
