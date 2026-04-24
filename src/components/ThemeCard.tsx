export interface ThemePackage {
  id: string
  name: string
  description: string
  price: number
  emoji: string
}

interface ThemeCardProps {
  theme: ThemePackage
  isSelected: boolean
  onSelect: () => void
}

export default function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
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
