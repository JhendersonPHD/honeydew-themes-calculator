// S4.2 XSS Prevention - Sanitization utilities
// Escape HTML entities and strip dangerous content

/**
 * Escape HTML entities to prevent XSS attacks
 */
export function sanitizeString(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Remove script tags and event handlers from HTML strings
 */
export function stripScripts(str: string): string {
  if (!str) return ''
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\bon\w+\s*=/gi, 'data-removed=')
    .replace(/javascript:/gi, '')
}

/**
 * Sanitize a number input value - remove non-numeric characters
 */
export function sanitizeNumericInput(value: string): string {
  return value.replace(/[^0-9]/g, '')
}

/**
 * Validate and sanitize theme name (in case of special characters)
 */
export function sanitizeThemeName(name: string): string {
  return sanitizeString(stripScripts(name))
}
