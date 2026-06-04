"use client";

import { useEffect, useRef } from "react";

interface ConfettiEffectProps {
  trigger?: boolean;
}

export default function ConfettiEffect({ trigger = true }: ConfettiEffectProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;
      const loadConfetti = async () => {
        try {
          const confetti = (await import("canvas-confetti")).default;

          const duration = 5000;
          const animationEnd = Date.now() + duration;
          const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 100,
          };

          const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

          const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }

            const particleCount = 50 * (timeLeft / duration);

            // Gold confetti
            confetti({
              ...defaults,
              particleCount: Math.floor(particleCount / 2),
              colors: ["#E6C27A", "#F5E6C8", "#FAFAFA"],
              origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2,
              },
            });

            // Ivory confetti
            confetti({
              ...defaults,
              particleCount: Math.floor(particleCount / 2),
              colors: ["#F5E6C8", "#E6C27A", "#94A3B8"],
              origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2,
              },
              angle: 60,
            });
          }, 250);
        } catch {
          // silently fail
        }
      };

      loadConfetti();
    }
  }, [trigger]);

  return null;
}
