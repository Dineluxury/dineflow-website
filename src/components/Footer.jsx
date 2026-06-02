'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* CTA Band */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 60%)',
        }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 18px', borderRadius: '999px',
            border: '1px solid rgba(249,115,22,0.2)',
            background: 'rgba(249,115,22,0.06)',
            marginBottom: '2rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'ping-orange 2s ease-out infinite' }} />
            <span style={{ color: '#fb923c', fontSize: '13px', fontWeight: 500 }}>Now accepting restaurant partners</span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05,
          }}>
            Ready to join<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Dineflow?
            </span>
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2.5rem', fontSize: '16px', lineHeight: 1.7 }}>
            Whether you run a restaurant or just love good food — Dineflow is built for you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#customers" style={{
              padding: '16px 32px', background: '#f97316',
              color: '#fff', fontWeight: 700, borderRadius: '16px',
              textDecoration: 'none', fontSize: '15px',
              boxShadow: '0 8px 30px rgba(249,115,22,0.35)',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#ea6c0a'}
              onMouseLeave={e => e.currentTarget.style.background = '#f97316'}
            >
              Get the App — Free
            </a>
            <a href="#restaurants" style={{
              padding: '16px 32px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', fontWeight: 600, borderRadius: '16px',
              textDecoration: 'none', fontSize: '15px',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent' }}
            >
              Partner with Us
            </a>
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '36px', height: '36px', background: '#f97316',
                borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff', fontWeight: 900,
                fontSize: '18px', fontFamily: 'Syne, sans-serif',
              }}>D</div>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>Dineflow</span>
            </div>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1.5rem' }}>
              Order food before you arrive. Your table is waiting.
              Ethiopia's smartest food ordering platform.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>🇪🇹</span>
              <span style={{ color: '#374151', fontSize: '14px' }}>Built in Ethiopia with ❤️</span>
            </div>
            <a href="mailto:ahmedrediwan591@gmail.com" style={{ color: '#f97316', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
              ahmedrediwan591@gmail.com
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Syne, sans-serif' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { label: 'For Customers', href: '#customers' },
                { label: 'For Restaurants', href: '#restaurants' },
                { label: 'How It Works', href: '#how' },
                { label: 'Features', href: '#features' },
                { label: 'Download App', href: '#customers' },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: '12px' }}>
                  <a href={l.href} style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Syne, sans-serif' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'].map(l => (
                <li key={l} style={{ marginBottom: '12px' }}>
                  <a href="#contact" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Syne, sans-serif' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <li key={l} style={{ marginBottom: '12px' }}>
                  <a href="#contact" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ color: '#374151', fontSize: '13px' }}>© {year} Dineflow. All rights reserved.</p>
          <p style={{ color: '#374151', fontSize: '13px' }}>Made in Ethiopia 🇪🇹</p>
        </div>
      </div>
    </footer>
  )
}