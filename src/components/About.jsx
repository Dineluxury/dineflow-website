'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    let delayTimer
    let frameId

    const animate = () => {
      const duration = 1400
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(target * eased))

        if (progress < 1) frameId = requestAnimationFrame(tick)
        else setCount(target)
      }

      frameId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const loaderDelay = Math.max(0, 1800 - (Date.now() - mountedAt.current))
        delayTimer = setTimeout(animate, loaderDelay)
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
      clearTimeout(delayTimer)
      cancelAnimationFrame(frameId)
    }
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const values = [
  { emoji: '📍', title: 'Made in Ethiopia', desc: 'We launched in Hawassa and are expanding across Ethiopia. We know the culture, the food, and what restaurants actually need.' },
  { emoji: '⚡', title: 'Built for Speed', desc: 'From ordering to tracking, every interaction is instant. No waiting. No confusion. Just food on the table.' },
  { emoji: '🔒', title: 'Secure Payments', desc: 'Powered by Chapa — Telebirr, CBE Birr, bank cards. Restaurant owners receive 95% automatically, every time.' },
  { emoji: '❤️', title: 'Restaurant First', desc: 'Real-time orders, smart timing, stock management, QR tables, instant analytics. Built for owners, not accountants.' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '8rem 0', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Divider line */}
      <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(249,115,22,0.5), transparent)', margin: '0 auto 5rem' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Story</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.05 }}>
            Built for Ethiopia.<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Built for you.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Dineflow was built from scratch in Ethiopia, for Ethiopian restaurants and food lovers.
            We understand the culture, the food, and the need for a system that actually works.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '6rem' }}>
          {[
            { value: 500, suffix: '+', label: 'Restaurants', color: '#f97316' },
            { value: 10000, suffix: '+', label: 'Happy Users', color: '#22c55e' },
            { value: 2, suffix: '', label: 'Cities Launched', color: '#60a5fa' },
            { value: 99, suffix: '%', label: 'Uptime', color: '#a855f7' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px', padding: '2rem', textAlign: 'center',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: stat.color, fontFamily: 'Syne, sans-serif' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values + Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {values.map(v => (
              <div key={v.title} style={{
                display: 'flex', gap: '16px', padding: '20px',
                borderRadius: '16px', transition: 'background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>
                  {v.emoji}
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '6px', fontSize: '15px' }}>{v.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(249,115,22,0.04)', filter: 'blur(40px)', borderRadius: '24px' }} />
            <div style={{
              position: 'relative',
              background: '#111', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            }}>
              {/* Title bar */}
              <div style={{
                height: '40px', background: '#1a1a1a',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239,68,68,0.7)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234,179,8,0.7)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34,197,94,0.7)' }} />
                <span style={{ color: '#4b5563', fontSize: '12px', marginLeft: '8px' }}>Dineflow Dashboard</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'ping-orange 2s ease-out infinite' }} />
                  <span style={{ color: '#22c55e', fontSize: '11px' }}>Live</span>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Metric cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { label: "Today's Orders", value: '47', change: '+12%', color: '#f97316' },
                    { label: 'Revenue (ETB)', value: '12,450', change: '+8%', color: '#22c55e' },
                  ].map(m => (
                    <div key={m.label} style={{
                      background: '#1a1a1a', borderRadius: '14px', padding: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '8px' }}>{m.label}</p>
                      <p style={{ color: m.color, fontSize: '22px', fontWeight: 900, fontFamily: 'Syne, sans-serif' }}>{m.value}</p>
                      <p style={{ color: '#22c55e', fontSize: '11px', marginTop: '4px' }}>{m.change} today</p>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {[
                  { label: 'Active Tables', value: '8 / 12', color: '#60a5fa' },
                  { label: 'Avg Prep Time', value: '14 min', color: '#fbbf24' },
                  { label: 'Orders Pending', value: '3', color: '#f97316' },
                  { label: 'Completion Rate', value: '98.2%', color: '#22c55e' },
                ].map(row => (
                  <div key={row.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <span style={{ color: '#6b7280', fontSize: '13px' }}>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: 700, fontSize: '13px' }}>{row.value}</span>
                  </div>
                ))}

                {/* Progress bar */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>Order completion rate</span>
                    <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700 }}>98.2%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: '98%',
                      background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                      borderRadius: '999px',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #about .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
