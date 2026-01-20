# Popup Form Testing Guide

## Quick Start Testing

### 1. Initial Test (First Visit)
1. Load the website
2. Wait for the loader to finish
3. Scroll down through different sections
4. **Expected:** Popup should appear when you scroll from one section to another
5. **Note:** Each time you navigate to a new section, the popup uses a different animation

### 2. Test Form Submission
1. When popup appears, fill in the form:
   - Select one or more services (at least one required)
   - Enter a valid email address
   - Enter a WhatsApp number (10-15 digits, can include `+`)
   - Choose either "Immediate Action" or "Just Enquiring"
2. Click "Submit Request"
3. **Expected:** 
   - Success animation with spinning sparkles
   - "Thank You!" message
   - Popup closes automatically after 1.5 seconds
4. Continue scrolling
5. **Expected:** Popup should NOT appear again

### 3. Test Form Validation
Open popup and test each validation:

#### Services Validation
- Try to submit without selecting any service
- **Expected Error:** "Please select at least one service"

#### Email Validation
- Leave email empty and submit
- **Expected Error:** "Email is required"
- Enter "invalid-email" and submit
- **Expected Error:** "Please enter a valid email"

#### WhatsApp Validation
- Leave WhatsApp empty and submit
- **Expected Error:** "WhatsApp number is required"
- Enter "123" and submit
- **Expected Error:** "Please enter a valid WhatsApp number (10-15 digits)"

### 4. Test Cookie Persistence
1. Submit the form successfully
2. Refresh the page
3. Scroll through all sections
4. **Expected:** Popup should NOT appear

### 5. Reset for Re-testing

To test the popup again after submitting, run this in browser console:

```javascript
// Clear all form completion data
document.cookie = "yip_form_completed=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
localStorage.removeItem("yip_form_completed");
localStorage.removeItem("yip_form_submission");

// Reload page
location.reload();
```

## Animation Testing

The popup cycles through 8 different animations. To see all of them:

1. Clear form data (see Reset above)
2. Reload page
3. Scroll through sections and count:
   - **Section 1 → 2:** Animation #1 (Fade & Scale)
   - **Section 2 → 3:** Animation #2 (Slide from Top)
   - **Section 3 → 4:** Animation #3 (Slide from Bottom)
   - **Section 4 → 5:** Animation #4 (Slide from Right)
   - **Section 5 → 6:** Animation #5 (Rotate & Scale)
   - **Section 6 → 7:** Animation #6 (3D Flip)
   - **Section 7 → 8:** Animation #7 (Bounce In)
   - **Section 8 → 9:** Animation #8 (Slide from Left)
   - **Section 9 → 10:** Animation #1 again (cycles)

## Backend Testing

### 1. Check Form Data Storage

After submitting a form, check Supabase dashboard:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb/database/tables)
2. Open `kv_store_3cde056d` table
3. Look for keys starting with `form_`
4. **Expected:** You should see your submission with all data

### 2. Check Email Delivery

If you've set up the `RESEND_API_KEY`:

1. Submit a form
2. Check inbox for: **manikandan1905213@gmail.com**
3. **Expected:** Professional HTML email with:
   - Gradient header
   - All form data formatted nicely
   - Clickable email and WhatsApp links
   - Timestamp

If `RESEND_API_KEY` is not set:
- Check browser console
- Look for server logs
- **Expected:** Message about API key not being set

### 3. Test API Endpoint Directly

You can test the backend API using curl or Postman:

```bash
curl -X POST \
  https://kihlcakvcmlxpwkkampb.supabase.co/functions/v1/make-server-3cde056d/submit-form \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpaGxjYWt2Y21seHB3a2thbXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MDY0NDksImV4cCI6MjA4MzE4MjQ0OX0.ZwiezsS1-EQl6vsIgvCOQEmccmmhAb520PpKsrWn26c" \
  -d '{
    "services": ["Company Registration & Setup", "IT Infrastructure"],
    "email": "test@example.com",
    "whatsapp": "+1234567890",
    "actionType": "enquiry",
    "timestamp": "2026-01-10T12:00:00.000Z"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "submissionId": "form_1704902400000_abc123",
  "message": "Form submitted successfully"
}
```

## Email Setup Testing

### To Enable Email Sending:

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Create an API key
4. In Figma Make, add the API key as `RESEND_API_KEY` environment variable
5. Test form submission
6. Check email inbox

### Verify Email Configuration:

```javascript
// In browser console after form submission
// Check if email API key is set
fetch('https://kihlcakvcmlxpwkkampb.supabase.co/functions/v1/make-server-3cde056d/health', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpaGxjYWt2Y21seHB3a2thbXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MDY0NDksImV4cCI6MjA4MzE4MjQ0OX0.ZwiezsS1-EQl6vsIgvCOQEmccmmhAb520PpKsrWn26c'
  }
})
.then(r => r.json())
.then(console.log)
```

## Browser Console Debugging

### Watch for Form Events:

Open browser console (F12) and you should see:

1. **On section change:** "Section changed to: [section-id]"
2. **On popup open:** Popup state updates
3. **On form submit:** "Form submitted successfully: {...}"
4. **On server response:** API response data
5. **On email send:** Email sending status

### Check LocalStorage:

```javascript
// See stored submission
localStorage.getItem('yip_form_submission')

// Check completion flag
localStorage.getItem('yip_form_completed')
```

### Check Cookies:

```javascript
// See all cookies
document.cookie

// Should include: yip_form_completed=true
```

## Common Issues & Solutions

### Issue: Popup not appearing
**Solutions:**
1. Check if form already completed (clear cookies)
2. Verify you're scrolling between sections
3. Check browser console for errors
4. Ensure sections have `id` attributes

### Issue: Form won't submit
**Solutions:**
1. Fill all required fields
2. Use valid email format
3. Use valid phone number (10-15 digits)
4. Check network tab for API errors
5. Verify Supabase connection

### Issue: Email not received
**Solutions:**
1. Verify `RESEND_API_KEY` is set
2. Check spam folder
3. Verify email address in code
4. Check Resend dashboard for logs
5. Ensure Resend domain is verified

### Issue: Multiple popups showing
**Solutions:**
1. Check if cookie is being set properly
2. Verify localStorage is working
3. Clear browser data and test again
4. Check for JavaScript errors

### Issue: Animation not smooth
**Solutions:**
1. Check if GPU acceleration is enabled
2. Try different browser
3. Close other tabs to free up resources
4. Check for conflicting CSS

## Performance Testing

### 1. Popup Load Time
- Popup should appear instantly (no delay)
- Animation should be smooth 60fps
- No layout shift when popup appears

### 2. Form Submission Speed
- Submission should complete in < 2 seconds
- Success animation should play immediately
- Database write should be async (non-blocking)

### 3. Memory Usage
- No memory leaks on multiple open/close
- Intersection Observer should clean up properly
- Event listeners should be removed on unmount

## Mobile Testing

Test on mobile devices or using browser dev tools:

1. Enable mobile view in browser (F12 → Toggle device toolbar)
2. Test different screen sizes (iPhone, iPad, Android)
3. **Expected:**
   - Popup should be responsive
   - Form fields should be touch-friendly
   - Buttons should be easy to tap
   - No horizontal scrolling
   - Animations should be smooth

## Accessibility Testing

1. **Keyboard Navigation:**
   - Tab through form fields
   - Press Enter to submit
   - Press Escape to close popup

2. **Screen Reader:**
   - All fields should have proper labels
   - Error messages should be announced
   - Success message should be announced

## Load Testing

For production readiness:

1. Submit 10 forms rapidly
2. Check if all are stored in database
3. Verify no duplicate submissions
4. Check server logs for errors
5. Monitor email delivery rate

---

## Final Checklist

Before going live, verify:

- [ ] Form validation works for all fields
- [ ] Cookie persistence prevents re-showing
- [ ] Database storage is working
- [ ] Email notifications are sending
- [ ] All 8 animations display correctly
- [ ] Mobile responsive design works
- [ ] No JavaScript errors in console
- [ ] API endpoints return proper responses
- [ ] Success animation displays properly
- [ ] Form resets after submission

## Support Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/kihlcakvcmlxpwkkampb
- **Email Service:** https://resend.com/dashboard
- **Motion Docs:** https://motion.dev/docs
- **Browser DevTools:** F12 or Cmd+Option+I (Mac)
