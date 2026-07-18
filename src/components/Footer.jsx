'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#F9FAFB', borderTop: '1px solid #F0F0F0' }}>
      {/* CTA Band */}
      <div style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #F0F0F0' }}>
        {/* Very soft orange tint */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.06)', marginBottom: '2rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'ping-orange 2s ease-out infinite' }} />
            <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 600 }}>NOW ACCEPTING RESTAURANT PARTNERS</span>
          </div>

          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem' }}>
            Ready to join<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dineflow?</span>
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '2.5rem', fontSize: '16px', lineHeight: 1.7 }}>
            Whether you run a restaurant or just love good food — Dineflow is built for you.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#customers" style={{ padding: '14px 28px', background: '#f97316', color: '#fff', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', fontSize: '15px', boxShadow: '0 6px 20px rgba(249,115,22,0.35)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.35)' }}
            >Get the App — Free</a>
            <a href="#restaurants" style={{ padding: '14px 28px', border: '1.5px solid #E5E7EB', color: '#374151', fontWeight: 600, borderRadius: '12px', textDecoration: 'none', fontSize: '15px', transition: 'all 0.25s', background: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; e.currentTarget.style.background = 'rgba(249,115,22,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#fff' }}
            >Partner with Us</a>
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }} className="stats-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ width: '34px', height: '34px', background: '#f97316', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}>D</div>
              <span style={{ color: '#111827', fontWeight: 800, fontSize: '18px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dineflow</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1.5rem' }}>
              Order food before you arrive. Your table is waiting. Ethiopia's smartest food ordering platform.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Built in Ethiopia with love</span>
            </div>
            <a href="mailto:ahmedrediwan591@gmail.com" style={{ color: '#f97316', fontSize: '13px', textDecoration: 'none', fontWeight: 600, fontFamily: 'Geist Mono, monospace' }}>ahmedrediwan591@gmail.com</a>
          </div>

          {[
            { title: 'Product', links: [{ l: 'For Customers', h: '#customers' }, { l: 'For Restaurants', h: '#restaurants' }, { l: 'How It Works', h: '#how' }, { l: 'Become a Partner', h: '/partners' }] },
            { title: 'Company', links: [{ l: 'About Us', h: '#about' }, { l: 'Blog', h: '#contact' }, { l: 'Careers', h: '#contact' }, { l: 'Contact', h: '#contact' }] },
            { title: 'Legal', links: [{ l: 'Privacy Policy', h: '#contact' }, { l: 'Terms of Service', h: '#contact' }, { l: 'Cookie Policy', h: '#contact' }] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#111827', fontWeight: 700, marginBottom: '1.25rem', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(item => (
                  <li key={item.l} style={{ marginBottom: '10px' }}>
                    <a href={item.h} style={{ color: '#6B7280', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                    >{item.l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>© {year} Dineflow. All rights reserved.</p>
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>Made in Ethiopia</p>
        </div>
      </div>
    </footer>
  )
}