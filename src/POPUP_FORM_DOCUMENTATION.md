# Popup Form System Documentation

## Overview

The YourIndiaPartner website now features an intelligent popup form system that appears when users navigate between different sections. The popup uses rotating animation effects to keep the experience fresh and engaging.

## System Architecture

### 1. **Popup Form Component** (`/components/PopupForm.tsx`)
- Handles the visual presentation and user interaction
- Features 8 different animation variants that rotate on each appearance
- Includes form validation for all fields
- Displays success animation upon submission

**Features:**
- Service multi-select with 8 service options
- Email validation with regex pattern
- WhatsApp number validation (10-15 digits)
- Action type selection (Immediate Action vs. Enquiry)
- Real-time error validation
- Success overlay with animated confirmation

### 2. **Cookie Management** (`/utils/formCookies.ts`)
- Manages form completion tracking via browser cookies
- Prevents popup from reappearing after form submission
- Cookie expires after 365 days
- Utility functions:
  - `hasCompletedForm()` - Check if user completed form
  - `markFormAsCompleted()` - Mark form as done
  - `clearFormCompletion()` - Reset for testing

### 3. **Popup Manager Hook** (`/hooks/usePopupManager.ts`)
- Orchestrates popup display logic
- Uses Intersection Observer API to detect section changes
- Manages animation rotation
- Handles form submission to backend
- Stores completion status in both cookies and localStorage

**Section Detection:**
- Monitors all `<section id="...">` elements
- Triggers when section reaches center of viewport
- Increments animation type on each section change

### 4. **Server Backend** (`/supabase/functions/server/`)

#### **Form Submission Handler** (`formSubmission.tsx`)
- Processes incoming form data
- Stores submissions in Supabase KV store
- Sends email notifications via Resend API
- Generates both plain text and HTML email formats

#### **API Endpoint** (`index.tsx`)
- POST `/make-server-3cde056d/submit-form`
- Validates required fields
- Returns submission ID on success
- Handles errors gracefully

### 5. **Main App Integration** (`/App.tsx`)
- Imports and initializes popup system
- Passes submission handler to popup
- Renders popup component at root level (z-index 100+)

## Form Data Structure

```typescript
interface PopupFormData {
  services: string[];           // Selected services
  email: string;                // User email
  whatsapp: string;             // WhatsApp number
  actionType: "immediate" | "enquiry"; // Intent type
  timestamp: string;            // ISO timestamp
}
```

## Available Services

1. Company Registration & Setup
2. Talent Acquisition & HR
3. Payroll & Compliance
4. IT Infrastructure
5. Legal & Regulatory
6. Office Space & Facilities
7. Accounting & Tax
8. Market Entry Strategy

## Animation Variants

The popup cycles through 8 different animation effects:

1. **Fade & Scale** - Smooth zoom in/out
2. **Slide from Top** - Drops down from above
3. **Slide from Bottom** - Rises from below
4. **Slide from Right** - Enters from right side
5. **Rotate & Scale** - Spins while scaling
6. **3D Flip** - Y-axis rotation effect
7. **Bounce In** - Spring-based bounce
8. **Slide from Left** - Enters from left side

## Email Notification

Emails are sent to: **manikandan1905213@gmail.com**

### Email Content Includes:
- Selected services list
- Contact information (email & WhatsApp)
- Action type badge (color-coded)
- Submission timestamp
- Direct links to email and WhatsApp

### Email Format:
- Professional HTML design
- Gradient header with brand colors
- Organized sections with clear labels
- Responsive layout
- Color-coded badges for action types

## Data Storage

### Database (Supabase KV Store)
```javascript
Key: form_{timestamp}_{randomId}
Value: {
  services: [...],
  email: "...",
  whatsapp: "...",
  actionType: "...",
  timestamp: "...",
  id: "...",
  createdAt: "..."
}
```

### LocalStorage Backup
```javascript
Key: yip_form_submission
Value: {
  ...formData,
  submissionId: "...",
  submittedAt: "..."
}
```

### Cookie
```
Name: yip_form_completed
Value: "true"
Expires: 365 days
Path: /
SameSite: Strict
```

## Setup Instructions

### 1. Email API Configuration

The system uses Resend API for sending emails. To enable email functionality:

1. Go to [Resend.com](https://resend.com) and create an account
2. Generate an API key
3. Add the API key to your Supabase environment variables:
   - Variable name: `RESEND_API_KEY`
   - Value: Your Resend API key

**Note:** Without the API key, the system will still work but emails won't be sent. Form data will still be stored in the database.

### 2. Testing the Popup

To test the popup system during development:

```javascript
// In browser console:
// Clear form completion status
document.cookie = "yip_form_completed=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
localStorage.removeItem("yip_form_completed");
localStorage.removeItem("yip_form_submission");

// Then reload the page and scroll between sections
```

## User Flow

1. **User lands on website** → Loader animation plays
2. **User scrolls to first section** → No popup (initial section)
3. **User scrolls to second section** → Popup appears with Animation #1
4. **User closes popup or scrolls** → Popup closes
5. **User scrolls to third section** → Popup appears with Animation #2
6. **User fills and submits form** → Success animation plays
7. **Form marked as completed** → Cookie set, localStorage updated
8. **User continues browsing** → No more popups appear
9. **User returns later** → Cookie prevents popup from showing

## API Reference

### Submit Form
```
POST https://{projectId}.supabase.co/functions/v1/make-server-3cde056d/submit-form

Headers:
  Content-Type: application/json
  Authorization: Bearer {publicAnonKey}

Body:
  {
    "services": ["Service 1", "Service 2"],
    "email": "user@example.com",
    "whatsapp": "+1234567890",
    "actionType": "immediate",
    "timestamp": "2026-01-10T..."
  }

Response (Success):
  {
    "success": true,
    "submissionId": "form_1704902400000_abc123",
    "message": "Form submitted successfully"
  }

Response (Error):
  {
    "success": false,
    "error": "Error message"
  }
```

## Form Validation Rules

### Services
- **Required:** At least 1 service must be selected
- **Error:** "Please select at least one service"

### Email
- **Required:** Yes
- **Pattern:** Standard email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Errors:** 
  - "Email is required"
  - "Please enter a valid email"

### WhatsApp
- **Required:** Yes
- **Pattern:** `/^\+?[1-9]\d{9,14}$/` (10-15 digits)
- **Errors:**
  - "WhatsApp number is required"
  - "Please enter a valid WhatsApp number (10-15 digits)"

## Troubleshooting

### Popup not appearing
1. Check browser console for errors
2. Verify sections have proper `id` attributes
3. Check if form completion cookie exists
4. Clear cookies and localStorage

### Form submission fails
1. Check network tab for API errors
2. Verify Supabase connection
3. Check server logs in Supabase dashboard
4. Ensure all required fields are filled

### Emails not sending
1. Verify `RESEND_API_KEY` is set
2. Check server logs for email errors
3. Verify Resend account is active
4. Check Resend dashboard for delivery status

## Security Considerations

- Form data is validated on both client and server
- API endpoints are CORS-protected
- Personal data is stored securely in Supabase
- Cookies use `SameSite=Strict` for CSRF protection
- Email content is sanitized before sending

## Performance Optimizations

- Popup animations use GPU-accelerated transforms
- Intersection Observer is more efficient than scroll events
- Form validation happens on change (real-time feedback)
- Success animation plays while background submission occurs
- Lazy loading prevents popup from affecting initial page load

## Future Enhancements

Potential improvements for the system:

1. **A/B Testing** - Test different animation styles
2. **Custom Triggers** - Time-based or exit-intent popups
3. **Multi-step Form** - Break form into wizard steps
4. **Analytics Integration** - Track conversion rates
5. **SMS Notifications** - Send alerts via WhatsApp API
6. **CRM Integration** - Auto-create leads in CRM systems
7. **Popup Scheduling** - Show at specific times/dates
8. **Geo-targeting** - Different content by location

## Code Maintenance

### Adding New Services
Edit `/components/PopupForm.tsx`:
```typescript
const serviceOptions = [
  "Company Registration & Setup",
  "New Service Here", // Add here
  // ...
];
```

### Adding New Animations
Edit `/components/PopupForm.tsx`:
```typescript
const animationVariants = [
  // ... existing variants
  {
    hidden: { /* initial state */ },
    visible: { /* animated state */ },
    exit: { /* exit state */ },
  },
];
```

### Changing Email Recipient
Edit `/supabase/functions/server/index.tsx`:
```typescript
await sendEmailNotification(formData, "newemail@example.com");
```

---

## Support

For technical issues or questions, contact the development team or refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Motion/React Documentation](https://motion.dev)
- [Resend API Documentation](https://resend.com/docs)
