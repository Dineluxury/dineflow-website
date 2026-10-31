'use client'

import { useState } from 'react'
import { Check, Star, Zap, Monitor, Users, QrCode, BarChart2, Headphones, ArrowRight, Sparkles, MessageSquare, Tv, Clock } from 'lucide-react'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Registration & platform access',
    price: 'ETB 2,899',
    priceNote: 'one-time · no monthly fees',
    accent: '#6b7280',
    accentLight: 'rgba(107,114,128,0.08)',
    accentBorder: 'rgba(107,114,128,0.2)',
    badge: null,
    cta: 'Get Started',
    ctaHref: '/#contact',
    bestFor: 'Tech-savvy owners who want to handle their own menu setup',
    features: [
      { icon: Monitor, text: 'Restaurant desktop app access' },
      { icon: Users, text: 'Waiter mobile app included' },
      { icon: Zap, text: 'Kitchen display (KDS) app included' },
      { icon: Check, text: 'Listed on Dineflow customer app' },
      { icon: Check, text: 'Accept Telebirr, CBE & Cash payments' },
      { icon: QrCode, text: 'Digital table QR code generator' },
      { icon: Check, text: 'Self-managed menu setup' },
    ],
    notIncluded: [
      'Full menu filled by Dineflow team',
      'Desktop app installed and ready',
      'Table QR codes printed & installed',
      'Live within 12–24 hours',
      'Location-based SMS launch blast',
      'Featured hero banner on customer app',
    ],
  },
  {
    id: 'setup',
    name: 'Setup',
    tagline: 'We do everything for you',
    price: 'ETB 5,799',
    priceNote: 'one-time · no monthly fees',
    accent: '#f97316',
    accentLight: 'rgba(249,115,22,0.08)',
    accentBorder: 'rgba(249,115,22,0.35)',
    badge: 'Most Popular',
    cta: 'Get Setup Package',
    ctaHref: '/#contact',
    bestFor: 'Busy restaurants that want someone to handle everything',
    features: [
      { icon: Zap, text: 'Everything in Starter' },
      { icon: Clock, text: 'Priority approval — live within 12–24 hours' },
      { icon: Check, text: 'Full menu filled by Dineflow team' },
      { icon: Monitor, text: 'Desktop app installed and ready' },
      { icon: QrCode, text: 'Table QR codes printed & installed' },
      { icon: Users, text: 'Staff training session included' },
      { icon: Headphones, text: 'Priority onboarding support' },
    ],
    notIncluded: [
      'Location-based SMS launch blast (2–5 km)',
      'Featured hero banner on customer app',
      'Dineflow TV system',
      'Dineflow ERP system included',
    ],
  },
  {
    id: 'featured',
    name: 'Featured',
    tagline: 'Maximum visibility & growth',
    price: 'ETB 9,599',
    priceNote: 'one-time · no monthly fees',
    accent: '#7c3aed',
    accentLight: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.3)',
    badge: 'Best Value',
    cta: 'Start Featured Plan',
    ctaHref: '/#contact',
    bestFor: 'Restaurants & lounges serious about growing with Dineflow',
    features: [
      { icon: Zap, text: 'Everything in Setup' },
      { icon: MessageSquare, text: 'Location-based SMS launch blast (2–5 km)' },
      { icon: Star, text: 'Featured hero banner at top of customer app' },
      { icon: Tv, text: 'Dineflow TV system (live order queue & menu)' },
      { icon: BarChart2, text: 'Dineflow ERP system included when released' },
      { icon: Headphones, text: 'Dedicated support' },
    ],
    notIncluded: [],
  },
]

function FeatureRow({ icon: Icon, text, included = true, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      padding: '7px 0',
      opacity: included ? 1 : 0.38,
    }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
        background: included ? `${accent}18` : 'rgba(107,114,128,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {included
          ? <Icon size={11} color={accent} strokeWidth={2.5} />
          : <span style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1 }}>–</span>}
      </div>
      <span style={{ fontSize: '13.5px', color: included ? '#374151' : '#9ca3af', lineHeight: 1.5, fontWeight: included ? 500 : 400 }}>
        {text}
      </span>
    </div>
  )
}

export default function Pricing() {
  const [hovered, setHovered] = useState(null)
  const [activeTab, setActiveTab] = useState(null) // for mobile expand

  return (
    <section id="pricing" style={{ padding: '7rem 0', background: '#fafafa', position: 'relative', overflow: 'hidden' }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(17,24,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.5) 80%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Venue Packages
          </span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 800, marginTop: '1rem', lineHeight: 1.1,
            letterSpacing: '-0.02em', color: '#111827',
          }}>
            Simple, transparent<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              pricing for venues.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '500px', margin: '1.25rem auto 0', lineHeight: 1.7 }}>
            Pick the plan that fits your restaurant, hotel, or cafe. No hidden fees — just your food on more plates.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', alignItems: 'start' }} className="pricing-grid">
          {packages.map((pkg) => {
            const isHovered = hovered === pkg.id
            const isPopular = pkg.id === 'setup'

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff',
                  border: `1.5px solid ${isHovered || isPopular ? pkg.accentBorder : '#e5e7eb'}`,
                  borderRadius: '24px',
                  padding: isPopular ? '0' : '28px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-6px)' : isPopular ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 24px 60px ${pkg.accent}20, 0 0 0 1.5px ${pkg.accentBorder}`
                    : isPopular
                    ? `0 16px 48px ${pkg.accent}18, 0 0 0 1.5px ${pkg.accentBorder}`
                    : '0 2px 12px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Popular stripe at top */}
                {isPopular && (
                  <div style={{
                    background: `linear-gradient(135deg, ${pkg.accent}, #ea6c0a)`,
                    padding: '10px 28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  }}>
                    <Star size={13} color="#fff" fill="#fff" />
                    <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}>
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Badge for featured */}
                {pkg.badge && !isPopular && (
                  <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    background: `linear-gradient(135deg, ${pkg.accent}, #6d28d9)`,
                    color: '#fff', fontSize: '10px', fontWeight: 700,
                    padding: '4px 10px', borderRadius: '999px',
                    letterSpacing: '0.06em',
                  }}>
                    {pkg.badge}
                  </div>
                )}

                <div style={{ padding: isPopular ? '28px' : '0' }}>

                  {/* Package name & tagline */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: pkg.accent, flexShrink: 0,
                        boxShadow: `0 0 0 3px ${pkg.accentLight}`,
                      }} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: pkg.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {pkg.name}
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div style={{
                    background: pkg.accentLight, border: `1px solid ${pkg.accentBorder}`,
                    borderRadius: '16px', padding: '18px 20px', marginBottom: '24px',
                  }}>
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: pkg.price === 'Free' ? '2.8rem' : '2rem',
                      fontWeight: 900, color: '#111827', lineHeight: 1.1,
                      letterSpacing: '-0.03em',
                    }}>
                      {pkg.price}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '12px', fontWeight: 500, marginTop: '6px' }}>
                      {pkg.priceNote}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: '20px' }}>
                    {pkg.features.map((f) => (
                      <FeatureRow key={f.text} icon={f.icon} text={f.text} included={true} accent={pkg.accent} />
                    ))}
                    {pkg.notIncluded.map((text) => (
                      <FeatureRow key={text} icon={Check} text={text} included={false} accent={pkg.accent} />
                    ))}
                  </div>

                  {/* Best for */}
                  <div style={{
                    background: '#f9fafb', borderRadius: '12px', padding: '12px 14px',
                    marginBottom: '20px', border: '1px solid #f0f0f0',
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Best for
                    </span>
                    <p style={{ color: '#374151', fontSize: '12.5px', margin: '4px 0 0', lineHeight: 1.5, fontWeight: 500 }}>
                      {pkg.bestFor}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={pkg.ctaHref}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      width: '100%', padding: '14px',
                      background: isPopular ? `linear-gradient(135deg, ${pkg.accent}, #ea6c0a)` : pkg.accentLight,
                      color: isPopular ? '#fff' : pkg.accent,
                      border: `1.5px solid ${isPopular ? 'transparent' : pkg.accentBorder}`,
                      borderRadius: '14px',
                      fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                      transition: 'all 0.25s ease',
                      boxShadow: isPopular ? `0 8px 24px ${pkg.accent}35` : 'none',
                      boxSizing: 'border-box',
                    }}
                    onMouseEnter={e => {
                      if (isPopular) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 14px 36px ${pkg.accent}45`
                      } else {
                        e.currentTarget.style.background = pkg.accent
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 10px 28px ${pkg.accent}30`
                      }
                    }}
                    onMouseLeave={e => {
                      if (isPopular) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = `0 8px 24px ${pkg.accent}35`
                      } else {
                        e.currentTarget.style.background = pkg.accentLight
                        e.currentTarget.style.color = pkg.accent
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  >
                    {pkg.cta} <ArrowRight size={15} />
                  </a>

                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.7 }}>
            All plans include access to the Dineflow restaurant dashboard and 24/7 order management.{' '}
            <a href="/#contact" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
              Contact us
            </a>{' '}
            to discuss custom arrangements.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
            {['No hidden fees', 'Cancel anytime', 'Setup in 48h', 'Ethiopian support team'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '12.5px', fontWeight: 500 }}>
                <Check size={13} color="#22c55e" strokeWidth={2.5} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px;
            margin: 0 auto;
          }
        }

        @keyframes ping-orange {
          0% { transform: scale(1); opacity: 1; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
