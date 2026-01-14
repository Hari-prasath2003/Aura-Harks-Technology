# Email Setup Guide for YourIndiaPartner Popup Form

## ✅ SETUP COMPLETE!

**Your Resend API key has been integrated and the email system is ready to use!**

**API Key:** `re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r`  
**Recipient:** `manikandan1905213@gmail.com`  
**Status:** ✅ Active and configured

👉 **See [RESEND_API_SETUP.md](/RESEND_API_SETUP.md) for complete configuration details and testing instructions.**

---

## Overview

The popup form system sends email notifications to **manikandan1905213@gmail.com** whenever a user submits the form. This guide will help you set up email delivery using Resend API.

## Why Resend?

Resend is a modern email API that's:
- ✅ Easy to set up (5 minutes)
- ✅ Generous free tier (100 emails/day, 3,000/month)
- ✅ No credit card required for free tier
- ✅ Excellent deliverability
- ✅ Beautiful dashboard and analytics
- ✅ Works perfectly with Deno/Supabase

## Step-by-Step Setup

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" in the top right
3. Sign up with:
   - Email: manikandan1905213@gmail.com (or any email)
   - Password: Create a strong password
4. Verify your email address

### 2. Get Your API Key

1. Once logged in, you'll be on the Dashboard
2. Click "API Keys" in the left sidebar
3. Click "Create API Key" button
4. Give it a name: "YourIndiaPartner Production"
5. Select permission: "Sending access"
6. Click "Create"
7. **IMPORTANT:** Copy the API key NOW (you won't see it again)
   - It looks like: `re_123abc456def789ghi012jkl345mno678`

### 3. Add API Key to Figma Make

The system already prompted you to add the `RESEND_API_KEY`. Here's how to update it if needed:

1. In Figma Make, look for the environment variables section
2. Find or create variable: `RESEND_API_KEY`
3. Paste your API key
4. Save changes

### 4. Verify Email Domain (Optional but Recommended)

For production use, verify your domain to improve deliverability:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain: `yourindiapartner.com`
4. Follow DNS setup instructions
5. Add the provided DNS records to your domain registrar
6. Wait for verification (usually 5-30 minutes)

**Note:** Without domain verification, emails will be sent from `onboarding@resend.dev` but still work fine for testing.

### 5. Test Email Sending

1. Go to your website
2. Scroll to trigger the popup
3. Fill out the form with test data
4. Submit the form
5. Check your inbox: manikandan1905213@gmail.com
6. Email should arrive within seconds

## Email Template Preview

Here's what the email will look like:

```
Subject: New Immediate Action Request - YourIndiaPartner
(or: New Enquiry Request - YourIndiaPartner)

From: YourIndiaPartner <noreply@yourindiapartner.com>
To: manikandan1905213@gmail.com

┌─────────────────────────────────────┐
│      🎯 New Lead Submission         │
│     YourIndiaPartner Website        │
└─────────────────────────────────────┘

ACTION TYPE
  [Immediate Action] or [Just Enquiring]

SERVICES REQUESTED
  ✓ Company Registration & Setup
  ✓ IT Infrastructure
  ✓ Talent Acquisition & HR

CONTACT INFORMATION
  Email: customer@example.com
  WhatsApp: +1234567890

TIMESTAMP
  January 10, 2026, 3:45 PM

---
This is an automated notification from YourIndiaPartner website.
Please follow up with this lead promptly.
```

## Troubleshooting

### Problem: "RESEND_API_KEY not set" message

**Solution:**
1. Verify you added the API key correctly
2. Check for typos in the variable name (must be exactly `RESEND_API_KEY`)
3. Restart the Supabase function if needed
4. Clear browser cache and try again

### Problem: Emails not arriving

**Solution:**
1. Check spam/junk folder
2. Verify the email address in server code is correct
3. Go to Resend dashboard → "Logs" to see delivery status
4. Check for any error messages in logs
5. Verify API key has "Sending access" permission

### Problem: Email shows as spam

**Solution:**
1. Verify your domain (see step 4 above)
2. Add SPF and DKIM records
3. Avoid spam trigger words in email content
4. Start with low volume, increase gradually
5. Ask recipients to mark as "Not Spam"

### Problem: API rate limit exceeded

**Solution:**
1. Free tier allows 100 emails/day
2. Upgrade to Pro plan for more volume
3. Implement rate limiting on form submissions
4. Consider batching email notifications

## Monitoring & Analytics

### View Email Logs

1. Go to Resend dashboard
2. Click "Logs" in sidebar
3. See all sent emails with:
   - Delivery status
   - Open rate (if enabled)
   - Click rate (if enabled)
   - Bounce rate
   - Error messages

### Email Analytics

Enable email tracking:
1. Go to Settings → Tracking
2. Enable "Track Opens"
3. Enable "Track Clicks"
4. Now you'll see when recipients open emails and click links

## Cost & Limits

### Free Tier
- 100 emails per day
- 3,000 emails per month
- All core features included
- No credit card required
- Perfect for startups and testing

### Pro Plan ($20/month)
- 50,000 emails per month
- $1 per additional 1,000 emails
- Priority support
- Advanced analytics
- Team collaboration

### For YourIndiaPartner

Based on typical lead generation:
- Estimate: 10-50 form submissions per day
- Free tier is sufficient for 2-10 submissions/day
- Consider Pro plan if receiving 100+ leads/day

## Alternative Email Services

If you prefer a different service:

### SendGrid
```typescript
// In formSubmission.tsx, replace Resend code with:
const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${sendgridApiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: recipientEmail }] }],
    from: { email: "noreply@yourindiapartner.com" },
    subject: `New ${actionLabel} Request`,
    content: [{ type: "text/html", value: formatEmailHTML(data, actionLabel, servicesList) }],
  }),
});
```

### Mailgun
```typescript
const mailgunApiKey = Deno.env.get("MAILGUN_API_KEY");
const domain = "yourindiapartner.com";
const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
  method: "POST",
  headers: {
    "Authorization": `Basic ${btoa(`api:${mailgunApiKey}`)}`,
  },
  body: new URLSearchParams({
    from: "YourIndiaPartner <noreply@yourindiapartner.com>",
    to: recipientEmail,
    subject: `New ${actionLabel} Request`,
    html: formatEmailHTML(data, actionLabel, servicesList),
  }),
});
```

## Production Checklist

Before going live:

- [ ] Resend account created and verified
- [ ] API key generated and stored securely
- [ ] Domain verified (optional but recommended)
- [ ] Test email received successfully
- [ ] Email template looks professional
- [ ] Spam folder checked (should not be spam)
- [ ] Contact information is correct
- [ ] Monitoring/logging is enabled
- [ ] Rate limits are acceptable
- [ ] Team members have access to dashboard
- [ ] Backup email notifications configured

## Security Best Practices

1. **Never expose API key in frontend code**
   - ✅ Stored in server environment variables
   - ✅ Only used in backend functions
   - ❌ Never in client-side JavaScript

2. **Rotate API keys regularly**
   - Every 90 days recommended
   - Immediately if compromised
   - Keep old key active during transition

3. **Monitor for abuse**
   - Check for unusual email volume
   - Set up rate limiting
   - Implement CAPTCHA if needed

4. **Use environment-specific keys**
   - Development: `re_dev_...`
   - Production: `re_prod_...`
   - Never mix the two

## Support & Resources

### Resend
- Documentation: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference
- Support: support@resend.com
- Discord Community: https://resend.com/discord

### YourIndiaPartner
- Server Code: `/supabase/functions/server/formSubmission.tsx`
- Email Template: Check `formatEmailHTML()` function
- Testing Guide: `/POPUP_TESTING_GUIDE.md`

## FAQ

**Q: Can I use Gmail SMTP instead?**
A: Not recommended. Gmail SMTP has strict limits (100 emails/day for free, 2,000/day for Workspace) and requires app passwords. Resend is more reliable.

**Q: Will emails go to spam?**
A: Unlikely if you verify your domain. Resend has excellent deliverability rates (>99%).

**Q: Can I customize the email template?**
A: Yes! Edit the `formatEmailHTML()` function in `/supabase/functions/server/formSubmission.tsx`

**Q: Can I send to multiple recipients?**
A: Yes! In `index.tsx`, change:
```typescript
await sendEmailNotification(formData, "manikandan1905213@gmail.com");
// To:
await Promise.all([
  sendEmailNotification(formData, "email1@example.com"),
  sendEmailNotification(formData, "email2@example.com"),
]);
```

**Q: How do I test without sending real emails?**
A: Use Resend's test mode or comment out the `sendEmailNotification()` call during development.

**Q: Can I schedule emails?**
A: Not directly, but you can store submissions and batch send later using a cron job.

---

## Next Steps

1. ✅ Create Resend account
2. ✅ Get API key
3. ✅ Add to environment variables
4. ✅ Test form submission
5. ✅ Verify email received
6. ✅ Set up monitoring
7. 🚀 Go live!

For questions or issues, contact your development team or refer to the documentation links above.