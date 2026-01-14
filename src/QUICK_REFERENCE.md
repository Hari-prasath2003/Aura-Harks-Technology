# 🚀 Quick Reference - Supabase Integration

## ⚡ TL;DR - 30 Second Setup

1. **Copy SQL**: Open `/SUPABASE_QUICK_SETUP.sql`
2. **Paste & Run**: In [Supabase SQL Editor](https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb/sql)
3. **Done!** ✅ Your form submissions will now save to database

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `/hooks/usePopupManagerSupabase.ts` | Main popup logic with Supabase |
| `/utils/supabase/client.ts` | Supabase configuration |
| `/components/PopupForm.tsx` | Form UI component |
| `/SUPABASE_QUICK_SETUP.sql` | Copy-paste SQL migration |
| `/components/AdminDashboard.tsx` | View submissions (optional) |
| `/components/SupabaseTestPage.tsx` | Test connection (optional) |

---

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb
- **SQL Editor**: https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb/sql
- **Table Editor**: https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb/editor
- **Project ID**: `kihlcakvcmlxpwkkampb`

---

## 💾 Database Quick Commands

### View All Submissions
```sql
SELECT * FROM form_submissions 
ORDER BY created_at DESC;
```

### Count Submissions
```sql
SELECT COUNT(*) FROM form_submissions;
```

### Today's Submissions
```sql
SELECT * FROM form_submissions 
WHERE DATE(created_at) = CURRENT_DATE;
```

### Export as CSV
```sql
COPY (SELECT * FROM form_submissions ORDER BY created_at DESC) 
TO STDOUT WITH CSV HEADER;
```

---

## 🛠️ Testing Your Setup

### Option 1: Browser Console
```javascript
// Paste in browser console
import { runAllTests } from './utils/supabase/test';
runAllTests();
```

### Option 2: Use Test Page (Recommended)
1. Import `SupabaseTestPage` component in App.tsx temporarily
2. Navigate to it and click "Run Tests"
3. See visual results
4. Remove before production

---

## 🎯 What Gets Stored

Each form submission saves:
- ✅ Selected services (array)
- ✅ Email address
- ✅ WhatsApp number
- ✅ Action type (immediate/enquiry)
- ✅ Timestamp
- ✅ Auto-generated ID

---

## 📧 Email Configuration

**Current Setup:**
- Recipient: `manikandan1905213@gmail.com`
- Sender: `YourIndiaPartner <onboarding@resend.dev>`
- API: Resend

**To Change Recipient:**
Edit line 172 in `/hooks/usePopupManagerSupabase.ts`

---

## 🔒 Security Features

✅ **RLS Enabled** - Data is protected
✅ **Public INSERT** - Anyone can submit forms
✅ **Authenticated READ** - Only admins can view
✅ **Email Validation** - Database-level checks

---

## 🎨 Features Active

✅ 8 rotating popup animations
✅ Supabase database storage
✅ Resend email notifications
✅ 90-day cookie tracking
✅ Local storage fallback
✅ Mobile responsive
✅ Form validation
✅ Success animations

---

## 🆘 Troubleshooting

### Form not saving to database?
1. Run SQL migration first
2. Check Supabase RLS policies
3. Verify project ID in `/utils/supabase/info.tsx`

### No emails arriving?
1. Check spam folder
2. Verify Resend API key
3. Check browser console for errors

### Test the connection
Use `/components/SupabaseTestPage.tsx` to diagnose issues

---

## 📊 View Submissions

**Method 1: Supabase Dashboard**
- Go to Table Editor
- Select `form_submissions`
- View all data

**Method 2: Admin Dashboard (Optional)**
```typescript
import { AdminDashboard } from './components/AdminDashboard';
// Use in a protected admin route
```

**Method 3: Export CSV**
- Click "Export" in Admin Dashboard
- Or run SQL COPY command

---

## 🔄 System Status

| Component | Status |
|-----------|--------|
| Supabase Client | ✅ Connected |
| Database Table | ⚠️ Run migration |
| RLS Policies | ⚠️ Run migration |
| Email API | ✅ Active |
| Cookie Tracking | ✅ Active |
| Animations | ✅ Working |

---

## 📝 Next Steps

1. [ ] Run SQL migration
2. [ ] Test form submission
3. [ ] Check Supabase table for data
4. [ ] Verify email arrives
5. [ ] (Optional) Set up admin dashboard
6. [ ] Deploy to production

---

## 📞 Support Files

- **Complete Guide**: `/SUPABASE_SETUP_GUIDE.md`
- **Status**: `/SUPABASE_INTEGRATION_COMPLETE.md`
- **SQL Migration**: `/SUPABASE_QUICK_SETUP.sql`
- **Migration Full**: `/supabase/migrations/001_create_form_submissions.sql`

---

## 💡 Pro Tips

1. **Test First**: Use test page before production
2. **Backup API Key**: Store Resend key in env vars
3. **Monitor**: Check Supabase logs regularly
4. **Export Data**: Backup submissions monthly
5. **Analytics**: Use SQL queries for insights

---

**Status**: Ready for Production ✅  
**Last Updated**: January 10, 2026  
**Version**: 1.0
