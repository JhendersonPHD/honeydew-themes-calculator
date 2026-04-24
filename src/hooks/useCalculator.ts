import { useState } from 'react'
import type { ThemePackage, ResultData } from '../types'

const TAX_RATE = 0.08

export function useCalculator() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePackage | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [premiumSupport, setPremiumSupport] = useState(false)
  const [prioritySetup, setPrioritySetup] = useState(false)
  const [result, setResult] = useState<ResultData | null>(null)

  function handleCalculate() {
    if (!selectedTheme) return

    const themeCost = selectedTheme.price * quantity
    const addOnCost = (premiumSupport ? 9.99 : 0) + (prioritySetup ? 19.99 : 0)
    const subtotal = themeCost + addOnCost
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax

    setResult({
      theme: selectedTheme,
      quantity,
      premiumSupport,
      prioritySetup,
      subtotal,
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
    premiumSupport,
    setPremiumSupport,
    prioritySetup,
    setPrioritySetup,
    result,
    setResult,
    handleCalculate,
    handleThemeSelect
  }
}

export { TAX_RATE }
