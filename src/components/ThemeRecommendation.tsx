// S4.3 AI-Powered Theme Recommendation Component
import type { ThemePackage } from '../types'

interface ThemeRecommendationProps {
  recommendations: Array<{
    theme: ThemePackage
    reason: string
    confidence: number
  }>
  category: string
  onSelect: (theme: ThemePackage) => void
}

export default function ThemeRecommendation({ 
  recommendations, 
  category,
  onSelect 
}: ThemeRecommendationProps) {
  if (recommendations.length === 0) {
    return null
  }

  const categoryLabels: Record<string, string> = {
    'best-value': '💰 Best Value Picks',
    'popular': '⭐ Popular Choices',
    'bulk': '📦 Best for Bulk Orders'
  }

  const categoryLabel = categoryLabels[category] || '✨ Recommended'

  return (
    <section style={{
      marginTop: '2rem',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #FFF8E7 0%, #FFFBF0 100%)',
      borderRadius: '16px',
      border: '2px solid #F5A623'
    }}>
      <h3 style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        color: '#3D2914',
        fontSize: '1.125rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600
      }}>
        <span style={{ fontSize: '1.25rem' }}>{categoryLabel}</span>
        <span style={{
          fontSize: '0.75rem',
          background: '#F5A623',
          color: 'white',
          padding: '0.125rem 0.5rem',
          borderRadius: '12px',
          fontWeight: 400
        }}>
          AI Powered
        </span>
      </h3>

      <div style={{
        display: 'grid',
        gap: '0.75rem'
      }}>
        {recommendations.map((rec) => (
          <div
            key={rec.theme.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #E8D5A3',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{rec.theme.emoji}</span>
              <div>
                <div style={{
                  fontWeight: 600,
                  color: '#3D2914',
                  fontSize: '0.95rem'
                }}>
                  {rec.theme.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#8B7355',
                  marginTop: '0.125rem'
                }}>
                  {rec.reason}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontWeight: 700,
                color: '#D4A012',
                fontSize: '1rem'
              }}>
                ${rec.theme.price.toFixed(2)}
              </span>
              <button
                onClick={() => onSelect(rec.theme)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #F5A623 0%, #D4A012 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'transform 150ms, box-shadow 150ms',
                  boxShadow: '0 2px 8px rgba(212, 160, 18, 0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 160, 18, 0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 160, 18, 0.3)'
                }}
              >
                Try This
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}