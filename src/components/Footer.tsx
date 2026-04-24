export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-espresso)',
      color: 'var(--color-pale-honey)',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Powered by <span style={{ color: 'var(--color-amber-glow)', fontWeight: 600 }}>HoneyDew</span>
        </p>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {['Terms', 'Privacy', 'Contact'].map(link => (
            <a
              key={link}
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                color: 'var(--color-pale-honey)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                opacity: 0.8,
                transition: 'opacity 200ms ease-out'
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
