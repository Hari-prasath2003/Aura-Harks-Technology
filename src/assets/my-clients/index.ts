/**
 * Client Logos Configuration
 * 
 * To add a new client logo:
 * 1. Add your image file to the /assets/my-clients/ folder
 * 2. Import it in this file
 * 3. Add it to the clientLogos array below
 * 
 * Supported formats: PNG, JPG, JPEG, SVG, WebP
 * Recommended size: 300x150px or similar aspect ratio
 */

// Import your client logos here
// Example:
// import client1 from './client1.png';
// import client2 from './client2.png';

// Add your imported logos to this array
export const clientLogos: { src: string; alt: string }[] = [
  // Example:
  // { src: client1, alt: 'Client 1' },
  // { src: client2, alt: 'Client 2' },
];

// If you have no images yet, the component will show placeholder text
export const hasLogos = clientLogos.length > 0;
