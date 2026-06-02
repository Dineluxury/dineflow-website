'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardLayout({ children, type, activeTab, setActiveTab, tabs }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('partner_token')
    if (!token) { window.location.href = '/partners/login'; return }
    setName(localStorage.getItem('partner_name') || '')
    setStatus(localStorage.getItem('partner_status') || '')
    setCode(localStorage.getItem('partner_code') || '')
  }, [])

  const logout = () => {
    localStorage.removeItem('partner_token')
    localStorage.removeItem('partner_type')
    localStorage.removeItem('partner_name')
    localStorage.removeItem('partner_status')
    localStorage.removeItem('partner_code')
    window.location.href = '/partners/login'
  }

  const isApproved = status === 'approved'
  const accentColor = type === 'creator' ? '#a855f7' : '#f97316'
  const accentBg = type === 'creator' ? 'rgba(168,85,247,0.1)' : 'rgba(249,115,22,0.1)'

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Top navbar */}
      <nav style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: '#f97316', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '16px', fontFamily: 'Syne, sans-serif' }}>D</div>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>Dineflow</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>/</span>
          <span style={{ color: accentColor, fontSize: '13px', fontWeight: 700, background: accentBg, padding: '4px 12px', borderRadius: '999px' }}>
            {type === 'creator' ? '🎬 Creator Dashboard' : '🎓 Ambassador Dashboard'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {code && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6b7280', fontSize: '11px' }}>Your code</span>
              <span style={{ color: accentColor, fontWeight: 700, fontSize: '13px', fontFamily: 'monospace' }}>{code}</span>
            </div>
          )}
          <div style={{ width: '36px', height: '36px', background: accentBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, fontWeight: 900, fontSize: '14px', fontFamily: 'Syne, sans-serif', border: `1px solid ${accentColor}30` }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#f87171' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#6b7280' }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Pending banner */}
      {!isApproved && (
        <div style={{ background: 'rgba(234,179,8,0.08)', borderBottom: '1px solid rgba(234,179,8,0.2)', padding: '14px 1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '18px' }}>⏳</span>
          <div>
            <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '14px' }}>Application under review </span>
            <span style={{ color: '#92400e', fontSize: '13px' }}>— We'll email you within 24 hours once approved. Your dashboard is ready and waiting.</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: '220px', background: '#0f0f0f', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 1rem', flexShrink: 0, minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ marginBottom: '8px' }}>
            <p style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', paddingLeft: '12px' }}>Navigation</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: activeTab === tab.id ? accentBg : 'transparent', color: activeTab === tab.id ? accentColor : '#6b7280', fontWeight: activeTab === tab.id ? 700 : 400, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left', marginBottom: '2px' }}
                onMouseEnter={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#9ca3af' } }}
                onMouseLeave={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280' } }}
              >
                <span style={{ fontSize: '16px' }}>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '12px', background: accentBg, borderRadius: '12px', border: `1px solid ${accentColor}20` }}>
              <p style={{ color: accentColor, fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Hello, {name.split(' ')[0]} 👋</p>
              <p style={{ color: '#6b7280', fontSize: '11px' }}>{isApproved ? 'Account Active' : 'Pending Approval'}</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}