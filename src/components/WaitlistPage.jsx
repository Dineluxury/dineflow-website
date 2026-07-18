'use client'

import { useEffect, useState } from 'react'
import {
  Bell,
  CheckCircle2,
  ChefHat,
  Clock3,
  Images,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Smartphone,
  Store,
  UserRound,
  Utensils,
} from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_paczsiv'
const EMAILJS_TEMPLATE_ID = 'template_5ybzx4q'
const EMAILJS_PUBLIC_KEY = 'AEb0huD-y3PKEsQd0'
const SUPPORT_EMAIL = 'support@dineflow.et'
const WAITLIST_DEFAULTS = { venues: 40, users: 130 }

const audienceOptions = [
  {
    id: 'Customer Waitlist',
    title: 'Customer',
    subtitle: 'I want the app when Dineflow launches.',
    icon: UserRound,
  },
  {
    id: 'Venue Waitlist',
    title: 'Venue',
    subtitle: 'I want my restaurant, hotel, or cafe ready before launch.',
    icon: Store,
  },
]

function AppHomePhone() {
  return (
    <div className="phoneScene phoneSceneLeft" aria-hidden="true">
      <div className="phoneGlow" />
      <div className="phoneFrame homePhone">
        <div className="phoneNotch" />
        <div className="phoneStatus">
          <span>9:41</span>
          <span className="statusDots">...</span>
        </div>

        <div className="phoneContent">
          <div className="phoneTopRow">
            <div>
              <p className="miniMuted">Good morning</p>
              <h3>What are you craving?</h3>
            </div>
            <div className="avatarBubble">A</div>
          </div>

          <div className="searchBar">
            <Smartphone size={13} />
            <span>Search restaurants, hotels, cafes...</span>
          </div>

          <div className="chipRow">
            {['All', 'Halal', 'Grill', 'Fast'].map((item, index) => (
              <span className={index === 0 ? 'chip activeChip' : 'chip'} key={item}>
                {item}
              </span>
            ))}
          </div>

          {[
            { name: 'Injohi Restaurant', type: 'Traditional', rating: '4.9', distance: '0.3km', icon: Utensils },
            { name: 'Burqito Hotel Cafe', type: 'Hotel - Cafe', rating: '4.7', distance: '0.8km', icon: ChefHat },
          ].map(({ icon: Icon, ...restaurant }) => (
            <div className="restaurantCard" key={restaurant.name}>
              <div className="foodPreview">
                <Icon size={36} />
              </div>
              <div className="restaurantInfo">
                <div>
                  <strong>{restaurant.name}</strong>
                  <span>{restaurant.type}</span>
                </div>
                <div className="ratingBox">
                  <b>* {restaurant.rating}</b>
                  <span>{restaurant.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="floatBadge badgeAccepted">
        <div className="badgeIcon successIcon"><CheckCircle2 size={18} /></div>
        <div>
          <strong>Order Accepted!</strong>
          <span>Ready in 12 min</span>
        </div>
      </div>

      <div className="floatBadge badgeOrder">
        <div className="badgeIcon orangeIcon"><Bell size={17} /></div>
        <div>
          <strong>New Order!</strong>
          <span>ETB 650</span>
        </div>
      </div>
    </div>
  )
}

function TrackingPhone() {
  const steps = [
    { label: 'Order Placed', done: true },
    { label: 'Venue Accepted', done: true },
    { label: 'Preparing', done: true, active: true },
    { label: 'Ready for Pickup', done: false },
    { label: 'Completed', done: false },
  ]

  return (
    <div className="phoneScene phoneSceneRight" aria-hidden="true">
      <div className="phoneGlow smallGlow" />
      <div className="phoneFrame trackingPhone">
        <div className="phoneNotch" />
        <div className="phoneStatus compactStatus">
          <span>9:41</span>
        </div>

        <div className="trackingContent">
          <h3>Order Tracking</h3>
          <div className="prepPanel">
            <ChefHat size={44} />
            <strong>Preparing Your Food</strong>
            <span>Chef is cooking your order</span>
            <div className="progressTrack">
              <div />
            </div>
            <p><Clock3 size={12} /> Ready in ~12 min</p>
          </div>

          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.label}>
                <span className={step.active ? 'stepDot activeStep' : step.done ? 'stepDot doneStep' : 'stepDot'}>
                  {step.done ? '✓' : index + 1}
                </span>
                <b className={step.active ? 'activeStepText' : ''}>{step.label}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="floatBadge badgePayment">
        <div className="badgeIcon successIcon"><ShieldCheck size={18} /></div>
        <div>
          <strong>Payment Done</strong>
          <span>via Chapa</span>
        </div>
      </div>
    </div>
  )
}

export default function WaitlistPage() {
  const [form, setForm] = useState({
    audience: 'Customer Waitlist',
    name: '',
    email: '',
    phone: '',
    city: '',
    restaurantName: '',
  })
  const [focused, setFocused] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [waitlistStats, setWaitlistStats] = useState(WAITLIST_DEFAULTS)

  const isRestaurant = form.audience === 'Venue Waitlist'

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  useEffect(() => {
    const venues = Math.max(Number(window.localStorage.getItem('dineflowWaitlistVenues')) || WAITLIST_DEFAULTS.venues, WAITLIST_DEFAULTS.venues)
    const users = Math.max(Number(window.localStorage.getItem('dineflowWaitlistUsers')) || WAITLIST_DEFAULTS.users, WAITLIST_DEFAULTS.users)
    setWaitlistStats({ venues, users })
  }, [])

  const syncWaitlistStats = (nextAudience = null) => {
    const currentVenues = Math.max(Number(window.localStorage.getItem('dineflowWaitlistVenues')) || WAITLIST_DEFAULTS.venues, WAITLIST_DEFAULTS.venues)
    const currentUsers = Math.max(Number(window.localStorage.getItem('dineflowWaitlistUsers')) || WAITLIST_DEFAULTS.users, WAITLIST_DEFAULTS.users)
    const nextStats = {
      venues: nextAudience === 'Venue Waitlist' ? currentVenues + 1 : currentVenues,
      users: nextAudience === 'Customer Waitlist' ? currentUsers + 1 : currentUsers,
    }

    window.localStorage.setItem('dineflowWaitlistVenues', String(nextStats.venues))
    window.localStorage.setItem('dineflowWaitlistUsers', String(nextStats.users))
    setWaitlistStats(nextStats)
    window.dispatchEvent(new Event('dineflow-waitlist-updated'))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          type: form.audience,
          message: [
            `Waitlist type: ${form.audience}`,
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Phone: ${form.phone}`,
            `City: ${form.city}`,
            isRestaurant ? `Venue: ${form.restaurantName}` : '',
          ].filter(Boolean).join('\n'),
          to_email: SUPPORT_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      )
      syncWaitlistStats(form.audience)
      setSent(true)
      setForm({
        audience: form.audience,
        name: '',
        email: '',
        phone: '',
        city: '',
        restaurantName: '',
      })
    } catch (submissionError) {
      setError(`Could not submit right now. Please email us directly at ${SUPPORT_EMAIL}.`)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (name) => focused === name ? 'waitInput focusedInput' : 'waitInput'

  return (
    <main className="waitlistPage">
      <section className="waitHero">
        <div className="softGrid" />
        <div className="orangeWash orangeWashOne" />
        <div className="orangeWash orangeWashTwo" />

        <a className="mockupNavLink" href="/mockup">
          <Images size={16} />
          Mockups
        </a>

        <div className="waitShell">
          <div className="waitLeft">
            <a className="brandMark" href="/">
              <span>D</span>
              <b>Dineflow</b>
            </a>

            <div className="launchBadge">
              <span />
              Ethiopia launch waitlist is open
            </div>

            <h1>
              Be first when
              <span>Dineflow launches.</span>
            </h1>

            <p className="heroCopy">
              Join the customer waitlist for early app access, or register your restaurant, hotel, or cafe so the team can prepare your menu, payments, and launch setup before opening day.
            </p>

            <div className="waitlistNumberStrip">
              <div>
                <strong>{waitlistStats.venues}</strong>
                <span>restaurants, hotels & cafes waiting</span>
              </div>
              <div>
                <strong>{waitlistStats.users}</strong>
                <span>users on the waitlist</span>
              </div>
            </div>

            <div className="trustLine">
              <div><Clock3 size={16} /> Early access updates</div>
              <div><MapPin size={16} /> Built for Ethiopia</div>
              <div><ShieldCheck size={16} /> Secure payments ready</div>
            </div>

            <div className="phoneStage">
              <AppHomePhone />
              <TrackingPhone />
            </div>
          </div>

          <div className="waitCard">
            {sent ? (
              <div className="successState">
                <CheckCircle2 size={56} />
                <h2>You are on the list.</h2>
                <p>We received your waitlist request. We will inform you before Dineflow launches.</p>
                <button type="button" onClick={() => setSent(false)}>Add another person</button>
              </div>
            ) : (
              <>
                <div className="formHeader">
                  <span>Join Waitlist</span>
                  <h2>Reserve your launch spot</h2>
                  <p>Choose your waitlist type and leave the best contact details.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="audienceGrid">
                    {audienceOptions.map(({ id, title, subtitle, icon: Icon }) => (
                      <button
                        className={form.audience === id ? 'audienceOption selectedAudience' : 'audienceOption'}
                        key={id}
                        onClick={() => updateForm('audience', id)}
                        type="button"
                      >
                        <Icon size={20} />
                        <strong>{title}</strong>
                        <small>{subtitle}</small>
                      </button>
                    ))}
                  </div>

                  <label>
                    Full name
                    <input
                      className={inputClass('name')}
                      onBlur={() => setFocused('')}
                      onChange={(event) => updateForm('name', event.target.value)}
                      onFocus={() => setFocused('name')}
                      placeholder="Ahmed Mohammed"
                      required
                      type="text"
                      value={form.name}
                    />
                  </label>

                  {isRestaurant && (
                    <label>
                      Restaurant, hotel, or cafe name
                      <input
                        className={inputClass('restaurantName')}
                        onBlur={() => setFocused('')}
                        onChange={(event) => updateForm('restaurantName', event.target.value)}
                        onFocus={() => setFocused('restaurantName')}
                        placeholder="Your venue name"
                        required
                        type="text"
                        value={form.restaurantName}
                      />
                    </label>
                  )}

                  <div className="twoFields">
                    <label>
                      Email
                      <input
                        className={inputClass('email')}
                        onBlur={() => setFocused('')}
                        onChange={(event) => updateForm('email', event.target.value)}
                        onFocus={() => setFocused('email')}
                        placeholder="you@email.com"
                        required
                        type="email"
                        value={form.email}
                      />
                    </label>

                    <label>
                      Phone
                      <input
                        className={inputClass('phone')}
                        onBlur={() => setFocused('')}
                        onChange={(event) => updateForm('phone', event.target.value)}
                        onFocus={() => setFocused('phone')}
                        placeholder="0911 234 567"
                        required
                        type="tel"
                        value={form.phone}
                      />
                    </label>
                  </div>

                  <label>
                    City
                    <input
                      className={inputClass('city')}
                      onBlur={() => setFocused('')}
                      onChange={(event) => updateForm('city', event.target.value)}
                      onFocus={() => setFocused('city')}
                      placeholder="Hawassa, Addis Ababa..."
                      required
                      type="text"
                      value={form.city}
                    />
                  </label>

                  {error && <div className="formError">{error}</div>}

                  <button className="submitButton" disabled={loading} type="submit">
                    {loading ? 'Joining...' : <>Join the waitlist <Send size={16} /></>}
                  </button>

                  <p className="formFootnote">
                    <Mail size={13} />
                    Launch updates will be sent to your email and phone.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .waitlistPage {
          min-height: 100vh;
          background: #ffffff;
          color: #111827;
          overflow: hidden;
        }

        .waitHero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 42px 24px;
          background:
            radial-gradient(circle at 12% 18%, rgba(249, 115, 22, 0.08), transparent 28%),
            radial-gradient(circle at 88% 12%, rgba(249, 115, 22, 0.1), transparent 30%),
            #ffffff;
        }

        .softGrid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 24, 39, 0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.56) 72%, transparent 96%);
          pointer-events: none;
        }

        .orangeWash {
          position: absolute;
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.13);
          filter: blur(70px);
          pointer-events: none;
        }

        .orangeWashOne {
          width: 360px;
          height: 360px;
          right: -90px;
          top: -70px;
        }

        .orangeWashTwo {
          width: 260px;
          height: 260px;
          left: 8%;
          bottom: -80px;
          opacity: 0.7;
        }

        .waitShell {
          position: relative;
          z-index: 1;
          width: min(1180px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.72fr);
          gap: 42px;
          align-items: center;
        }

        .brandMark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #111827;
          text-decoration: none;
          font-weight: 900;
          font-size: 20px;
          margin-bottom: 38px;
        }

        .brandMark span {
          width: 38px;
          height: 38px;
          border-radius: 13px;
          background: #f97316;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 36px rgba(249, 115, 22, 0.28);
        }

        .launchBadge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(249, 115, 22, 0.22);
          color: #ea6c0a;
          background: rgba(249, 115, 22, 0.07);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .launchBadge span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.13);
        }

        .waitLeft h1 {
          font-size: clamp(3.2rem, 7vw, 6.8rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          max-width: 760px;
          margin: 0 0 24px;
          font-weight: 900;
        }

        .waitLeft h1 span {
          display: block;
          color: #f97316;
        }

        .heroCopy {
          max-width: 660px;
          color: #5f6673;
          font-size: 18px;
          line-height: 1.75;
          margin: 0 0 24px;
        }

        .trustLine {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }

        .trustLine div {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          background: #fff;
          border: 1px solid #eef0f3;
          border-radius: 999px;
          padding: 10px 13px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 8px 24px rgba(17, 24, 39, 0.04);
        }

        .trustLine svg {
          color: #f97316;
        }

        .waitlistNumberStrip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-width: 560px;
          margin: 0 0 28px;
        }

        .waitlistNumberStrip div {
          border: 1px solid #eef0f3;
          border-radius: 18px;
          background: rgba(255,255,255,0.82);
          padding: 16px 18px;
          box-shadow: 0 14px 34px rgba(17,24,39,0.06);
          backdrop-filter: blur(14px);
        }

        .waitlistNumberStrip strong,
        .waitlistNumberStrip span {
          display: block;
        }

        .waitlistNumberStrip strong {
          color: #f97316;
          font-size: 28px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .waitlistNumberStrip span {
          color: #6b7280;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.45;
          margin-top: 6px;
        }

        .phoneStage {
          position: relative;
          height: 430px;
          display: flex;
          align-items: center;
          gap: 44px;
          padding-left: 40px;
        }

        .phoneScene {
          position: relative;
          animation: waitFloat 5.8s ease-in-out infinite;
        }

        .phoneSceneRight {
          transform: scale(0.9);
          animation-delay: 0.8s;
          margin-top: 34px;
        }

        .phoneGlow {
          position: absolute;
          inset: -30px;
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.18);
          filter: blur(58px);
        }

        .smallGlow {
          opacity: 0.72;
        }

        .phoneFrame {
          position: relative;
          width: 258px;
          height: 512px;
          background: linear-gradient(145deg, #171717, #0b0b0b);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 44px;
          overflow: hidden;
          box-shadow: 22px 28px 70px rgba(17,24,39,0.28), 0 0 44px rgba(249,115,22,0.18);
        }

        .homePhone {
          transform: perspective(1000px) rotateY(-8deg) rotateX(3deg);
        }

        .trackingPhone {
          transform: perspective(900px) rotateY(8deg) rotateX(2deg);
        }

        .phoneNotch {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 4;
          width: 92px;
          height: 26px;
          transform: translateX(-50%);
          background: #000;
          border-bottom-left-radius: 18px;
          border-bottom-right-radius: 18px;
        }

        .phoneStatus {
          height: 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          padding: 0 22px 8px;
        }

        .statusDots {
          letter-spacing: 3px;
        }

        .compactStatus {
          justify-content: flex-start;
        }

        .phoneContent,
        .trackingContent {
          padding: 0 16px;
        }

        .phoneTopRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .miniMuted {
          color: #6b7280;
          font-size: 11px;
          margin: 0 0 2px;
        }

        .phoneTopRow h3,
        .trackingContent h3 {
          color: #ffffff;
          margin: 0;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .avatarBubble {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #f97316;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
        }

        .searchBar {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          border-radius: 13px;
          background: rgba(255,255,255,0.08);
          color: #6b7280;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: none;
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 11px;
        }

        .chipRow {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }

        .chip {
          border-radius: 999px;
          background: rgba(255,255,255,0.09);
          color: #9ca3af;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 5px 12px;
          font-size: 10px;
          font-weight: 800;
        }

        .activeChip {
          color: #fff;
          background: #f97316;
        }

        .restaurantCard {
          overflow: hidden;
          margin-bottom: 11px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 26px rgba(0,0,0,0.18);
        }

        .foodPreview {
          height: 88px;
          display: grid;
          place-items: center;
          color: #ff8a33;
          background: linear-gradient(135deg, rgba(249,115,22,0.18), rgba(96,48,24,0.36));
        }

        .restaurantInfo {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
        }

        .restaurantInfo strong,
        .restaurantInfo span,
        .ratingBox b,
        .ratingBox span {
          display: block;
        }

        .restaurantInfo strong {
          color: #ffffff;
          font-size: 11px;
        }

        .restaurantInfo span,
        .ratingBox span {
          color: #9ca3af;
          font-size: 10px;
          margin-top: 2px;
        }

        .restaurantInfo > div:first-child span {
          color: #f97316;
        }

        .ratingBox {
          text-align: right;
        }

        .ratingBox b {
          color: #fbbf24;
          font-size: 10px;
        }

        .floatBadge {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 150px;
          border-radius: 16px;
          padding: 12px 14px;
          background: #1b1b1b;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 44px rgba(0,0,0,0.34);
          animation: waitFloatBadge 5.4s ease-in-out infinite;
        }

        .floatBadge strong,
        .floatBadge span {
          display: block;
        }

        .floatBadge strong {
          color: #ffffff;
          font-size: 11px;
        }

        .floatBadge span {
          color: #9ca3af;
          font-size: 10px;
          margin-top: 2px;
        }

        .badgeIcon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
        }

        .successIcon {
          color: #41dc7e;
          background: rgba(34,197,94,0.15);
        }

        .orangeIcon {
          color: #fb923c;
          background: rgba(249,115,22,0.15);
        }

        .badgeAccepted {
          right: -62px;
          top: 64px;
        }

        .badgeOrder {
          left: -70px;
          bottom: 105px;
          animation-delay: 0.7s;
        }

        .badgeOrder span {
          color: #f97316;
          font-weight: 800;
        }

        .badgePayment {
          left: -72px;
          bottom: 78px;
          animation-delay: 0.4s;
        }

        .badgePayment span {
          color: #22c55e;
          font-weight: 700;
        }

        .trackingContent {
          color: #ffffff;
        }

        .prepPanel {
          margin: 16px 0 22px;
          border-radius: 20px;
          border: 1px solid rgba(249,115,22,0.32);
          background: rgba(249,115,22,0.11);
          padding: 22px 18px;
          text-align: center;
        }

        .prepPanel svg {
          color: #fdb47a;
          margin-bottom: 10px;
        }

        .prepPanel strong,
        .prepPanel span {
          display: block;
        }

        .prepPanel strong {
          color: #fb923c;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .prepPanel span {
          color: #6b7280;
          font-size: 11px;
        }

        .progressTrack {
          height: 4px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.14);
          margin: 14px 0 9px;
        }

        .progressTrack div {
          height: 100%;
          width: 60%;
          border-radius: inherit;
          background: #f97316;
          animation: progressPulse 2.8s ease-in-out infinite;
        }

        .prepPanel p {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: #fb923c;
          font-size: 11px;
          font-weight: 800;
          margin: 0;
        }

        .steps {
          display: grid;
          gap: 12px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stepDot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.12);
          color: #9ca3af;
          font-size: 11px;
          font-weight: 900;
        }

        .doneStep {
          color: #22c55e;
          background: rgba(34,197,94,0.2);
        }

        .activeStep {
          color: #fff;
          background: #f97316;
        }

        .step b {
          color: #a1a1aa;
          font-size: 12px;
        }

        .step .activeStepText {
          color: #fb923c;
        }

        .waitCard {
          background: rgba(255,255,255,0.9);
          border: 1px solid #eef0f3;
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 30px 80px rgba(17, 24, 39, 0.12);
          backdrop-filter: blur(18px);
        }

        .formHeader {
          margin-bottom: 22px;
        }

        .formHeader span {
          color: #f97316;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .formHeader h2 {
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.03em;
          margin: 10px 0 9px;
        }

        .formHeader p {
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
          font-size: 14px;
        }

        .audienceGrid,
        .twoFields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .audienceGrid {
          margin-bottom: 18px;
        }

        .audienceOption {
          text-align: left;
          border: 1.5px solid #e5e7eb;
          border-radius: 18px;
          background: #fff;
          padding: 16px;
          color: #111827;
          cursor: pointer;
          font: inherit;
          transition: all 0.2s ease;
        }

        .audienceOption svg {
          color: #f97316;
          margin-bottom: 10px;
        }

        .audienceOption strong,
        .audienceOption small {
          display: block;
        }

        .audienceOption strong {
          font-size: 14px;
          margin-bottom: 4px;
        }

        .audienceOption small {
          color: #6b7280;
          font-size: 11px;
          line-height: 1.45;
        }

        .selectedAudience {
          border-color: #f97316;
          background: rgba(249,115,22,0.07);
          box-shadow: 0 0 0 4px rgba(249,115,22,0.08);
        }

        form {
          display: grid;
          gap: 14px;
        }

        label {
          display: grid;
          gap: 8px;
          color: #4b5563;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .waitInput {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          background: #fff;
          color: #111827;
          padding: 14px 15px;
          outline: none;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0;
          text-transform: none;
          transition: all 0.2s ease;
        }

        .waitInput::placeholder {
          color: #9ca3af;
        }

        .focusedInput {
          border-color: #f97316;
          box-shadow: 0 0 0 4px rgba(249,115,22,0.1);
        }

        .formError {
          color: #dc2626;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.16);
          border-radius: 12px;
          padding: 11px 13px;
          font-size: 13px;
        }

        .submitButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 52px;
          border: 0;
          border-radius: 15px;
          background: #f97316;
          color: #fff;
          font: inherit;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 16px 34px rgba(249,115,22,0.28);
          transition: all 0.2s ease;
        }

        .submitButton:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submitButton:not(:disabled):hover {
          transform: translateY(-2px);
          background: #ea6c0a;
          box-shadow: 0 22px 44px rgba(249,115,22,0.36);
        }

        .formFootnote {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #6b7280;
          font-size: 12px;
          margin: 0;
        }

        .successState {
          min-height: 460px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .successState svg {
          color: #22c55e;
          margin-bottom: 18px;
        }

        .successState h2 {
          font-size: 32px;
          margin: 0 0 10px;
          letter-spacing: -0.03em;
        }

        .successState p {
          max-width: 320px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .successState button {
          border: 1.5px solid #f97316;
          border-radius: 13px;
          background: #fff;
          color: #f97316;
          padding: 12px 18px;
          font: inherit;
          font-weight: 900;
          cursor: pointer;
        }

        @keyframes waitFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -16px; }
        }

        @keyframes waitFloatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes progressPulse {
          0%, 100% { width: 54%; }
          50% { width: 68%; }
        }

        @media (max-width: 1100px) {
          .waitShell {
            grid-template-columns: 1fr;
          }

          .waitCard {
            max-width: 720px;
          }
        }

        .mockupNavLink {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 15px;
          border-radius: 999px;
          border: 1.5px solid rgba(249,115,22,0.24);
          background: rgba(255,255,255,0.86);
          color: #f97316;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          box-shadow: 0 14px 30px rgba(17,24,39,0.08);
          backdrop-filter: blur(16px);
          transition: all 0.2s ease;
        }

        .mockupNavLink:hover {
          transform: translateY(-2px);
          background: #f97316;
          color: #fff;
          box-shadow: 0 20px 40px rgba(249,115,22,0.25);
        }

        @media (max-width: 820px) {
          .waitHero {
            padding: 26px 16px;
            align-items: flex-start;
          }

          .mockupNavLink {
            top: 18px;
            right: 16px;
          }

          .brandMark {
            margin-bottom: 24px;
          }

          .waitLeft h1 {
            font-size: clamp(2.8rem, 15vw, 4.8rem);
          }

          .heroCopy {
            font-size: 16px;
          }

          .phoneStage {
            height: auto;
            min-height: 630px;
            display: block;
            padding-left: 0;
          }

          .phoneSceneLeft {
            margin-left: 26px;
          }

          .phoneSceneRight {
            position: absolute;
            right: 20px;
            top: 230px;
            scale: 0.82;
          }

          .badgeAccepted {
            right: -38px;
          }

          .badgeOrder,
          .badgePayment {
            left: -30px;
          }

          .waitCard {
            padding: 20px;
            border-radius: 22px;
          }

          .audienceGrid,
          .twoFields {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .trustLine {
            display: grid;
          }

          .waitlistNumberStrip {
            grid-template-columns: 1fr;
          }

          .phoneStage {
            min-height: 520px;
            overflow: hidden;
          }

          .phoneSceneLeft {
            scale: 0.8;
            transform-origin: left top;
            margin-left: 0;
          }

          .phoneSceneRight {
            top: 190px;
            right: -38px;
            scale: 0.66;
          }

          .floatBadge {
            scale: 0.92;
          }
        }
      `}</style>
    </main>
  )
}
