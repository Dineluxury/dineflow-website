'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, LogOut } from 'lucide-react'

export default function DashboardLayout({ children, type, activeTab, setActiveTab, tabs }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [code, setCode] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    let active = true

    async function loadProfile() {
      try {
        const response = await fetch('/api/partners/me')
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/partners/login'
          return
        }
        if (!response.ok) throw new Error('Could not load partner profile')
        const data = await response.json()
        if (!active) return
        setName(data.name || '')
        setStatus(data.status || '')
        setCode(data.uniqueCode || '')
      } catch {
        if (active) window.location.href = '/partners/login'
      }
    }

    loadProfile()
    return () => { active = false }
  }, [])

  async function logout() {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/partners/logout', { method: 'POST' })
    } finally {
      window.location.href = '/partners/login'
    }
  }

  const isApproved = status === 'approved'
  const isCreator = type === 'creator'
  const accent = isCreator ? '#8b42ce' : '#c45b1d'
  const role = isCreator ? 'Content creator' : 'Student ambassador'

  return (
    <div className={`partner-dashboard partner-dashboard-${type}`} style={{ minHeight: '100vh' }}>
      <header className="dashboard-topbar">
        <Link className="dashboard-brand" href="/partners" aria-label="Dineflow Partners home">
          <img className="dashboard-brand-mark" src="/dineflow-logo.png" alt="" />
          <span>Dineflow <small>PARTNERS</small></span>
        </Link>

        <div className="dashboard-topbar-right">
          <span className={`dashboard-status-pill ${isApproved ? 'is-approved' : 'is-pending'}`}>
            <span aria-hidden="true" />{isApproved ? 'Approved' : status ? 'Under review' : 'Loading status'}
          </span>
          <span className="dashboard-topbar-divider" aria-hidden="true" />
          <div className="dashboard-user-summary">
            <span className="dashboard-avatar" style={{ '--dashboard-accent': accent }}>{name.trim().charAt(0).toUpperCase() || (isCreator ? 'C' : 'A')}</span>
            <span className="dashboard-user-name">{name || role}</span>
          </div>
          <button className="dashboard-logout" type="button" onClick={logout} disabled={loggingOut}>
            <LogOut size={15} aria-hidden="true" />
            <span>{loggingOut ? 'Signing out…' : 'Sign out'}</span>
          </button>
        </div>
      </header>

      {!isApproved && status && (
        <div className="dashboard-review-banner" role="status">
          <span className="dashboard-review-mark" aria-hidden="true">i</span>
          <div>
            <strong>Application under review</strong>
            <p>We’re reviewing your partner application. Your dashboard will be ready as soon as your account is approved.</p>
          </div>
        </div>
      )}

      <div className="dashboard-shell">
        <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
          <div className="dashboard-sidebar-heading">Workspace</div>
          <nav className="dashboard-tabs" aria-label={`${role} sections`}>
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              const selected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`dashboard-tab ${selected ? 'is-active' : ''}`}
                  aria-current={selected ? 'page' : undefined}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {TabIcon ? <TabIcon size={17} strokeWidth={1.9} aria-hidden="true" /> : null}
                  <span>{tab.label}</span>
                  {selected ? <ArrowUpRight className="dashboard-tab-arrow" size={14} aria-hidden="true" /> : null}
                </button>
              )
            })}
          </nav>

          <div className="dashboard-sidebar-bottom">
            <div className="dashboard-code-card">
              <span className="dashboard-code-label">Your referral code</span>
              <strong>{code || 'Pending approval'}</strong>
              {code ? <span className="dashboard-code-note">Share it with your network</span> : null}
            </div>
            <Link className="dashboard-help-link" href="mailto:support@dineflow.et">
              Need help? Contact support <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-main-inner">{children}</div>
        </main>
      </div>
    </div>
  )
}
