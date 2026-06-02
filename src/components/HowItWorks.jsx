'use client'

const customerSteps = [
  { step: '01', emoji: '📲', title: 'Download the App', desc: 'Get Dineflow free on iOS or Android. Sign up with your phone number in 30 seconds.' },
  { step: '02', emoji: '🔍', title: 'Find a Restaurant', desc: 'Browse restaurants near you. Filter by cuisine, rating, or distance from your location.' },
  { step: '03', emoji: '🛒', title: 'Order & Pay', desc: 'Choose your food, select dine-in or takeaway, pay with Telebirr, CBE Birr, or bank card.' },
  { step: '04', emoji: '📍', title: 'Arrive When Ready', desc: 'Track your order live. Arrive when your food is ready. No waiting. No guessing.' },
]

const restaurantSteps = [
  { step: '01', emoji: '💻', title: 'Install Desktop App', desc: 'Download the Dineflow Restaurant app for Windows. Free setup, no technical knowledge needed.' },
  { step: '02', emoji: '🍽️', title: 'Set Up Your Menu', desc: 'Add categories, items, photos, and prices. Set up QR codes for your tables in minutes.' },
  { step: '03', emoji: '🔔', title: 'Receive Orders Instantly', desc: 'New orders appear on your screen with a notification the second a customer pays.' },
  { step: '04', emoji: '💰', title: 'Get Paid Automatically', desc: '95% of every order goes straight to your bank account via Chapa. Zero manual transfers.' },
]

function StepList({ steps }) {
  return (
    <div>
      {steps.map((step, i) => (
        <div key={step.step} style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', transition: 'all 0.3s ease', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'; e.currentTarget.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              {step.emoji}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '1px', height: '32px', marginTop: '8px',
                background: 'linear-gradient(to bottom, rgba(249,115,22,0.4), transparent)',
              }} />
            )}
          </div>
          <div style={{ paddingTop: '12px', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: 'rgba(249,115,22,0.4)', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>{step.step}</span>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{step.title}</h4>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.6 }}>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '8rem 0', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>How It Works</span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, marginTop: '1rem', lineHeight: 1.05,
          }}>
            Simple for everyone.
            <br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Powerful underneath.
            </span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Customers */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: '#1a1a1a', border: '1px solid rgba(249,115,22,0.15)',
              borderRadius: '16px', padding: '16px', marginBottom: '2rem',
            }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(249,115,22,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📱</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '16px', fontFamily: 'Syne, sans-serif' }}>For Customers</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>Order in 4 simple steps</div>
              </div>
              <div style={{ color: '#f97316', fontWeight: 900, fontSize: '24px', fontFamily: 'Syne, sans-serif' }}>4</div>
            </div>
            <StepList steps={customerSteps} />
          </div>

          {/* Restaurants */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: '#1a1a1a', border: '1px solid rgba(249,115,22,0.15)',
              borderRadius: '16px', padding: '16px', marginBottom: '2rem',
            }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(249,115,22,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏪</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '16px', fontFamily: 'Syne, sans-serif' }}>For Restaurants</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>Start receiving orders today</div>
              </div>
              <div style={{ color: '#f97316', fontWeight: 900, fontSize: '24px', fontFamily: 'Syne, sans-serif' }}>4</div>
            </div>
            <StepList steps={restaurantSteps} />
          </div>
        </div>
      </div>
    </section>
  )
}