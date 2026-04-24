import { Calculator as CalcIcon } from 'lucide-react'

interface CalculatorProps {
  quantity: number
  onQuantityChange: (q: number) => void
  premiumSupport: boolean
  onPremiumSupportChange: (v: boolean) => void
  prioritySetup: boolean
  onPrioritySetupChange: (v: boolean) => void
  onCalculate: () => void
  disabled: boolean
}

export default function Calculator({
  quantity,
  onQuantityChange,
  premiumSupport,
  onPremiumSupportChange,
  prioritySetup,
  onPrioritySetupChange,
  onCalculate,
  disabled
}: CalculatorProps) {
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
          <input
            id="quantity"
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={e => onQuantityChange(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            style={{
              width: '120px',
              padding: '0.625rem 0.875rem',
              border: '2px solid var(--color-pale-honey)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              background: 'white',
              color: 'var(--color-espresso)',
              outline: 'none',
              transition: 'border-color 200ms ease-out'
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-honey-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-pale-honey)')}
          />
        </div>

        {/* Premium Support */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          padding: '0.875rem 1rem',
          borderRadius: '8px',
          border: `2px solid ${premiumSupport ? 'var(--color-honey-gold)' : 'var(--color-pale-honey)'}`,
          background: premiumSupport ? 'rgba(212,160,18,0.06)' : 'white',
          transition: 'all 200ms ease-out'
        }}>
          <input
            type="checkbox"
            checked={premiumSupport}
            onChange={e => onPremiumSupportChange(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              accentColor: 'var(--color-honey-gold)',
              cursor: 'pointer'
            }}
          />
          <div>
            <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
              Premium Support
            </span>
            <span style={{
              marginLeft: '0.5rem',
              fontWeight: 700,
              color: 'var(--color-honey-gold)'
            }}>
              +$9.99/mo
            </span>
            <p style={{
              margin: '0.125rem 0 0',
              fontSize: '0.8125rem',
              color: 'var(--color-warm-gray)'
            }}>
              Priority access to our support team
            </p>
          </div>
        </label>

        {/* Priority Setup */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          padding: '0.875rem 1rem',
          borderRadius: '8px',
          border: `2px solid ${prioritySetup ? 'var(--color-honey-gold)' : 'var(--color-pale-honey)'}`,
          background: prioritySetup ? 'rgba(212,160,18,0.06)' : 'white',
          transition: 'all 200ms ease-out'
        }}>
          <input
            type="checkbox"
            checked={prioritySetup}
            onChange={e => onPrioritySetupChange(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              accentColor: 'var(--color-honey-gold)',
              cursor: 'pointer'
            }}
          />
          <div>
            <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
              Priority Setup
            </span>
            <span style={{
              marginLeft: '0.5rem',
              fontWeight: 700,
              color: 'var(--color-honey-gold)'
            }}>
              +$19.99
            </span>
            <p style={{
              margin: '0.125rem 0 0',
              fontSize: '0.8125rem',
              color: 'var(--color-warm-gray)'
            }}>
              Fast-track installation and configuration
            </p>
          </div>
        </label>

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
