# HoneyDew Themes Calculator — App Specification

## Overview
A single-page calculator web app themed around honey and wellness aesthetics. Users calculate costs for purchasing honey-based wellness themes/packages for the HoneyDew Shopify store. Light, clean UI with honey-gold accents on a cream/white background.

## Core Features
1. **Theme Package Selector** — Dropdown or card-based selector for 5 honey wellness themes:
   - "Morning Glow" (honey + citrus, $29.99)
   - "Zen Garden" (honey + lavender, $34.99)
   - "Power Boost" (honey + ginger + turmeric, $39.99)
   - "Sleep Well" (honey + chamomile, $27.99)
   - "Immunity Shield" (honey + elderberry + vitamin C, $44.99)

2. **Quantity Calculator** — Number input (1-99) for how many units of the selected theme package

3. **Price Calculator** — Real-time total calculation: theme price × quantity, displayed prominently

4. **Discount Tiers** — Auto-applied discounts shown in the UI:
   - 5-9 units: 10% off
   - 10-24 units: 15% off
   - 25+ units: 20% off

5. **Order Summary Card** — Shows:
   - Selected theme name and unit price
   - Quantity
   - Subtotal before discount
   - Discount percentage and dollar amount
   - Final total

6. **Share/Export Button** — Copy order summary to clipboard as formatted text

## Tech Stack
- React 18+ with Vite
- TypeScript
- Tailwind CSS
- No backend required (pure client-side calculator)

## Design
- Color palette: honey gold (#F5A623), warm cream (#FFF8E7), dark text (#2D1B00), white cards
- Rounded corners, subtle shadows, clean spacing
- Responsive: works on mobile and desktop
- Honey-themed decorative elements (hexagon shapes, honey drip divider)
- App title: "HoneyDew Themes Calculator"
- Footer: "Part of the HoneyDew Collection"

## Acceptance Criteria
- User can select any of the 5 themes
- Quantity input validates 1-99, shows error for out of range
- Total updates in real-time as user changes theme or quantity
- Discount tier is correctly applied and displayed
- Order summary shows all line items with correct math
- Copy button copies formatted summary to clipboard
- Page title contains "HoneyDew"
- No console errors on load
- Responsive layout works at 320px and 1440px widths
