# 🚀 New Supabase Setup - Complete Guide

## ✅ Step 1: Credentials Updated

Your new Supabase credentials have been successfully configured:

- **Project URL:** https://dorvonirdrbsaqvxbymt.supabase.co
- **Project ID:** dorvonirdrbsaqvxbymt
- **Status:** ✅ Connected

## 📋 Step 2: Set Up Database (REQUIRED)

You must run the SQL migration to create the database table before the form can store data.

### How to Run the Migration:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy the SQL Migration**
   - Open the file: `/SUPABASE_QUICK_SETUP.sql` in this project
   - **OR** Copy the SQL below:

```sql
-- Create the main table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  services TEXT[] NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('immediate', 'enquiry')),
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_action_type ON form_submissions(action_type);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (for public form submissions)
CREATE POLICY "Allow public insert" ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

4. **Run the SQL**
   - Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for success message

5. **Verify Setup**
   - After running, you should see: "Success. No rows returned"
   - Click on "Table Editor" in the sidebar
   - You should see a new table called "form_submissions"

## 🧪 Step 3: Test the Connection

### Option 1: Use the Test Page

1. Navigate to your app
2. Add `/test` to the URL (or create a test route)
3. Or use the browser console:

```javascript
// Test Supabase connection
fetch('https://dorvonirdrbsaqvxbymt.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcnZvbmlyZHJic2FxdnhieW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MDM3ODAsImV4cCI6MjA1MjA3OTc4MH0.PlNHFM5pntf8_XJOjHZs7w_UVbb5S7E'
  }
}).then(r => r.json()).then(console.log)
```

### Option 2: Test the Popup Form

1. Clear any existing cookies:
   ```javascript
   document.cookie = 'yip_form_completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
   localStorage.clear()
   location.reload()
   ```

2. Scroll between sections to trigger the popup

3. Fill out and submit the form

4. Check the console for:
   ```
   💾 Storing in Supabase database...
   ✅ Stored in database with ID: xxx-xxx-xxx
   📧 Sending email via Resend API...
   ✅ Email sent successfully
   ```

5. Verify in Supabase Dashboard:
   - Go to Table Editor
   - Click on "form_submissions"
   - You should see your test submission

## 📊 Step 4: View Submitted Data

### In Supabase Dashboard:

1. Go to: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/editor
2. Click on "form_submissions" table
3. View all submissions with timestamps

### Using SQL Queries:

```sql
-- View all submissions
SELECT * FROM form_submissions ORDER BY created_at DESC;

-- Count total submissions
SELECT COUNT(*) as total_submissions FROM form_submissions;

-- Count by action type
SELECT action_type, COUNT(*) as count 
FROM form_submissions 
GROUP BY action_type;

-- Recent submissions (last 24 hours)
SELECT * FROM form_submissions 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

## 🔧 Troubleshooting

### Issue: "relation form_submissions does not exist"

**Solution:** You haven't run the SQL migration yet. Go back to Step 2.

### Issue: "new row violates row-level security policy"

**Solution:** The RLS policies weren't created. Run the SQL migration again.

### Issue: "Failed to fetch"

**Solution:** 
- Check your internet connection
- Verify the Project URL is correct
- Make sure the API key is correct

### Issue: Data not appearing in Supabase

**Check:**
1. Open browser console (F12)
2. Look for these messages:
   ```
   💾 Storing in Supabase database...
   ✅ Stored in database with ID: xxx
   ```
3. If you see errors, they'll be displayed in red

**Common Fixes:**
- Run the SQL migration if not done
- Check API key is correct
- Check project URL is correct
- Refresh the Supabase dashboard

## 📦 What Gets Stored

Each form submission stores:

- **services** (array): Selected services
- **email** (text): User's email
- **whatsapp** (text): User's WhatsApp number
- **action_type** (text): "immediate" or "enquiry"
- **timestamp** (timestamp): When user submitted
- **created_at** (timestamp): When record was created
- **id** (UUID): Unique identifier (auto-generated)

## 🔐 Security Features

✅ Row Level Security (RLS) enabled
✅ Anonymous users can INSERT only
✅ Email format validation
✅ Action type validation (immediate/enquiry only)
✅ Indexed for fast queries
✅ Public API key safe for client-side use

## 📧 Email Notifications

The system also sends emails to: **manikandan1905213@gmail.com**

Using Resend API key: `re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r`

## 🎯 Current Setup Status

| Component | Status |
|-----------|--------|
| Supabase Credentials | ✅ Updated |
| Database Table | ⏳ Run SQL migration |
| RLS Policies | ⏳ Run SQL migration |
| Email Integration | ✅ Configured |
| Cookie Tracking | ✅ Working |
| Local Backup | ✅ Working |
| Popup Form | ✅ Working |
| Debug Tools | ✅ Available |

## 🚀 Next Steps

1. **[REQUIRED] Run the SQL migration** (Step 2 above)
2. **Test the form** by clearing cookies and scrolling
3. **Verify data** appears in Supabase dashboard
4. **Remove debug tools** before production (optional)

## 📱 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt
- **Table Editor:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/editor
- **SQL Editor:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql
- **API Docs:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/api

---

## ⚠️ IMPORTANT: Run SQL Migration Now

**The form will NOT store data in Supabase until you run the SQL migration!**

Go to SQL Editor and paste the SQL from `/SUPABASE_QUICK_SETUP.sql`

---

**Your new Supabase project is ready to go! Just run the SQL migration and test.** 🎉
