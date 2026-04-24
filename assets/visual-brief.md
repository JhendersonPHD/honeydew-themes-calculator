# HoneyDew Themes Calculator — Visual Brief

## Project Overview
A single-page calculator web app for the HoneyDew Shopify store. Users calculate costs for purchasing honey-based wellness themes/packages. Themed around honey and wellness aesthetics — light, clean, and premium.

---

## Visual Direction

**Theme Name:** Golden Hour Wellness
**Mood:** Warm afternoon sunlight through honey jars. Clean, trustworthy, premium wellness brand. Think Glossier meets natural apothecary.

### Key Visual References
- Honey jar in golden hour light
- Wellness brand packaging (Glossier, Sunday Riley)
- Clean SaaS pricing pages (Stripe, Linear)
- Warm minimalism

---

## Layout & Structure

### Page Architecture
```
┌─────────────────────────────────────────────┐
│  HEADER: Logo + "HoneyDew Themes Calculator" │
├─────────────────────────────────────────────┤
│  HERO SECTION                               │
│  Tagline: "Sweet Solutions for Your Brand"   │
│  Subtext: Brief value prop                  │
├─────────────────────────────────────────────┤
│  THEME SELECTOR (Card Grid)                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │Morning  │ │Zen      │ │Golden   │        │
│  │Glow     │ │Garden   │ │Harvest  │        │
│  └─────────┘ └─────────┘ └─────────┘        │
│  ┌─────────┐ ┌─────────┐                    │
│  │Wildflower│ │Sunlit  │                    │
│  │Retreat  │ │Meadow  │                    │
│  └─────────┘ └─────────┘                    │
├─────────────────────────────────────────────┤
│  CALCULATOR SECTION                         │
│  Quantity Input + Add-ons Checkboxes        │
│  [Calculate Total]                          │
├─────────────────────────────────────────────┤
│  RESULT CARD                                │
│  Itemized breakdown + Total                 │
│  [Add to Cart] CTA                         │
├─────────────────────────────────────────────┤
│  FOOTER: HoneyDew brand line + links       │
└─────────────────────────────────────────────┘
```

### Responsive Breakpoints
- Mobile: < 640px (1 col stack)
- Tablet: 640–1024px (2 col grid)
- Desktop: > 1024px (3 col grid for cards)

---

## Asset Requirements

### App Icons (3 Variations)
Stored at: `/assets/app-icon-v1.svg`, `v2.svg`, `v3.svg`

1. **Honey Jar Icon** — Bee-inspired jar with honey drip (primary)
2. **Hexagon/Honeycomb Icon** — Geometric honeycomb pattern (alternative)
3. **Wellness Mandala Icon** — Circular floral/honey motif (premium feel)

All icons: 512x512px SVG, Honey Gold primary color

### Decorative Elements
- Subtle honeycomb pattern background (CSS-generated or SVG)
- Honey drip dividers between sections
- Golden sparkle accents near CTAs

---

## Color Application

| Element            | Color Used              |
|--------------------|-------------------------|
| Page Background    | Ivory `#FFFBF0`         |
| Card Background    | Warm Cream `#FFF8E7`    |
| Primary Buttons    | Honey Gold `#D4A012`    |
| Text Headings      | Espresso `#3D2914`     |
| Text Body          | Warm Gray `#8B7355`    |
| Borders            | Pale Honey `#E8D5A3`   |
| Price Highlights   | Amber Glow `#F5C842`   |
| Success States     | Honeydew Green `#7CB342`|
| Error States       | Amber Red `#D84315`    |

---

## Typography Applied

| Element         | Font                | Style                        |
|-----------------|---------------------|------------------------------|
| Logo/Brand      | DM Serif Display    | Elegant, distinctive         |
| Headings        | DM Sans             | Bold weight, clean           |
| Body Text       | DM Sans             | Regular, readable            |
| Price Display   | DM Sans             | Bold, honey gold color      |
| Button Labels   | DM Sans             | Semi-bold, uppercase small   |

---

## Interaction Details

### Theme Card Selection
- Default: White bg, Pale Honey border
- Hover: Lift (translateY -2px), shadow-md
- Selected: Honey Gold border (2px), subtle glow shadow
- Only one card selectable at a time

### Calculate Button
- Idle: Honey Gold bg, white text
- Hover: Glow shadow + slight brightness increase
- Active/Press: scale(0.98)
- Loading: Spinner + "Calculating..." text

### Result Card
- Appears with fade-in + slide-up animation
- Breakdown list with dotted line connectors
- Total displayed large, Honey Gold color
- "Add to Cart" button prominent below

---

## Mood Board Keywords
- Warm, not hot
- Clean, not sterile
- Premium, not flashy
- Trustworthy, friendly
- Natural, refined

---

## Anti-Patterns (What to Avoid)
- No cold blues or grays (wrong mood)
- No harsh drop shadows
- No heavy gradients on backgrounds
- No stock-photo-style imagery
- No overly playful or cartoonish elements
