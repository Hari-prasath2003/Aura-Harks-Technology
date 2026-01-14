/**
 * Supabase Test Page Component
 * Use this component to verify your Supabase integration is working
 * 
 * Usage: 
 * - Import this component in App.tsx temporarily
 * - Or create a /test route and use this component
 * - Run the tests and verify results
 * - Remove this component before production
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { runAllTests, getSubmissionCount, getSubmissionsByType } from '../utils/supabase/test';
import { CheckCircle, XCircle, Play, RefreshCw, Database, TrendingUp } from 'lucide-react';

interface TestResults {
  overall: boolean;
  tests: {
    connection: { success: boolean; message: string; details?: any };
    table: { success: boolean; message: string; details?: any };
    insert: { success: boolean; message: string; details?: any };
  };
}

export function SupabaseTestPage() {
  const [results, setResults] = useState<TestResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{
    total: number;
    immediate: number;
    enquiry: number;
  } | null>(null);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await runAllTests();
      setResults(testResults);

      // Also get stats
      const total = await getSubmissionCount();
      const { immediate, enquiry } = await getSubmissionsByType();
      setStats({ total, immediate, enquiry });
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Database className="w-5 h-5 text-[#0163c6]" />
            <span className="font-semibold text-gray-700">Supabase Integration Test</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test Your Supabase Connection
          </h1>
          <p className="text-gray-600 text-lg">
            Verify that your database is properly configured and ready to store submissions
          </p>
        </motion.div>

        {/* Run Tests Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={runTests}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0163c6] to-[#073265] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                />
                Running Tests...
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Run Connection Tests
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Test Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            {/* Overall Status */}
            <motion.div
              className={`p-6 rounded-2xl shadow-lg ${
                results.overall
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-red-500 to-rose-600'
              } text-white`}
            >
              <div className="flex items-center gap-4">
                {results.overall ? (
                  <CheckCircle className="w-12 h-12" />
                ) : (
                  <XCircle className="w-12 h-12" />
                )}
                <div>
                  <h2 className="text-2xl font-bold">
                    {results.overall ? 'All Tests Passed!' : 'Some Tests Failed'}
                  </h2>
                  <p className="opacity-90">
                    {results.overall
                      ? 'Your Supabase integration is working perfectly'
                      : 'Please check the details below and fix any issues'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Individual Test Results */}
            <div className="grid gap-4">
              {/* Connection Test */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-xl shadow-md border-l-4 ${
                  results.tests.connection.success
                    ? 'bg-white border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  {results.tests.connection.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Connection Test</h3>
                    <p className="text-gray-700">{results.tests.connection.message}</p>
                    {results.tests.connection.details && (
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(results.tests.connection.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Table Test */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl shadow-md border-l-4 ${
                  results.tests.table.success
                    ? 'bg-white border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  {results.tests.table.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Table Existence Test</h3>
                    <p className="text-gray-700">{results.tests.table.message}</p>
                    {!results.tests.table.success && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-semibold mb-1">
                          Action Required:
                        </p>
                        <p className="text-sm text-yellow-700">
                          Run the SQL migration from /SUPABASE_QUICK_SETUP.sql in your Supabase SQL Editor
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Insert Test */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-xl shadow-md border-l-4 ${
                  results.tests.insert.success
                    ? 'bg-white border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  {results.tests.insert.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Insert Permission Test</h3>
                    <p className="text-gray-700">{results.tests.insert.message}</p>
                    {!results.tests.insert.success && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-semibold mb-1">
                          Action Required:
                        </p>
                        <p className="text-sm text-yellow-700">
                          Check your Row Level Security policies in Supabase Table Editor
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Statistics */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#0163c6]" />
                <h3 className="text-xl font-bold text-gray-900">Database Statistics</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-[#0163c6] mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Submissions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-1">{stats.immediate}</div>
                  <div className="text-sm text-gray-600">Immediate Actions</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.enquiry}</div>
                  <div className="text-sm text-gray-600">Enquiries</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        {!results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Before Running Tests:</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0163c6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>
                  Open Supabase Dashboard:{' '}
                  <a
                    href="https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0163c6] underline"
                  >
                    Click Here
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0163c6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Go to SQL Editor and run the migration from /SUPABASE_QUICK_SETUP.sql</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0163c6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Click "Run Connection Tests" button above to verify</span>
              </li>
            </ol>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            This is a development testing page. Remove this component before deploying to production.
          </p>
          <p className="mt-2">
            For complete setup instructions, see{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">/SUPABASE_SETUP_GUIDE.md</code>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
