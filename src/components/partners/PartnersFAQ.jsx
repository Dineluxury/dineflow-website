'use client'
import { useState } from 'react'

const faqs = {
  ambassador: [
    { q: 'Do I need any experience to become an ambassador?', a: 'No experience needed. If you can walk into a restaurant and show them an app on a laptop or phone, you can do this. We give you a simple guide on what to say.' },
    { q: 'When do I start earning?', a: 'You start earning after the restaurant receives their first real paid order. Usually within a few days of them signing up.' },
    { q: 'How do I get paid?', a: 'We pay via Telebirr or bank transfer at the end of each month. You need a minimum of ETB 200 in earnings to request a payout.' },
    { q: 'What if the restaurant signs up but never gets orders?', a: 'You only earn when orders happen. But you can help them get started by telling people about the restaurant. More orders = more money for both of you.' },
    { q: 'Can I refer restaurants in any city?', a: 'Yes. You can refer restaurants anywhere in Ethiopia. Not just near your university.' },
    { q: 'What happens after 3 months?', a: 'Your earning period ends after 3 months per restaurant. But you can keep referring new restaurants and earn from each of them for their own 3-month period.' },
  ],
  creator: [
    { q: 'How many followers do I need?', a: 'There is no minimum. A creator with 500 highly engaged followers in the right city can outperform someone with 50,000 unengaged followers. Quality matters more.' },
    { q: 'How do I get my unique food link?', a: 'Once approved, you get access to your creator dashboard. From there you can generate your personal link for any food item or restaurant on Dineflow.' },
    { q: 'When do I earn — on clicks or on orders?', a: 'Only on completed, paid orders. A click means nothing. An order that gets paid means ETB 3 in your account. This protects everyone.' },
    { q: 'How long does the link track orders?', a: 'Your link tracks for 30 days. If someone clicks your video today and orders next week, you still get credit.' },
    { q: 'Can I share links for multiple restaurants?', a: 'Yes. You can create personal links for as many food items and restaurants as you want. The more you share, the more you can earn.' },
    { q: 'How do I get paid?', a: 'Monthly payout via Telebirr or bank transfer. Minimum ETB 100 to withdraw.' },
  ],
}

export default function PartnersFAQ() {
  const [tab, setTab] = useState('ambassador')
  const [open, setOpen] = useState(null)

  return (
    <section style={{ padding: '8rem 0', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '1rem', color: '#fff' }}>
            Common questions.
          </h2>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '14px', padding: '5px', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'ambassador', label: '🎓 Student Ambassador' },
            { id: 'creator', label: '🎬 Content Creator' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setOpen(null) }}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: tab === t.id ? '#f97316' : 'transparent', color: tab === t.id ? '#fff' : '#6b7280', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs[tab].map((faq, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.2s' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: '16px' }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#f97316', fontSize: '20px', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}