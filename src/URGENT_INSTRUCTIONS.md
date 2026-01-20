# 🚨 URGENT: Fix RLS Error in 3 Steps

## Your Error:
```
new row violates row-level security policy for table "form_submissions"
```

## ✅ Solution (Takes 60 seconds):

### Step 1: Copy SQL
**Option A:** Click the black text box in the red alert on your screen (top-right corner) and press **Ctrl+A** then **Ctrl+C**

**Option B:** Copy everything from the file `/COPY_THIS_SQL.txt`

**Option C:** Copy this SQL:
```sql
DROP POLICY IF EXISTS "Allow public insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON form_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON form_submissions;

CREATE POLICY "Enable insert for anon users" 
ON form_submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" 
ON form_submissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable all for service role" 
ON form_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### Step 2: Open Supabase SQL Editor
Click this link: **https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql**

### Step 3: Paste & Run
1. **Paste** the SQL (Ctrl+V or Cmd+V)
2. Click the **"Run"** button (or press Ctrl+Enter)
3. You should see "Success. No rows returned"
4. **Done!** Go back and test your form

---

## What This Does:
- Allows anonymous website visitors to submit forms
- Keeps your data secure with proper permissions
- Takes 60 seconds to fix

---

## Still Having Issues?

### If the SQL won't run:
1. Make sure you're in the right project (`dorvonirdrbsaqvxbymt`)
2. Check that the table `form_submissions` exists
3. Run the setup SQL first: `/SUPABASE_QUICK_SETUP.sql`

### If the form still doesn't work after running SQL:
1. Check the browser console for errors
2. Verify the Supabase connection test (top-left corner)
3. Make sure the anon key is correct in `/utils/supabase/info.tsx`

### About the Email Error:
The "Failed to fetch" email error is **separate** and **non-critical**. Your data will still save to Supabase. The email API might have CORS restrictions - that's normal and doesn't affect form functionality.

---

## Visual Helpers on Your Screen:

1. **🚨 Red Alert Box (TOP-RIGHT)** - Main fix helper with SQL
2. **📊 Connection Test (TOP-LEFT)** - Shows Supabase status
3. **🐛 Debug Tools (BOTTOM-RIGHT)** - Purple "Reset Popup" button
4. **🚨 Emergency Modal (FULLSCREEN)** - Large popup with instructions

---

## Quick Checklist:
- [ ] Copy the SQL
- [ ] Open Supabase SQL Editor
- [ ] Paste and Run
- [ ] Test form submission
- [ ] ✅ Success!

---

**Estimated Time:** 60 seconds
**Difficulty:** Very Easy
**Files to Use:** `/COPY_THIS_SQL.txt` or the red box on screen
