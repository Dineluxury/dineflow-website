'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dineflow.app'
const APP_STORE_URL = 'https://apps.apple.com/search?term=Dineflow'

const getStoreUrl = () => {
  if (typeof navigator === 'undefined') return PLAY_STORE_URL
  const ua = navigator.userAgent || ''
  if (/iphone|ipad|ipod/i.test(ua)) return APP_STORE_URL
  return PLAY_STORE_URL
}

export default function RestaurantAppLinkPage() {
  const params = useParams()
  const restaurantId = params?.restaurantId
  const [ref] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('ref') || ''
  })
  const [status, setStatus] = useState('Opening Dineflow...')

  const appLink = useMemo(() => {
    if (!restaurantId) return ''
    const refQuery = ref ? `?ref=${encodeURIComponent(ref)}` : ''
    return `dineflow://restaurant/${restaurantId}${refQuery}`
  }, [restaurantId, ref])

  useEffect(() => {
    if (!appLink) {
      setStatus('This restaurant link is invalid.')
      return
    }

    setStatus('Opening this restaurant in Dineflow...')
    window.location.href = appLink
    const timer = window.setTimeout(() => {
      window.location.href = getStoreUrl()
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [appLink])

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d0d0d',
      color: '#fff',
      padding: '24px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <section style={{
        width: '100%',
        maxWidth: 420,
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
        textAlign: 'center'
      }}>
        <div style={{
          width: 44,
          height: 44,
          margin: '0 auto 18px',
          border: '3px solid rgba(249,115,22,0.18)',
          borderTopColor: '#f97316',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>Dineflow</h1>
        <p style={{ color: '#9ca3af', lineHeight: 1.6, marginBottom: 22 }}>{status}</p>
        {appLink && (
          <a href={appLink} style={{
            display: 'block',
            padding: '13px 16px',
            borderRadius: 12,
            background: '#f97316',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700
          }}>
            Open in app
          </a>
        )}
        <a href={getStoreUrl()} style={{ display: 'block', marginTop: 14, color: '#f97316', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          Get the app
        </a>
        <Link href="/" style={{ display: 'block', marginTop: 16, color: '#6b7280', textDecoration: 'none', fontSize: 13 }}>
          Back to Dineflow
        </Link>
      </section>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )
}
