// S4.5 RecentlyViewed Component - Track last 5 viewed themes
import { useState, useEffect } from 'react'
import { THEMES } from '../data/themes'
import type { ThemePackage } from '../types'

const RECENTLY_VIEWED_KEY = 'honeydew_recently_viewed'
const MAX_RECENT = 5

function getStoredRecent(): string[] {
  try {
    const stored = sessionStorage.getItem(RECENTLY_VIEWED_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function addToRecent(themeId: string) {
  const recent = getStoredRecent().filter(id => id !== themeId)
  recent.unshift(themeId)
  const trimmed = recent.slice(0, MAX_RECENT)
  try {
    sessionStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(trimmed))
  } catch {}
  return trimmed
}

export default function RecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>([])

  useEffect(() => {
    // Track when a theme is viewed (check URL or state changes)
    const checkRecent = () => {
      setRecentIds(getStoredRecent())
    }
    checkRecent()
    
    // Listen for custom event when theme is selected
    const handleThemeView = (e: CustomEvent) => {
      const themeId = e.detail?.themeId
      if (themeId) {
        setRecentIds(addToRecent(themeId))
      }
    }
    
    window.addEventListener('theme-view' as any, handleThemeView)
    return () => window.removeEventListener('theme-view' as any, handleThemeView)
  }, [])

  if (recentIds.length === 0) {
    return null
  }

  const recentThemes = recentIds
    .map(id => THEMES.find(t => t.id === id))
    .filter((t): t is ThemePackage => t !== undefined)

  if (recentThemes.length === 0) {
    return null
  }

  return (
    <section style={{
      marginBottom: '1.5rem'
    }}>
      <h3 style={{
        fontSize: '0.875rem',
        color: '#8B7355',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Recently Viewed
      </h3>
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {recentThemes.map(theme => (
          <div
            key={theme.id}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.875rem',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #E8D5A3',
              cursor: 'pointer',
              transition: 'transform 150ms, box-shadow 150ms'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(61,41,20,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{theme.emoji}</span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#3D2914'
            }}>
              {theme.name}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: '#D4A012',
              fontWeight: 700
            }}>
              ${theme.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
