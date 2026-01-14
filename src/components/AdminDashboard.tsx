/**
 * Admin Dashboard Component
 * View and manage form submissions from Supabase
 * 
 * Usage: Import and use this component in a protected admin route
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../utils/supabase/client';
import { Download, RefreshCw, Mail, Phone, Calendar, Tag } from 'lucide-react';
import type { FormSubmission } from '../utils/supabase/client';

interface SubmissionWithId extends FormSubmission {
  id: string;
  created_at: string;
}

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<SubmissionWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    immediate: 0,
    enquiry: 0,
  });

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setSubmissions(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const immediate = data?.filter(s => s.action_type === 'immediate').length || 0;
      const enquiry = data?.filter(s => s.action_type === 'enquiry').length || 0;

      setStats({ total, immediate, enquiry });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = ['ID', 'Services', 'Email', 'WhatsApp', 'Action Type', 'Timestamp', 'Created At'];
    const rows = submissions.map(sub => [
      sub.id,
      sub.services.join('; '),
      sub.email,
      sub.whatsapp,
      sub.action_type,
      sub.timestamp,
      sub.created_at,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Form Submissions Dashboard
          </motion.h1>
          <p className="text-gray-600">
            View and manage all submissions from YourIndiaPartner website
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Tag className="w-6 h-6 text-[#0163c6]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Immediate Actions</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.immediate}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Enquiries</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.enquiry}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchSubmissions}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#0163c6] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToCSV}
            disabled={submissions.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#0163c6] border-2 border-[#0163c6] rounded-xl font-semibold hover:bg-[#0163c6]/5 transition-all duration-300 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6"
          >
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-[#0163c6] border-t-transparent rounded-full mx-auto"
            />
            <p className="text-gray-600 mt-4">Loading submissions...</p>
          </div>
        )}

        {/* Submissions Table */}
        {!loading && submissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#0163c6] to-[#073265] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Services</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((submission, index) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {new Date(submission.created_at).toLocaleDateString()} <br />
                            <span className="text-xs text-gray-500">
                              {new Date(submission.created_at).toLocaleTimeString()}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.action_type === 'immediate'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {submission.action_type === 'immediate' ? '🚀 Immediate' : '💬 Enquiry'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {submission.services.slice(0, 2).map((service, i) => (
                            <div key={i} className="text-sm text-gray-700">
                              • {service}
                            </div>
                          ))}
                          {submission.services.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{submission.services.length - 2} more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-[#0163c6] hover:underline"
                            >
                              {submission.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a
                              href={`https://wa.me/${submission.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0163c6] hover:underline"
                            >
                              {submission.whatsapp}
                            </a>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && submissions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">
              Form submissions will appear here once users start submitting.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
