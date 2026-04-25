// S4.3 AI-Powered Theme Recommendations
// Simulated AI recommendations based on quantity
import { useMemo } from 'react'
import { THEMES } from '../data/themes'
import type { RecommendationResult, AIRecommendationOptions, AIRecommendationResponse, RecommendationCategory } from '../types/ai'

function getRecommendationsForQuantity(qty: number, selectedThemeId: string | null): AIRecommendationResponse {
  // Filter out currently selected theme
  const availableThemes = THEMES.filter(t => t.id !== selectedThemeId)
  
  if (availableThemes.length === 0) {
    return { recommendations: [], category: 'popular' }
  }

  let category: RecommendationCategory
  let recommendations: RecommendationResult[]

  if (qty >= 10) {
    // Bulk order - recommend themes with best bulk value
    category = 'bulk'
    const sorted = [...availableThemes].sort((a, b) => {
      // Lower price = more savings at bulk
      return a.price - b.price
    })
    recommendations = sorted.slice(0, 2).map(theme => ({
      theme,
      reason: `Best for bulk orders - most affordable at $${theme.price.toFixed(2)} per unit`,
      confidence: 0.9
    }))
  } else if (qty >= 3) {
    // Medium order - popular themes
    category = 'popular'
    const popular = availableThemes.find(t => t.id === 'zen-garden') || availableThemes[0]
    const second = availableThemes.find(t => t.id !== popular.id) || availableThemes[0]
    recommendations = [
      {
        theme: popular,
        reason: 'Most popular choice for medium orders - great balance of quality and value',
        confidence: 0.85
      },
      {
        theme: second,
        reason: 'Customer favorite with excellent reviews',
        confidence: 0.78
      }
    ]
  } else {
    // Small order (1-2) - best value
    category = 'best-value'
    const sorted = [...availableThemes].sort((a, b) => a.price - b.price)
    recommendations = sorted.slice(0, 2).map((theme, i) => ({
      theme,
      reason: i === 0 
        ? 'Best value - lowest price with same great quality' 
        : 'Second-best value option',
      confidence: 0.88 - (i * 0.1)
    }))
  }

  return { recommendations, category }
}

export function useAIRecommendations(options: AIRecommendationOptions): AIRecommendationResponse {
  const { quantity, selectedThemeId } = options

  return useMemo(() => {
    if (quantity < 1 || selectedThemeId) {
      return { recommendations: [], category: 'best-value' }
    }
    return getRecommendationsForQuantity(quantity, selectedThemeId)
  }, [quantity, selectedThemeId])
}