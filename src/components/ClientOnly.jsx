'use client'
import { useState, useEffect, useRef } from 'react'

import { MessageSquare, ArrowUp } from 'lucide-react'

function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200)
    const t2 = setTimeout(() => setVisible(false), 1700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{
          position: 'absolute', inset: 0,
          width: '64px', height: '64px',
          borderRadius: '50%',
          border: '2px solid rgba(249,115,22,0.3)',
          animation: 'loaderPing 1.5s ease-out infinite',
        }} />
        <div style={{
          width: '64px', height: '64px',
          background: '#f97316',
          borderRadius: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 900, fontSize: '28px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 0 40px rgba(249,115,22,0.5)',
        }}>
          D
        </div>
      </div>

      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#111827', fontWeight: 900,
        fontSize: '24px', marginBottom: '8px',
      }}>
        Dineflow
      </p>
      <p style={{ color: '#6B7280', fontSize: '14px' }}>
        Order food before you arrive.
      </p>

      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '3px', background: '#f97316',
        animation: 'loadBar 1.2s ease-out forwards',
      }} />

      <style>{`
        @keyframes loaderPing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          60% { width: 80%; }
          100% { width: 100%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes ping-orange {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const syncVisibility = () => setHidden(window.innerWidth < 1024)
    syncVisibility()

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let animId

    const onMove = (e) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', syncVisibility)

    const tick = () => {
      cx += (x - cx) * 0.08
      cy += (y - cy) * 0.08
      if (ref.current) {
        ref.current.style.left = cx + 'px'
        ref.current.style.top = cy + 'px'
      }
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', syncVisibility)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        display: hidden ? 'none' : 'block',
      }}
    />
  )
}

function FloatingButtons() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '1.5rem',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(16px)',
      transition: 'all 0.4s ease',
      pointerEvents: show ? 'all' : 'none',
    }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/25191977974?text=Hi%2C%20I%27m%20interested%20in%20Dineflow"
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          width: '48px', height: '48px',
          background: '#25d366',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#20ba5a' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#25d366' }}
      >
        <MessageSquare size={22} color="#fff" />
      </a>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        title="Back to top"
        style={{
          width: '48px', height: '48px',
          background: '#ffffff',
          border: '1px solid #E5E7EB',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#f97316' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#E5E7EB' }}
      >
        <ArrowUp size={18} color="#f97316" />
      </button>
    </div>
  )
}

export default function ClientOnly() {
  return (
    <>
      <PageLoader />
      <CursorGlow />
      <FloatingButtons />
    </>
  )
}
