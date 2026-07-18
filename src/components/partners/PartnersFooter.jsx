'use client'
import Link from 'next/link'

export default function PartnersFooter() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 1.5rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
        <div style={{ width: '32px', height: '32px', background: '#f97316', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '16px', fontFamily: 'Syne, sans-serif' }}>D</div>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>Dineflow</span>
      </div>
      <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '1.5rem' }}>
        Questions? Email us at{' '}
        <a href="mailto:ahmedrediwan591@gmail.com" style={{ color: '#f97316', textDecoration: 'none' }}>
          ahmedrediwan591@gmail.com
        </a>
      </p>
      <Link href="/" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
      >
        ← Back to Dineflow
      </Link>
    </footer>
  )
}