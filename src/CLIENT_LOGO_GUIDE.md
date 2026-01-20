# Client Logo Management Guide

## Overview
Your website now has a dynamic client logo system. You can add, remove, or update client logos without touching any component code.

## How to Add Client Logos

### Step 1: Add Your Logo Files
1. Navigate to the `/assets/my-clients/` folder
2. Upload your client logo images there
3. **Supported formats:** PNG, JPG, JPEG, SVG, WebP
4. **Recommended size:** 300x150px or similar aspect ratio

### Step 2: Register the Logos
Open `/assets/my-clients/index.ts` and update it like this:

```typescript
// Import your logos
import quixentLogo from './quixent-logo.png';
import aeroskyLogo from './aerosky-services.png';
import betzoneLogo from './betzone-logo.png';

// Add to the array
export const clientLogos: { src: string; alt: string }[] = [
  { src: quixentLogo, alt: 'Quixent' },
  { src: aeroskyLogo, alt: 'Aerosky Services' },
  { src: betzoneLogo, alt: 'The Betzone' },
  // Add more logos here
];

export const hasLogos = clientLogos.length > 0;
```

### Step 3: Save and View
Once you save the `index.ts` file, the logos will automatically appear on your website in the "Our Esteemed Clients" section with:
- Smooth scrolling animation
- Grayscale effect that becomes colorful on hover
- Elegant border and shadow effects

## Features

✅ **Automatic fallback:** If no logos are added, company names will display instead  
✅ **Seamless scrolling:** Logos scroll infinitely across the screen  
✅ **Hover effects:** Beautiful animation when users hover over logos  
✅ **Responsive design:** Adapts to all screen sizes  
✅ **Easy to maintain:** Just add images and update one file  

## Tips for Best Results

- Use transparent backgrounds (PNG format) for professional appearance
- Keep logo sizes consistent (around 300x150px)
- Optimize images for web to ensure fast loading
- Use descriptive file names (e.g., `company-name-logo.png`)

## Example Structure

```
/assets/my-clients/
  ├── index.ts (configuration file)
  ├── README.md (instructions)
  ├── quixent-logo.png
  ├── aerosky-services.png
  ├── betzone-logo.png
  └── ... (add more logos here)
```

## Need Help?

If you have any questions about adding client logos, refer to:
- `/assets/my-clients/README.md` for detailed instructions
- Contact your development team for technical support
