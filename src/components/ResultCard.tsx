import { ShoppingCart, CheckCircle, Copy, CheckCheck } from 'lucide-react'
import type { ResultData } from '../types'
import { useState } from 'react'

interface ResultCardProps {
  result: ResultData
}

const TAX_RATE = 0.08

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export { TAX_RATE }

export default function ResultCard({ result }: ResultCardProps) {
  const {
    theme,
    quantity,
    subtotal,
    discountPercent,
    discountAmount,
    tax,
    total
  } = result

  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    const lines = [
      `HoneyDew Themes Calculator — Order Summary`,
      `========================================`,
      `Theme: ${theme.name}`,
      `Unit Price: ${formatCurrency(theme.price)}`,
      `Quantity: ${quantity}`,
      `----------------------------------------`,
      `Subtotal: ${formatCurrency(theme.price * quantity)}`,
    ]
    if (discountPercent > 0) {
      lines.push(`Volume Discount (${discountPercent}%): -${formatCurrency(discountAmount)}`)
    }
    lines.push(`----------------------------------------`)
    lines.push(`Subtotal: ${formatCurrency(subtotal - discountAmount)}`)
    lines.push(`Tax Estimate (8%): ${formatCurrency(tax)}`)
    lines.push(`----------------------------------------`)
    lines.push(`GRAND TOTAL: ${formatCurrency(total)}`)
    lines.push(``)
    lines.push(`Part of the HoneyDew Collection`)

    const text = lines.join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      style={{
        marginTop: '2rem',
        animation: 'slideUp 400ms ease-out'
      }}
    >
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={{
        background: 'var(--color-warm-cream)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)',
        border: '2px solid var(--color-pale-honey)',
        maxWidth: '540px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          <CheckCircle size={22} color="var(--color-success)" />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
            Your Quote
          </h2>
        </div>

        {/* Itemized breakdown */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--color-pale-honey)',
          marginBottom: '1rem'
        }}>
          {/* Theme */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
                {theme.name}
              </span>
              <span style={{
                color: 'var(--color-warm-gray)',
                fontSize: '0.875rem',
                display: 'block'
              }}>
                {quantity} × {formatCurrency(theme.price)}
              </span>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
              {formatCurrency(theme.price * quantity)}
            </span>
          </div>

          {/* Volume Discount */}
          {discountPercent > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>
                Volume Discount ({discountPercent}%)
              </span>
              <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          )}
        </div>

        {/* Subtotal (before tax) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
        }}>
          <span style={{ color: 'var(--color-warm-gray)' }}>Subtotal</span>
          <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
            {formatCurrency(subtotal - discountAmount)}
          </span>
        </div>

        {/* Tax */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--color-pale-honey)'
        }}>
          <span style={{ color: 'var(--color-warm-gray)' }}>
            Tax Estimate (8%)
          </span>
          <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
            {formatCurrency(tax)}
          </span>
        </div>

        {/* Grand Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-espresso)'
          }}>
            Grand Total
          </span>
          <span style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-honey-gold)'
          }}>
            {formatCurrency(total)}
          </span>
        </div>

        {/* CTA and Copy buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem' }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: '0.875rem',
              background: 'linear-gradient(135deg, var(--color-honey-gold) 0%, #c4910f 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,160,18,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          {/* Share/Export: Copy order summary to clipboard */}
          <button
            type="button"
            onClick={handleCopyToClipboard}
            title="Copy order summary to clipboard"
            style={{
              padding: '0.875rem 1rem',
              background: copied ? 'var(--color-success)' : 'var(--color-espresso)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 200ms ease-out',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              if (!copied) e.currentTarget.style.background = '#3d2814'
            }}
            onMouseLeave={e => {
              if (!copied) e.currentTarget.style.background = 'var(--color-espresso)'
            }}
          >
            {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-warm-gray)',
          marginTop: 0
        }}>
          Prices are estimates. Final pricing may vary.
        </p>
      </div>
    </section>
  )
}
