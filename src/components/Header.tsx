

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, var(--color-espresso) 0%, #5a3d1e 100%)',
      color: 'white',
      padding: '1.25rem 0',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem'
      }}>
        <img
          src="/assets/app-icon-v1.svg"
          alt="HoneyDew Logo"
          style={{ width: '40px', height: '40px' }}
        />
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--color-amber-glow)',
            margin: 0,
            lineHeight: 1.2
          }}>
            HoneyDew Themes Calculator
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-pale-honey)',
            margin: 0,
            opacity: 0.9
          }}>
            Sweet Solutions for Your Wellness Brand
          </p>
        </div>
      </div>
    </header>
  )
}
