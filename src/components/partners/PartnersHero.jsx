'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function PartnersHero() {
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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const g = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        600
      )
      g.addColorStop(0, 'rgba(249,115,22,0.08)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
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
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '8rem 1.5rem 4rem',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease',
        }}
      >
        {/* Top bar with back link and login button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            ← Back to Dineflow
          </Link>

          <a
            href="/partners/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: '#9ca3af',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(249,115,22,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = '#9ca3af'
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <span>👤</span>
            Partner Login
          </a>
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            borderRadius: '999px',
            border: '1px solid rgba(249,115,22,0.3)',
            background: 'rgba(249,115,22,0.08)',
            marginBottom: '2rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#f97316',
              display: 'inline-block',
              animation: 'ping-orange 2s ease-out infinite',
            }}
          />
          <span style={{ color: '#fb923c', fontSize: '14px', fontWeight: 600 }}>
            Partner Program — Now Open
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ display: 'block', color: '#fff' }}>Turn your</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            influence
          </span>
          <span style={{ display: 'block', color: '#fff' }}>into income.</span>
        </h1>

        <p
          style={{
            color: '#9ca3af',
            fontSize: '1.2rem',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontWeight: 400,
          }}
        >
          Whether you're a university student or a content creator — Dineflow pays
          you real money for bringing real results. No followers required to start.
        </p>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {[
            { value: '50%', label: 'Commission for students', color: '#f97316' },
            { value: 'Per Order', label: 'Creators earn on every sale', color: '#22c55e' },
            { value: '3 Months', label: 'Guaranteed earning period', color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: s.color,
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                {s.value}
              </div>
              <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#ambassador"
            style={{
              padding: '16px 32px',
              background: '#f97316',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '16px',
              textDecoration: 'none',
              fontSize: '16px',
              boxShadow: '0 8px 30px rgba(249,115,22,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ea6c0a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f97316')}
          >
            🎓 Student Ambassador
          </a>
          <a
            href="#creator"
            style={{
              padding: '16px 32px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              fontWeight: 600,
              borderRadius: '16px',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            🎬 Content Creator
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ping-orange {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  )
}