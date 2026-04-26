import { useState, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ThemeSelector from './components/ThemeSelector'
import Calculator from './components/Calculator'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import ThemeHelper from './components/ThemeHelper'
import type { ThemePackage, ResultData } from './types'
import { getDiscountTier } from './types'
import { TAX_RATE } from './hooks/useCalculator'
import { validateQuantity } from './utils/validation'
import { useAIRecommendations } from './hooks/useAIRecommendations'
import ThemeRecommendation from './components/ThemeRecommendation'
import { useAnalytics } from './hooks/useAnalytics'
import { useWishlist } from './hooks/useWishlist'
import RecentlyViewed from './components/RecentlyViewed'

const ResultCard = lazy(() => import('./components/ResultCard'))

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePackage | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState<string | null>(null)
  const [result, setResult] = useState<ResultData | null>(null)

  // S4.3 AI Recommendations
  const aiRecommendations = useAIRecommendations({
    quantity,
    selectedThemeId: selectedTheme?.id ?? null
  })

  // S4.5 Analytics & Wishlist
  const { trackEvent } = useAnalytics()
  const { wishlist, toggleWishlist } = useWishlist()

  function handleQuantityChange(q: number) {
    setQuantity(q)
    setResult(null)
    // Validate and show error inline
    const validation = validateQuantity(q)
    setQuantityError(validation.valid ? null : validation.error || null)
  }

  function handleCalculate() {
    if (!selectedTheme) return

    // Final validation before calculation
    const qValidation = validateQuantity(quantity)
    if (!qValidation.valid) {
      setQuantityError(qValidation.error || 'Invalid quantity')
      return
    }

    const themeCost = selectedTheme.price * quantity
    
    // Apply discount tier based on quantity
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
    
    // Track calculation event
    trackEvent('Calculator', 'Calculate', `${selectedTheme.name} x${quantity}`)
  }

  function handleThemeSelect(theme: ThemePackage) {
    setSelectedTheme(theme)
    setResult(null)
    // Track theme selection
    trackEvent('Theme', 'Select', theme.name)
  }

  return (
    <div className="app">
      <a href="#main-content" style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}>Skip to main content</a>
      
      <Header />
      <main id="main-content" className="main-content">
        <Hero />

        {/* S4.5: Recently Viewed Themes */}
        <RecentlyViewed />

        <ThemeSelector
          selectedThemeId={selectedTheme?.id ?? null}
          onSelect={handleThemeSelect}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />

        {/* S4.3: AI Recommendations */}
        <ThemeRecommendation
          recommendations={aiRecommendations.recommendations}
          category={aiRecommendations.category}
          onSelect={handleThemeSelect}
        />

        <Calculator
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          quantityError={quantityError}
          onCalculate={handleCalculate}
          disabled={!selectedTheme}
        />

        {result && (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
            <ErrorBoundary fallbackMessage="The order summary could not be displayed. Your calculation was successful — please refresh to see results.">
              <ResultCard result={result} />
            </ErrorBoundary>
          </Suspense>
        )}
      </main>
      <Footer />
      <ThemeHelper />
    </div>
  )
}
