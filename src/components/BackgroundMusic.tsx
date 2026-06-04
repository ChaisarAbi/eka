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
    audioRef.current = new Audio(
      "https://rr4---sn-npoldnez.googlevideo.com/videoplayback?expire=1780606753&ei=wZIhaoi4N_b8-LAPj-KzyQc&ip=181.115.161.87&id=o-AGjlNC4wIuQZC98NifCnR3MSnysyTqcpTYTwxf-BrFDH&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=518&bui=AbKmrwo9vznsVlVWHVSS6huVO6yLZQhhQUC8ixcq4OZRj3JiSKh-jXuBZPKiqaJkLu7dUzra0xGZ-EI6&vprv=1&svpuc=1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=3104074&dur=170.581&lmt=1774729524678776&keepalive=yes&fexp=51565115,51565682&c=ANDROID_VR&txp=5532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AHEqNM4wRQIgfrB_cwfFEJ2Mnf9YTWp-qlnyoz_cIFEgo024JSBBKGQCIQDFIjMFgQ--5gO0T90WmaI5nERB4tLwKCtMVEBctNX39Q%3D%3D&rm=sn-xouxacv-a2cz7s,sn-njaee7z&rrc=79,104&req_id=2a9c49947697a3ee&cmsv=e&rms=rdu,aub&redirect_counter=2&cms_redirect=yes&ipbypass=yes&met=1780598283,&mh=eC&mip=103.18.34.149&mm=29&mn=sn-npoldnez&ms=rdu&mt=1780597743&mv=m&mvi=4&pl=24&lsparams=cps,ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRQIhAMi8JdnZevTu8OFTxhY-0eQS0kjXlF7LNumSEgsP4d3VAiAp0MDlxO5UT_VQPuHFL2nTTBJxVyyDK9X4fZUq_XBB-Q%3D%3D"
    );
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
