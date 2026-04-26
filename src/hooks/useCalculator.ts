import { useState } from 'react'
import type { ThemePackage, ResultData } from '../types'
import { getDiscountTier } from '../types'

const TAX_RATE = 0.08

export function useCalculator() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePackage | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [result, setResult] = useState<ResultData | null>(null)

  function handleCalculate() {
    if (!selectedTheme) return

    const themeCost = selectedTheme.price * quantity
    const discountTier = getDiscountTier(quantity)
    const discountAmount = themeCost * (discountTier.percent / 100)
    const subtotalAfterDiscount = themeCost - discountAmount
    const tax = subtotalAfterDiscount * TAX_RATE
    const total = subtotalAfterDiscount + tax

    setResult({
      theme: selectedTheme,
      quantity,
      subtotal: themeCost,
      discountPercent: discountTier.percent,
      discountAmount,
      tax,
      total
    })
  }

  function handleThemeSelect(theme: ThemePackage) {
    setSelectedTheme(theme)
    setResult(null)
  }

  return {
    selectedTheme,
    quantity,
    setQuantity,
    result,
    setResult,
    handleCalculate,
    handleThemeSelect
  }
}

export { TAX_RATE }
