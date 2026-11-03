'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

const API_BASE = (process.env.NEXT_PUBLIC_DINEFLOW_API_URL || 'https://api.dineflow.et/api').replace(/\/$/, '')
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_ANDROID_URL || 'https://play.google.com/store/apps/details?id=et.dineflow.app'
const IOS_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_IOS_URL || 'https://apps.apple.com/search?term=Dineflow'

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store'
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || data.error || 'Something went wrong. Please try again.')
  return data
}

const money = (value) => `ETB ${Number(value || 0).toFixed(2)}`

export default function TableAppLinkPage() {
  const params = useParams()
  const qrToken = params?.qrToken
  const [table, setTable] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [quantities, setQuantities] = useState({})
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [pendingOrder, setPendingOrder] = useState(null)

  const appLink = useMemo(() => qrToken ? `dineflow://table/${encodeURIComponent(qrToken)}` : '', [qrToken])
  const selectedItems = useMemo(() => Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({ menuItemId: id, quantity })), [quantities])
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = useMemo(() => {
    if (!table) return 0
    const prices = new Map((table.menu || []).flatMap(category => (category.items || []).map(item => [item.id, Number(item.price || 0)])))
    return selectedItems.reduce((sum, item) => sum + (prices.get(item.menuItemId) || 0) * item.quantity, 0)
  }, [table, selectedItems])

  useEffect(() => {
    let active = true
    if (!qrToken) {
      setPageError('This table QR code is invalid.')
      setLoading(false)
      return () => { active = false }
    }

    apiRequest(`/tables/scan/${encodeURIComponent(qrToken)}`)
      .then(data => { if (active) setTable(data) })
      .catch(error => { if (active) setPageError(error.message || 'We could not load this table menu.') })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [qrToken])

  // Installed Dineflow handles this link. If it is unavailable, the browser
  // stays on this page and the guest menu remains usable.
  useEffect(() => {
    if (!appLink || typeof window === 'undefined') return
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent || '')
    if (!isMobile) return
    const timer = window.setTimeout(() => { window.location.href = appLink }, 250)
    return () => window.clearTimeout(timer)
  }, [appLink])

  const changeQuantity = (itemId, delta) => {
    setQuantities(current => {
      const next = Math.max(0, (current[itemId] || 0) + delta)
      return { ...current, [itemId]: next }
    })
  }

  const submitGuestOrder = async (event) => {
    event.preventDefault()
    if (!table || !selectedItems.length || submitting) return
    setSubmitting(true)
    setCheckoutError('')
    try {
      const order = await apiRequest('/orders/guest', {
        method: 'POST',
        body: JSON.stringify({
          restaurantId: table.restaurantId,
          tableQrToken: qrToken,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          items: selectedItems
        })
      })
      setPendingOrder(order)
      sessionStorage.setItem(`dineflow_guest_order_${order.orderId}`, order.accessToken)
    } catch (error) {
      setCheckoutError(error.message || 'Could not place your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const continueToPayment = useCallback(async () => {
    if (!pendingOrder || submitting) return
    setSubmitting(true)
    setCheckoutError('')
    try {
      const payment = await apiRequest(`/payments/guest/initialize/${pendingOrder.orderId}`, {
        method: 'POST',
        body: JSON.stringify({ accessToken: pendingOrder.accessToken })
      })
      if (!payment.checkoutUrl) throw new Error('Secure checkout could not be opened. Please try again.')
      window.location.assign(payment.checkoutUrl)
    } catch (error) {
      setCheckoutError(error.message || 'Could not start payment. Your order is saved; you can retry.')
      setSubmitting(false)
    }
  }, [pendingOrder, submitting])

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <a href="/" style={styles.brand}><span style={styles.brandMark}>D</span><span>Dineflow</span></a>
          <a href={appLink || '#'} onClick={event => { if (!appLink) event.preventDefault() }} style={styles.openApp}>Open in app</a>
        </header>

        {loading ? (
          <section style={styles.stateCard}><div style={styles.spinner} /><h1 style={styles.title}>Loading this table…</h1><p style={styles.muted}>Getting the restaurant menu ready.</p></section>
        ) : pageError ? (
          <section style={styles.stateCard}><h1 style={styles.title}>Menu unavailable</h1><p style={styles.muted}>{pageError}</p><a href="/" style={styles.secondaryButton}>Back to Dineflow</a></section>
        ) : pendingOrder ? (
          <section style={styles.checkoutCard}>
            <div style={styles.eyebrow}>ORDER READY</div>
            <h1 style={styles.title}>Your total is ready</h1>
            <p style={styles.muted}>Your order has been sent to {table.restaurantName}. Review the total, then continue to secure payment.</p>
            <div style={styles.totalRow}><span>Order total</span><strong>{money(pendingOrder.totalAmount)}</strong></div>
            {checkoutError && <p role="alert" style={styles.error}>{checkoutError}</p>}
            <button type="button" onClick={continueToPayment} disabled={submitting} style={styles.primaryButton}>
              {submitting ? 'Opening secure checkout…' : `Pay ${money(pendingOrder.totalAmount)}`}
            </button>
            <button type="button" onClick={() => { setPendingOrder(null); setCheckoutError('') }} style={styles.textButton}>Return to menu</button>
          </section>
        ) : (
          <>
            <section style={styles.hero}>
              <div style={styles.eyebrow}>TABLE {table.tableNumber}{table.label ? ` · ${table.label}` : ''}</div>
              <h1 style={styles.title}>{table.restaurantName}</h1>
              <p style={styles.muted}>Browse the menu and order as a guest. No Dineflow account is needed.</p>
            </section>

            <form onSubmit={submitGuestOrder}>
              <div style={styles.menuSection}>
                {(table.menu || []).map(category => {
                  const items = category.items || []
                  if (!items.length) return null
                  return (
                    <section key={category.id} style={styles.category}>
                      <h2 style={styles.categoryTitle}>{category.name}</h2>
                      <div style={styles.items}>
                        {items.map(item => {
                          const quantity = quantities[item.id] || 0
                          return (
                            <article key={item.id} style={styles.menuItem}>
                              {item.photoUrl ? <img src={item.photoUrl} alt="" style={styles.itemImage} /> : <div style={styles.imagePlaceholder}>D</div>}
                              <div style={styles.itemInfo}>
                                <h3 style={styles.itemTitle}>{item.name}</h3>
                                {item.description && <p style={styles.itemDescription}>{item.description}</p>}
                                <strong style={styles.price}>{money(item.price)}</strong>
                              </div>
                              <div style={styles.quantity}>
                                {quantity > 0 && <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item.id, -1)} style={styles.qtyButton}>−</button>}
                                {quantity > 0 && <span>{quantity}</span>}
                                <button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item.id, 1)} style={{ ...styles.qtyButton, ...styles.addButton }}>+</button>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  )
                })}
                {!(table.menu || []).some(category => (category.items || []).length > 0) && <p style={styles.muted}>There are no available items on this menu right now.</p>}
              </div>

              <section style={styles.checkoutCard}>
                <h2 style={styles.categoryTitle}>Guest details</h2>
                <div style={styles.formGrid}>
                  <label style={styles.fieldLabel}>Name<input required maxLength={100} autoComplete="name" value={customerName} onChange={event => setCustomerName(event.target.value)} placeholder="Your name" style={styles.input} /></label>
                  <label style={styles.fieldLabel}>Phone number<input required maxLength={30} type="tel" autoComplete="tel" value={customerPhone} onChange={event => setCustomerPhone(event.target.value)} placeholder="Phone for your order" style={styles.input} /></label>
                </div>
                <div style={styles.totalRow}><span>Menu subtotal · {selectedCount} item{selectedCount === 1 ? '' : 's'}</span><strong>{money(subtotal)}</strong></div>
                <p style={styles.finePrint}>The backend calculates the final total, including applicable fees and taxes, before payment.</p>
                {checkoutError && <p role="alert" style={styles.error}>{checkoutError}</p>}
                <button type="submit" disabled={!selectedCount || submitting} style={{ ...styles.primaryButton, opacity: !selectedCount || submitting ? 0.55 : 1 }}>
                  {submitting ? 'Preparing your order…' : `Review order · ${money(subtotal)}`}
                </button>
              </section>
            </form>
          </>
        )}

        <footer style={styles.footer}>Ordering as a guest · Powered by Dineflow</footer>
      </div>
    </main>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0d0d0d', color: '#fff', padding: '0 16px 48px', fontFamily: 'Inter, system-ui, sans-serif' },
  shell: { maxWidth: 760, margin: '0 auto' },
  header: { height: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #242424', marginBottom: 28 },
  brand: { display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 800 },
  brandMark: { width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#f97316', fontSize: 20 },
  openApp: { color: '#fb923c', fontWeight: 700, textDecoration: 'none', fontSize: 14 },
  hero: { padding: '10px 0 24px' },
  eyebrow: { color: '#fb923c', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', marginBottom: 9 },
  title: { fontSize: 'clamp(26px, 6vw, 36px)', fontWeight: 850, margin: '0 0 8px', letterSpacing: '-0.03em' },
  muted: { color: '#a1a1aa', margin: 0, lineHeight: 1.55 },
  menuSection: { display: 'grid', gap: 24 },
  category: { minWidth: 0 },
  categoryTitle: { fontSize: 19, fontWeight: 800, margin: '0 0 12px' },
  items: { display: 'grid', gap: 10 },
  menuItem: { display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: '#171717', border: '1px solid #292929', borderRadius: 15 },
  itemImage: { width: 76, height: 76, objectFit: 'cover', borderRadius: 11, background: '#252525', flexShrink: 0 },
  imagePlaceholder: { width: 76, height: 76, display: 'grid', placeItems: 'center', borderRadius: 11, background: '#29221d', color: '#fb923c', fontSize: 24, fontWeight: 800, flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 15, fontWeight: 750, margin: '0 0 4px' },
  itemDescription: { color: '#a1a1aa', fontSize: 12, lineHeight: 1.4, margin: '0 0 6px' },
  price: { color: '#fb923c', fontSize: 14 },
  quantity: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 },
  qtyButton: { width: 34, height: 34, borderRadius: 10, color: '#fff', background: '#272727', border: '1px solid #3a3a3a', fontSize: 20, cursor: 'pointer' },
  addButton: { background: '#f97316', borderColor: '#f97316' },
  checkoutCard: { marginTop: 26, padding: 20, background: '#171717', border: '1px solid #303030', borderRadius: 16 },
  stateCard: { marginTop: 60, padding: 30, textAlign: 'center', background: '#171717', border: '1px solid #303030', borderRadius: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 18 },
  fieldLabel: { display: 'grid', gap: 7, color: '#d4d4d8', fontSize: 13, fontWeight: 650 },
  input: { width: '100%', boxSizing: 'border-box', borderRadius: 10, border: '1px solid #3b3b3b', background: '#101010', color: '#fff', padding: '12px 13px', fontSize: 15, outlineColor: '#f97316' },
  totalRow: { display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 15, marginTop: 8, borderTop: '1px solid #303030', fontSize: 15 },
  finePrint: { color: '#a1a1aa', fontSize: 12, lineHeight: 1.5, margin: '9px 0 16px' },
  primaryButton: { width: '100%', border: 0, borderRadius: 11, padding: '14px 18px', color: '#fff', background: '#f97316', fontSize: 15, fontWeight: 800, cursor: 'pointer' },
  secondaryButton: { display: 'inline-block', marginTop: 18, color: '#fff', background: '#f97316', borderRadius: 10, padding: '12px 18px', textDecoration: 'none', fontWeight: 750 },
  textButton: { display: 'block', margin: '14px auto 0', color: '#fb923c', border: 0, background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 700 },
  error: { padding: 12, margin: '14px 0', borderRadius: 10, background: 'rgba(239,68,68,.12)', color: '#fca5a5', fontSize: 13 },
  spinner: { width: 32, height: 32, border: '3px solid rgba(249,115,22,.2)', borderTopColor: '#f97316', borderRadius: '50%', margin: '0 auto 18px', animation: 'spin .8s linear infinite' },
  footer: { paddingTop: 28, color: '#71717a', textAlign: 'center', fontSize: 12 }
}
