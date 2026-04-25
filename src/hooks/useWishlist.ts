// S4.5 Wishlist Hook - Persist selected themes to localStorage
import { useState, useEffect } from 'react'

const WISHLIST_KEY = 'honeydew_wishlist'

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY)
      if (stored) {
        setWishlist(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e)
    }
  }, [])

  const toggleWishlist = (themeId: string) => {
    setWishlist(prev => {
      let updated: string[]
      if (prev.includes(themeId)) {
        updated = prev.filter(id => id !== themeId)
      } else {
        updated = [...prev, themeId]
      }
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error('Failed to save wishlist to localStorage', e)
      }
      return updated
    })
  }

  const isWishlisted = (themeId: string) => wishlist.includes(themeId)

  return { wishlist, toggleWishlist, isWishlisted }
}
