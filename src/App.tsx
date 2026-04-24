import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ThemeSelector from './components/ThemeSelector'
import Calculator from './components/Calculator'
import ResultCard, { TAX_RATE } from './components/ResultCard'
import Footer from './components/Footer'
import type { ThemePackage } from './components/ThemeCard'

interface ResultData {
  theme: ThemePackage
  quantity: number
  premiumSupport: boolean
  prioritySetup: boolean
  subtotal: number
  tax: number
  total: number
}

export default function App() {
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

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />

        <ThemeSelector
          selectedThemeId={selectedTheme?.id ?? null}
          onSelect={handleThemeSelect}
        />

        <Calculator
          quantity={quantity}
          onQuantityChange={q => { setQuantity(q); setResult(null) }}
          premiumSupport={premiumSupport}
          onPremiumSupportChange={v => { setPremiumSupport(v); setResult(null) }}
          prioritySetup={prioritySetup}
          onPrioritySetupChange={v => { setPrioritySetup(v); setResult(null) }}
          onCalculate={handleCalculate}
          disabled={!selectedTheme}
        />

        {result && <ResultCard result={result} />}
      </main>
      <Footer />
    </div>
  )
}
