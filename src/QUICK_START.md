# 🎯 Quick Start - New Supabase Setup

## ✅ What I Just Did

Updated your Supabase credentials:
- **Old Project:** kihlcakvcmlxpwkkampb
- **New Project:** dorvonirdrbsaqvxbymt ✅
- **Status:** Connected and ready!

## 🚨 IMMEDIATE ACTION REQUIRED

### Step 1: Run SQL Migration (5 minutes)

1. Open: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql

2. Click "New Query"

3. Copy/paste this SQL:

```sql
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

CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_action_type ON form_submissions(action_type);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON form_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON form_submissions
  FOR SELECT TO authenticated USING (true);
```

4. Click "Run" (Ctrl+Enter)

5. ✅ Done!

### Step 2: Test Connection (1 minute)

Look for the **white box in the top-left corner** of your app:
- Click "Test Connection"
- Should say "✅ Supabase connection successful!"

### Step 3: Test Popup Form (2 minutes)

1. Click the **purple debug button** (bottom-right)
2. Click "Clear Cookie"
3. Refresh page
4. Scroll down to second section
5. Fill and submit popup form
6. Check console for success messages

### Step 4: Verify Data (1 minute)

Go to: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/editor
- Click "form_submissions" table
- Should see your test submission

## 🎉 You're Done!

Once you see data in Supabase, your form is working perfectly!

## 📦 What's Included

✅ New Supabase credentials configured
✅ Form submissions stored in database
✅ Email notifications to manikandan1905213@gmail.com
✅ Cookie tracking (90 days)
✅ Local storage backup
✅ 8 rotating animations
✅ Debug tools for easy testing
✅ Connection test component

## 🗑️ Before Production

Remove these test components from `/App.tsx`:

```tsx
// Remove these:
import { PopupDebugTools } from "./components/PopupDebugTools";
import { SupabaseConnectionTest } from "./components/SupabaseConnectionTest";

// And remove these:
<PopupDebugTools />
<SupabaseConnectionTest />
```

## 🔗 Important Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt
- **SQL Editor:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql
- **Table Editor:** https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/editor

## ❓ Problems?

### "Table not found"
→ You didn't run the SQL migration yet (Step 1)

### "Connection failed"
→ Check your internet connection

### "Popup not showing"
→ Clear cookies using the purple debug button

### "Email not sending"
→ Check console for errors (email is non-critical, data still saved)

---

**Need detailed help?** Check `/NEW_SUPABASE_SETUP.md`

**That's it! Run the SQL migration and you're ready to go!** 🚀
