/**
 * Popup Manager Hook - Supabase Integrated Version
 * Features: Database storage, email notifications, cookie tracking, rotating animations
 * Updated: Show popup once on page load, then provide floating button for reopening
 */

import { useState, useEffect, useRef, useCallback } from "react";
import type { PopupFormData } from "../components/PopupForm";
import { sendEmailViaEmailJS } from "../services/emailService";
import { storeInSupabase, storeLocally } from "../services/supabaseService";

// Cookie utilities - NOW ONLY TRACKS INITIAL POPUP DISPLAY
const COOKIE_NAME = "yip_popup_shown";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 1; // 1 day (popup shown once per day)

function hasShownInitialPopup(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some(row => row.startsWith(`${COOKIE_NAME}=`));
}

function markInitialPopupAsShown(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=true; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Strict`;
}

export function usePopupManager(isPageReady: boolean = true) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [animationType, setAnimationType] = useState(0);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const hasShownPopup = useRef(false);

  // Show popup once on page load
  useEffect(() => {
    if (!isPageReady) {
      console.log('⏳ Popup Manager: Waiting for page to be ready');
      return;
    }

    // Check if we've already shown the popup today
    const alreadyShown = hasShownInitialPopup();
    
    if (alreadyShown) {
      console.log('ℹ️ Popup Manager: Initial popup already shown today, showing floating button');
      setShowFloatingButton(true);
      return;
    }

    // Show popup after a delay
    const timer = setTimeout(() => {
      if (!hasShownPopup.current) {
        console.log('✨ Popup Manager: Showing initial popup');
        setIsPopupOpen(true);
        setAnimationType(0); // Use first animation for initial popup
        markInitialPopupAsShown();
        hasShownPopup.current = true;
        
        // Show floating button after popup is closed
        setShowFloatingButton(true);
      }
    }, 3000); // Show popup 3 seconds after page is ready

    return () => clearTimeout(timer);
  }, [isPageReady]);

  const handleClosePopup = useCallback(() => {
    console.log('🔒 Popup closed');
    setIsPopupOpen(false);
  }, []);

  const handleOpenPopup = useCallback(() => {
    console.log('✨ Popup reopened via floating button');
    setIsPopupOpen(true);
    // Use a random animation when reopening
    setAnimationType(Math.floor(Math.random() * 8));
  }, []);

  const handleSubmitForm = useCallback(async (data: PopupFormData) => {
    let databaseSuccess = false;
    let emailSuccess = false;
    
    console.log('📤 Submitting form data...');
    
    // Function 1: Store in Supabase database (independent)
    try {
      const submissionId = await storeInSupabase(data);
      databaseSuccess = true;
      console.log('✅ Database: Form stored successfully', submissionId);
    } catch (dbError) {
      console.log('ℹ️ Supabase storage skipped - using localStorage backup');
    }

    // Function 2: Send email via EmailJS (independent)
    try {
      await sendEmailViaEmailJS(data);
      emailSuccess = true;
      console.log('✅ Email: Notification sent successfully');
    } catch (emailError) {
      console.log('ℹ️ EmailJS skipped - email not sent');
    }

    // ALWAYS store locally as backup
    storeLocally(data);
    console.log('✅ Local Storage: Form data backed up');

    // NOTE: We no longer mark the form as "completed forever"
    // Users can submit multiple times now
    console.log('✅ Form submission complete - user can submit again');
  }, []);

  return {
    isPopupOpen,
    animationType,
    showFloatingButton,
    handleClosePopup,
    handleOpenPopup,
    handleSubmitForm,
  };
}