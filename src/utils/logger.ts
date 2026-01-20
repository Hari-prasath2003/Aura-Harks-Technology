/**
 * Custom Logger - Control console output
 * Set SILENT_MODE = true to hide all form-related logs
 */

const SILENT_MODE = false; // Set to true to hide all logs

export const logger = {
  log: (...args: any[]) => {
    if (!SILENT_MODE) console.log(...args);
  },
  info: (...args: any[]) => {
    if (!SILENT_MODE) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!SILENT_MODE) console.warn(...args);
  },
  error: (...args: any[]) => {
    // Never show errors in production mode
    if (!SILENT_MODE && process.env.NODE_ENV === 'development') {
      console.log(...args); // Use log instead of error
    }
  },
  success: (...args: any[]) => {
    if (!SILENT_MODE) console.log(...args);
  }
};
