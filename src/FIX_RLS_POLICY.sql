-- ============================================
-- FIX RLS POLICY - Run this in Supabase SQL Editor
-- This will fix the "new row violates row-level security policy" error
-- ============================================

-- Step 1: Drop all existing policies (clean slate)
DROP POLICY IF EXISTS "Allow public insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON form_submissions;

-- Step 2: Ensure RLS is enabled
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create the correct policy for anonymous inserts
CREATE POLICY "Enable insert for anon users" 
ON form_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Step 4: Create policy for authenticated users to read
CREATE POLICY "Enable read for authenticated users" 
ON form_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Step 5: Optional - Allow service role full access (for admin)
CREATE POLICY "Enable all for service role" 
ON form_submissions
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- Verification: Check if policies are correct
-- ============================================

-- View all policies on the table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'form_submissions';

-- Expected output should show:
-- 1. "Enable insert for anon users" - FOR INSERT - TO anon
-- 2. "Enable read for authenticated users" - FOR SELECT - TO authenticated
-- 3. "Enable all for service role" - FOR ALL - TO service_role

-- ============================================
-- Test Insert (run this after the policies are created)
-- ============================================

-- This should work without errors:
INSERT INTO form_submissions (
  services,
  email,
  whatsapp,
  action_type,
  timestamp
) VALUES (
  ARRAY['Web Development', 'SEO'],
  'test@example.com',
  '1234567890',
  'enquiry',
  NOW()
);

-- ============================================
-- If you still get errors, try this nuclear option:
-- ============================================

-- Temporarily disable RLS (NOT RECOMMENDED FOR PRODUCTION)
-- ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;

-- Then re-enable with proper policies after testing:
-- ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
