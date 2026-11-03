'use client'

import { useEffect, useState } from 'react'

const API_BASE = (process.env.NEXT_PUBLIC_DINEFLOW_API_URL || 'https://api.dineflow.et/api').replace(/\/$/, '')
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_ANDROID_URL || ''
const IOS_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_IOS_URL || ''

export default function GuestOrderResultPage() {
  const [state, setState] = useState('checking')
  const [orderId, setOrderId] = useState('')
  const [receipt, setReceipt] = useState('')
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const id = query.get('orderId')
    const paymentFailed = query.get('payment') === 'failed'
    setOrderId(id || '')
    if (paymentFailed) setState('failed')
    if (!id) {
      setState('unknown')
      return
    }

    const accessToken = sessionStorage.getItem(`dineflow_guest_order_${id}`)
    if (!accessToken) {
      setState(paymentFailed ? 'failed' : 'unknown')
      return
    }

    let active = true
    let attempts = 0
    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders/guest/${encodeURIComponent(id)}/status`, {
          headers: { 'X-Guest-Order-Token': accessToken },
          cache: 'no-store'
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error('Could not check order status')
        if (!active) return
        setReceipt(data.receiptNumber || '')
        setTotal(data.totalAmount ?? null)
        const paymentStatus = String(data.paymentStatus || '').toUpperCase()
        const orderStatus = String(data.orderStatus || '').toUpperCase()
        if (paymentStatus === 'PAID' || paymentStatus === 'COMPLETED' || paymentStatus === 'SUCCESS' || orderStatus === 'CONFIRMED' || orderStatus === 'PREPARING') {
          setState('paid')
          return
        }
        if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED' || paymentStatus === 'CANCELED') {
          setState('failed')
          return
        }
      } catch {
        // Payment callbacks can take a moment to update the order record.
      }
      attempts += 1
      if (active && attempts < 20) window.setTimeout(checkStatus, 3000)
      else if (active) setState(paymentFailed ? 'failed' : 'pending')
    }

    checkStatus()
    return () => { active = false }
  }, [])

  const isPaid = state === 'paid'
  const isFailed = state === 'failed'
  const isChecking = state === 'checking'
  const title = isPaid ? 'Order confirmed' : isFailed ? 'Payment not completed' : isChecking ? 'Checking your order…' : state === 'pending' ? 'Payment is processing' : 'Order status unavailable'
  const message = isPaid
    ? 'Your payment was received. The restaurant has your order.'
    : isFailed
      ? 'Your order is saved, but payment did not complete. You can scan the table QR again to try another order.'
      : isChecking || state === 'pending'
        ? 'We are waiting for the payment confirmation. This page can stay open while it updates.'
        : 'We could not confirm this order in this browser session. If you completed payment, please contact the restaurant.'

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={{ ...styles.icon, background: isPaid ? 'rgba(34,197,94,.14)' : isFailed ? 'rgba(239,68,68,.14)' : 'rgba(249,115,22,.14)', color: isPaid ? '#4ade80' : isFailed ? '#fca5a5' : '#fb923c' }}>
          {isPaid ? '✓' : isFailed ? '!' : '…'}
        </div>
        <div style={styles.eyebrow}>DINEFLOW TABLE ORDER</div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.message}>{message}</p>
        {orderId && <p style={styles.detail}>Order {receipt || orderId.slice(0, 8).toUpperCase()}</p>}
        {total != null && <p style={styles.total}>{isPaid ? 'Total paid' : 'Order total'}: ETB {Number(total).toFixed(2)}</p>}
        {isPaid && (
          <div style={styles.downloadBox}>
            <h2 style={styles.downloadTitle}>Order faster next time</h2>
            <p style={styles.message}>Get the Dineflow app for quick reordering, order updates, and saved favorites.</p>
            {(ANDROID_APP_URL || IOS_APP_URL) ? (
              <div style={styles.links}>
                {ANDROID_APP_URL && <a href={ANDROID_APP_URL} target="_blank" rel="noreferrer" style={styles.storeButton}>Get it on Google Play</a>}
                {IOS_APP_URL && <a href={IOS_APP_URL} target="_blank" rel="noreferrer" style={styles.secondaryButton}>Download on the App Store</a>}
              </div>
            ) : (
              <p style={styles.storeNotice}>You can keep ordering here as a guest. Official app download links will appear here once they are configured.</p>
            )}
          </div>
        )}
        {!isPaid && <a href="/" style={styles.secondaryButton}>Back to Dineflow</a>}
      </section>
    </main>
  )
}

const styles = {
  page: { minHeight: '100vh', padding: 20, display: 'grid', placeItems: 'center', background: '#0d0d0d', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' },
  card: { width: 'min(100%, 520px)', boxSizing: 'border-box', padding: 'clamp(24px, 6vw, 42px)', borderRadius: 22, border: '1px solid #2c2c2c', background: '#171717', textAlign: 'center' },
  icon: { width: 62, height: 62, display: 'grid', placeItems: 'center', margin: '0 auto 20px', borderRadius: 20, fontSize: 34, fontWeight: 800 },
  eyebrow: { color: '#fb923c', fontSize: 11, fontWeight: 800, letterSpacing: '.14em', marginBottom: 10 },
  title: { fontSize: 30, margin: '0 0 10px', letterSpacing: '-.03em' },
  message: { color: '#a1a1aa', lineHeight: 1.6, margin: '0 auto 14px' },
  detail: { color: '#d4d4d8', fontSize: 13 },
  total: { fontWeight: 800, color: '#fb923c' },
  downloadBox: { marginTop: 26, paddingTop: 22, borderTop: '1px solid #303030' },
  downloadTitle: { fontSize: 19, margin: '0 0 8px' },
  links: { display: 'grid', gap: 10, marginTop: 18 },
  storeNotice: { color: '#d4d4d8', fontSize: 13, lineHeight: 1.5, margin: '16px 0 0' },
  storeButton: { display: 'block', padding: 13, borderRadius: 11, background: '#f97316', color: '#fff', textDecoration: 'none', fontWeight: 800 },
  secondaryButton: { display: 'inline-block', padding: 12, borderRadius: 11, border: '1px solid #444', color: '#f4f4f5', textDecoration: 'none', fontWeight: 700 }
}
