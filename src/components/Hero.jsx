'use client'
import { useEffect, useState } from 'react'
import { Smartphone, CreditCard, Zap, Star } from 'lucide-react'

const trustItems = [
  { icon: Smartphone, label: 'Free Download' },
  { icon: CreditCard, label: 'Telebirr Pay' },
  { icon: Zap, label: 'Real-time Track' },
  { icon: Star, label: '4.9 Rating' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', background: '#ffffff',
      paddingTop: '68px',
    }}>
      {/* Very soft orange tint top-right */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: mounted ? 'glow-pulse 8s ease-in-out infinite' : 'none',
      }} />
      {/* Very soft gray tint bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-5%', left: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="hero-grid">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '999px',
              background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
              marginBottom: '2rem',
            }}>
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'block' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', animation: 'ping-green 1.5s ease-out infinite' }} />
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f97316' }}>Ethiopia's #1 Pre-Order Food App</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#111827',
              marginBottom: '1.5rem',
            }}>
              Order Food<br />
              <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Before
              </span>
              <br />You Arrive.
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.8, maxWidth: '460px', marginBottom: '2.5rem' }}>
              Skip the wait. Pre-order from your favorite restaurants, pay with <strong style={{ color: '#f97316', fontWeight: 600 }}>Telebirr</strong>, and walk in to your meal already on the table.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="#customers" style={{
                padding: '14px 28px',
                background: '#f97316',
                color: '#fff', fontWeight: 700, borderRadius: '12px',
                textDecoration: 'none', fontSize: '15px',
                boxShadow: '0 6px 20px rgba(249,115,22,0.35)',
                transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.35)' }}
              >
                Get the App — Free
              </a>
              <a href="#restaurants" style={{
                padding: '14px 28px',
                border: '1.5px solid #E5E7EB', color: '#374151',
                fontWeight: 600, borderRadius: '12px', textDecoration: 'none',
                fontSize: '15px', transition: 'all 0.25s ease', background: '#fff',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; e.currentTarget.style.background = 'rgba(249,115,22,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#fff' }}
              >
                For Restaurants →
              </a>
            </div>

            {/* Trust pills */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '13px', fontWeight: 500 }}>
                  <Icon size={14} color="#f97316" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Phone Mockup ── */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '2rem' }}>
            <div style={{
              position: 'relative',
              animation: mounted ? 'float 5s ease-in-out infinite' : 'none',
            }}>
              {/* Very soft glow halo */}
              <div style={{
                position: 'absolute', inset: '-20%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
              }} />

              {/* Phone */}
              <div style={{
                width: '290px', background: '#1a1a1a',
                borderRadius: '40px', padding: '14px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
                position: 'relative',
              }}>
                {/* Dynamic island */}
                <div style={{ width: '90px', height: '26px', background: '#000', borderRadius: '13px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#333' }} />
                </div>

                {/* Screen */}
                <div style={{ background: '#FAFAFA', borderRadius: '30px', overflow: 'hidden', height: '540px' }}>
                  {/* Status */}
                  <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#374151', fontWeight: 600 }}>
                    <span>9:41</span><span>96%</span>
                  </div>

                  <div style={{ padding: '12px 20px' }}>
                    {/* Greeting */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>Good afternoon</div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>What are you<br />craving today?</div>
                    </div>

                    {/* Search */}
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <Zap size={13} color="#9CA3AF" />
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Search restaurants...</span>
                    </div>

                    {/* Categories */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {['All', 'Ethiopian', 'BBQ', 'Pizza'].map((c, i) => (
                        <div key={c} style={{ padding: '5px 11px', borderRadius: '999px', whiteSpace: 'nowrap', background: i === 1 ? '#f97316' : '#fff', color: i === 1 ? '#fff' : '#374151', fontSize: '10px', fontWeight: 700, border: i === 1 ? 'none' : '1px solid #E5E7EB', flexShrink: 0 }}>{c}</div>
                      ))}
                    </div>

                    {/* Featured card */}
                    <div style={{ background: '#f97316', borderRadius: '16px', padding: '14px', marginBottom: '10px', color: '#fff' }}>
                      <div style={{ fontSize: '9px', fontWeight: 700, opacity: 0.85, letterSpacing: '0.1em', marginBottom: '4px' }}>FEATURED TODAY</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '4px' }}>Grill House Sidama</div>
                      <div style={{ fontSize: '10px', opacity: 0.9, marginBottom: '10px' }}>4.9 stars · Ready in 15 min</div>
                      <div style={{ background: 'rgba(255,255,255,0.22)', borderRadius: '8px', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700 }}>
                        Pre-order Now →
                      </div>
                    </div>

                    {/* Restaurant list */}
                    {[
                      { name: 'Taste of Hawassa', time: '20 min', rating: '4.8', tag: 'Popular' },
                      { name: 'Addis Kitchen', time: '25 min', rating: '4.7', tag: 'New' },
                    ].map((r, i) => (
                      <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i === 0 ? '1px solid #F0F0F0' : 'none' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Star size={16} color="#f97316" fill="#f97316" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#111827' }}>{r.name}</div>
                          <div style={{ fontSize: '9px', color: '#9CA3AF' }}>{r.rating} · {r.time}</div>
                        </div>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.08)', padding: '3px 9px', borderRadius: '999px' }}>{r.tag}</div>
                      </div>
                    ))}

                    {/* Bottom bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: '#fff', borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 10px' }}>
                      {[
                        { icon: 'home', active: true },
                        { icon: 'search', active: false },
                        { icon: 'box', active: false },
                        { icon: 'user', active: false },
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: item.active ? '#f97316' : '#E5E7EB' }} />
                          {item.active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f97316' }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}