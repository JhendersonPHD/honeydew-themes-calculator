// S4.2 Rate Limiting - Prevent more than 10 calculations per second
import { useState, useRef, useCallback } from 'react'

const MAX_CALCULATIONS_PER_SECOND = 10
const WINDOW_MS = 1000

interface RateLimitState {
  canCalculate: boolean
  timeUntilAllowed: number
  calculationCount: number
}

/**
 * Track calculation frequency and enforce rate limiting
 * Max MAX_CALCULATIONS_PER_SECOND calculations per WINDOW_MS
 */
export function useRateLimit() {
  const [state, setState] = useState<RateLimitState>({
    canCalculate: true,
    timeUntilAllowed: 0,
    calculationCount: 0
  })
  
  const timestampsRef = useRef<number[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const checkCanCalculate = useCallback((): boolean => {
    const now = Date.now()
    const windowStart = now - WINDOW_MS
    
    // Filter out timestamps outside the current window
    timestampsRef.current = timestampsRef.current.filter(t => t > windowStart)
    
    return timestampsRef.current.length < MAX_CALCULATIONS_PER_SECOND
  }, [])
  
  const recordCalculation = useCallback(() => {
    const now = Date.now()
    timestampsRef.current.push(now)
    
    // Schedule cleanup of old timestamps
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        canCalculate: true,
        calculationCount: 0
      }))
    }, WINDOW_MS)
    
    const canCalc = checkCanCalculate()
    setState({
      canCalculate: canCalc,
      timeUntilAllowed: canCalc ? 0 : WINDOW_MS - (now - timestampsRef.current[0]),
      calculationCount: timestampsRef.current.length
    })
    
    return canCalc
  }, [checkCanCalculate])
  
  return {
    ...state,
    recordCalculation,
    checkCanCalculate
  }
}
