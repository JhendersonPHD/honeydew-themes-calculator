// S4.4 Conversational UI - Voice Input Hook
// Browser SpeechRecognition API integration
import { useState, useCallback, useRef } from 'react'

interface VoiceInputState {
  isListening: boolean
  transcript: string
  error: string | null
}

interface UseVoiceInputReturn {
  isListening: boolean
  transcript: string
  error: string | null
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  toggleListening: () => void
}

/** @returns - Hook returning voice input state and controls */
export function useVoiceInput(): UseVoiceInputReturn {
  const [state, setState] = useState<VoiceInputState>({
    isListening: false,
    transcript: '',
    error: null
  })
  
  const recognitionRef = useRef<any>(null)
  
  // Check for browser support
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  
  const getRecognition = useCallback(() => {
    if (!isSupported) return null
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'
    }
    
    return recognitionRef.current
  }, [isSupported])
  
  const startListening = useCallback(() => {
    const recognition = getRecognition()
    if (!recognition) {
      setState(s => ({ ...s, error: 'Voice input not supported in this browser' }))
      return
    }
    
    setState(s => ({ ...s, error: null, transcript: '' }))
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setState(s => ({ ...s, transcript, isListening: false }))
    }
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setState(s => ({ 
        ...s, 
        error: event.error === 'not-allowed' ? 'Microphone access denied' : 'Voice recognition error',
        isListening: false 
      }))
    }
    
    recognition.onend = () => {
      setState(s => ({ ...s, isListening: false }))
    }
    
    try {
      recognition.start()
      setState(s => ({ ...s, isListening: true }))
    } catch (e) {
      setState(s => ({ ...s, error: 'Failed to start voice recognition', isListening: false }))
    }
  }, [getRecognition])
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        // Ignore - might not be running
      }
    }
    setState(s => ({ ...s, isListening: false }))
  }, [])
  
  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [state.isListening, startListening, stopListening])
  
  return {
    isListening: state.isListening,
    transcript: state.transcript,
    error: state.error,
    isSupported,
    startListening,
    stopListening,
    toggleListening
  }
}

/**
 * Convert spoken number words to numeric value
 * e.g., "five" -> 5, "twenty three" -> 23
 */
export function parseSpokenNumber(text: string): number | null {
  const wordToNum: Record<string, number> = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
    'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
    'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
    'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17,
    'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30,
    'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
    'eighty': 80, 'ninety': 90
  }
  
  const cleaned = text.toLowerCase().trim()
  const words = cleaned.split(/\s+/)
  
  // Try single word first
  if (words.length === 1) {
    const num = wordToNum[words[0]]
    if (num !== undefined) return num
    const direct = parseInt(words[0], 10)
    if (!isNaN(direct)) return direct
    return null
  }
  
  // Try compound numbers like "twenty three"
  if (words.length === 2) {
    const tens = wordToNum[words[0]] || 0
    const ones = wordToNum[words[1]] || 0
    if (tens >= 20 && ones > 0 && ones < 10) {
      return tens + ones
    }
  }
  
  // Try direct parsing
  const direct = parseInt(cleaned.replace(/[^0-9]/g, ''), 10)
  if (!isNaN(direct)) return direct
  
  return null
}
