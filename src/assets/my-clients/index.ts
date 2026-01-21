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
<<<<<<< HEAD
// import client1 from './client1.png';
// import client2 from './client2.png';

// Add your imported logos to this array
export const clientLogos: { src: string; alt: string }[] = [
  // Example:
  // { src: client1, alt: 'Client 1' },
  // { src: client2, alt: 'Client 2' },
=======
import aeroskyLogo from './aerosky3logo.png';
import calico_Logo from './calico1.png';
import cvs_health_Logo from './cvs-removebg-preview.png';
import edgewater_Logo from './edgewater2.png';
import guru_tech_Logo from './gt3__2_-removebg-preview.png';
import ibm_Logo from './ibm-removebg-preview.png';
import quixentsolutions_Logo from './quixentsolutions-removebg-previe1.png';
import razorpay_Logo from './xrazorpay.png';
import zoho_Logo from './zoho-removebg-preview.png';
// Add your imported logos to this array
export const clientLogos: { src: string; alt: string }[] = [
  // Example:
  { src: aeroskyLogo, alt: 'aeroskyLogo' },
  { src: calico_Logo, alt: 'calico_Logo' },
  { src: cvs_health_Logo, alt: 'cvs_health_Logo' },
  { src: edgewater_Logo, alt: 'edgewater_Logo' },
  { src: guru_tech_Logo, alt: 'guru_tech_Logo' },
  { src: ibm_Logo, alt: 'ibm_Logo' },
  { src: quixentsolutions_Logo, alt: 'quixentsolutions_Logo' },
  { src: razorpay_Logo, alt: 'razorpay_Logo' },
  { src: zoho_Logo, alt: 'zoho_Logo' },
>>>>>>> 4c5cc588bb627e431d6de5adba19448e5ae149f7
];

// If you have no images yet, the component will show placeholder text
export const hasLogos = clientLogos.length > 0;
