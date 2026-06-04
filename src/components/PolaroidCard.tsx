"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface PolaroidCardProps {
  image: string;
  date: string;
  location: string;
  memory: string;
  index: number;
}

export default function PolaroidCard({
  image,
  date,
  location,
  memory,
  index,
}: PolaroidCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const randomRotation = (index % 3) * 2 - 2;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{
          scale: 1.05,
          rotate: 0,
          zIndex: 10,
          transition: { type: "spring", stiffness: 300 },
        }}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
        style={{ perspective: "1000px" }}
      >
        <div
          className="bg-white p-2 pb-10 rounded-sm shadow-xl"
          style={{
            transform: `rotate(${randomRotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-full aspect-square bg-[#f0f0f0] overflow-hidden rounded-sm mb-3">
            <Image
              src={image}
              alt={`Memory ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="px-1">
            <p className="text-[10px] text-gray-400 tracking-wider uppercase text-center font-medium">
              {date}
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white p-3 pb-6 rounded-sm shadow-2xl max-w-xs w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border border-gold/30 flex items-center justify-center shadow-lg"
              >
                <X className="w-4 h-4 text-gold" />
              </button>

              <div className="relative w-full aspect-square bg-[#f0f0f0] rounded-sm overflow-hidden mb-4">
                <Image
                  src={image}
                  alt={`Memory ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-1 text-center">
                <p className="text-[11px] text-gray-500 font-medium tracking-wider uppercase">
                  {date}
                </p>
                <p className="text-[11px] text-gray-500 tracking-wider uppercase">
                  {location}
                </p>
                <p className="text-sm text-gray-700 font-medium mt-2 italic">
                  &ldquo;{memory}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
