/**
 * Cookie Management Utilities for Popup Form
 * Handles storing and retrieving form completion status
 */

const FORM_COMPLETED_COOKIE = "yip_form_completed";
const COOKIE_EXPIRY_DAYS = 365; // 1 year

/**
 * Sets a cookie with the given name, value, and expiry days
 */
function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
}

/**
 * Gets a cookie value by name
 */
function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  
  return null;
}

/**
 * Checks if the user has already completed the form
 */
export function hasCompletedForm(): boolean {
  return getCookie(FORM_COMPLETED_COOKIE) === "true";
}

/**
 * Marks the form as completed
 */
export function markFormAsCompleted(): void {
  setCookie(FORM_COMPLETED_COOKIE, "true", COOKIE_EXPIRY_DAYS);
}

/**
 * Clears the form completion status (for testing purposes)
 */
export function clearFormCompletion(): void {
  document.cookie = `${FORM_COMPLETED_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
