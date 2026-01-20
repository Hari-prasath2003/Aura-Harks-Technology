# My Clients Folder

This folder contains your client company logos that will be displayed in the "Our Esteemed Clients" section of your website.

## How to Add Client Logos

### Step 1: Add Your Logo Image
Upload your client's logo image to this folder (`/assets/my-clients/`).

**Supported formats:** PNG, JPG, JPEG, SVG, WebP  
**Recommended size:** 300x150px or similar aspect ratio  
**File naming:** Use descriptive names like `quixent-logo.png`, `aerosky-services.png`, etc.

### Step 2: Update the index.ts File
Open the `index.ts` file in this folder and:

1. Import your logo at the top:
```typescript
import quixentLogo from './quixent-logo.png';
import aeroskyLogo from './aerosky-services.png';
```

2. Add it to the `clientLogos` array:
```typescript
export const clientLogos: { src: string; alt: string }[] = [
  { src: quixentLogo, alt: 'Quixent' },
  { src: aeroskyLogo, alt: 'Aerosky Services' },
  // Add more logos here
];
```

### Step 3: Save and Done!
The logos will automatically appear in the scrolling client section on your website.

## Example

Here's a complete example:

```typescript
// Import logos
import quixentLogo from './quixent-logo.png';
import aeroskyLogo from './aerosky-services.png';
import betzonelogo from './betzone-logo.png';

// Export logos array
export const clientLogos: { src: string; alt: string }[] = [
  { src: quixentLogo, alt: 'Quixent' },
  { src: aeroskyLogo, alt: 'Aerosky Services' },
  { src: betzonelogo, alt: 'The Betzone' },
];

export const hasLogos = clientLogos.length > 0;
```

## Tips

- Use transparent backgrounds (PNG) for best results
- Keep logos consistent in size and style
- Optimize images for web to reduce file size
- The logos will scroll automatically with hover effects
