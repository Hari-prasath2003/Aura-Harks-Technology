/**
 * Info Banner - Shows system status in a friendly way
 */

import { useState } from "react";
import { X, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function InfoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[200] bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <strong className="text-green-700">✅ Form System Active</strong> - Data saves locally to your browser. 
                  <span className="hidden sm:inline"> To enable database sync, click the red button (bottom-left) and run the 30-second SQL fix.</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
