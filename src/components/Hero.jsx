'use client'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1,
      })
    }

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    const onMouse = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 600)
      g1.addColorStop(0, 'rgba(249,115,22,0.06)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.2, 0,
        canvas.width * 0.15, canvas.height * 0.2, 500
      )
      g2.addColorStop(0, 'rgba(249,115,22,0.07)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '7rem 1.5rem 5rem',
          width: '100%',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 16px', borderRadius: '999px',
              border: '1px solid rgba(249,115,22,0.3)',
              background: 'rgba(249,115,22,0.08)',
              marginBottom: '2.5rem',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#f97316', display: 'inline-block',
                animation: 'ping-orange 2s ease-out infinite',
              }} />
              <span style={{ color: '#fb923c', fontSize: '0.875rem', fontWeight: 500 }}>
                Now live in Ethiopia 🇪🇹
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              marginBottom: '2rem',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              <span style={{ display: 'block', color: '#fff' }}>Order</span>
              <span style={{ display: 'block', color: '#fff' }}>food</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #f97316, #fb923c, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                before you
              </span>
              <span style={{ display: 'block', color: '#fff' }}>arrive.</span>
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 500 }}>
              Your table is waiting.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '440px' }}>
              Ethiopia's smartest food ordering platform. Browse, order, pay, and track — all before you walk through the door.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <a href="#customers" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '1rem 2rem',
                background: '#f97316',
                color: '#fff',
                fontWeight: 700,
                borderRadius: '14px',
                textDecoration: 'none',
                fontSize: '1rem',
                boxShadow: '0 8px 30px rgba(249,115,22,0.35)',
                transition: 'all 0.2s ease',
              }}>
                Get the App →
              </a>
              <a href="#restaurants" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '1rem 2rem',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '14px',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}>
                For Restaurants
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { value: '500+', label: 'Restaurants' },
                { value: '10K+', label: 'Users' },
                { value: '4.9★', label: 'Rating' },
                { value: '98%', label: 'Uptime' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f97316' }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(249,115,22,0.12)',
                filter: 'blur(60px)',
                borderRadius: '50%',
                animation: 'float 5s ease-in-out infinite',
              }} />

              {/* Phone */}
              <div
                className="float"
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '560px',
                  background: 'linear-gradient(145deg, #1a1a1a, #111)',
                  borderRadius: '48px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  transform: 'perspective(1200px) rotateY(-10deg) rotateX(4deg)',
                  boxShadow: '30px 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(249,115,22,0.1)',
                }}
              >
                {/* Notch */}
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px', height: '28px',
                  background: '#000',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                  zIndex: 10,
                }} />

                {/* Status bar */}
                <div style={{
                  height: '48px', display: 'flex',
                  alignItems: 'flex-end', justifyContent: 'space-between',
                  padding: '0 1.5rem 8px',
                }}>
                  <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>9:41</span>
                  <span style={{ color: '#fff', fontSize: '11px' }}>● ● ●</span>
                </div>

                {/* App UI */}
                <div style={{ padding: '0 16px', overflow: 'hidden' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ color: '#6b7280', fontSize: '11px' }}>Good morning 👋</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>What are you craving?</div>
                    </div>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: '#f97316', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 900, fontSize: '14px',
                    }}>A</div>
                  </div>

                  {/* Search */}
                  <div style={{
                    height: '38px', background: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px', display: 'flex', alignItems: 'center',
                    padding: '0 12px', gap: '8px', marginBottom: '12px',
                  }}>
                    <span style={{ color: '#4b5563', fontSize: '13px' }}>🔍</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>Search restaurants...</span>
                  </div>

                  {/* Filters */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflow: 'hidden' }}>
                    {['All', 'Halal', 'Grill', 'Fast'].map((c, i) => (
                      <div key={c} style={{
                        padding: '5px 12px', borderRadius: '999px',
                        background: i === 0 ? '#f97316' : 'rgba(255,255,255,0.08)',
                        color: i === 0 ? '#fff' : '#9ca3af',
                        fontSize: '10px', fontWeight: 600, flexShrink: 0,
                      }}>{c}</div>
                    ))}
                  </div>

                  {/* Restaurant cards */}
                  {[
                    { name: 'Injohi Restaurant', tag: 'Traditional', rating: '4.9', emoji: '🍲', dist: '0.3km' },
                    { name: 'Grill House', tag: 'Grill • Meat', rating: '4.7', emoji: '🥩', dist: '0.8km' },
                  ].map(r => (
                    <div key={r.name} style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '16px', overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      marginBottom: '10px',
                    }}>
                      <div style={{
                        height: '90px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem',
                        background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(0,0,0,0.3))',
                      }}>
                        {r.emoji}
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>{r.name}</div>
                            <div style={{ color: '#f97316', fontSize: '10px', marginTop: '2px', opacity: 0.7 }}>{r.tag}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#fbbf24', fontSize: '10px', fontWeight: 700 }}>⭐ {r.rating}</div>
                            <div style={{ color: '#6b7280', fontSize: '10px' }}>{r.dist}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge 1 */}
              <div
                className="float-delay"
                style={{
                  position: 'absolute', right: '-60px', top: '60px',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: 'rgba(34,197,94,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                }}>✅</div>
                <div>
                  <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>Order Accepted!</div>
                  <div style={{ color: '#6b7280', fontSize: '10px' }}>Ready in 12 min</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div
                className="float"
                style={{
                  position: 'absolute', left: '-70px', bottom: '100px',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: 'rgba(249,115,22,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                }}>🔔</div>
                <div>
                  <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>New Order!</div>
                  <div style={{ color: '#f97316', fontSize: '10px', fontWeight: 600 }}>ETB 650</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ color: '#374151', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: '20px', height: '32px',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '999px',
          display: 'flex', justifyContent: 'center', paddingTop: '6px',
        }}>
          <div style={{
            width: '4px', height: '8px',
            background: '#f97316', borderRadius: '2px',
            animation: 'float 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}