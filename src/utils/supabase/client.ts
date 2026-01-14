/**
 * Supabase Client Configuration
 * YourIndiaPartner B2B Website
 */

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Construct the Supabase URL from project ID
const supabaseUrl = `https://${projectId}.supabase.co`;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, publicAnonKey);

// Database Types
export interface FormSubmission {
  id?: string;
  services: string[];
  email: string;
  whatsapp: string;
  action_type: 'immediate' | 'enquiry';
  timestamp: string;
  created_at?: string;
}
