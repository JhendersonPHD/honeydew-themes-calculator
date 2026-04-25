import type { ThemePackage } from './index'

export interface RecommendationResult {
  theme: ThemePackage
  reason: string
  confidence: number
}

export interface AIRecommendationOptions {
  quantity: number
  selectedThemeId: string | null
}

export type RecommendationCategory = 'best-value' | 'popular' | 'bulk'

export interface AIRecommendationResponse {
  recommendations: RecommendationResult[]
  category: RecommendationCategory
}