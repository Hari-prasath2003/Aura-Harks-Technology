# 🧪 Email Setup Testing Guide

## Quick Test Checklist

Use this guide to verify your Resend API integration is working correctly.

---

## ✅ Pre-Flight Check

Before testing, verify:

- [x] **API Key configured:** `re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r`
- [x] **Recipient email:** `manikandan1905213@gmail.com`
- [x] **Server code updated:** `/supabase/functions/server/formSubmission.tsx`
- [x] **Positioning errors fixed:** Intersection Observer configured properly
- [ ] **Supabase functions deployed:** Make sure latest code is live

---

## 🎯 Test Scenario 1: Basic Form Submission

### Steps:

1. **Open your website** in a browser
2. **Scroll down slowly** to navigate between sections
3. **Wait for popup** to appear (triggers on section change)
4. **Fill out the form:**
   ```
   Services: ✓ Company Registration & Setup
             ✓ IT Infrastructure
   Email: test@example.com
   WhatsApp: +1234567890
   Action: ✓ Need immediate action
   ```
5. **Click "Submit"**

### Expected Results:

- ✅ Form closes smoothly
- ✅ No error messages appear
- ✅ Console shows success message
- ✅ Email arrives at `manikandan1905213@gmail.com` within 10 seconds

### Console Output Should Show:

```
Received form submission: {services: Array(2), email: "test@example.com", ...}
Form stored with ID: form_1736524800000_abc123xyz
Sending email via Resend API...
✅ Email sent successfully via Resend: {id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
📧 Email ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Email notification sent successfully
```

---

## 🎯 Test Scenario 2: Enquiry Type

### Steps:

1. **Clear cookies** (to reset popup)
   - Chrome: DevTools → Application → Cookies → Clear all
2. **Refresh page**
3. **Scroll to trigger popup**
4. **Fill out form:**
   ```
   Services: ✓ Talent Acquisition & HR
             ✓ Payroll & Compliance
   Email: enquiry@example.com
   WhatsApp: +9876543210
   Action: [ ] Leave unchecked (enquiry mode)
   ```
5. **Click "Submit"**

### Expected Results:

- ✅ Email subject: "🎯 New Enquiry Request - YourIndiaPartner"
- ✅ Badge shows "ENQUIRY" in blue
- ✅ All selected services listed
- ✅ Contact info displayed correctly

---

## 🎯 Test Scenario 3: All Services Selected

### Steps:

1. **Clear cookies** again
2. **Trigger popup**
3. **Select ALL services:**
   ```
   ✓ Company Registration & Setup
   ✓ IT Infrastructure
   ✓ Talent Acquisition & HR
   ✓ Payroll & Compliance
   ✓ Legal & Tax Advisory
   ```
4. **Fill contact info**
5. **Submit**

### Expected Results:

- ✅ Email shows all 5 services
- ✅ Each service has ✓ checkmark
- ✅ Email formatting looks clean
- ✅ No overflow or layout issues

---

## 🔍 Verify Email Content

### Check Email Has:

- [ ] **Subject line** with emoji and action type
- [ ] **Header section** with gradient background
- [ ] **Action type badge** (green for immediate, blue for enquiry)
- [ ] **Services list** with checkmarks
- [ ] **Contact information** as clickable links
  - Email link: `mailto:test@example.com`
  - WhatsApp link: `https://wa.me/1234567890`
- [ ] **Timestamp** in readable format
- [ ] **Footer** with branding
- [ ] **Professional styling** with brand colors (#0163c6, #073265)

---

## 🐛 Troubleshooting

### If email doesn't arrive:

1. **Check spam folder** first
2. **Open browser console** (F12)
3. **Look for errors** in console
4. **Check Resend dashboard:**
   - Go to https://resend.com/emails
   - Login with your account
   - Check "Logs" section
   - Look for your email attempt

### Common Error Messages:

#### ❌ "401 Unauthorized"
**Cause:** Invalid API key  
**Fix:** Verify API key is exactly `re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r`

#### ❌ "403 Forbidden" 
**Cause:** Domain not verified  
**Fix:** Use `onboarding@resend.dev` as sender (already configured)

#### ❌ "Network error"
**Cause:** Supabase function not deployed  
**Fix:** Deploy functions in Supabase dashboard

#### ❌ "Missing required fields"
**Cause:** Form validation failed  
**Fix:** Make sure all fields are filled correctly

---

## 📊 Resend Dashboard Monitoring

### View Sent Emails:

1. Go to https://resend.com
2. Login with your credentials
3. Click **"Emails"** or **"Logs"** in sidebar
4. You should see your test emails

### What to Check:

- **Status:** Should be "Delivered" ✅
- **Recipient:** manikandan1905213@gmail.com
- **Subject:** Matches form submission type
- **Sent at:** Recent timestamp
- **Email ID:** Unique identifier

### If Status Shows:

- **✅ Delivered** - Perfect! Everything working
- **📬 Sent** - In transit, wait a few seconds
- **❌ Bounced** - Email address issue
- **⏸️ Queued** - Being processed
- **🚫 Failed** - Check error details

---

## 🔄 Testing Popup Re-trigger Prevention

### Steps:

1. **Submit form successfully**
2. **Scroll up and down** multiple times
3. **Navigate through all sections**
4. **Refresh page** (F5)
5. **Scroll again**

### Expected Behavior:

- ✅ Popup should NOT appear again
- ✅ Cookie `yip_form_completed=true` should be set
- ✅ localStorage should have submission data
- ✅ Console shows: "User has already completed the form"

### To Reset for Testing:

**Clear cookies:**
```javascript
// In browser console:
document.cookie.split(";").forEach(c => {
  document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
});
localStorage.clear();
location.reload();
```

---

## 📝 Test Data Examples

### Test User 1: Immediate Action
```
Services: Company Registration, IT Infrastructure
Email: john.smith@techcorp.com
WhatsApp: +14155552671
Action: ✓ Immediate
```

### Test User 2: General Enquiry
```
Services: Talent Acquisition, Payroll
Email: sarah.johnson@startup.io
WhatsApp: +442071234567
Action: [ ] Enquiry
```

### Test User 3: Full Service
```
Services: All 5 services selected
Email: operations@globalcorp.com
WhatsApp: +6531234567
Action: ✓ Immediate
```

---

## ✅ Success Criteria

Your email system is working correctly if:

1. ✅ **Form submission completes** without errors
2. ✅ **Email arrives** at manikandan1905213@gmail.com
3. ✅ **Email content** displays correctly (all data visible)
4. ✅ **HTML formatting** looks professional
5. ✅ **Links are clickable** (email, WhatsApp)
6. ✅ **Popup doesn't re-appear** after submission
7. ✅ **Console logs** show success messages
8. ✅ **Resend dashboard** shows "Delivered" status

---

## 🚀 Ready for Production

Once all tests pass:

1. ✅ Email system is production-ready
2. ✅ No further configuration needed
3. ✅ Monitor Resend dashboard regularly
4. ✅ Check spam folder occasionally
5. ✅ Consider domain verification for custom sender

---

## 📞 Need Help?

### If Tests Fail:

1. **Check this guide:** [RESEND_API_SETUP.md](/RESEND_API_SETUP.md)
2. **Review server logs** in Supabase dashboard
3. **Verify Resend dashboard** for error details
4. **Test API key** with a simple curl command:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Test <onboarding@resend.dev>",
    "to": ["manikandan1905213@gmail.com"],
    "subject": "Test Email",
    "html": "<p>If you receive this, your API key works!</p>"
  }'
```

### Expected Response:
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## 📊 Test Results Template

Use this to track your tests:

```
Date: _________
Tester: _________

[ ] Test 1: Basic Submission - Immediate Action
    Result: ___________
    Notes: ___________

[ ] Test 2: Enquiry Submission
    Result: ___________
    Notes: ___________

[ ] Test 3: All Services Selected
    Result: ___________
    Notes: ___________

[ ] Test 4: Email Content Verification
    Result: ___________
    Notes: ___________

[ ] Test 5: Re-trigger Prevention
    Result: ___________
    Notes: ___________

Overall Status: [ ] PASS  [ ] FAIL
Production Ready: [ ] YES  [ ] NO

Issues Found:
_____________________
_____________________
```

---

🎉 **Good luck with testing! Your email system is ready to capture leads!**
