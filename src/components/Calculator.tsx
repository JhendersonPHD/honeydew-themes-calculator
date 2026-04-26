import { Calculator as CalcIcon, Mic, MicOff } from 'lucide-react'
import { useVoiceInput, parseSpokenNumber } from '../hooks/useVoiceInput'

interface CalculatorProps {
  quantity: number
  onQuantityChange: (q: number) => void
  quantityError?: string | null
  onCalculate: () => void
  disabled: boolean
}

export default function Calculator({
  quantity,
  onQuantityChange,
  quantityError,
  onCalculate,
  disabled
}: CalculatorProps) {
  const voice = useVoiceInput()

  function handleVoiceResult() {
    if (voice.transcript) {
      const num = parseSpokenNumber(voice.transcript)
      if (num !== null && num >= 1 && num <= 99) {
        onQuantityChange(num)
      }
    }
  }

  // When transcript changes, apply it
  if (voice.transcript) {
    handleVoiceResult()
  }

  return (
    <section style={{
      background: 'var(--color-warm-cream)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: 'var(--shadow-md)',
      marginTop: '2rem'
    }}>
      <h2 style={{
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <CalcIcon size={24} color="var(--color-honey-gold)" />
        Configure Your Order
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxWidth: '480px'
      }}>
        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            style={{
              display: 'block',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: 'var(--color-espresso)'
            }}
          >
            Quantity
          </label>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <input
              id="quantity"
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={e => {
                const val = parseInt(e.target.value, 10)
                if (!isNaN(val)) onQuantityChange(val)
              }}
              aria-invalid={!!quantityError}
              aria-describedby={quantityError ? 'quantity-error' : undefined}
              style={{
                width: '120px',
                padding: '0.625rem 0.875rem',
                border: `2px solid ${quantityError ? '#e53e3e' : 'var(--color-pale-honey)'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                background: 'white',
                color: 'var(--color-espresso)',
                outline: 'none',
                transition: 'border-color 200ms ease-out'
              }}
              onFocus={e => (e.target.style.borderColor = quantityError ? '#e53e3e' : 'var(--color-honey-gold)')}
              onBlur={e => (e.target.style.borderColor = quantityError ? '#e53e3e' : 'var(--color-pale-honey)')}
            />
            {/* Voice Input Button */}
            {voice.isSupported && (
              <button
                type="button"
                onClick={voice.toggleListening}
                aria-label={voice.isListening ? 'Stop voice input' : 'Start voice input'}
                title={voice.isListening ? 'Listening...' : 'Speak quantity'}
                style={{
                  padding: '0.625rem',
                  background: voice.isListening ? '#F5A623' : 'var(--color-pale-honey)',
                  border: `2px solid ${voice.isListening ? '#F5A623' : 'var(--color-pale-honey)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 150ms'
                }}
              >
                {voice.isListening ? (
                  <MicOff size={18} color="white" />
                ) : (
                  <Mic size={18} color="var(--color-espresso)" />
                )}
              </button>
            )}
          </div>
          {quantityError && (
            <p id="quantity-error" style={{
              color: '#e53e3e',
              fontSize: '0.8125rem',
              marginTop: '0.375rem'
            }} role="alert">
              {quantityError}
            </p>
          )}
          {voice.isListening && (
            <p style={{
              color: '#F5A623',
              fontSize: '0.8125rem',
              marginTop: '0.375rem'
            }}>
              🎤 Listening... say a number
            </p>
          )}
        </div>

        {/* Volume Discount Info */}
        <div style={{
          padding: '0.875rem 1rem',
          borderRadius: '8px',
          border: '2px solid var(--color-pale-honey)',
          background: 'rgba(245,166,35,0.08)',
          fontSize: '0.875rem',
          color: 'var(--color-espresso)'
        }}>
          <strong style={{ color: 'var(--color-honey-gold)' }}>Volume Discounts:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
            <li>5-9 units: <strong>10% off</strong></li>
            <li>10-24 units: <strong>15% off</strong></li>
            <li>25+ units: <strong>20% off</strong></li>
          </ul>
        </div>

        {/* Calculate Button */}
        <button
          type="button"
          onClick={onCalculate}
          disabled={disabled}
          style={{
            padding: '0.875rem 2rem',
            background: disabled
              ? 'var(--color-pale-honey)'
              : 'linear-gradient(135deg, var(--color-honey-gold) 0%, #c4910f 100%)',
            color: disabled ? 'var(--color-warm-gray)' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : 'var(--shadow-md)',
            transition: 'all 200ms ease-out',
            alignSelf: 'flex-start',
            marginTop: '0.5rem'
          }}
          onMouseEnter={e => {
            if (!disabled) {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,160,18,0.35)'
            }
          }}
          onMouseLeave={e => {
            if (!disabled) {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }
          }}
          onMouseDown={e => {
            if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'
          }}
          onMouseUp={e => {
            if (!disabled) e.currentTarget.style.transform = 'scale(1.02)'
          }}
        >
          Calculate Total
        </button>
      </div>
    </section>
  )
}
