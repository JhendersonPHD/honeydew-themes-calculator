# HoneyDew Themes Calculator — Style Guide

## Brand Identity
**Product Name:** HoneyDew Themes Calculator
**Tagline:** "Sweet Solutions for Your Wellness Brand"
**Aesthetic:** Light, airy, honey-gold luxury wellness brand

---

## Color Palette

| Role        | Name           | Hex       | Usage                          |
|-------------|----------------|-----------|--------------------------------|
| Primary     | Honey Gold     | `#D4A012` | Buttons, accents, highlights   |
| Secondary   | Warm Cream     | `#FFF8E7` | Background, cards              |
| Accent      | Amber Glow     | `#F5C842` | Gradients, hover states       |
| Text Dark   | Espresso       | `#3D2914` | Headings, primary text         |
| Text Light  | Warm Gray      | `#8B7355` | Secondary text, captions      |
| Surface     | Ivory          | `#FFFBF0` | Page background                |
| Border      | Pale Honey     | `#E8D5A3` | Card borders, dividers         |
| Success     | Honeydew Green | `#7CB342` | Success states, confirmations |
| Error       | Amber Red      | `#D84315` | Error states                   |

---

## Typography

**Font Family:** `"DM Sans", "Nunito Sans", system-ui, sans-serif`

| Element    | Weight | Size  | Line Height | Color      |
|------------|--------|-------|-------------|------------|
| H1         | 700    | 2.5rem | 1.2        | Espresso   |
| H2         | 600    | 1.75rem| 1.3        | Espresso   |
| H3         | 600    | 1.25rem| 1.4        | Espresso   |
| Body       | 400    | 1rem   | 1.6        | Warm Gray  |
| Caption    | 400    | 0.875rem| 1.5        | Warm Gray  |
| Button     | 600    | 1rem   | 1.0        | White      |
| Price      | 700    | 1.5rem | 1.0        | Honey Gold |

---

## Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Card padding: 24px
- Section margin: 48px
- Border radius: 12px (cards), 8px (buttons), 50% (avatars)

---

## Shadows
```css
--shadow-sm:  0 1px 3px rgba(61,41,20,0.08);
--shadow-md:  0 4px 12px rgba(61,41,20,0.10);
--shadow-lg:  0 8px 24px rgba(61,41,20,0.12);
--shadow-glow: 0 0 20px rgba(212,160,18,0.25);
```

---

## Components

### Buttons
- **Primary:** Honey Gold bg, white text, shadow-md, hover: glow effect
- **Secondary:** Transparent, Honey Gold border, Honey Gold text
- **Ghost:** Transparent, Warm Gray text, hover: Pale Honey bg

### Cards
- Background: Ivory (`#FFFBF0`)
- Border: 1px solid Pale Honey (`#E8D5A3`)
- Border-radius: 12px
- Shadow: shadow-sm, hover → shadow-md

### Theme Selector Cards
- Grid: 1 col mobile, 2 col tablet, 3 col desktop
- Each card: theme name, description, price badge
- Selected state: Honey Gold border, glow shadow

### Price Badge
- Background: linear-gradient Honey Gold → Amber Glow
- Text: Espresso, bold
- Border-radius: 20px
- Padding: 4px 16px

---

## Motion & Animation
- Transition duration: 200ms ease-out
- Hover lift: translateY(-2px) + shadow-md
- Button press: scale(0.98)
- Card selection: border color transition + glow pulse

---

## Dark Mode
Not required for this app — single light theme only.

---

## Icon Style
- Line weight: 2px stroke
- Style: Rounded, friendly, consistent 24x24 grid
- Color: Honey Gold or Espresso depending on context

---

## Accessibility
- All interactive elements: minimum 44x44px touch target
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Focus states: 2px Honey Gold outline with 2px offset
