'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'For Customers', href: '#customers' },
  { label: 'For Venues', href: '#restaurants' },
  { label: 'How It Works', href: '#how' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-nav-inner">
          <a className="site-nav-brand" href="/" aria-label="Dineflow home">
            <img className="site-nav-mark" src="/dineflow-logo.png" alt="" />
            <span className="site-nav-wordmark">Dineflow</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>

          <div className="site-nav-actions">
            <a className="nav-waitlist" href="/waitlist">Waitlist</a>
            <a className="nav-partners" href="/partners">Partners</a>
            <a className="nav-get-started" href="#contact">Get Started</a>
            <button
              className="burger-btn"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span aria-hidden="true">{open ? '×' : '☰'}</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link) => <a key={link.label} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a className="mobile-waitlist" href="/waitlist" onClick={closeMenu}>Join Waitlist</a>
          <a href="/partners" onClick={closeMenu}>Become a Partner</a>
          <a className="mobile-get-started" href="#contact" onClick={closeMenu}>Get Started</a>
        </nav>
      )}

      <style>{`
        .site-header { position:fixed; inset:0 0 auto; z-index:100; background:rgba(255,255,255,.98); border-bottom:1px solid #e4e8ec; transition:box-shadow .25s ease,background .25s ease; }
        .site-header.is-scrolled { background:rgba(255,255,255,.96); backdrop-filter:blur(16px); box-shadow:0 2px 14px rgba(24,33,43,.06); }
        .site-nav-inner { max-width:1280px; height:68px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; gap:18px; }
        .site-nav-brand { display:flex; flex:0 0 auto; align-items:center; gap:9px; color:#18212b; text-decoration:none; }
        .site-nav-mark { display:block; width:34px; height:34px; flex:0 0 34px; object-fit:contain; border-radius:10px; }
        .site-nav-wordmark { font-family:'Plus Jakarta Sans',sans-serif; font-size:18px; font-weight:800; }
        .desktop-nav { display:flex; align-items:center; gap:4px; }
        .desktop-nav a { padding:9px 13px; color:#65717e; font-size:14px; font-weight:550; text-decoration:none; border-radius:8px; transition:background .18s ease,color .18s ease; }
        .desktop-nav a:hover { color:#e96b22; background:rgba(233,107,34,.06); }
        .site-nav-actions { display:flex; flex:0 0 auto; align-items:center; gap:9px; }
        .site-nav-actions a { display:inline-flex; min-height:40px; align-items:center; justify-content:center; padding:0 15px; border:1px solid #e4e8ec; border-radius:10px; color:#39434e; font-size:13px; font-weight:650; text-decoration:none; white-space:nowrap; transition:background .18s ease,border-color .18s ease,color .18s ease; }
        .site-nav-actions .nav-waitlist { border-color:rgba(233,107,34,.25); background:rgba(233,107,34,.07); color:#c95a19; }
        .site-nav-actions .nav-waitlist:hover,.site-nav-actions .nav-partners:hover { border-color:#e96b22; color:#c95a19; }
        .site-nav-actions .nav-get-started { padding:0 18px; border-color:#e96b22; background:#e96b22; color:#fff; }
        .site-nav-actions .nav-get-started:hover { background:#c95a19; }
        .burger-btn { display:none; width:40px; height:40px; align-items:center; justify-content:center; border:1px solid #e4e8ec; border-radius:9px; background:#fff; color:#18212b; font:inherit; font-size:19px; cursor:pointer; }
        .mobile-navigation { display:none; }
        @media(max-width:768px) {
          .site-nav-inner { height:64px; padding:0 14px; gap:8px; }
          .site-nav-brand { gap:7px; }
          .site-nav-mark { width:31px; height:31px; flex-basis:31px; }
          .site-nav-wordmark { font-size:16px; }
          .desktop-nav,.site-nav-actions .nav-waitlist,.site-nav-actions .nav-partners { display:none; }
          .site-nav-actions { margin-left:auto; gap:8px; }
          .site-nav-actions .nav-get-started { min-height:38px; padding:0 12px; font-size:12px; border-radius:8px; }
          .burger-btn { display:inline-flex; flex:0 0 38px; width:38px; height:38px; }
          .mobile-navigation { position:fixed; z-index:99; inset:64px 0 auto; display:flex; flex-direction:column; padding:10px 18px 18px; border-bottom:1px solid #e4e8ec; background:#fff; box-shadow:0 12px 24px rgba(24,33,43,.09); }
          .mobile-navigation a { display:block; padding:14px 2px; border-bottom:1px solid #edf0f2; color:#39434e; font-size:15px; font-weight:600; text-decoration:none; }
          .mobile-navigation .mobile-waitlist { margin-top:12px; padding:13px; border:1px solid rgba(233,107,34,.25); border-radius:9px; background:rgba(233,107,34,.07); color:#c95a19; text-align:center; }
          .mobile-navigation .mobile-get-started { margin-top:9px; padding:13px; border:0; border-radius:9px; background:#e96b22; color:#fff; text-align:center; }
        }
      `}</style>
    </>
  )
}
