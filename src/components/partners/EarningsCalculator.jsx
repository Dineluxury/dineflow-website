'use client'
import { useState } from 'react'

export default function EarningsCalculator() {
  const [type, setType] = useState('ambassador')
  const [restaurants, setRestaurants] = useState(3)
  const [avgOrders, setAvgOrders] = useState(50000)
  const [videoViews, setVideoViews] = useState(10000)
  const [orderRate, setOrderRate] = useState(3)
  const [avgOrderValue, setAvgOrderValue] = useState(150)

  const ambassadorMonthly = Math.round(restaurants * avgOrders * 0.05 * 0.5)
  const ambassadorTotal = ambassadorMonthly * 3

  const totalOrders = Math.round(videoViews * (orderRate / 100))
  const creatorEarnings = Math.round(totalOrders * 3)

  return (
    <section style={{ padding: '8rem 0', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Earnings Calculator</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '1rem', color: '#fff' }}>
            See exactly how much<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              you could earn.
            </span>
          </h2>
        </div>

        {/* Type toggle */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '16px', padding: '6px', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'ambassador', label: '🎓 Student Ambassador' },
            { id: 'creator', label: '🎬 Content Creator' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: type === t.id ? '#f97316' : 'transparent', color: type === t.id ? '#fff' : '#6b7280', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', boxShadow: type === t.id ? '0 4px 20px rgba(249,115,22,0.3)' : 'none' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>
          {type === 'ambassador' ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '3rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Restaurants you refer</label>
                    <span style={{ color: '#f97316', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>{restaurants}</span>
                  </div>
                  <input type="range" min={1} max={20} value={restaurants} onChange={e => setRestaurants(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f97316', height: '6px', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>1 restaurant</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>20 restaurants</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Avg monthly orders per restaurant (ETB)</label>
                    <span style={{ color: '#f97316', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>{avgOrders.toLocaleString()}</span>
                  </div>
                  <input type="range" min={10000} max={500000} step={10000} value={avgOrders} onChange={e => setAvgOrders(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#f97316', height: '6px', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>ETB 10,000</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>ETB 500,000</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Your estimated monthly earnings</p>
                <p style={{ color: '#f97316', fontSize: '3.5rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
                  ETB {ambassadorMonthly.toLocaleString()}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '12px' }}>
                  Over 3 months: <span style={{ color: '#fbbf24', fontWeight: 700 }}>ETB {ambassadorTotal.toLocaleString()}</span>
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#9ca3af', fontSize: '11px' }}>Calculation</div>
                    <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                      {restaurants} restaurants × ETB {avgOrders.toLocaleString()} × 5% × 50%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '3rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Video views</label>
                    <span style={{ color: '#a855f7', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>{videoViews.toLocaleString()}</span>
                  </div>
                  <input type="range" min={1000} max={1000000} step={1000} value={videoViews} onChange={e => setVideoViews(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#a855f7', height: '6px', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>1,000 views</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>1M views</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>% of viewers who order</label>
                    <span style={{ color: '#a855f7', fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>{orderRate}%</span>
                  </div>
                  <input type="range" min={1} max={15} value={orderRate} onChange={e => setOrderRate(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#a855f7', height: '6px', cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>1% (low)</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>15% (viral)</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Your estimated earnings from this video</p>
                <p style={{ color: '#a855f7', fontSize: '3.5rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
                  ETB {creatorEarnings.toLocaleString()}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '12px' }}>
                  From <span style={{ color: '#c084fc', fontWeight: 700 }}>{totalOrders.toLocaleString()} orders</span> at ETB 3 per order
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>
                    {videoViews.toLocaleString()} views × {orderRate}% = {totalOrders.toLocaleString()} orders × ETB 3
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}