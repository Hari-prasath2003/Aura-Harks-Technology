/**
 * Popup Manager Hook - Standalone Version
 * No Supabase dependency - fully client-side
 */

import { useState, useEffect, useRef, useCallback } from "react";
import type { PopupFormData } from "../components/PopupForm";

// Cookie utilities (inline to avoid imports)
const COOKIE_NAME = "yip_form_completed";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function hasCompletedForm(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some(row => row.startsWith(`${COOKIE_NAME}=`));
}

function markFormAsCompleted(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=true; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Strict`;
}

// Email sending via Resend API (inline)
async function sendEmailViaResend(data: PopupFormData): Promise<void> {
  const apiKey = "re_joNg4ubM_M3HVhGYTmsN3bmZj4khYAR9r";
  
  const servicesList = data.services.map(s => `✓ ${s}`).join("<br>");
  const actionLabel = data.actionType === 'immediate' ? 'Immediate Action' : 'Enquiry';
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0163c6 0%, #073265 100%);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #0163c6;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .info-item {
      background: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 8px;
      border-left: 3px solid #0163c6;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      background: ${data.actionType === 'immediate' ? '#dcfce7' : '#dbeafe'};
      color: ${data.actionType === 'immediate' ? '#166534' : '#1e40af'};
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">🎯 New Lead Submission</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">YourIndiaPartner Website</p>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">Action Type</div>
      <div><span class="badge">${actionLabel}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Services Requested</div>
      <div style="background: white; padding: 16px; border-radius: 8px;">
        ${servicesList}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Contact Information</div>
      <div class="info-item">
        <div style="font-size: 12px; color: #6b7280; font-weight: 600;">EMAIL</div>
        <div style="font-size: 15px; color: #111827; margin-top: 4px;">
          <a href="mailto:${data.email}" style="color: #0163c6; text-decoration: none;">${data.email}</a>
        </div>
      </div>
      <div class="info-item">
        <div style="font-size: 12px; color: #6b7280; font-weight: 600;">WHATSAPP</div>
        <div style="font-size: 15px; color: #111827; margin-top: 4px;">
          <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #0163c6; text-decoration: none;">${data.whatsapp}</a>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Timestamp</div>
      <div class="info-item">
        <div style="font-size: 15px; color: #111827;">${new Date(data.timestamp).toLocaleString()}</div>
      </div>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb;">
    <p>This is an automated notification from YourIndiaPartner website.</p>
    <p>Please follow up with this lead promptly.</p>
  </div>
</body>
</html>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "YourIndiaPartner <onboarding@resend.dev>",
      to: ["manikandan1905213@gmail.com"],
      subject: `🎯 New ${actionLabel} Request - YourIndiaPartner`,
      html: htmlBody,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email API error: ${errorText}`);
  }

  return response.json();
}

// Local storage
function storeFormData(data: PopupFormData): string {
  const submissionId = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const submission = {
    ...data,
    id: submissionId,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem('yip_form_submission', JSON.stringify(submission));
  
  const pendingSubmissions = localStorage.getItem('yip_pending_submissions');
  const submissions = pendingSubmissions ? JSON.parse(pendingSubmissions) : [];
  submissions.push(submission);
  localStorage.setItem('yip_pending_submissions', JSON.stringify(submissions));

  return submissionId;
}

export function usePopupManager() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [animationType, setAnimationType] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const previousSection = useRef<string | null>(null);
  const sectionChangeCount = useRef(0);

  useEffect(() => {
    // Check if user has already completed the form
    if (hasCompletedForm()) {
      console.log("✅ Form already completed - popup disabled");
      return;
    }

    // Ensure proper positioning for scroll calculations
    const ensurePositioning = () => {
      // Main container
      const mainContainer = document.querySelector('.min-h-screen');
      if (mainContainer) {
        const element = mainContainer as HTMLElement;
        const position = window.getComputedStyle(element).position;
        if (position === 'static') {
          element.style.position = 'relative';
          console.log("📐 Fixed main container positioning");
        }
      }

      // All sections
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const position = window.getComputedStyle(element).position;
        if (position === 'static') {
          element.style.position = 'relative';
        }
      });

      // Body element
      if (document.body && window.getComputedStyle(document.body).position === 'static') {
        document.body.style.position = 'relative';
      }

      // HTML element
      if (document.documentElement && window.getComputedStyle(document.documentElement).position === 'static') {
        document.documentElement.style.position = 'relative';
      }
    };

    // Apply positioning fixes
    ensurePositioning();
    
    // Also ensure after a brief delay (for dynamic content)
    setTimeout(ensurePositioning, 100);

    // Set up Intersection Observer for section detection
    const sections = document.querySelectorAll("section[id]");
    
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setCurrentSection(sectionId);
          
          if (previousSection.current !== null && previousSection.current !== sectionId) {
            sectionChangeCount.current++;
            
            if (!hasCompletedForm()) {
              setAnimationType(sectionChangeCount.current - 1);
              setIsPopupOpen(true);
            }
          }
          
          previousSection.current = sectionId;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleSubmitForm = useCallback(async (data: PopupFormData) => {
    console.log("📝 Processing form submission (standalone mode)...");
    
    let submissionId: string;
    
    try {
      // Send email directly via Resend
      console.log("📧 Sending email via Resend API...");
      await sendEmailViaResend(data);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Continue anyway - data is still stored locally
    }
    
    // Store locally
    submissionId = storeFormData(data);
    console.log("💾 Data stored locally:", submissionId);

    // Mark form as completed
    markFormAsCompleted();
    localStorage.setItem("yip_form_completed", "true");

    console.log("✅ Form submission complete");
  }, []);

  return {
    isPopupOpen,
    animationType,
    currentSection,
    handleClosePopup,
    handleSubmitForm,
  };
}
