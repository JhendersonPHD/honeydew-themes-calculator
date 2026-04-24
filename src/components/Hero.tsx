export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 2.5rem',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Honeycomb background */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(212,160,18,0.06) 0%, transparent 60%),
          radial-gradient(circle at 20% 80%, rgba(245,200,66,0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(212,160,18,0.05) 0%, transparent 40%)
        `,
        zIndex: 0
      }} />

      {/* Honeycomb pattern overlay */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          zIndex: 0
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hexagon" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
            <polygon points="28,2 52,16 52,44 28,58 4,44 4,16" fill="none" stroke="#D4A012" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon)" />
      </svg>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <h1 style={{
          color: 'var(--color-espresso)',
          marginBottom: '0.75rem',
          fontSize: 'clamp(1.875rem, 5vw, 2.5rem)'
        }}>
          Find Your Perfect Theme
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-warm-gray)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          Calculate costs for premium honey-based wellness Shopify themes
        </p>
      </div>
    </section>
  )
}
