# S6 Opencode Review #2 — HoneyDew Themes Calculator

**Reviewer**: Opencode-Agent 2
**Date**: 2026-04-24
**Phase**: S6 (Security & Logistics)
**Verdict**: `***OpencodeDone***`

---

## 1. Build & Type Check

| Check | Result |
|-------|--------|
| `npm run build` | PASS (Vite 6.4.2 + TypeScript) |
| `npm audit` | PASS — 0 vulnerabilities |
| ESLint | Not configured (no lint script) |

### Dependency Updates Applied
- `vite`: `^5.1.4` → `^6.4.1` (fixes nested esbuild CVE-2024-23353)
- `esbuild` top-level explicit dep removed (redundant; Vite 6 bundles patched esbuild)
- Final state: `found 0 vulnerabilities`

---

## 2. Spec Compliance Review

### Theme Package Selector — CRITICAL MISMATCH
**Spec requires** 5 specific themes with exact prices:
| Spec Theme | Spec Price | Implemented Theme | Implemented Price | Match? |
|------------|------------|-----------------|-------------------|--------|
| Morning Glow | $29.99 | Morning Glow | $29.99 | YES |
| Zen Garden | $34.99 | Zen Garden | $39.99 | NO |
| Power Boost | $39.99 | Golden Harvest | $49.99 | NO (wrong theme) |
| Sleep Well | $27.99 | Wildflower Retreat | $34.99 | NO (wrong theme) |
| Immunity Shield | $44.99 | Sunlit Meadow | $27.99 | NO (wrong theme) |

**4 out of 5 themes are wrong** — names and prices do not match the spec. This is a spec violation.

### Discount Tiers — MISSING ENTIRELY
Spec requires:
- 5-9 units: 10% off
- 10-24 units: 15% off
- 25+ units: 20% off

**Implementation**: No discount tiers exist. No volume-based pricing whatsoever.

### Quantity Validation — MISMATCH
- **Spec**: 1-99 units
- **Implementation**: 1-100 units (`max={100}` in Calculator.tsx)

### Order Summary Card — PARTIAL
Spec requires display of:
- Selected theme name and unit price ✓
- Quantity ✓
- Subtotal before discount ✗ (no discounts applied)
- Discount percentage and dollar amount ✗ (discounts don't exist)
- Final total ✓

### Share/Export Button — MISSING
Spec requires a "Copy order summary to clipboard" button. Not implemented.

### App Title — PASS
`index.html` has `<title>HoneyDew Themes Calculator</title>` ✓

### Footer Text — PARTIAL MISMATCH
- **Spec**: "Part of the HoneyDew Collection"
- **Implementation**: "Powered by HoneyDew" — close but non-compliant

### Decorative Elements — PRESENT
- Honeycomb SVG pattern ✓
- Hexagon shapes ✓
- Honey gold color palette ✓

### Responsive Design — NOT TESTED
No Playwright or responsive testing found. CSS uses `clamp()` and `auto-fit` which is correct.

---

## 3. Code Quality

### Dead Code: `useCalculator` Hook
`src/hooks/useCalculator.ts` defines a custom hook that is **never imported or used**. The App.tsx manages all state directly. Dead code.

### Dead Code: `react-router-dom`
`package.json` includes `react-router-dom@^7.14.2` but there is only a single-page app with no routing. Dead dependency.

### Unused Import
`src/App.tsx` imports `ResultData` from `./types` — this is actually used in the component (line 17). No issue.

### TypeScript
Types are well-defined. No type errors. `ResultData` interface is missing `discount` fields since discounts aren't implemented.

### Inline Styles
Components use inline `style={}` objects rather than Tailwind classes. While this works, it bypasses Tailwind (included in spec) almost entirely. The `index.css` only defines CSS variables — no actual utility classes are used.

### Suspense for ResultCard
`ResultCard` loaded lazily with `lazy()` and `Suspense`. This is good for code splitting.

---

## 4. S4 Feature Integration
The app appears to be in an early state (post-S1.5). No S4 enhancement PRs appear to have been merged. The `feature/jules-routing-architecture` branch suggests Jules work has been done but it is not on main.

---

## 5. Security Quick Scan

| Area | Status |
|------|--------|
| API keys in code | None found |
| `.env` files | None (no backend) |
| `eval()` / `innerHTML` | None found |
| User input sanitization | Input is numeric-only, bounded |
| CORS | Not applicable (client-only) |
| Dependencies | Updated, 0 vulnerabilities |

---

## 6. Summary of Issues Found

### Must Fix (before S7/S8)
1. **Themes data mismatch** — 4 of 5 theme names and prices don't match SPEC.md
2. **Discount tiers completely missing** — No volume-based discount logic exists
3. **Share/Export button missing** — No clipboard copy functionality
4. **Quantity max is 100, not 99** — Spec says 1-99
5. **Footer text doesn't match spec**

### Should Fix
6. **Dead code** — `useCalculator` hook is imported nowhere
7. **Dead dependency** — `react-router-dom` with no routing
8. **No Tailwind classes used** — Spec calls for Tailwind but components use pure inline styles
9. **App not on `main` branch** — Current work is on `feature/jules-routing-architecture`

---

## 7. Recommendation

The codebase has significant spec violations. The discount tier logic (core feature) is completely absent, and 4/5 theme packages are incorrect. The security update (Vite upgrade) was successfully applied.

**For S6**: `***OpencodeDone***` — security hardening is complete (0 vulnerabilities, build passes).

**Note for S8 (Final Polish)**: The S8 agent should fix the 5 spec compliance issues above before this app is considered launch-ready. Alternatively, this review should be escalated to the Review-Council for a FAIL routing back to S3.

---

*Files reviewed: `src/App.tsx`, `src/components/*.tsx`, `src/hooks/useCalculator.ts`, `src/data/themes.ts`, `src/types/index.ts`, `src/index.css`, `index.html`, `package.json`, `vite.config.ts`*
