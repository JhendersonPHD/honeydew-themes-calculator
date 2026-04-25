import ThemeCard from './ThemeCard'
import { THEMES } from '../data/themes'
import type { ThemePackage } from '../types'

interface ThemeSelectorProps {
  selectedThemeId: string | null
  onSelect: (theme: ThemePackage) => void
  wishlist?: string[]
  onToggleWishlist?: (themeId: string) => void
}

export default function ThemeSelector({ 
  selectedThemeId, 
  onSelect,
  wishlist = [],
  onToggleWishlist
}: ThemeSelectorProps) {
  return (
    <section>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: 'var(--color-espresso)'
      }}>
        Choose Your Theme
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        {THEMES.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            onSelect={() => onSelect(theme)}
            isWishlisted={wishlist.includes(theme.id)}
            onToggleWishlist={onToggleWishlist ? () => onToggleWishlist(theme.id) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
