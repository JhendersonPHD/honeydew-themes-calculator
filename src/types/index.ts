export interface ThemePackage {
  id: string
  name: string
  description: string
  price: number
  emoji: string
}

export interface ResultData {
  theme: ThemePackage
  quantity: number
  subtotal: number
  discountPercent: number
  discountAmount: number
  tax: number
  total: number
}

export function getDiscountTier(quantity: number): { percent: number; label: string } {
  if (quantity >= 25) return { percent: 20, label: '20% off (25+ units)' }
  if (quantity >= 10) return { percent: 15, label: '15% off (10-24 units)' }
  if (quantity >= 5) return { percent: 10, label: '10% off (5-9 units)' }
  return { percent: 0, label: '' }
}
