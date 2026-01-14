import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

interface FloatingContactButtonProps {
  whatsappNumber: string;
  email: string;
  handleOpenPopup: () => void;
  showFloatingButton: boolean;
}

export function FloatingContactButton({ 
  whatsappNumber, 
  email, 
  handleOpenPopup, 
  showFloatingButton 
}: FloatingContactButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {showFloatingButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.5 
          }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={handleOpenPopup}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative group"
          >
            {/* Pulsing background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0163c6] to-[#073265] opacity-30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main button */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#0163c6] to-[#073265] shadow-lg shadow-[#0163c6]/30 flex items-center justify-center">
              {/* Rotating border effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Icon */}
              <motion.div
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-7 h-7 text-white relative z-10" />
              </motion.div>

              {/* Notification badge */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-xs font-bold">!</span>
              </motion.div>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl">
                    <p className="text-sm font-medium">Contact Us</p>
                    <p className="text-xs text-gray-300">Click to open form</p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}