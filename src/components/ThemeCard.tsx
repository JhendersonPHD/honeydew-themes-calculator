import type { ThemePackage } from '../types'

interface ThemeCardProps {
  theme: ThemePackage
  isSelected: boolean
  onSelect: () => void
  isWishlisted?: boolean
  onToggleWishlist?: () => void
}

export default function ThemeCard({ 
  theme, 
  isSelected, 
  onSelect,
  isWishlisted = false,
  onToggleWishlist
}: ThemeCardProps) {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleWishlist?.()
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      style={{
        background: 'var(--color-warm-cream)',
        border: `2px solid ${isSelected ? 'var(--color-honey-gold)' : 'var(--color-pale-honey)'}`,
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 200ms ease-out',
        boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
        transform: isSelected ? 'translateY(-2px)' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        }
      }}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--color-honey-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      )}

      {/* Wishlist heart */}
      {onToggleWishlist && (
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '8px',
            right: isSelected ? '40px' : '8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'white',
            border: '1px solid var(--color-pale-honey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 150ms'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={isWishlisted ? 'var(--color-honey-gold)' : 'none'} 
            stroke="var(--color-honey-gold)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      )}

      <div style={{
        fontSize: '2rem',
        marginBottom: '0.75rem'
      }}>
        {theme.emoji}
      </div>

      <h3 style={{
        color: 'var(--color-espresso)',
        marginBottom: '0.375rem',
        fontSize: '1.125rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600
      }}>
        {theme.name}
      </h3>

      <p style={{
        color: 'var(--color-warm-gray)',
        fontSize: '0.875rem',
        marginBottom: '0.875rem',
        lineHeight: 1.5
      }}>
        {theme.description}
      </p>

      <div style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: '1.375rem',
        color: 'var(--color-honey-gold)'
      }}>
        ${theme.price.toFixed(2)}
      </div>
    </button>
  )
}
