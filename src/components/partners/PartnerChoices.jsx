'use client'

export default function PartnerChoices() {
  return (
    <section style={{ padding: '6rem 0', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Two Ways to Earn</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '1rem', color: '#fff' }}>
            Choose your path.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            {
              emoji: '🎓',
              title: 'Student Ambassador',
              subtitle: 'For university students',
              color: '#f97316',
              bg: 'rgba(249,115,22,0.08)',
              border: 'rgba(249,115,22,0.2)',
              what: 'Go to restaurants and cafes near your university. Show them the Dineflow desktop app. Help them sign up.',
              earn: '50% of Dineflow\'s commission from that restaurant for 3 full months.',
              example: 'If a restaurant earns ETB 100,000/month and you bring them, you earn ~ETB 2,500/month for 3 months = ETB 7,500 total.',
              href: '#ambassador',
              cta: 'Become an Ambassador',
            },
            {
              emoji: '🎬',
              title: 'Content Creator',
              subtitle: 'For TikTokers, YouTubers, Instagramers',
              color: '#a855f7',
              bg: 'rgba(168,85,247,0.08)',
              border: 'rgba(168,85,247,0.2)',
              what: 'Review a restaurant or food item. Share your unique Dineflow food link. Your followers order through it.',
              earn: 'A commission for every order placed through your specific food link — paid after the customer pays.',
              example: 'If 500 followers order ETB 150 food through your link, you earn ETB 3 per order = ETB 1,500 from one video.',
              href: '#creator',
              cta: 'Apply as a Creator',
            },
          ].map(p => (
            <div key={p.title} style={{
              background: '#1a1a1a', border: `1px solid ${p.border}`,
              borderRadius: '24px', padding: '2.5rem',
              transition: 'all 0.3s ease', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${p.bg}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ width: '56px', height: '56px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '1.5rem' }}>
                {p.emoji}
              </div>
              <div style={{ color: '#6b7280', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{p.subtitle}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{p.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '2rem' }}>
                <div>
                  <div style={{ color: p.color, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>What you do</div>
                  <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>{p.what}</p>
                </div>
                <div>
                  <div style={{ color: p.color, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>What you earn</div>
                  <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>{p.earn}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>💡 EXAMPLE</div>
                  <p style={{ color: '#d1d5db', fontSize: '13px', lineHeight: 1.6 }}>{p.example}</p>
                </div>
              </div>

              <a href={p.href} style={{
                display: 'block', width: '100%', padding: '14px',
                background: p.bg, border: `1px solid ${p.border}`,
                color: p.color, fontWeight: 700, fontSize: '15px',
                borderRadius: '14px', textDecoration: 'none',
                textAlign: 'center', transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = p.bg; e.currentTarget.style.color = p.color }}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}