import ThemeCard, { ThemePackage } from './ThemeCard'

const THEMES: ThemePackage[] = [
  {
    id: 'morning-glow',
    name: 'Morning Glow',
    description: 'Honey + citrus energizing start',
    price: 29.99,
    emoji: '🌅'
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    description: 'Honey + lavender calm retreat',
    price: 39.99,
    emoji: '🏡'
  },
  {
    id: 'golden-harvest',
    name: 'Golden Harvest',
    description: 'Honey + autumn warmth bundle',
    price: 49.99,
    emoji: '🍂'
  },
  {
    id: 'wildflower-retreat',
    name: 'Wildflower Retreat',
    description: 'Honey + wildflower meadow escape',
    price: 34.99,
    emoji: '🌼'
  },
  {
    id: 'sunlit-meadow',
    name: 'Sunlit Meadow',
    description: 'Honey + sunflower brightness',
    price: 27.99,
    emoji: '🌻'
  }
]

interface ThemeSelectorProps {
  selectedThemeId: string | null
  onSelect: (theme: ThemePackage) => void
}

export { THEMES }

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
