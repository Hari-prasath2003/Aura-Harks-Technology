/**
 * Supabase Database Service
 * Handles form submissions to Supabase database
 * 
 * Database: dorvonirdrbsaqvxbymt
 * Table: form_submissions
 */

import type { PopupFormData } from '../components/PopupForm';
import { supabase, type FormSubmission } from '../utils/supabase/client';

/**
 * Stores form submission in Supabase database
 * @param data - Form submission data
 * @returns Promise that resolves with the submission ID
 */
export async function storeInSupabase(data: PopupFormData): Promise<string> {
  try {
    const submission: FormSubmission = {
      services: data.services,
      email: data.email,
      whatsapp: data.whatsapp,
      action_type: data.actionType,
      timestamp: data.timestamp,
    };

    const { data: result, error } = await supabase
      .from('form_submissions')
      .insert([submission])
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Supabase: Data stored successfully', result.id);
    return result.id;
  } catch (error) {
    console.error('❌ Supabase: Failed to store data', error);
    throw error;
  }
}

/**
 * Stores form data locally as a backup
 * @param data - Form submission data
 */
export function storeLocally(data: PopupFormData): void {
  const submission = {
    ...data,
    id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem('yip_form_submission', JSON.stringify(submission));
  
  const pendingSubmissions = localStorage.getItem('yip_pending_submissions');
  const submissions = pendingSubmissions ? JSON.parse(pendingSubmissions) : [];
  submissions.push(submission);
  localStorage.setItem('yip_pending_submissions', JSON.stringify(submissions));
  
  console.log('📦 LocalStorage: Data stored successfully');
}
