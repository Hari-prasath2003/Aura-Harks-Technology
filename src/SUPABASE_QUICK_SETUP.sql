-- ============================================
-- YourIndiaPartner Form Submissions Table
-- Quick Setup - Copy & Paste into Supabase SQL Editor
-- ============================================

-- Create the main table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  services TEXT[] NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('immediate', 'enquiry')),
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT email_format CHECK (
    TRIM(email) ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_action_type ON form_submissions(action_type);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies first (in case of conflicts)
DROP POLICY IF EXISTS "Allow public insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON form_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON form_submissions;

-- Allow anonymous users to insert (for public form submissions)
CREATE POLICY "Enable insert for anon users" 
ON form_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin dashboard)
CREATE POLICY "Enable read for authenticated users" 
ON form_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Allow service role full access (for backend operations)
CREATE POLICY "Enable all for service role" 
ON form_submissions
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- Verification Queries
-- ============================================

-- Check if table was created successfully
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_name = 'form_submissions';

-- View table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'form_submissions'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT * FROM pg_policies 
WHERE tablename = 'form_submissions';