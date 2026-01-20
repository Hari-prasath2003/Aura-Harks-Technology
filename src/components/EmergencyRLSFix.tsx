/**
 * Emergency RLS Fix - Ultra Simple Version
 * Shows SQL directly, no fancy UI
 */

import { useState } from "react";

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

export function EmergencyRLSFix() {
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(true); // Start minimized

  if (dismissed) return null;

  // Minimized version - just a button
  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 z-[300]">
        <button
          onClick={() => setMinimized(false)}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 flex items-center gap-2 font-semibold animate-pulse"
        >
          <span className="text-2xl">🚨</span>
          <span>Fix Database Error</span>
        </button>
      </div>
    );
  }

  // Full version
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🚨 Enable Database Storage</h2>
              <p className="text-red-100">
                Follow these 3 simple steps to enable cloud database sync (30 seconds):
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMinimized(true)}
                className="text-white/80 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
                title="Minimize"
              >
                −
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/80 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
                title="Close (form still works with localStorage)"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Step 1: Copy this SQL
            </h3>
            <p className="text-gray-600 mb-3">
              Click the text box below and press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+A</kbd> then <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+C</kbd> (or Cmd on Mac)
            </p>
            <textarea
              readOnly
              value={FIX_SQL}
              onClick={(e) => e.currentTarget.select()}
              className="w-full h-64 p-4 bg-gray-900 text-green-400 rounded-lg text-sm font-mono border-2 border-gray-700 focus:border-blue-500 focus:outline-none"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Step 2: Open Supabase SQL Editor
            </h3>
            <p className="text-gray-600 mb-3">
              Click this button to open your Supabase SQL Editor in a new tab
            </p>
            <a
              href="https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open SQL Editor
            </a>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Step 3: Paste and Run
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Paste the SQL you copied (Ctrl+V or Cmd+V) into the SQL Editor</li>
              <li>Click the <strong className="text-purple-600">"Run"</strong> button (or press Ctrl+Enter)</li>
              <li>You should see a success message</li>
              <li>Come back here and try your form again - it will work! ✅</li>
            </ol>
          </div>

          {/* Why this happened */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h4 className="font-bold text-yellow-900 mb-2">🤔 Why did this happen?</h4>
            <p className="text-yellow-800 text-sm">
              Your Supabase table has <strong>Row Level Security (RLS)</strong> enabled for protection, 
              but it's missing a policy that allows anonymous users (website visitors) to submit forms. 
              The SQL above adds this missing permission while keeping your data secure.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t">
            <button
              onClick={() => setDismissed(true)}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              I'll fix it later
            </button>
            <a
              href="https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Copy to clipboard when they click
                const textarea = document.createElement('textarea');
                textarea.value = FIX_SQL;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                  document.execCommand('copy');
                } catch (e) {
                  console.error('Copy failed:', e);
                }
                document.body.removeChild(textarea);
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Copy SQL & Open Editor →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}