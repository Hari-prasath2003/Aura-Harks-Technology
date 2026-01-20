/**
 * Database Status Checker
 * Tests Supabase connection and shows real-time status
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/client";
import { CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";

type ConnectionStatus = "checking" | "connected" | "rls_error" | "disconnected";

export function DatabaseStatus() {
  const [status, setStatus] = useState<ConnectionStatus>("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = async () => {
    setStatus("checking");
    setErrorMessage("");
    
    try {
      // Try to insert a test record
      const testData = {
        services: ["Connection Test"],
        email: "test@example.com",
        whatsapp: "+1234567890",
        action_type: "enquiry",
        timestamp: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('form_submissions')
        .insert([testData])
        .select()
        .single();

      if (error) {
        if (error.code === "42501") {
          // RLS policy error
          setStatus("rls_error");
          setErrorMessage("RLS policy blocks inserts - SQL fix needed");
        } else {
          setStatus("disconnected");
          setErrorMessage(error.message);
        }
      } else {
        // Success - delete the test record
        if (data) {
          await supabase
            .from('form_submissions')
            .delete()
            .eq('id', data.id);
        }
        setStatus("connected");
      }
    } catch (err: any) {
      setStatus("disconnected");
      setErrorMessage(err.message || "Unknown error");
    } finally {
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case "connected":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "rls_error":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "disconnected":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Testing connection...";
      case "connected":
        return "Database Connected ✓";
      case "rls_error":
        return "Database: Run SQL Fix";
      case "disconnected":
        return "Database Offline";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "connected":
        return "bg-green-50 border-green-200 text-green-800";
      case "rls_error":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "disconnected":
        return "bg-red-50 border-red-200 text-red-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[250]">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg transition-all ${getStatusColor()}`}
      >
        {getStatusIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
        {status !== "checking" && (
          <button
            onClick={checkConnection}
            className="ml-2 text-xs opacity-60 hover:opacity-100 underline"
            title="Test again"
          >
            Retest
          </button>
        )}
      </div>
      
      {errorMessage && status === "rls_error" && (
        <div className="mt-2 text-xs text-orange-700 bg-orange-50 px-3 py-2 rounded border border-orange-200">
          💡 Form works with localStorage. Click red button to enable database.
        </div>
      )}
      
      {lastChecked && (
        <div className="mt-1 text-[10px] text-gray-500 text-right">
          Last checked: {lastChecked.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
