'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['contact', 'features', 'how', 'restaurants', 'customers', 'about']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Partners', href: '/partners', id: 'partners' },
    { label: 'Customers', href: '#customers', id: 'customers' },
    { label: 'Restaurants', href: '#restaurants', id: 'restaurants' },
    { label: 'How It Works', href: '#how', id: 'how' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <>
      <style>{`
        .nav-link { color: #9ca3af; text-decoration: none; padding: 8px 16px; border-radius: 10px; font-size: 14px; font-weight: 500; transition: all 0.2s; }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: #fb923c; background: rgba(249,115,22,0.1); }
        .mobile-link { display: block; padding: 14px 0; color: #9ca3af; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .mobile-link:hover { color: #fff; }
        .cta-outline { padding: 9px 18px; border-radius: 12px; border: 1px solid rgba(249,115,22,0.4); color: #fb923c; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; background: transparent; }
        .cta-outline:hover { background: rgba(249,115,22,0.1); border-color: #f97316; }
        .cta-fill { padding: 9px 20px; border-radius: 12px; background: #f97316; color: #fff; font-weight: 700; font-size: 14px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 20px rgba(249,115,22,0.3); }
        .cta-fill:hover { background: #ea6c0a; }
        .hamburger-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', background: '#f97316',
              borderRadius: '10px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff', fontWeight: 900,
              fontSize: '18px', fontFamily: 'Syne, sans-serif',
              boxShadow: '0 0 20px rgba(249,115,22,0.35)',
            }}>D</div>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>
              Dineflow
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="desktop-nav">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className={`nav-link ${active === l.id ? 'active' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            className="desktop-nav">
            <a href="/partners" className="cta-outline">Partner With Us</a>
            <a href="#customers" className="cta-fill">Get the App</a>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger-btn mobile-only"
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '0 1.5rem 1.5rem',
          }}>
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="mobile-link"
                onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="/partners" onClick={() => setOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '12px', border: '1px solid rgba(249,115,22,0.4)', color: '#fb923c', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
                Partner With Us
              </a>
              <a href="#customers" onClick={() => setOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '12px', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                Get the App
              </a>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1024px) { .desktop-nav { display: none !important; } }
        @media (min-width: 1025px) { .mobile-only { display: none !important; } }
      `}</style>
    </>
  )
}