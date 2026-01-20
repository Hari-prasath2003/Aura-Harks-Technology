-- ============================================
-- YourIndiaPartner Form Submissions Fix
-- ============================================
-- This SQL creates the correct RLS policies to allow
-- anonymous users to submit forms while keeping data secure
-- ============================================

-- Step 1: Clean up any existing policies
DROP POLICY IF EXISTS "Allow public insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON form_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON form_submissions;
DROP POLICY IF EXISTS "Public insert access" ON form_submissions;
DROP POLICY IF EXISTS "Public read access" ON form_submissions;

-- Step 2: Create the correct policy for anonymous form submissions
-- This allows website visitors (anon users) to INSERT new rows
CREATE POLICY "Enable insert for anon users" 
ON form_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Step 3: Allow authenticated users (you) to read all submissions
-- This lets you view form submissions in the Supabase dashboard
CREATE POLICY "Enable read for authenticated users" 
ON form_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Step 4: Give service role full access (for Edge Functions)
-- This allows backend processes to manage data
CREATE POLICY "Enable all for service role" 
ON form_submissions
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- VERIFICATION: Run this to check if it worked
-- ============================================
-- After running the above, you can run this to verify:
-- SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 5;
-- ============================================

-- SUCCESS! Your form submissions should now work.
-- Try submitting your form again - it will save to the database!
