// S4.5 Analytics Hook - Track user events
type AnalyticsEvent = {
  category: string
  action: string
  label?: string
  timestamp: number
}

const events: AnalyticsEvent[] = []

export function useAnalytics() {
  const trackEvent = (category: string, action: string, label?: string) => {
    const timestamp = Date.now()
    const event = { category, action, label, timestamp }
    events.push(event)
    console.log(
      `[Analytics] ${category} | ${action}${label ? ` | ${label}` : ''}`
    )
  }

  const getEvents = () => [...events]

  return { trackEvent, getEvents }
}
