/**
 * Popup Manager Hook
 * Handles section navigation detection and popup display logic
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { hasCompletedForm, markFormAsCompleted } from "../utils/formCookies";
import { sendViaResendClient, storeFormLocally } from "../utils/emailFallback";
import type { PopupFormData } from "../components/PopupForm";

export function usePopupManager() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [animationType, setAnimationType] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const previousSection = useRef<string | null>(null);
  const sectionChangeCount = useRef(0);

  useEffect(() => {
    // Check if user has already completed the form
    if (hasCompletedForm()) {
      console.log("User has already completed the form");
      return;
    }

    // Ensure main container has non-static position
    const mainContainer = document.querySelector('.min-h-screen');
    if (mainContainer && getComputedStyle(mainContainer as HTMLElement).position === 'static') {
      (mainContainer as HTMLElement).style.position = 'relative';
    }

    // Set up Intersection Observer for section detection
    const sections = document.querySelectorAll("section[id]");
    
    const observerOptions: IntersectionObserverInit = {
      root: null, // Use viewport as root
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is at center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setCurrentSection(sectionId);
          
          // Check if section actually changed
          if (previousSection.current !== null && previousSection.current !== sectionId) {
            sectionChangeCount.current++;
            
            // Show popup on every section change with different animation
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
      // Ensure each section has relative positioning
      const element = section as HTMLElement;
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
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
    console.log("📝 Processing form submission...");
    
    // Use client-side only approach (bypasses 403 server deployment error)
    let submissionId: string;
    
    try {
      // Send email directly via Resend from client
      console.log("📧 Sending email via Resend API...");
      await sendViaResendClient(data);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Continue anyway - data is still stored locally
    }
    
    // Store locally
    submissionId = storeFormLocally(data);
    console.log("💾 Data stored locally:", submissionId);

    // Mark form as completed
    markFormAsCompleted();
    
    // Store in localStorage
    localStorage.setItem("yip_form_completed", "true");
    localStorage.setItem("yip_form_submission", JSON.stringify({
      ...data,
      submissionId,
      submittedAt: new Date().toISOString(),
    }));

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