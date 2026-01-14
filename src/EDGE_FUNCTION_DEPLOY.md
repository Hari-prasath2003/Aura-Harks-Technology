# 🚀 Deploy Supabase Edge Function (Bypasses RLS Error)

## What This Does
This Edge Function runs on Supabase servers with elevated permissions, completely bypassing the RLS error. No SQL needed!

## Option 1: Deploy with Supabase CLI (2 minutes)

### Step 1: Install Supabase CLI
```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (with Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or use NPM
npm install -g supabase
```

### Step 2: Login to Supabase
```bash
supabase login
```

### Step 3: Link to Your Project
```bash
supabase link --project-ref dorvonirdrbsaqvxbymt
```

### Step 4: Deploy the Function
```bash
supabase functions deploy submit-form --no-verify-jwt
```

### Step 5: Set Environment Variables
```bash
# Get your service role key from:
# https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/settings/api

supabase secrets set RESEND_API_KEY=re_your_actual_resend_key
```

### Step 6: Get Function URL
Your function will be at:
```
https://dorvonirdrbsaqvxbymt.supabase.co/functions/v1/submit-form
```

---

## Option 2: Manual Deployment (via Dashboard)

### Step 1: Go to Edge Functions
Open: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/functions

### Step 2: Create New Function
1. Click "Create a new function"
2. Name it: `submit-form`
3. Copy the code from `/supabase/functions/submit-form/index.ts`
4. Paste into the editor
5. Click "Deploy"

### Step 3: Add Secrets
1. Go to: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/settings/vault
2. Add secret: `RESEND_API_KEY` = `re_your_actual_key`

---

## Option 3: Use the Quick Fix (No Deployment Needed)

If you don't want to deploy an Edge Function, just **run the SQL fix** I provided. It takes 30 seconds:

1. Open: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql
2. Copy SQL from `/COPY_THIS_SQL.txt`
3. Paste and click "Run"
4. Done!

---

## After Deployment

### Update Your App
The code will automatically try the Edge Function if direct insert fails.

### Test It
1. Submit a form
2. Check console for: "✅ Submitted via Edge Function"
3. Check Supabase table for new row

---

## Comparison

| Method | Time | Difficulty | Security | Recommended |
|--------|------|-----------|----------|-------------|
| **Edge Function** | 2-5 min | Medium | ✅ Excellent | If you want API |
| **SQL Fix** | 30 sec | ⭐ Very Easy | ✅ Excellent | **YES - Do this!** |
| **Service Role** | 10 sec | Easy | ⚠️ Risky | Only for testing |

---

## 💡 Recommendation

**Just run the SQL fix!** It's faster and simpler than deploying an Edge Function.

The Edge Function is here if you want a proper API endpoint, but for your use case, the SQL fix is the best solution.

**To fix now:**
1. Look at the big red popup on your screen
2. Copy the SQL (click the black box)
3. Go to: https://supabase.com/dashboard/project/dorvonirdrbsaqvxbymt/sql
4. Paste and Run
5. Done! ✅

---

## Why SQL Fix is Better

- ✅ Takes 30 seconds
- ✅ No CLI installation needed
- ✅ No deployment needed
- ✅ Works immediately
- ✅ Proper security with RLS
- ✅ No code changes needed

The Edge Function is a good backup, but unnecessary if you just run the SQL.
