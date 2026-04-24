// S4.4 Conversational UI - Theme Helper Chat Widget
// Provides helpful Q&A about theme packages
import { useState } from 'react'
import { THEMES } from '../data/themes'

interface Props {
  className?: string
}

const EXAMPLE_QUESTIONS = [
  { label: 'Which theme is cheapest?', answer: getCheapestAnswer() },
  { label: 'What is the best value?', answer: getBestValueAnswer() },
  { label: 'Which has the biggest discount?', answer: getBulkDiscountAnswer() },
  { label: 'Compare all themes', answer: getCompareAnswer() },
  { label: 'Help me choose', answer: getHelpAnswer() },
]

function getCheapestAnswer(): string {
  const cheapest = THEMES.reduce((a, b) => a.price < b.price ? a : b)
  return `The ${cheapest.name} is the most affordable at $${cheapest.price.toFixed(2)}. Great choice for budget-conscious buyers!`
}

function getBestValueAnswer(): string {
  const basePrice = 30 // approximate average
  const bestValue = THEMES.reduce((best, theme) => {
    const valueScore = (100 - (theme.price / basePrice * 100))
    return valueScore > best.valueScore ? { theme, valueScore } : best
  }, { theme: THEMES[0], valueScore: 0 })
  return `${bestValue.theme.name} offers the best value at $${bestValue.theme.price.toFixed(2)} — quality honey wellness at a great price point!`
}

function getBulkDiscountAnswer(): string {
  return `All orders qualify for volume discounts: 5-9 units get 10% off, 10-24 units get 15% off, and 25+ units get 20% off! The more they order, the more they save.`
}

function getCompareAnswer(): string {
  return THEMES.map(t => {
    const discount5 = (t.price * 5 * 0.9).toFixed(2)
    const discount25 = (t.price * 25 * 0.8).toFixed(2)
    return `${t.emoji} ${t.name} ($${t.price}): Bulk 5+ = $${discount5}, Bulk 25+ = $${discount25}`
  }).join('\n')
}

function getHelpAnswer(): string {
  const midPrice = THEMES.reduce((sum, t) => sum + t.price, 0) / THEMES.length
  const recommendation = THEMES.find(t => t.price >= midPrice * 0.9 && t.price <= midPrice * 1.1) || THEMES[1]
  return `Based on average pricing, I'd recommend ${recommendation.name} at $${recommendation.price.toFixed(2)}. It offers excellent quality at a fair price. Need a specific use case? I'm happy to help!`
}

export default function ThemeHelper({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null)

  return (
    <div 
      className={className}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(45, 27, 0, 0.15)',
          width: '300px',
          maxHeight: '400px',
          overflow: 'hidden',
          border: '2px solid var(--color-honey-gold, #F5A623)',
          marginBottom: '0.75rem'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #F5A623 0%, #c4910f 100%)',
            padding: '0.875rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🍯</span>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                Theme Helper
              </span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setActiveAnswer(null) }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close helper"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
            {!activeAnswer ? (
              <>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#6B4423', 
                  marginBottom: '0.75rem',
                  lineHeight: 1.4
                }}>
                  Hi! I can help you pick the perfect honey wellness theme. Try these questions:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {EXAMPLE_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveAnswer(q.answer)}
                      style={{
                        textAlign: 'left',
                        padding: '0.625rem 0.875rem',
                        background: '#FFF8E7',
                        border: '1px solid #F5A623',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        color: '#2D1B00',
                        cursor: 'pointer',
                        transition: 'all 150ms'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F5A623')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#FFF8E7')}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button
                  onClick={() => setActiveAnswer(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    color: '#F5A623',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginBottom: '0.75rem',
                    padding: 0
                  }}
                >
                  ← Back to questions
                </button>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#2D1B00', 
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap'
                }}>
                  {activeAnswer}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close theme helper' : 'Open theme helper'}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F5A623 0%, #c4910f 100%)',
          border: 'none',
          boxShadow: '0 4px 16px rgba(245, 166, 35, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'transform 200ms, box-shadow 200ms',
          transform: isOpen ? 'scale(1.1)' : 'scale(1)'
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = isOpen ? 'scale(1.1)' : 'scale(1)')}
      >
        {isOpen ? '×' : '🍯'}
      </button>
    </div>
  )
}
