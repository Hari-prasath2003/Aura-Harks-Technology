/**
 * Form Submissions Export Utility
 * Helper functions to export data in various formats
 */

import { supabase } from './supabase/client';
import type { FormSubmission } from './supabase/client';

interface SubmissionWithId extends FormSubmission {
  id: string;
  created_at: string;
}

/**
 * Fetch all submissions from database
 */
export async function fetchAllSubmissions(): Promise<SubmissionWithId[]> {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }

  return data || [];
}

/**
 * Export submissions to CSV format
 */
export function exportToCSV(submissions: SubmissionWithId[]): string {
  const headers = [
    'ID',
    'Date',
    'Time',
    'Action Type',
    'Email',
    'WhatsApp',
    'Services',
  ];

  const rows = submissions.map(sub => [
    sub.id,
    new Date(sub.created_at).toLocaleDateString(),
    new Date(sub.created_at).toLocaleTimeString(),
    sub.action_type,
    sub.email,
    sub.whatsapp,
    sub.services.join('; '),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string = 'submissions.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Export submissions to JSON format
 */
export function exportToJSON(submissions: SubmissionWithId[]): string {
  return JSON.stringify(submissions, null, 2);
}

/**
 * Download JSON file
 */
export function downloadJSON(jsonContent: string, filename: string = 'submissions.json'): void {
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Export and download all submissions as CSV
 */
export async function exportAllToCSV(): Promise<void> {
  try {
    const submissions = await fetchAllSubmissions();
    const csv = exportToCSV(submissions);
    const filename = `form_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
    console.log(`✅ Exported ${submissions.length} submissions to ${filename}`);
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  }
}

/**
 * Export and download all submissions as JSON
 */
export async function exportAllToJSON(): Promise<void> {
  try {
    const submissions = await fetchAllSubmissions();
    const json = exportToJSON(submissions);
    const filename = `form_submissions_${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(json, filename);
    console.log(`✅ Exported ${submissions.length} submissions to ${filename}`);
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  }
}

/**
 * Filter submissions by date range
 */
export async function fetchSubmissionsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<SubmissionWithId[]> {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }

  return data || [];
}

/**
 * Filter submissions by action type
 */
export async function fetchSubmissionsByActionType(
  actionType: 'immediate' | 'enquiry'
): Promise<SubmissionWithId[]> {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('action_type', actionType)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get submissions statistics
 */
export async function getSubmissionStats(): Promise<{
  total: number;
  immediate: number;
  enquiry: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}> {
  const submissions = await fetchAllSubmissions();
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  return {
    total: submissions.length,
    immediate: submissions.filter(s => s.action_type === 'immediate').length,
    enquiry: submissions.filter(s => s.action_type === 'enquiry').length,
    today: submissions.filter(s => new Date(s.created_at) >= today).length,
    thisWeek: submissions.filter(s => new Date(s.created_at) >= weekAgo).length,
    thisMonth: submissions.filter(s => new Date(s.created_at) >= monthAgo).length,
  };
}

/**
 * Get most requested services
 */
export async function getMostRequestedServices(): Promise<Array<{ service: string; count: number }>> {
  const submissions = await fetchAllSubmissions();
  
  const serviceCounts: Record<string, number> = {};
  
  submissions.forEach(sub => {
    sub.services.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
  });

  return Object.entries(serviceCounts)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);
}

// Example usage in console:
// import { exportAllToCSV, getSubmissionStats } from './utils/export';
// exportAllToCSV();
// getSubmissionStats().then(stats => console.log(stats));
