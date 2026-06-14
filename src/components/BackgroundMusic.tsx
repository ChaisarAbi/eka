"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/music/canon.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Try to autoplay on mount
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          hasInteracted.current = true;
        })
        .catch(() => {
          // Autoplay blocked - show tooltip
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);

          // Listen for first user interaction to start music
          const startAudio = () => {
            if (audioRef.current && !hasInteracted.current) {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  hasInteracted.current = true;
                })
                .catch(() => {});
            }
            document.removeEventListener("click", startAudio);
            document.removeEventListener("touchstart", startAudio);
          };
          document.addEventListener("click", startAudio);
          document.addEventListener("touchstart", startAudio);
        });
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      hasInteracted.current = false;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          })
          .catch(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 3000);
          });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-card/90 backdrop-blur-sm border border-gold/20 text-gold text-xs px-3 py-1.5 rounded-full"
            >
              Tap to play music 🎵
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isPlaying && !isMuted
              ? "bg-gold/20 border-gold/40 text-gold"
              : "bg-card/80 border-gold/20 text-muted"
          }`}
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </motion.button>

        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isPlaying && !isMuted
              ? "bg-gold/20 border-gold/40 text-gold"
              : "bg-card/80 border-gold/20 text-muted"
          }`}
        >
          <Music className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </>
  );
}
