// S4.2 Security & Input Validation
// Input validation utilities for honeydew-themes-calculator

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate quantity input
 * Must be integer between 1 and 99
 */
export function validateQuantity(value: number | string): ValidationResult {
  if (value === '' || value === null || value === undefined) {
    return { valid: false, error: 'Quantity is required' }
  }
  
  const num = typeof value === 'string' ? parseInt(value, 10) : value
  
  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' }
  }
  
  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Quantity must be a whole number' }
  }
  
  if (num < 1) {
    return { valid: false, error: 'Minimum quantity is 1' }
  }
  
  if (num > 99) {
    return { valid: false, error: 'Maximum quantity is 99' }
  }
  
  return { valid: true }
}

/**
 * Validate that a theme is selected
 */
export function validateTheme(themeId: string | null): ValidationResult {
  if (!themeId) {
    return { valid: false, error: 'Please select a theme package' }
  }
  return { valid: true }
}

/**
 * Validate premium support checkbox (must be boolean)
 */
export function validateCheckbox(value: boolean): ValidationResult {
  return { valid: typeof value === 'boolean' }
}
