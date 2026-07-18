'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'For Customers', href: '#customers' },
  { label: 'For Venues', href: '#restaurants' },
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid #F0F0F0',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '34px', height: '34px',
              background: '#f97316',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: '17px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
            }}>D</div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '18px', color: '#111827' }}>Dineflow</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <a key={l.label} href={l.href} style={{
                padding: '8px 14px', color: '#6B7280', fontSize: '14px', fontWeight: 500,
                textDecoration: 'none', borderRadius: '8px', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.06)'; e.currentTarget.style.color = '#f97316' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' }}
              >{l.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href="/waitlist" style={{
              padding: '9px 18px',
              background: 'rgba(249,115,22,0.08)',
              border: '1.5px solid rgba(249,115,22,0.22)',
              color: '#f97316', fontWeight: 700, borderRadius: '10px',
              textDecoration: 'none', fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f97316'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(249,115,22,0.08)'
                e.currentTarget.style.color = '#f97316'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >Waitlist</a>

            {/* Partners Button */}
            <a href="/partners" style={{
              padding: '9px 18px',
              background: 'transparent',
              border: '1.5px solid #E5E7EB',
              color: '#374151', fontWeight: 600, borderRadius: '10px',
              textDecoration: 'none', fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#f97316'
                e.currentTarget.style.color = '#f97316'
                e.currentTarget.style.background = 'rgba(249,115,22,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E5E7EB'
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.background = 'transparent'
              }}
            >Partners</a>

            <a href="#contact" style={{
              padding: '9px 20px',
              background: '#f97316',
              color: '#fff', fontWeight: 700, borderRadius: '10px',
              textDecoration: 'none', fontSize: '14px',
              boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(249,115,22,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.3)' }}
            >Get Started</a>

            {/* Burger */}
            <button onClick={() => setOpen(!open)} style={{
              display: 'none', background: 'none', border: '1px solid #E5E7EB',
              borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#374151',
              width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }} className="burger-btn" aria-label="Menu">
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 99,
          background: '#fff',
          borderBottom: '1px solid #F0F0F0',
          padding: '1rem 1.5rem 1.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', color: '#374151', fontSize: '16px',
              fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #F0F0F0',
            }}>{l.label}</a>
          ))}

          <a href="/waitlist" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: '16px', padding: '14px',
            background: 'rgba(249,115,22,0.08)',
            border: '1.5px solid rgba(249,115,22,0.22)',
            color: '#f97316', fontWeight: 800, borderRadius: '12px', textAlign: 'center',
            textDecoration: 'none', fontSize: '15px',
            transition: 'all 0.2s',
          }}>Join Waitlist</a>
          
          <a href="/partners" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: '10px', padding: '14px',
            background: 'transparent',
            border: '1.5px solid #E5E7EB',
            color: '#374151', fontWeight: 700, borderRadius: '12px', textAlign: 'center',
            textDecoration: 'none', fontSize: '15px',
            transition: 'all 0.2s',
          }}>Become a Partner</a>

          <a href="#contact" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: '10px', padding: '14px',
            background: '#f97316',
            color: '#fff', fontWeight: 700, borderRadius: '12px', textAlign: 'center',
            textDecoration: 'none', fontSize: '15px',
            boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
          }}>Get Started</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
