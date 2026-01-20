/**
 * Popup Debug Tools Component
 * Temporary component to help debug and test the popup form
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Bug, Trash2, Eye } from "lucide-react";

interface PopupDebugToolsProps {
  onForceShowPopup?: () => void;
}

export function PopupDebugTools({ onForceShowPopup }: PopupDebugToolsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const clearCookies = () => {
    // Clear the form completion cookie
    document.cookie = "yip_form_completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("✅ Cookie cleared! Refresh the page to enable popup again.");
    alert("Cookie cleared! Refresh the page to test the popup again.");
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("yip_form_completed");
    localStorage.removeItem("yip_form_submission");
    localStorage.removeItem("yip_pending_submissions");
    console.log("✅ LocalStorage cleared!");
    alert("LocalStorage cleared! Refresh the page.");
  };

  const checkStatus = () => {
    const hasCookie = document.cookie.split("; ").some(row => row.startsWith("yip_form_completed="));
    const hasLocalStorage = localStorage.getItem("yip_form_completed") !== null;
    const sections = document.querySelectorAll("section[id]");
    
    const status = `
📊 POPUP SYSTEM STATUS:

🍪 Cookie Status: ${hasCookie ? "✅ SET (popup disabled)" : "❌ NOT SET (popup enabled)"}
💾 LocalStorage: ${hasLocalStorage ? "✅ SET" : "❌ NOT SET"}
📄 Sections Found: ${sections.length}

Sections:
${Array.from(sections).map(s => `  - ${s.id}`).join("\n")}

${sections.length === 0 ? "⚠️ WARNING: No sections found! The popup manager will retry automatically." : ""}

To enable popup:
1. Clear cookies using the button below
2. Refresh the page
3. Scroll between sections (after the first section)
    `;
    
    console.log(status);
    alert(status);
  };

  const forceRefresh = () => {
    console.log("🔄 Force refreshing page...");
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-[200]"
    >
      {!isExpanded ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2"
        >
          <Bug className="w-6 h-6" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-80 border-2 border-purple-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-900">Debug Tools</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={checkStatus}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Check Status
            </button>

            <button
              onClick={clearCookies}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cookie
            </button>

            <button
              onClick={clearLocalStorage}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear LocalStorage
            </button>

            {onForceShowPopup && (
              <button
                onClick={onForceShowPopup}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Force Show Popup
              </button>
            )}
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-900">
              <strong>💡 Tips:</strong><br />
              • Popup shows when scrolling between sections<br />
              • First section view won't trigger popup<br />
              • Check console for detailed logs<br />
              • Remove this component in production
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}