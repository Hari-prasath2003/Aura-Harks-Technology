/**
 * RLS Fix Helper Component
 * Shows the exact SQL to fix the RLS policy error
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, AlertTriangle, ExternalLink } from "lucide-react";

const FIX_SQL = `-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON form_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON form_submissions;

-- Create the correct policy for anonymous inserts
CREATE POLICY "Enable insert for anon users" 
ON form_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Enable read for authenticated users" 
ON form_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Allow service role full access
CREATE POLICY "Enable all for service role" 
ON form_submissions
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);`;

export function RLSFixHelper() {
  const [copied, setCopied] = useState(false);
  const [showSQL, setShowSQL] = useState(true);

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(FIX_SQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback: Select the text in the textarea
      const textarea = document.getElementById('fix-sql-textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (e) {
          console.error("Copy failed:", e);
          alert("Copy failed! Please manually select and copy the SQL below.");
        }
      }
    }
  };

  const openSupabaseSQL = () => {
    window.open("https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql", "_blank");
  };

  return (
    <div className="fixed top-4 right-4 z-[200] max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-2xl p-6 border-2 border-red-300"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-900 text-lg">🚨 RLS Policy Error Detected</h3>
            <p className="text-sm text-red-700 mt-1">
              Anonymous users can't insert data. Fix this in 2 minutes!
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="font-semibold text-gray-900">Copy the SQL Fix</span>
            </div>
            
            <button
              onClick={copyToClipboard}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy SQL to Clipboard
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* SQL Preview */}
            <details className="mt-3" open>
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 mb-2">
                📋 Or manually select and copy from here:
              </summary>
              <textarea
                id="fix-sql-textarea"
                readOnly
                value={FIX_SQL}
                onClick={(e) => e.currentTarget.select()}
                className="w-full h-48 p-3 bg-gray-900 text-green-400 rounded text-xs font-mono overflow-auto border-2 border-gray-700 focus:border-blue-500 focus:outline-none cursor-text"
                style={{ resize: 'vertical' }}
              />
              <p className="text-xs text-gray-500 mt-1">
                👆 Click the box above to select all, then Ctrl+C (or Cmd+C) to copy
              </p>
            </details>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="font-semibold text-gray-900">Open Supabase SQL Editor</span>
            </div>
            
            <button
              onClick={openSupabaseSQL}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Open SQL Editor →
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="font-semibold text-gray-900">Paste & Run</span>
            </div>
            <p className="text-sm text-gray-700">
              Paste the SQL in the editor and click <strong>"Run"</strong> (or press Ctrl+Enter)
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </div>
              <span className="font-semibold text-gray-900">Test Your Form</span>
            </div>
            <p className="text-sm text-gray-700">
              Come back and submit the popup form. It should work now! ✨
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-900">
            <strong>⚡ Quick Explanation:</strong> Your table has Row Level Security enabled, but
            anonymous users (website visitors) aren't allowed to insert data. This SQL adds the
            missing permission policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}