import ThemeCard from './ThemeCard'
import { THEMES } from '../data/themes'
import type { ThemePackage } from '../types'

interface ThemeSelectorProps {
  selectedThemeId: string | null
  onSelect: (theme: ThemePackage) => void
}

export default function ThemeSelector({ selectedThemeId, onSelect }: ThemeSelectorProps) {
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
          />
        ))}
      </div>
    </section>
  )
}
