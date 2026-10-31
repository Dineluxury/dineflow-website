'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#f6f7f8', borderTop: '1px solid #e4e8ec' }}>
      <div style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e4e8ec' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(233,107,34,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(233,107,34,0.2)', background: 'rgba(233,107,34,0.06)', marginBottom: '2rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'ping-orange 2s ease-out infinite' }} />
            <span style={{ color: '#e96b22', fontSize: '12px', fontWeight: 600 }}>NOW ACCEPTING RESTAURANTS, HOTELS & CAFES</span>
          </div>

          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#18212b', marginBottom: '1.5rem' }}>
            Ready to join<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #e96b22, #c95a19)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dineflow?</span>
          </h2>
          <p style={{ color: '#65717e', marginBottom: '2.5rem', fontSize: '16px', lineHeight: 1.7 }}>
            Whether you run a restaurant, hotel, cafe, or just love good food - Dineflow is built for you.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/waitlist" style={{ padding: '14px 28px', background: '#e96b22', color: '#fff', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', fontSize: '15px', boxShadow: '0 3px 10px rgba(60,45,35,0.12)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c95a19'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 14px rgba(60,45,35,0.16)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e96b22'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(60,45,35,0.12)' }}
            >Join App Waitlist</a>
            <a href="/waitlist" style={{ padding: '14px 28px', border: '1.5px solid #e4e8ec', color: '#374151', fontWeight: 600, borderRadius: '12px', textDecoration: 'none', fontSize: '15px', transition: 'all 0.25s', background: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e96b22'; e.currentTarget.style.color = '#e96b22'; e.currentTarget.style.background = 'rgba(233,107,34,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e4e8ec'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#fff' }}
            >Join Venue Waitlist</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }} className="stats-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <img src="/dineflow-logo.png" alt="" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
              <span style={{ color: '#18212b', fontWeight: 800, fontSize: '18px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dineflow</span>
            </div>
            <p style={{ color: '#65717e', fontSize: '13px', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1.5rem' }}>
              Order food before you arrive. Your table is waiting. Ethiopia's smartest food ordering platform.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#65717e', fontSize: '13px', fontWeight: 500 }}>Built in Ethiopia with love</span>
            </div>
            <a href="mailto:support@dineflow.et" style={{ color: '#e96b22', fontSize: '13px', textDecoration: 'none', fontWeight: 600, fontFamily: 'Geist Mono, monospace' }}>support@dineflow.et</a>
          </div>

          {[
            { title: 'Product', links: [{ l: 'For Customers', h: '#customers' }, { l: 'For Venues', h: '#restaurants' }, { l: 'Pricing', h: '/pricing' }, { l: 'How It Works', h: '#how' }, { l: 'Become a Partner', h: '/partners' }] },
            { title: 'Company', links: [{ l: 'About Us', h: '#about' }, { l: 'Contact', h: '#contact' }, { l: 'Features', h: '#features' }] },
            { title: 'Legal', links: [{ l: 'Privacy Policy', h: '/privacy' }, { l: 'Terms of Service', h: '#contact' }] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#18212b', fontWeight: 700, marginBottom: '1.25rem', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(item => (
                  <li key={item.l} style={{ marginBottom: '10px' }}>
                    <a href={item.h} style={{ color: '#65717e', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e96b22'}
                      onMouseLeave={e => e.currentTarget.style.color = '#65717e'}
                    >{item.l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #e4e8ec', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>&copy; {year} Dineflow. All rights reserved.</p>
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>Made in Ethiopia</p>
        </div>
      </div>
    </footer>
  )
}



