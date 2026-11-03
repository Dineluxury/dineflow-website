'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

const API_BASE = (process.env.NEXT_PUBLIC_DINEFLOW_API_URL || 'https://api.dineflow.et/api').replace(/\/$/, '')
const ANDROID_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_ANDROID_URL || ''
const IOS_APP_URL = process.env.NEXT_PUBLIC_DINEFLOW_IOS_URL || ''

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
const available = (item) => item.isAvailable !== false && (item.stockRemaining == null || item.stockRemaining > 0)

export default function TableAppLinkPage() {
  const params = useParams()
  const qrToken = params?.qrToken
  const [table, setTable] = useState(null)
  const [extras, setExtras] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [quantities, setQuantities] = useState({})
  const [selectedExtras, setSelectedExtras] = useState({})
  const [expandedExtras, setExpandedExtras] = useState('')
  const [activeTab, setActiveTab] = useState('MENU')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [pendingOrder, setPendingOrder] = useState(null)

  const appLink = useMemo(() => qrToken ? `dineflow://table/${encodeURIComponent(qrToken)}` : '', [qrToken])
  const menuCategories = useMemo(() => (table?.menu || []).filter(category => String(category.categoryType || 'MENU').toUpperCase() !== 'EXTRA'), [table])
  const visibleCategories = useMemo(() => menuCategories.filter(category =>
    (String(category.categoryType || 'MENU').toUpperCase() === 'DRINK' ? 'DRINKS' : 'MENU') === activeTab
  ), [menuCategories, activeTab])
  const itemLookup = useMemo(() => new Map(menuCategories.flatMap(category => (category.items || []).map(item => [item.id, { ...item, categoryType: category.categoryType }]))), [menuCategories])
  const selectedItems = useMemo(() => Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({ menuItemId: id, quantity, extraIds: selectedExtras[id] || [] })), [quantities, selectedExtras])
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const menuSubtotal = useMemo(() => selectedItems.reduce((sum, selection) => {
    const item = itemLookup.get(selection.menuItemId)
    const addOnEach = selection.extraIds.reduce((extraSum, id) => extraSum + Number(extras.find(extra => extra.id === id)?.price || 0), 0)
    return sum + (Number(item?.price || 0) + addOnEach) * selection.quantity
  }, 0), [selectedItems, itemLookup, extras])

  useEffect(() => {
    let active = true
    if (!qrToken) {
      setPageError('This table QR code is invalid.')
      setLoading(false)
      return () => { active = false }
    }

    apiRequest(`/tables/scan/${encodeURIComponent(qrToken)}`)
      .then(async data => {
        if (!active) return
        setTable(data)
        try {
          const availableExtras = await apiRequest(`/menu/${encodeURIComponent(data.restaurantId)}/extras`)
          if (active) setExtras((availableExtras || []).filter(available))
        } catch {
          if (active) setExtras([])
        }
      })
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

  const toggleExtra = (itemId, extraId) => setSelectedExtras(current => {
    const currentIds = current[itemId] || []
    return { ...current, [itemId]: currentIds.includes(extraId) ? currentIds.filter(id => id !== extraId) : [...currentIds, extraId] }
  })

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

  const renderCheckoutLineItems = () => {
    const orderItems = pendingOrder?.items || []
    const groups = { MENU: [], DRINK: [], EXTRA: [] }
    orderItems.forEach(orderItem => {
      const menuItem = itemLookup.get(orderItem.menuItemId)
      const group = String(menuItem?.categoryType || 'MENU').toUpperCase() === 'DRINK' ? 'DRINK' : 'MENU'
      const extrasList = orderItem.extras || []
      const extrasUnitTotal = extrasList.reduce((sum, extra) => sum + Number(extra.price || 0), 0)
      const quantity = Number(orderItem.quantity || 1)
      const baseSubtotal = Number(orderItem.subtotal || 0) - extrasUnitTotal * quantity
      groups[group].push({ name: orderItem.menuItemName || menuItem?.name || 'Menu item', quantity, price: quantity ? baseSubtotal / quantity : 0, amount: baseSubtotal })
      extrasList.forEach(extra => groups.EXTRA.push({ name: extra.name, quantity, price: Number(extra.price || 0), amount: Number(extra.price || 0) * quantity }))
    })

    return <>
      {[['MENU', 'Menu'], ['DRINK', 'Drinks'], ['EXTRA', 'Extras']].map(([key, label]) => groups[key].length > 0 && <div key={key} style={styles.reviewGroup}>
        <h3 style={styles.reviewGroupTitle}>{label}</h3>
        {groups[key].map((line, index) => <div key={`${key}-${index}`} style={styles.reviewLine}>
          <span>{line.quantity} × {line.name}<small style={styles.lineUnit}>{money(line.price)} each</small></span><strong>{money(line.amount)}</strong>
        </div>)}
      </div>)}
    </>
  }

  const breakdown = pendingOrder?.chargeBreakdown || []

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
            <div style={styles.eyebrow}>REVIEW YOUR ORDER</div>
            <h1 style={styles.title}>Checkout</h1>
            <p style={styles.muted}>Your order is waiting for payment. The restaurant receives it after payment is confirmed.</p>
            <div style={styles.reviewItems}>{renderCheckoutLineItems()}</div>
            <div style={styles.totalRow}><span>{pendingOrder.serviceFeeIncluded ? 'Menu subtotal (service fee included)' : 'Subtotal'}</span><strong>{money(pendingOrder.subtotalAmount)}</strong></div>
            {breakdown.filter(charge => Number(charge.amount || 0) > 0).map((charge, index) => <div key={`${charge.name}-${index}`} style={styles.chargeRow}><span>{charge.name || 'Restaurant charge'}</span><strong>{money(charge.amount)}</strong></div>)}
            {Number(pendingOrder.dineflowServiceFee || 0) > 0 && <div style={styles.chargeRow}><span>Service fee{pendingOrder.serviceFeeIncluded ? ' · included above' : ''}</span><strong>{money(pendingOrder.dineflowServiceFee)}</strong></div>}
            <div style={{ ...styles.totalRow, ...styles.grandTotal }}><span>Total</span><strong>{money(pendingOrder.totalAmount)}</strong></div>
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
              <div style={styles.tabs} role="tablist" aria-label="Menu sections">
                {[['MENU', 'Menu'], ['DRINKS', 'Drinks']].map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)} style={{ ...styles.tab, ...(activeTab === key ? styles.activeTab : {}) }}>{label}</button>)}
              </div>
              <div style={styles.menuSection}>
                {visibleCategories.map(category => {
                  const items = (category.items || []).filter(available)
                  if (!items.length) return null
                  return (
                    <section key={category.id} style={styles.category}>
                      <h2 style={styles.categoryTitle}>{category.name}</h2>
                      <div style={styles.items}>
                        {items.map(item => {
                          const quantity = quantities[item.id] || 0
                          const chosenExtras = selectedExtras[item.id] || []
                          const canAddExtras = extras.length > 0 && String(category.categoryType || 'MENU').toUpperCase() !== 'DRINK'
                          return (
                            <article key={item.id} style={styles.menuItem}>
                              {item.photoUrl ? <img src={item.photoUrl} alt="" style={styles.itemImage} /> : <div style={styles.imagePlaceholder}>D</div>}
                              <div style={styles.itemInfo}>
                                <h3 style={styles.itemTitle}>{item.name}</h3>
                                {item.description && <p style={styles.itemDescription}>{item.description}</p>}
                                <strong style={styles.price}>{money(item.price)}</strong>
                                {canAddExtras && <button type="button" onClick={() => setExpandedExtras(expandedExtras === item.id ? '' : item.id)} style={styles.customizeButton}>{expandedExtras === item.id ? 'Hide extras' : `Add extras${chosenExtras.length ? ` (${chosenExtras.length})` : ''}`}</button>}
                              </div>
                              <div style={styles.quantity}>
                                {quantity > 0 && <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item.id, -1)} style={styles.qtyButton}>−</button>}
                                {quantity > 0 && <span>{quantity}</span>}
                                <button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item.id, 1)} style={{ ...styles.qtyButton, ...styles.addButton }}>+</button>
                              </div>
                              {expandedExtras === item.id && canAddExtras && <div style={styles.extrasBox}>
                                <strong style={styles.extrasHeading}>Extras for {item.name}</strong>
                                {extras.map(extra => <label key={extra.id} style={styles.extraOption}>
                                  <input type="checkbox" checked={chosenExtras.includes(extra.id)} onChange={() => toggleExtra(item.id, extra.id)} />
                                  <span>{extra.name}</span><strong>{money(extra.price)}</strong>
                                </label>)}
                              </div>}
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  )
                })}
                {!visibleCategories.some(category => (category.items || []).some(available)) && <p style={styles.muted}>There are no available {activeTab === 'DRINKS' ? 'drinks' : 'menu items'} right now.</p>}
              </div>

              <section style={styles.checkoutCard}>
                <h2 style={styles.categoryTitle}>Guest details</h2>
                <div style={styles.formGrid}>
                  <label style={styles.fieldLabel}>Name<input required maxLength={100} autoComplete="name" value={customerName} onChange={event => setCustomerName(event.target.value)} placeholder="Your name" style={styles.input} /></label>
                  <label style={styles.fieldLabel}>Phone number<input required maxLength={30} type="tel" autoComplete="tel" value={customerPhone} onChange={event => setCustomerPhone(event.target.value)} placeholder="Phone for your order" style={styles.input} /></label>
                </div>
                <div style={styles.totalRow}><span>Items · {selectedCount}</span><strong>{money(menuSubtotal)}</strong></div>
                <p style={styles.finePrint}>We’ll calculate the exact restaurant charges, service fee and tax before you pay.</p>
                {checkoutError && <p role="alert" style={styles.error}>{checkoutError}</p>}
                <button type="submit" disabled={!selectedCount || submitting} style={{ ...styles.primaryButton, opacity: !selectedCount || submitting ? 0.55 : 1 }}>
                  {submitting ? 'Preparing your order…' : `Review order · ${money(menuSubtotal)}`}
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
  tabs: { display: 'flex', gap: 10, borderBottom: '1px solid #303030', marginBottom: 22 },
  tab: { padding: '12px 18px', border: 0, borderBottom: '2px solid transparent', background: 'transparent', color: '#a1a1aa', fontSize: 15, fontWeight: 750, cursor: 'pointer' },
  activeTab: { color: '#fb923c', borderBottomColor: '#f97316' },
  menuSection: { display: 'grid', gap: 24 },
  category: { minWidth: 0 },
  categoryTitle: { fontSize: 19, fontWeight: 800, margin: '0 0 12px' },
  items: { display: 'grid', gap: 10 },
  menuItem: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, padding: 12, background: '#171717', border: '1px solid #292929', borderRadius: 15 },
  itemImage: { width: 76, height: 76, objectFit: 'cover', borderRadius: 11, background: '#252525', flexShrink: 0 },
  imagePlaceholder: { width: 76, height: 76, display: 'grid', placeItems: 'center', borderRadius: 11, background: '#29221d', color: '#fb923c', fontSize: 24, fontWeight: 800, flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 140 },
  itemTitle: { fontSize: 15, fontWeight: 750, margin: '0 0 4px' },
  itemDescription: { color: '#a1a1aa', fontSize: 12, lineHeight: 1.4, margin: '0 0 6px' },
  price: { color: '#fb923c', fontSize: 14 },
  customizeButton: { display: 'block', marginTop: 8, padding: 0, color: '#fdba74', border: 0, background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 750 },
  quantity: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 },
  qtyButton: { width: 34, height: 34, borderRadius: 10, color: '#fff', background: '#272727', border: '1px solid #3a3a3a', fontSize: 20, cursor: 'pointer' },
  addButton: { background: '#f97316', borderColor: '#f97316' },
  extrasBox: { flexBasis: '100%', padding: '10px 4px 0 90px', borderTop: '1px solid #303030' },
  extrasHeading: { display: 'block', marginBottom: 8, color: '#e4e4e7', fontSize: 13 },
  extraOption: { display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', color: '#d4d4d8', fontSize: 13 },
  checkoutCard: { marginTop: 26, padding: 20, background: '#171717', border: '1px solid #303030', borderRadius: 16 },
  stateCard: { marginTop: 60, padding: 30, textAlign: 'center', background: '#171717', border: '1px solid #303030', borderRadius: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 18 },
  fieldLabel: { display: 'grid', gap: 7, color: '#d4d4d8', fontSize: 13, fontWeight: 650 },
  input: { width: '100%', boxSizing: 'border-box', borderRadius: 10, border: '1px solid #3b3b3b', background: '#101010', color: '#fff', padding: '12px 13px', fontSize: 15, outlineColor: '#f97316' },
  reviewItems: { display: 'grid', gap: 14, marginTop: 22 },
  reviewGroup: { paddingBottom: 12, borderBottom: '1px solid #303030' },
  reviewGroupTitle: { margin: '0 0 8px', color: '#fb923c', fontSize: 14 },
  reviewLine: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0', color: '#e4e4e7', fontSize: 14 },
  lineUnit: { display: 'block', marginTop: 3, color: '#a1a1aa', fontSize: 11 },
  totalRow: { display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 15, marginTop: 8, borderTop: '1px solid #303030', fontSize: 15 },
  chargeRow: { display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 10, color: '#d4d4d8', fontSize: 14 },
  grandTotal: { marginTop: 13, color: '#fff', fontSize: 18, fontWeight: 800 },
  finePrint: { color: '#a1a1aa', fontSize: 12, lineHeight: 1.5, margin: '9px 0 16px' },
  primaryButton: { width: '100%', border: 0, borderRadius: 11, padding: '14px 18px', color: '#fff', background: '#f97316', fontSize: 15, fontWeight: 800, cursor: 'pointer' },
  secondaryButton: { display: 'inline-block', marginTop: 18, color: '#fff', background: '#f97316', borderRadius: 10, padding: '12px 18px', textDecoration: 'none', fontWeight: 750 },
  textButton: { display: 'block', margin: '14px auto 0', color: '#fb923c', border: 0, background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 700 },
  error: { padding: 12, margin: '14px 0', borderRadius: 10, background: 'rgba(239,68,68,.12)', color: '#fca5a5', fontSize: 13 },
  spinner: { width: 32, height: 32, border: '3px solid rgba(249,115,22,.2)', borderTopColor: '#f97316', borderRadius: '50%', margin: '0 auto 18px', animation: 'spin .8s linear infinite' },
  footer: { paddingTop: 28, color: '#71717a', textAlign: 'center', fontSize: 12 }
}
