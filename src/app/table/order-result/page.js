'use client'

import { useEffect, useMemo, useState } from 'react'

const API_BASE = (process.env.NEXT_PUBLIC_DINEFLOW_API_URL || 'https://api.dineflow.et/api').replace(/\/$/, '')
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_ANDROID_URL || 'https://play.google.com/store/search?q=Dineflow&c=apps'
const IOS_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_IOS_URL || 'https://apps.apple.com/search?term=Dineflow'

const money = (value) => `ETB ${Number(value || 0).toFixed(2)}`
const PAID_STATUSES = new Set(['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED'])
const FLOW = [
  { id: 'paid', label: 'Payment confirmed' },
  { id: 'accepted', label: 'Order accepted' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'ready', label: 'Ready for pickup' }
]

function flowIndex(status, paymentStatus) {
  const current = String(status || '').toUpperCase()
  if (current === 'COMPLETED') return 3
  if (current === 'READY') return 3
  if (current === 'PREPARING') return 2
  if (current === 'ACCEPTED') return 1
  if (PAID_STATUSES.has(current) || ['PAID', 'COMPLETED', 'SUCCESS'].includes(String(paymentStatus || '').toUpperCase())) return 0
  return -1
}

export default function GuestOrderResultPage() {
  const [state, setState] = useState('checking')
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [qrImage, setQrImage] = useState('')
  const [paymentFailed, setPaymentFailed] = useState(false)
  const [now, setNow] = useState(Date.now())
  const [preparingSince, setPreparingSince] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const id = query.get('orderId')
    const failed = query.get('payment') === 'failed'
    setOrderId(id || '')
    setPaymentFailed(failed)
    if (failed) setState('failed')
    if (!id) {
      setState('unknown')
      return
    }

    const accessToken = sessionStorage.getItem(`dineflow_guest_order_${id}`)
    if (!accessToken) {
      setState(failed ? 'failed' : 'unknown')
      return
    }

    let active = true
    let timer
    let qrObjectUrl = ''
    let lastQrToken = ''
    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders/guest/${encodeURIComponent(id)}/status`, {
          headers: { 'X-Guest-Order-Token': accessToken },
          cache: 'no-store'
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error('Could not check order status')
        if (!active) return
        setOrder(data)
        const paymentStatus = String(data.paymentStatus || '').toUpperCase()
        const orderStatus = String(data.orderStatus || '').toUpperCase()
        if (orderStatus === 'PREPARING' && !data.timingApprovedAt) {
          const key = `dineflow_guest_preparing_${id}`
          const stored = sessionStorage.getItem(key)
          const started = stored ? Number(stored) : Date.now()
          if (!stored) sessionStorage.setItem(key, String(started))
          setPreparingSince(started)
        }
        if (['FAILED', 'CANCELLED', 'CANCELED'].includes(paymentStatus) || orderStatus === 'CANCELLED') setState('failed')
        else if (PAID_STATUSES.has(orderStatus) || ['PAID', 'COMPLETED', 'SUCCESS'].includes(paymentStatus)) setState('paid')
        else setState(failed ? 'failed' : 'pending')

        if (orderStatus === 'READY' && data.qrToken && lastQrToken !== data.qrToken) {
          lastQrToken = data.qrToken
          const qrResponse = await fetch(`${API_BASE}/orders/guest/${encodeURIComponent(id)}/qr`, {
            headers: { 'X-Guest-Order-Token': accessToken },
            cache: 'no-store'
          })
          if (qrResponse.ok && active) {
            qrObjectUrl = URL.createObjectURL(await qrResponse.blob())
            setQrImage(qrObjectUrl)
          }
        }
        if (orderStatus !== 'CANCELLED' && orderStatus !== 'COMPLETED' && active) timer = window.setTimeout(checkStatus, 5000)
      } catch {
        if (!active) return
        setState(failed ? 'failed' : 'pending')
        timer = window.setTimeout(checkStatus, 5000)
      }
    }

    checkStatus()
    return () => {
      active = false
      window.clearTimeout(timer)
      if (qrObjectUrl) URL.revokeObjectURL(qrObjectUrl)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const isPaid = state === 'paid'
  const isFailed = state === 'failed'
  const isChecking = state === 'checking'
  const status = String(order?.orderStatus || '').toUpperCase()
  const progress = flowIndex(status, order?.paymentStatus)
  const countdown = useMemo(() => {
    if (status !== 'PREPARING' || !order?.estimatedMinutes) return null
    const startedAt = order.timingApprovedAt ? new Date(order.timingApprovedAt).getTime() : (preparingSince || now)
    const remaining = Math.max(0, Math.ceil((startedAt + Number(order.estimatedMinutes) * 60000 - now) / 1000))
    return `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  }, [status, order?.estimatedMinutes, order?.timingApprovedAt, preparingSince, now])

  const title = isPaid ? (status === 'READY' ? 'Your order is ready'
    : status === 'COMPLETED' ? 'Order completed'
      : status === 'PREPARING' ? 'Preparing your order'
        : status === 'ACCEPTED' ? 'Order accepted'
          : 'Payment confirmed')
    : isFailed ? 'Payment not completed' : isChecking ? 'Checking your order…'
      : state === 'pending' ? 'Payment is processing' : 'Order status unavailable'
  const message = isPaid
    ? status === 'READY' ? 'Your order is ready. Show the QR code below to restaurant staff.'
      : status === 'COMPLETED' ? 'Your order has been completed. Thank you for ordering with Dineflow.'
        : status === 'PREPARING' ? 'The restaurant is preparing your order. We’ll update this page when it is ready.'
          : status === 'ACCEPTED' ? 'The restaurant accepted your order and will begin preparing it shortly.'
            : 'Your payment was received. We are waiting for the restaurant to accept your order.'
    : isFailed
      ? 'Your order could not be confirmed. If payment was deducted, please contact the restaurant with your order number.'
      : isChecking || state === 'pending'
        ? 'We are checking payment and restaurant updates. Keep this page open to follow your order.'
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
        {orderId && <p style={styles.detail}>Order {order?.receiptNumber || orderId.slice(0, 8).toUpperCase()}</p>}
        {order?.restaurantName && <p style={styles.detail}>{order.restaurantName}{order.tableNumber ? ` · Table ${order.tableNumber}` : ''}</p>}
        {order?.totalAmount != null && <p style={styles.total}>{status === 'PENDING' || status === 'PAYMENT_PENDING' ? 'Order total' : 'Total'}: {money(order.totalAmount)}</p>}

        {isPaid && <div style={styles.progress} aria-label="Order progress">
          {FLOW.map((step, index) => <div key={step.id} style={styles.progressStep}>
            <span style={{ ...styles.progressDot, ...(index <= progress ? styles.progressDone : {}) }}>{index < progress ? '✓' : index + 1}</span>
            <span style={{ ...styles.progressLabel, ...(index <= progress ? styles.progressLabelDone : {}) }}>{step.label}</span>
          </div>)}
        </div>}

        {status === 'PREPARING' && countdown && <div style={styles.timerBox}>
          <span style={styles.timerLabel}>Estimated preparation time</span>
          <strong style={styles.timer}>{countdown}</strong>
          {Number(order.estimatedMinutes) > 0 && <span style={styles.timerHint}>Estimated {order.estimatedMinutes} minutes</span>}
        </div>}

        {status === 'READY' && !order?.qrUsed && <div style={styles.qrBox}>
          <h2 style={styles.qrTitle}>Show this order QR to staff</h2>
          {qrImage ? <img src={qrImage} alt="Order QR code" width="240" height="240" style={styles.qrImage} /> : <p style={styles.message}>Loading your secure order QR…</p>}
          {order?.qrExpiresAt && <p style={styles.detail}>Valid until {new Date(order.qrExpiresAt).toLocaleString()}</p>}
        </div>}
        {order?.qrUsed && <p style={styles.usedNotice}>Order QR scanned by staff.</p>}

        {isPaid && ['READY', 'COMPLETED'].includes(status) && (
          <div style={styles.downloadBox}>
            <h2 style={styles.downloadTitle}>Get the Dineflow app</h2>
            <p style={styles.message}>Get a better experience with Dineflow: discover restaurants, order, and follow updates in the app.</p>
            <div style={styles.links}>
              <a href={IOS_APP_URL} target="_blank" rel="noreferrer" aria-label="Download Dineflow on the App Store" style={styles.storeButton}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={styles.appleIcon}><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.43.61-2.18.43-3.04-.35C2.79 15.96 3.42 8.64 8.87 8.36c1.32.13 2.24.74 3.04.79.95-.19 1.86-.8 3.29-.82 1.72-.14 3.29.67 4.34 1.85-3.6 2.16-2.75 6.93.59 8.22-.65 1.6-1.49 3.17-3.08 4.89zM12.03 8.25c-.15-2.37 1.83-4.32 4.05-4.5.31 2.74-2.49 4.77-4.05 4.5z" /></svg>
                <span><small>Download on the</small><strong>App Store</strong></span>
              </a>
              <a href={ANDROID_APP_URL} target="_blank" rel="noreferrer" aria-label="Get Dineflow on Google Play" style={styles.storeButton}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={styles.playIcon}><path fill="#34A853" d="M3.2 2.7c-.3.4-.5.9-.5 1.6v15.4c0 .7.2 1.2.5 1.6l8.6-9.3z"/><path fill="#4285F4" d="m11.8 12 3.2 3.4 4-2.3c1.2-.7 1.2-1.8 0-2.5l-4-2.3z"/><path fill="#FBBC04" d="m3.2 21.3 11.8-6.8-3.2-2.5z"/><path fill="#EA4335" d="m3.2 2.7 8.6 9.3 3.2-2.5z"/></svg>
                <span><small>GET IT ON</small><strong>Google Play</strong></span>
              </a>
            </div>
            <p style={styles.storeNotice}>You can also keep ordering here as a guest.</p>
          </div>
        )}
        {!isPaid && !isFailed && <p style={styles.liveNote}>This page checks for order updates automatically.</p>}
        {!isPaid && <a href="/" style={styles.secondaryButton}>Back to Dineflow</a>}
      </section>
    </main>
  )
}

const styles = {
  page: { minHeight: '100vh', padding: 20, display: 'grid', placeItems: 'center', background: '#0d0d0d', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' },
  card: { width: 'min(100%, 560px)', boxSizing: 'border-box', padding: 'clamp(24px, 6vw, 42px)', borderRadius: 22, border: '1px solid #2c2c2c', background: '#171717', textAlign: 'center' },
  icon: { width: 62, height: 62, display: 'grid', placeItems: 'center', margin: '0 auto 20px', borderRadius: 20, fontSize: 34, fontWeight: 800 },
  eyebrow: { color: '#fb923c', fontSize: 11, fontWeight: 800, letterSpacing: '.14em', marginBottom: 10 },
  title: { fontSize: 30, margin: '0 0 10px', letterSpacing: '-.03em' },
  message: { color: '#a1a1aa', lineHeight: 1.6, margin: '0 auto 14px' },
  detail: { color: '#d4d4d8', fontSize: 13, margin: '7px 0' },
  total: { fontWeight: 800, color: '#fb923c' },
  progress: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, margin: '28px 0 22px', textAlign: 'center' },
  progressStep: { display: 'grid', justifyItems: 'center', gap: 8 },
  progressDot: { width: 30, height: 30, display: 'grid', placeItems: 'center', borderRadius: 99, border: '1px solid #4b4b4b', color: '#a1a1aa', fontSize: 12, fontWeight: 800 },
  progressDone: { borderColor: '#f97316', color: '#fff', background: '#f97316' },
  progressLabel: { color: '#71717a', fontSize: 10, lineHeight: 1.3 },
  progressLabelDone: { color: '#e4e4e7' },
  timerBox: { display: 'grid', justifyItems: 'center', gap: 7, padding: 18, margin: '18px 0', borderRadius: 14, border: '1px solid #3a2a1e', background: '#21170f' },
  timerLabel: { color: '#d4d4d8', fontSize: 13 },
  timer: { color: '#fb923c', fontSize: 38, fontVariantNumeric: 'tabular-nums' },
  timerHint: { color: '#a1a1aa', fontSize: 12 },
  qrBox: { padding: 18, margin: '18px 0', borderRadius: 14, background: '#fff', color: '#18181b' },
  qrTitle: { margin: '0 0 14px', fontSize: 17 },
  qrImage: { display: 'block', maxWidth: '100%', height: 'auto', margin: '0 auto' },
  usedNotice: { padding: 12, borderRadius: 10, background: 'rgba(34,197,94,.12)', color: '#4ade80', fontWeight: 700 },
  liveNote: { marginTop: 20, color: '#a1a1aa', fontSize: 12 },
  downloadBox: { marginTop: 26, paddingTop: 22, borderTop: '1px solid #303030' },
  downloadTitle: { fontSize: 19, margin: '0 0 8px' },
  links: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, marginTop: 18 },
  storeNotice: { color: '#a1a1aa', fontSize: 12, lineHeight: 1.5, margin: '14px 0 0' },
  storeButton: { minHeight: 58, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '8px 13px', border: '1px solid #666', borderRadius: 10, background: '#050505', color: '#fff', textDecoration: 'none', textAlign: 'left' },
  appleIcon: { width: 28, height: 28, flexShrink: 0 },
  playIcon: { width: 29, height: 29, flexShrink: 0 },
  secondaryButton: { display: 'inline-block', padding: 12, borderRadius: 11, border: '1px solid #444', color: '#f4f4f5', textDecoration: 'none', fontWeight: 700 }
}
