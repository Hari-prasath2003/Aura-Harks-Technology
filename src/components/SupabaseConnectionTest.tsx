/**
 * Supabase Connection Test Component
 * Quick verification that new credentials are working
 */

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, RefreshCw, Database } from "lucide-react";
import { supabase } from "../utils/supabase/client";

export function SupabaseConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
    details?: any;
  }>({
    status: "idle",
    message: "Click to test Supabase connection",
  });

  const testConnection = async () => {
    setTesting(true);
    setResult({ status: "idle", message: "Testing connection..." });

    try {
      // Test 1: Check if we can connect
      const { data: healthCheck, error: healthError } = await supabase
        .from("form_submissions")
        .select("count")
        .limit(0);

      if (healthError) {
        if (healthError.message.includes("relation") || healthError.message.includes("does not exist")) {
          setResult({
            status: "error",
            message: "❌ Table not found! You need to run the SQL migration.",
            details: {
              error: healthError.message,
              solution: "Go to Supabase SQL Editor and run SUPABASE_QUICK_SETUP.sql",
              sqlFile: "/SUPABASE_QUICK_SETUP.sql"
            }
          });
        } else if (healthError.message.includes("row-level security") || healthError.code === "42501") {
          setResult({
            status: "error",
            message: "❌ RLS Policy Error! Anonymous inserts are blocked.",
            details: {
              error: healthError.message,
              solution: "Run FIX_RLS_POLICY.sql to fix the permissions",
              sqlFile: "/FIX_RLS_POLICY.sql",
              quickFix: "Copy the SQL from FIX_RLS_POLICY.sql and run it in Supabase SQL Editor"
            }
          });
        } else {
          setResult({
            status: "error",
            message: "❌ Connection failed",
            details: healthError
          });
        }
        setTesting(false);
        return;
      }

      // Test 2: Try to fetch recent submissions
      const { data: submissions, error: fetchError } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (fetchError) {
        setResult({
          status: "error",
          message: "❌ Failed to fetch data",
          details: fetchError
        });
        setTesting(false);
        return;
      }

      // Success!
      setResult({
        status: "success",
        message: "✅ Supabase connection successful!",
        details: {
          projectUrl: "https://dorvonirdrbsaqvxbymt.supabase.co",
          projectId: "dorvonirdrbsaqvxbymt",
          tableExists: true,
          totalSubmissions: submissions?.length || 0,
          recentSubmissions: submissions || []
        }
      });
    } catch (error: any) {
      setResult({
        status: "error",
        message: "❌ Unexpected error",
        details: error
      });
    }

    setTesting(false);
  };

  return (
    <div className="fixed top-4 left-4 z-[200] max-w-md">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-gray-900">Supabase Connection</h3>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <strong>Project:</strong> dorvonirdrbsaqvxbymt
            </div>
            <div>
              <strong>URL:</strong>{" "}
              <a
                href="https://dorvonirdrbsaqvxbymt.supabase.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={testConnection}
          disabled={testing}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
        >
          {testing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              Testing...
            </>
          ) : (
            <>
              <Database className="w-4 h-4" />
              Test Connection
            </>
          )}
        </button>

        {result.status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              result.status === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start gap-2">
              {result.status === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div
                  className={`font-semibold ${
                    result.status === "success" ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {result.message}
                </div>
                {result.details && (
                  <div className="mt-2 text-xs">
                    {result.status === "success" ? (
                      <div className="space-y-1 text-green-800">
                        <div>
                          📊 <strong>Submissions:</strong>{" "}
                          {result.details.totalSubmissions}
                        </div>
                        {result.details.totalSubmissions > 0 && (
                          <div className="mt-2 p-2 bg-white rounded">
                            <strong>Recent Submissions:</strong>
                            {result.details.recentSubmissions.map((sub: any) => (
                              <div key={sub.id} className="text-xs mt-1 p-1 border-l-2 border-green-400 pl-2">
                                {sub.email} - {sub.action_type}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2 text-red-800">
                        {result.details.solution && (
                          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <strong>💡 Solution:</strong>
                            <div>{result.details.solution}</div>
                            {result.details.sqlFile && (
                              <div className="mt-1 text-xs">
                                File: <code>{result.details.sqlFile}</code>
                              </div>
                            )}
                            {result.details.quickFix && (
                              <div className="mt-1 text-xs">
                                Quick Fix: <code>{result.details.quickFix}</code>
                              </div>
                            )}
                          </div>
                        )}
                        {result.details.error && (
                          <details className="text-xs">
                            <summary className="cursor-pointer">View Error</summary>
                            <pre className="mt-1 p-2 bg-white rounded overflow-auto">
                              {JSON.stringify(result.details.error, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-900">
            <strong>📝 Next Steps:</strong>
            <br />
            1. Run SQL migration in Supabase
            <br />
            2. Test the connection
            <br />
            3. Test the popup form
            <br />
            4. Remove this component before production
          </p>
        </div>
      </motion.div>
    </div>
  );
}