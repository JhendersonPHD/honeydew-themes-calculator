# HoneyDew Themes Calculator — SPEC.md

## Overview
**App Name:** HoneyDew Themes Calculator
**Type:** Single-page React web app
**Purpose:** Calculator for HoneyDew Shopify store — users select honey-based wellness theme packages and calculate total cost.
**Target Users:** Shopify store owners exploring HoneyDew theme packages

---

## Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** CSS Modules or vanilla CSS (no Tailwind — use CSS custom properties per style guide)
- **Fonts:** DM Serif Display (logo/brand), DM Sans (body/UI)
- **Icons:** Lucide React (line icons, 24x24 grid)
- **No backend required** — pure client-side app

---

## Theme Packages (5 Themes)

| Package Name | Description | Price |
|--------------|-------------|-------|
| Morning Glow | Honey + citrus energizing start | $29.99 |
| Zen Garden | Honey + lavender calm retreat | $39.99 |
| Golden Harvest | Honey + autumn warmth bundle | $49.99 |
| Wildflower Retreat | Honey + wildflower meadow escape | $34.99 |
| Sunlit Meadow | Honey + sunflower brightness | $27.99 |

---

## Core Features

### 1. Header
- App logo (use `/assets/app-icon-v1.svg`)
- App name: "HoneyDew Themes Calculator"
- Tagline: "Sweet Solutions for Your Wellness Brand"

### 2. Hero Section
- Title: "Find Your Perfect Theme"
- Subtitle: "Calculate costs for premium honey-based wellness Shopify themes"
- Decorative honeycomb pattern background (CSS-generated)

### 3. Theme Selector (Card Grid)
- 5 theme cards in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card shows: theme name, description, price badge
- Single-select (only one active at a time)
- Selected state: Honey Gold border (2px), glow shadow
- Hover: translateY(-2px), shadow-md

### 4. Calculator Section
- Quantity input (number, min 1, max 100)
- "Premium Support" add-on checkbox (+$9.99/mo)
- "Priority Setup" add-on checkbox (+$19.99 one-time)
- "Calculate Total" primary button

### 5. Result Card
- Appears after calculation
- Itemized breakdown (theme name, quantity × price, add-ons)
- Subtotal, tax estimate (8%), grand total
- "Add to Cart" CTA button
- Fade-in + slide-up animation

### 6. Footer
- "Powered by HoneyDew" brand line
- Links: Terms, Privacy, Contact

---

## Design System (from STYLE_GUIDE.md)

### Colors (CSS Custom Properties)
```css
--color-honey-gold: #D4A012;
--color-warm-cream: #FFF8E7;
--color-amber-glow: #F5C842;
--color-espresso: #3D2914;
--color-warm-gray: #8B7355;
--color-ivory: #FFFBF0;
--color-pale-honey: #E8D5A3;
--color-success: #7CB342;
--color-error: #D84315;
```

### Typography
- H1: DM Serif Display, 700, 2.5rem
- H2: DM Sans, 600, 1.75rem
- H3: DM Sans, 600, 1.25rem
- Body: DM Sans, 400, 1rem
- Price: DM Sans, 700, 1.5rem, Honey Gold color

### Shadows
```css
--shadow-sm: 0 1px 3px rgba(61,41,20,0.08);
--shadow-md: 0 4px 12px rgba(61,41,20,0.10);
--shadow-lg: 0 8px 24px rgba(61,41,20,0.12);
--shadow-glow: 0 0 20px rgba(212,160,18,0.25);
```

### Spacing & Radius
- Base unit: 4px
- Card padding: 24px
- Border radius: 12px (cards), 8px (buttons)

### Animations
- Transition: 200ms ease-out
- Card hover lift: translateY(-2px)
- Button press: scale(0.98)
- Result card: fade-in + slide-up

---

## Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640–1024px (2 columns)
- Desktop: > 1024px (3 columns)

---

## File Structure
```
src/
  App.tsx           — Main app component, state management
  main.tsx         — Entry point
  index.css        — Global styles, CSS custom properties, fonts
  components/
    Header.tsx     — Logo + app name + tagline
    Hero.tsx       — Hero section with honeycomb background
    ThemeCard.tsx  — Individual theme package card
    ThemeSelector.tsx — Grid of ThemeCards, single-select logic
    Calculator.tsx — Quantity input + add-ons + calculate button
    ResultCard.tsx — Itemized breakdown + total + CTA
    Footer.tsx     — Brand line + links
```

---

## Build Requirements
- `npm install` must complete without errors
- `npm run build` must produce a valid production build in `dist/`
- App must render without console errors
- All 5 themes must be visible and selectable
- Calculation must produce correct totals

---

## Assets Location
App icons are at: `/assets/app-icon-v1.svg`, `/assets/app-icon-v2.svg`, `/assets/app-icon-v3.svg`

---

## What to Build
Create a complete, working React + Vite + TypeScript application that implements ALL features above. The app should be immediately usable, visually polished, and match the honey-gold wellness aesthetic. No placeholder code, no TODOs.
