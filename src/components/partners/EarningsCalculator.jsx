'use client'

import { useState } from 'react'

export default function EarningsCalculator() {
  const [type, setType] = useState('ambassador')
  const [restaurants, setRestaurants] = useState(3)
  const [monthlyOrdersValue, setMonthlyOrdersValue] = useState(50000)
  const [videoViews, setVideoViews] = useState(10000)
  const [orderRate, setOrderRate] = useState(3)

  const ambassadorMonthly = Math.round(restaurants * monthlyOrdersValue * 0.05 * 0.5)
  const ambassadorTotal = ambassadorMonthly * 3
  const attributedOrders = Math.round(videoViews * orderRate / 100)
  const creatorEarnings = attributedOrders * 3

  return (
    <section id="earnings" className="partner-section partner-calculator">
      <div className="partner-section-inner" style={{ maxWidth: 820 }}>
        <header className="partner-section-heading">
          <span className="partner-eyebrow">Earnings model</span>
          <h2>Explore an example estimate.</h2>
          <p>Adjust the assumptions to see how the program’s stated commission model could work. Actual earnings depend on verified activity.</p>
        </header>

        <div className="partner-calc-tabs" role="tablist" aria-label="Choose a partner earnings model">
          {[['ambassador', 'Student Ambassador'], ['creator', 'Content Creator']].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={type === id} onClick={() => setType(id)} className={type === id ? 'partner-calc-tab active' : 'partner-calc-tab'}>{label}</button>
          ))}
        </div>

        <div className="partner-calculator-card">
          {type === 'ambassador' ? (
            <>
              <RangeField label="Restaurants referred" value={restaurants} min={1} max={20} step={1} display={restaurants} onChange={setRestaurants} />
              <RangeField label="Monthly order value per restaurant" value={monthlyOrdersValue} min={10000} max={500000} step={10000} display={`ETB ${monthlyOrdersValue.toLocaleString()}`} onChange={setMonthlyOrdersValue} />
              <Estimate title="Estimated monthly commission share" amount={ambassadorMonthly} detail={`Estimated total over three months: ETB ${ambassadorTotal.toLocaleString()}`} formula={`${restaurants} × ETB ${monthlyOrdersValue.toLocaleString()} × 5% platform commission × 50% partner share`} />
            </>
          ) : (
            <>
              <RangeField label="Video views" value={videoViews} min={1000} max={1000000} step={1000} display={videoViews.toLocaleString()} onChange={setVideoViews} />
              <RangeField label="Viewers who place a paid order" value={orderRate} min={1} max={15} step={1} display={`${orderRate}%`} onChange={setOrderRate} />
              <Estimate title="Illustrative creator commission" amount={creatorEarnings} detail={`${attributedOrders.toLocaleString()} attributed orders at ETB 3 each`} formula={`${videoViews.toLocaleString()} views × ${orderRate}% assumed conversion × ETB 3 per completed, paid order`} />
            </>
          )}
          <p className="partner-calc-note">Illustration only. Orders, platform commission, attribution, payout eligibility, and final amounts are subject to the applicable partner terms.</p>
        </div>
      </div>
    </section>
  )
}

function RangeField({ label, value, min, max, step, display, onChange }) {
  const id = `partner-range-${label.replaceAll(' ', '-').toLowerCase()}`
  return (
    <div className="partner-range-field">
      <div className="partner-range-head"><label htmlFor={id}>{label}</label><output htmlFor={id}>{display}</output></div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <div className="partner-range-bounds"><span>{min.toLocaleString()}</span><span>{max.toLocaleString()}</span></div>
    </div>
  )
}

function Estimate({ title, amount, detail, formula }) {
  return (
    <div className="partner-estimate">
      <span>{title}</span>
      <strong>ETB {amount.toLocaleString()}</strong>
      <p>{detail}</p>
      <small>{formula}</small>
    </div>
  )
}
