// S4.5 ReferralBanner Component - Show referral code after order
import { useState } from 'react'
import type { ThemePackage } from '../types'

interface ReferralBannerProps {
  theme: ThemePackage
}

function generateReferralCode(themeName: string): string {
  const timestamp = Date.now()
  const hash = (themeName + timestamp).split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)
  const code = Math.abs(hash).toString(36).substring(0, 8).toUpperCase()
  return `HONEY-${code}`
}

export default function ReferralBanner({ theme }: ReferralBannerProps) {
  const [copied, setCopied] = useState(false)
  const referralCode = generateReferralCode(theme.name)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = referralCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{
      marginTop: '1.5rem',
      padding: '1.25rem',
      background: 'linear-gradient(135deg, #FFF8E7 0%, #FFFBF0 100%)',
      borderRadius: '12px',
      border: '2px solid #D4A012',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '1.5rem',
        marginBottom: '0.5rem'
      }}>
        🎁
      </div>
      <h4 style={{
        color: '#3D2914',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        fontWeight: 600
      }}>
        Share and Earn Rewards!
      </h4>
      <p style={{
        color: '#8B7355',
        fontSize: '0.875rem',
        marginBottom: '1rem'
      }}>
        Your unique referral code for {theme.name}:
      </p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          readOnly
          value={referralCode}
          style={{
            padding: '0.625rem 1rem',
            border: '2px solid #E8D5A3',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'monospace',
            color: '#3D2914',
            background: 'white',
            textAlign: 'center',
            width: '160px'
          }}
        />
        <button
          onClick={handleCopy}
          style={{
            padding: '0.625rem 1rem',
            background: copied ? '#7CB342' : 'linear-gradient(135deg, #F5A623 0%, #D4A012 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 150ms'
          }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <p style={{
        color: '#8B7355',
        fontSize: '0.75rem',
        marginTop: '0.75rem'
      }}>
        Share this code with friends and earn 10% off your next order!
      </p>
    </div>
  )
}
