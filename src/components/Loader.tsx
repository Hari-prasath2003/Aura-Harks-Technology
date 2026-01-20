"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface LoaderProps {
  onLoadingComplete: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onLoadingComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#073265] to-black"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(237, 89, 36, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(237, 89, 36, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(237, 89, 36, 0.25)" }}
            animate={{
              scale: [1, 1.4, 1],
              backgroundColor: ["rgba(237, 89, 36, 0.25)", "rgba(237, 89, 36, 0.45)", "rgba(237, 89, 36, 0.25)"],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(255, 140, 66, 0.25)" }}
            animate={{
              scale: [1, 1.3, 1],
              backgroundColor: ["rgba(255, 140, 66, 0.25)", "rgba(255, 140, 66, 0.45)", "rgba(255, 140, 66, 0.25)"],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Main loader content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with 3D effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [0.95, 1.05, 0.95],
                rotateY: 0,
              }}
              transition={{
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 1,
                  ease: "easeOut",
                },
              }}
              className="mb-12 relative"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ED5924]/40 to-[#FF8C42]/40 rounded-3xl blur-2xl scale-150"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1.3, 1.6, 1.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Logo */}
              <div className="relative">
                <Logo size="lg" animated={true} />
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#FF8C42] rounded-full"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 200}%`,
                  top: `${50 + (Math.random() - 0.5) * 200}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * -50, (Math.random() - 0.5) * 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}