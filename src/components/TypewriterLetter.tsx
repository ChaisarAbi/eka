"use client";

import { motion, type Variants } from "framer-motion";

interface TypewriterLetterProps {
  content: {
    opening: string;
    body: string[];
    closing: string;
    birthday: string;
    signature: string;
  };
  onComplete?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TypewriterLetter({
  content,
}: TypewriterLetterProps) {
  return (
    <div className="max-w-lg mx-auto px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-5 text-center"
      >
        {/* Opening */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-heading font-semibold text-gold mb-6"
        >
          {content.opening}
        </motion.h2>

        {/* Body paragraphs */}
        {content.body.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={itemVariants}
            className="text-ivory/80 leading-relaxed text-sm sm:text-base"
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Closing */}
        <motion.p
          variants={itemVariants}
          className="text-ivory leading-relaxed text-sm sm:text-base pt-4"
        >
          {content.closing}
        </motion.p>

        {/* Birthday */}
        {content.birthday && (
          <motion.p
            variants={itemVariants}
            className="text-gold font-heading text-xl sm:text-2xl font-semibold"
          >
            {content.birthday}
          </motion.p>
        )}

        {/* Signature */}
        <motion.div
          variants={itemVariants}
          className="text-gold/80 font-heading text-lg mt-8 whitespace-pre-line"
        >
          {content.signature}
        </motion.div>
      </motion.div>
    </div>
  );
}
