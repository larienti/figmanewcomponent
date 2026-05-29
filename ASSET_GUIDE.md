# Asset Management Guide for React + Vite Projects

## Overview
This guide explains how to add images, fonts, icons, and other assets to your React project using Vite.

---

## 1. Images (PNG, JPG, SVG, WebP)

### Where to Put Images
Create a dedicated assets folder:
```
src/
  assets/
    images/
      logo.png
      hero-bg.jpg
      icon.svg
```

### How to Import and Use

**Method 1: ES Module Import (Recommended)**
```tsx
import logo from './assets/images/logo.png';

function Header() {
  return <img src={logo} alt="Logo" />;
}
```

**Why this works:** Vite automatically processes the import, returns an optimized URL, and handles cache-busting with content hashes.

**Method 2: Public Folder (for static assets)**
```
public/
  favicon.ico
  robots.txt
  og-image.png
```

Reference with absolute paths:
```tsx
<img src="/og-image.png" alt="Social preview" />
```

**When to use public/**: Assets that don't need processing (favicons, robots.txt, files referenced in HTML meta tags)

### SVG Special Cases

**As Image:**
```tsx
import icon from './assets/icons/star.svg';
<img src={icon} alt="Star" />
```

**As Inline React Component:**
Install the plugin:
```bash
pnpm add vite-plugin-svgr
```

Update `vite.config.ts`:
```ts
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
});
```

Use it:
```tsx
import { ReactComponent as StarIcon } from './assets/icons/star.svg';
<StarIcon className="w-6 h-6" />
```

---

## 2. Fonts

### Web Fonts (Google Fonts, etc.)

**Option A: CDN Link in HTML**
Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

Use in CSS/Tailwind:
```css
body {
  font-family: 'Inter', sans-serif;
}
```

**Option B: Self-Hosted (Better Performance)**

1. Download font files (`.woff2` format recommended)
2. Place in assets:
```
src/
  assets/
    fonts/
      Inter-Regular.woff2
      Inter-SemiBold.woff2
      Inter-Bold.woff2
```

3. Import in CSS file (`src/styles/fonts.css`):
```css
@font-face {
  font-family: 'Inter';
  src: url('/src/assets/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/src/assets/fonts/Inter-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

4. Import fonts file in main component:
```tsx
// src/main.tsx
import './styles/fonts.css';
```

---

## 3. Icons

### Option 1: Icon Library (Recommended)
```bash
pnpm add lucide-react
```

```tsx
import { Heart, Star, ArrowRight } from 'lucide-react';

function MyComponent() {
  return (
    <>
      <Heart className="w-5 h-5 text-red-500" />
      <Star size={24} color="gold" />
      <ArrowRight />
    </>
  );
}
```

### Option 2: Custom SVG Icons
Store in `src/assets/icons/` and import as shown in SVG section above.

---

## 4. Videos & Audio

```
src/
  assets/
    videos/
      intro.mp4
    audio/
      notification.mp3
```

Import and use:
```tsx
import introVideo from './assets/videos/intro.mp4';
import notificationSound from './assets/audio/notification.mp3';

function VideoPlayer() {
  return (
    <video src={introVideo} controls />
  );
}

function playSound() {
  new Audio(notificationSound).play();
}
```

---

## 5. Data Files (JSON, CSV, etc.)

**JSON:**
```tsx
import data from './assets/data/config.json';
console.log(data.apiUrl);
```

**CSV (with plugin):**
```bash
pnpm add vite-plugin-csv
```

---

## 6. Design System Assets

If you're importing from a Figma frame or design system:

### Raster Images (PNG/JPG from Figma)
```tsx
// Figma exports use special import scheme
import heroImage from "figma:asset/abc123def456.png";

<ImageWithFallback src={heroImage} alt="Hero" />
```

### SVG Vectors from Figma
```tsx
// Figma SVGs are in src/imports/
import iconPaths from "../imports/svg-wg56ef214f";

<svg viewBox="0 0 24 24">
  <path d={iconPaths} />
</svg>
```

**Important:** Never use relative paths with `figma:asset` - it's a virtual module scheme, not a file path.

---

## 7. Best Practices

### ✅ DO:
- Import assets as ES modules for automatic optimization
- Use `.woff2` for fonts (best compression)
- Keep images under 500KB (compress before adding)
- Use WebP or AVIF for photos when possible
- Store shared constants in a single file (like our `constants.ts`)

### ❌ DON'T:
- Hardcode image URLs as strings (breaks in production)
- Put large files in `public/` folder
- Import the same asset multiple times in different files
- Use massive image files without optimization
- Mix import strategies (pick ES modules OR public folder, not both)

---

## 8. Optimization Tips

### Image Optimization
```bash
# Install image optimization plugin
pnpm add vite-plugin-image-optimizer
```

Add to `vite.config.ts`:
```ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
});
```

### Lazy Loading Images
```tsx
<img 
  src={largeImage} 
  alt="Large image" 
  loading="lazy" 
/>
```

### Responsive Images
```tsx
import logoSmall from './assets/logo-sm.png';
import logoLarge from './assets/logo-lg.png';

<picture>
  <source media="(max-width: 640px)" srcSet={logoSmall} />
  <img src={logoLarge} alt="Logo" />
</picture>
```

---

## Quick Reference

| Asset Type | Location | Import Method |
|------------|----------|---------------|
| Images (processed) | `src/assets/images/` | `import img from './path'` |
| Static files | `public/` | `src="/file.png"` (absolute) |
| Fonts | `src/assets/fonts/` | `@font-face` in CSS |
| Icons | Package or `src/assets/icons/` | Library or import |
| Data | `src/assets/data/` | `import data from './data.json'` |
| Figma raster | Virtual | `import x from "figma:asset/hash.png"` |
| Figma SVG | `src/imports/` | `import paths from "../imports/svg-*"` |

---

## Troubleshooting

**Problem:** Import returns `[object Module]` instead of URL
- **Fix:** Make sure you're accessing the default export: `import img from './img.png'` (not `import { img }`)

**Problem:** Images work in dev but break in production
- **Fix:** Always use imports, never hardcode paths like `src="./assets/image.png"`

**Problem:** Fonts not loading
- **Fix:** Check paths in `@font-face` use `/src/` prefix, and fonts.css is imported before components

**Problem:** SVG won't inline
- **Fix:** Install and configure `vite-plugin-svgr` as shown above

---

## Example: Complete Setup

```tsx
// src/components/Hero.tsx
import { useState } from 'react';
import heroImg from '../assets/images/hero.jpg';
import logo from '../assets/icons/logo.svg';
import { Star } from 'lucide-react';
import '../styles/fonts.css';

export function Hero() {
  return (
    <div className="relative">
      <img 
        src={heroImg} 
        alt="Hero background" 
        className="w-full h-96 object-cover"
      />
      <div className="absolute top-4 left-4">
        <img src={logo} alt="Company logo" className="h-12" />
      </div>
      <Star className="absolute top-4 right-4 text-yellow-400" />
    </div>
  );
}
```

That's it! Follow these patterns and your assets will work reliably in both development and production builds.
