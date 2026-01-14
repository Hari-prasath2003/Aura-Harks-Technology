# 🐛 Popup Form Debug Guide

## Quick Fix - Popup Not Appearing

### Issue 1: "No sections found" Error

**Symptoms:** Console shows "⚠️ POPUP MANAGER: No sections found!"

**Cause:** The popup manager is trying to set up before the page sections are fully loaded.

**Solution (Automatic):** The system now automatically retries up to 10 times with increasing delays. Just wait a few seconds and check the console for:
```
✅ POPUP MANAGER: Successfully found 12 sections!
```

**Manual Solution:** Refresh the page. The loader ensures sections are rendered before the popup manager activates.

### Issue 2: Cookie Already Set

If you've tested the popup before, a cookie was set to prevent it from showing again. Here's how to fix it:

#### Option 1: Use the Debug Tools (Easiest)
1. Look for the **purple debug button** in the bottom-right corner of the page
2. Click it to open the debug panel
3. Click **"Check Status"** to see if the cookie is set
4. Click **"Clear Cookie"** to remove it
5. **Refresh the page**
6. Scroll between sections to test

#### Option 2: Browser Console
Open your browser's Developer Tools (F12) and run:
```javascript
document.cookie = 'yip_form_completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
localStorage.removeItem('yip_form_completed')
location.reload()
```

#### Option 3: Manual Cookie Deletion
1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Click "Cookies" on the left
4. Find and delete `yip_form_completed`
5. Refresh the page

---

## How the Popup System Works

### Trigger Logic
The popup appears when:
1. ✅ User has NOT completed the form before (no cookie set)
2. ✅ User scrolls to a DIFFERENT section
3. ✅ This is NOT the first section viewed

**Important:** The popup won't show on the first section you view. It only triggers when you navigate FROM one section TO another section.

### Testing Steps
1. **Clear the cookie** (see above)
2. **Refresh the page**
3. **Wait for the page to load** completely
4. **Scroll down** to the second section (e.g., from Hero to Services)
5. **The popup should appear** with a rotating animation

### Expected Console Output

When the page loads, you should see:
```
🔍 POPUP MANAGER: Initializing...
🔍 POPUP MANAGER: Form completed status: false
✅ POPUP MANAGER: Form not completed, setting up observers...
🔍 POPUP MANAGER: Found 12 sections with IDs
   - Section: hero
   - Section: expansion
   - Section: services
   ... etc
🔍 POPUP MANAGER: Creating Intersection Observer...
👀 POPUP MANAGER: Observing section: hero
... etc
✅ POPUP MANAGER: Setup complete!
```

When you scroll to the first section:
```
👁️ POPUP MANAGER: Section "hero" is now visible
ℹ️ POPUP MANAGER: This is the first section view, popup won't show yet
```

When you scroll to the second section:
```
👁️ POPUP MANAGER: Section "services" is now visible
🔍 POPUP MANAGER: Previous section: hero, Current section: services
🎯 POPUP MANAGER: Section change detected! Count: 1
🎬 POPUP MANAGER: Showing popup with animation type 0
```

---

## Debugging Checklist

### ❌ Popup Not Showing At All

Check the console for errors:
- [ ] Open Developer Tools (F12)
- [ ] Go to Console tab
- [ ] Look for POPUP MANAGER messages
- [ ] Check if form is marked as completed

**If you see:** "✅ Form already completed - popup disabled"
- **Solution:** Clear the cookie (see above)

**If you see:** "⚠️ POPUP MANAGER: No sections found!"
- **Issue:** Sections aren't loading properly
- **Solution:** Refresh the page or check for JavaScript errors

**If you don't see ANY console messages:**
- **Issue:** Hook might not be running
- **Solution:** Check for errors in the console, refresh page

### ❌ Popup Shows But Doesn't Submit

Check if:
- [ ] All required fields are filled
- [ ] At least one service is selected
- [ ] Email is valid format
- [ ] WhatsApp number is 10-15 digits
- [ ] Check console for submission errors

### ❌ Email Not Being Sent

Check console for:
```
📧 Sending email via Resend API...
✅ Email sent successfully
```

If you see errors:
- Check Resend API key is correct
- Check internet connection
- Email will fail gracefully - form still saved locally

### ❌ Database Not Storing Submissions

Check console for:
```
💾 Storing in Supabase database...
✅ Stored in database with ID: xxx
```

**If database fails:**
- Data is automatically saved to localStorage as backup
- Email is still sent
- Form is still marked as completed

---

## Animation Types

The popup cycles through 8 different animations:
1. Fade & Scale
2. Slide from Top
3. Slide from Bottom
4. Slide from Right
5. Rotate & Scale
6. 3D Flip
7. Bounce In
8. Slide from Left

Each section change shows a different animation (cycles back to 1 after 8).

---

## Testing Different Animations

To test different animations without scrolling:

1. Open browser console (F12)
2. Clear the cookie first
3. Then run one of these:

```javascript
// Force show popup with animation 0
window.dispatchEvent(new CustomEvent('force-popup', { detail: 0 }))

// Force show popup with animation 3
window.dispatchEvent(new CustomEvent('force-popup', { detail: 3 }))
```

---

## Production Deployment

### Before deploying:

1. **Remove the debug tools** from App.tsx:
```tsx
// Remove this line:
import { PopupDebugTools } from "./components/PopupDebugTools";

// Remove this component:
<PopupDebugTools />
```

2. **Remove debug console logs** (optional):
   - Edit `/hooks/usePopupManagerSupabase.ts`
   - Comment out or remove console.log statements if desired
   - Keep error logs for production debugging

3. **Test in production-like environment:**
   - Clear all cookies and localStorage
   - Test on mobile devices
   - Test different browsers
   - Test slow network conditions

---

## FAQ

**Q: Why doesn't the popup show on the first section?**
A: This is intentional. We don't want to annoy users immediately. The popup only shows when they navigate between sections, indicating they're engaged with the content.

**Q: Can I force the popup to show immediately on page load?**
A: Yes, but not recommended. You can modify the hook to set a timer instead of using the Intersection Observer.

**Q: How do I change how often the popup appears?**
A: Currently, it appears once per user (tracked by cookie for 90 days). To change this, modify the `COOKIE_MAX_AGE` in the hook.

**Q: Can I disable the popup temporarily?**
A: Yes, just comment out the `<PopupForm />` component in App.tsx.

**Q: The popup shows on every section change, is that normal?**
A: No! It should only show ONCE. If it's showing repeatedly, the cookie isn't being set properly. Check the `handleSubmitForm` function.

---

## Need More Help?

1. Check the browser console for detailed logs
2. Use the debug tools to check system status
3. Verify Supabase connection with the test page
4. Check that the SQL migration has been run in Supabase

---

## Debug Tools Location

**File:** `/components/PopupDebugTools.tsx`
**Features:**
- Check popup system status
- Clear cookies
- Clear localStorage
- View all sections
- See cookie state

**To use:**
- Look for purple bug icon in bottom-right corner
- Click to expand the debug panel
- Use buttons to test and debug

---

**Remember:** The debug tools are meant for development only. Remove them before production deployment!