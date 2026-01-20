/**
 * Page Load Detector
 * Detects and logs page load events to identify double-loading issues
 */

export class PageLoadDetector {
  private static loadCount = 0;
  private static loadTimestamps: number[] = [];
  private static hasInitialized = false;

  /**
   * Initialize page load detection
   */
  static initialize() {
    if (this.hasInitialized) {
      console.warn('⚠️ PageLoadDetector: Already initialized - possible double initialization');
      return;
    }

    this.hasInitialized = true;
    this.loadCount++;
    const timestamp = Date.now();
    this.loadTimestamps.push(timestamp);

    // Log detailed information
    console.group('📊 Page Load Detection');
    console.log('Load Count:', this.loadCount);
    console.log('Timestamp:', new Date(timestamp).toISOString());
    
    // Check performance API for navigation type
    if (typeof window !== 'undefined' && window.performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        console.log('Navigation Type:', nav.type);
        console.log('Load Event End:', nav.loadEventEnd);
        console.log('DOM Content Loaded:', nav.domContentLoadedEventEnd);
        console.log('Response End:', nav.responseEnd);
      }

      // Log timing information
      const timing = performance.timing;
      console.log('Navigation Start:', timing.navigationStart);
      console.log('DOM Loading:', timing.domLoading);
      console.log('DOM Interactive:', timing.domInteractive);
      console.log('DOM Complete:', timing.domComplete);
      console.log('Load Complete:', timing.loadEventEnd);
    }

    // Detect rapid consecutive loads (possible double load)
    if (this.loadTimestamps.length > 1) {
      const prevTimestamp = this.loadTimestamps[this.loadTimestamps.length - 2];
      const timeDiff = timestamp - prevTimestamp;
      
      if (timeDiff < 100) {
        // Very quick re-initialization = likely React StrictMode
        console.log('ℹ️ Rapid re-initialization detected (likely React StrictMode in development)');
        console.log('   This is expected behavior and helps detect side effects');
      } else if (timeDiff < 1000) {
        // Slower but still quick = potential double load issue
        console.warn('🚨 DOUBLE LOAD DETECTED!');
        console.warn(`Two page loads occurred within ${timeDiff}ms`);
        console.warn('This may indicate a real issue - not just StrictMode');
      }
    }

    console.groupEnd();

    // Listen for various load events
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to track load events
   */
  private static attachEventListeners() {
    if (typeof window === 'undefined') return;

    // Track window.onload
    const originalOnLoad = window.onload;
    let onLoadCount = 0;
    
    window.addEventListener('load', () => {
      onLoadCount++;
      console.log(`🔄 window.onload fired (count: ${onLoadCount})`);
      
      if (onLoadCount > 1) {
        console.warn('⚠️ window.onload fired multiple times - possible double load');
      }
    });

    // Track DOMContentLoaded
    let domLoadedCount = 0;
    window.addEventListener('DOMContentLoaded', () => {
      domLoadedCount++;
      console.log(`🔄 DOMContentLoaded fired (count: ${domLoadedCount})`);
      
      if (domLoadedCount > 1) {
        console.warn('⚠️ DOMContentLoaded fired multiple times');
      }
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      console.log('🔄 Page unloading');
    });
  }

  /**
   * Get current load count
   */
  static getLoadCount(): number {
    return this.loadCount;
  }

  /**
   * Check if page loaded multiple times
   */
  static hasMultipleLoads(): boolean {
    return this.loadCount > 1;
  }

  /**
   * Reset detector (for testing)
   */
  static reset() {
    this.hasInitialized = false;
    this.loadCount = 0;
    this.loadTimestamps = [];
  }
}

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  PageLoadDetector.initialize();
}