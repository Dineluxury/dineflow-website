'use client'

import { useEffect, useState } from 'react'
import { Bell, CheckCircle2, ChefHat, CreditCard, Smartphone, Star, Utensils, Zap } from 'lucide-react'

const trustItems = [
  { icon: Smartphone, label: 'Android & iOS Soon' },
  { icon: CreditCard, label: 'Local payment options' },
  { icon: Zap, label: 'Real-time Track' },
  { icon: Star, label: '4.9 Rating' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="homeHero">
      <div className="homeHeroGrid" />
      <div className={mounted ? 'homeGlow homeGlowOne pulseGlow' : 'homeGlow homeGlowOne'} />
      <div className="homeGlow homeGlowTwo" />

      <div className="homeHeroInner">
        <div className="hero-grid homeHeroGridLayout">
          <div className="homeCopy">
            <div className="homeLiveBadge">
              <span className="liveDotWrap">
                <span className="liveDot" />
                <span className="livePing" />
              </span>
              <span>Ethiopia's #1 Pre-Order Food App</span>
            </div>

            <h1>
              Order Food<br />
              <span>Before</span>
              <br />You Arrive.
            </h1>

            <p>
              Skip the wait. Pre-order from your favorite restaurants, hotels, and cafes, pay with local options like <strong>Telebirr, M-Pesa, or bank payments</strong>, and walk in to your meal already on the table.
            </p>

            <div className="homeCtas">
              <a className="primaryCta" href="/waitlist">Join App Waitlist</a>
              <a className="secondaryCta" href="#restaurants">For Restaurants, Hotels & Cafes -&gt;</a>
            </div>

            <div className="homeTrustItems">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label}>
                  <Icon size={14} color="#e96b22" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="homePhoneColumn">
            <div className={mounted ? 'homePhoneScene' : 'homePhoneScene pausedPhone'}>
              <div className="homePhoneGlow" />
              <div className="homePhoneFrame">
                <div className="homePhoneButton homePhoneActionButton" />
                <div className="homePhoneButton homePhoneVolumeUp" />
                <div className="homePhoneButton homePhoneVolumeDown" />
                <div className="homePhoneButton homePhonePower" />
                <div className="homePhoneScreen">
                  <img
                    className="homePhoneAppScreenshot"
                    src="/dineflow-app-home.png"
                    alt="Dineflow app home screen showing nearby restaurants"
                  />
                </div>
              </div>

              <div className="homeFloatBadge homeBadgeAccepted">
                <div className="homeBadgeIcon homeSuccessIcon"><CheckCircle2 size={18} /></div>
                <div>
                  <strong>Order Accepted!</strong>
                  <span>Ready in 12 min</span>
                </div>
              </div>

              <div className="homeFloatBadge homeBadgeOrder">
                <div className="homeBadgeIcon homeOrangeIcon"><Bell size={17} /></div>
                <div>
                  <strong>New Order!</strong>
                  <span>ETB 650</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .homeHero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #ffffff;
          padding-top: 68px;
        }

        .homeHeroGrid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 24, 39, 0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.56) 72%, transparent 96%);
          pointer-events: none;
        }

        .homeGlow {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
        }

        .homeGlowOne {
          top: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(233,107,34,0.07) 0%, transparent 70%);
          filter: blur(80px);
        }

        .homeGlowTwo {
          bottom: -5%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(233,107,34,0.04) 0%, transparent 70%);
          filter: blur(100px);
        }

        .pulseGlow {
          animation: glow-pulse 8s ease-in-out infinite;
        }

        .homeHeroInner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }

        .homeHeroGridLayout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .homeLiveBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(233,107,34,0.08);
          border: 1px solid rgba(233,107,34,0.2);
          margin-bottom: 2rem;
        }

        .homeLiveBadge > span:last-child {
          font-size: 13px;
          font-weight: 600;
          color: #e96b22;
        }

        .liveDotWrap {
          position: relative;
          display: inline-flex;
        }

        .liveDot,
        .livePing {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          display: block;
        }

        .livePing {
          position: absolute;
          inset: 0;
          animation: ping-green 1.5s ease-out infinite;
        }

        .homeCopy h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #18212b;
          margin: 0 0 1.5rem;
        }

        .homeCopy h1 span {
          background-image: linear-gradient(135deg, #e96b22, #c95a19);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .homeCopy p {
          font-size: 17px;
          color: #6b7280;
          line-height: 1.8;
          max-width: 460px;
          margin: 0 0 2.5rem;
        }

        .homeCopy p strong {
          color: #e96b22;
          font-weight: 600;
        }

        .homeCtas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .homeCtas a {
          padding: 14px 28px;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .primaryCta {
          background: #e96b22;
          color: #fff;
          box-shadow: 0 6px 20px rgba(233,107,34,0.35);
        }

        .primaryCta:hover {
          background: #c95a19;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(65,45,34,0.18);
        }

        .secondaryCta {
          border: 1.5px solid #e5e7eb;
          color: #374151;
          background: #fff;
        }

        .secondaryCta:hover {
          border-color: #e96b22;
          color: #e96b22;
          background: rgba(233,107,34,0.04);
        }

        .homeTrustItems {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .homeTrustItems div {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .homePhoneColumn {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 750px;
          padding-top: 2rem;
        }

        .homePhoneScene {
          position: relative;
          animation: homeWaitFloat 5.8s ease-in-out infinite;
        }

        .pausedPhone {
          animation: none;
        }

        .homePhoneGlow {
          position: absolute;
          inset: -34px;
          border-radius: 999px;
          background: rgba(184, 95, 56, 0.18);
          filter: blur(58px);
        }

        .homePhoneFrame {
          position: relative;
          width: 350px;
          height: 730px;
          padding: 8px;
          background: linear-gradient(90deg, #77787b 0%, #c4c5c7 1.3%, #f2f2f3 2.8%, #a3a4a7 4.4%, #e8e8e9 5.4%, #fbfbfc 50%, #dbdbdd 94.6%, #929396 96.2%, #d9d9db 98.4%, #6f7073 100%);
          border: 1px solid #8f9093;
          border-radius: 56px;
          transform: perspective(1400px) rotateY(-7deg) rotateX(1deg);
          box-shadow: 24px 32px 74px rgba(17,24,39,0.28), 0 0 44px rgba(233,107,34,0.18), inset 0 0 0 1px rgba(255,255,255,.82), inset 0 0 0 2px rgba(72,73,76,.65);
        }

        .homePhoneFrame::before {
          content: '';
          position: absolute;
          z-index: 1;
          inset: 2px;
          border: 1px solid rgba(255,255,255,.74);
          border-radius: 53px;
          pointer-events: none;
        }

        .homePhoneButton {
          position: absolute;
          z-index: -1;
          width: 3px;
          background: linear-gradient(90deg, #747579, #f5f5f6 48%, #8e8f92);
          border: 1px solid #898a8d;
          box-shadow: 0 1px 2px rgba(0,0,0,.24);
        }

        .homePhoneActionButton {
          left: -4px;
          top: 113px;
          height: 28px;
          border-radius: 3px 0 0 3px;
        }

        .homePhoneVolumeUp {
          left: -4px;
          top: 163px;
          height: 42px;
          border-radius: 3px 0 0 3px;
        }

        .homePhoneVolumeDown {
          left: -4px;
          top: 216px;
          height: 42px;
          border-radius: 3px 0 0 3px;
        }

        .homePhonePower {
          right: -4px;
          top: 176px;
          height: 66px;
          border-radius: 0 3px 3px 0;
        }

        .homePhoneScreen {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 46px;
          background: #f7f8fa;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
        }

        .homePhoneAppScreenshot {
          display: block;
          width: auto;
          height: 100%;
          max-width: 100%;
          object-fit: contain;
          object-position: center;
        }

        .homePhoneIsland {
          position: absolute;
          top: 7px;
          left: 50%;
          z-index: 4;
          width: 102px;
          height: 27px;
          transform: translateX(-50%);
          background: #000;
          border-radius: 18px;
          box-shadow: inset 0 1px 1px rgba(255,255,255,.08);
        }

        .homePhoneIsland span {
          position: absolute;
          width: 7px;
          height: 7px;
          right: 13px;
          top: 10px;
          border-radius: 50%;
          background: #111521;
          box-shadow: inset 0 0 3px #29404c;
        }

        .homePhoneStatus {
          height: 53px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          padding: 0 23px 9px;
          position: relative;
          z-index: 3;
        }

        .homeStatusIcons {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .homeStatusIcons i {
          display: block;
          width: 4px;
          height: 6px;
          border-radius: 1px;
          background: #fff;
        }

        .homeStatusIcons i:last-child {
          width: 13px;
          height: 7px;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 2px;
          background: linear-gradient(90deg, #fff 70%, transparent 70%);
        }

        .homePhoneHomeIndicator {
          position: absolute;
          z-index: 6;
          bottom: 7px;
          left: 50%;
          width: 92px;
          height: 4px;
          border-radius: 99px;
          background: rgba(255,255,255,.9);
          transform: translateX(-50%);
          pointer-events: none;
        }

        .homePhoneContent {
          padding: 0 18px;
          padding-bottom: 18px;
        }

        .homePhoneTopRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .homePhoneTopRow p {
          color: #9ca3af;
          font-size: 12px;
          margin: 0 0 3px;
        }

        .homePhoneTopRow h3 {
          color: #ffffff;
          margin: 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .homeAvatarBubble {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #e96b22;
          color: #fff;
          font-size: 15px;
          font-weight: 900;
        }

        .homeSearchBar {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 42px;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          color: #6b7280;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: none;
          padding: 0 13px;
          margin-bottom: 13px;
          font-size: 12px;
        }

        .homeChipRow {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }

        .homeChip {
          border-radius: 999px;
          background: rgba(255,255,255,0.09);
          color: #9ca3af;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 6px 13px;
          font-size: 11px;
          font-weight: 800;
        }

        .homeActiveChip {
          color: #fff;
          background: #e96b22;
        }

        .homeRestaurantCard {
          overflow: hidden;
          margin-bottom: 12px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 26px rgba(0,0,0,0.18);
        }

        .homeFoodPreview {
          height: 108px;
          display: grid;
          place-items: center;
          color: #c98763;
          background: linear-gradient(135deg, rgba(233,107,34,0.12), rgba(96,48,24,0.24));
        }

        .homeRestaurantInfo {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 13px;
        }

        .homeRestaurantInfo strong,
        .homeRestaurantInfo span,
        .homeRatingBox b,
        .homeRatingBox span {
          display: block;
        }

        .homeRestaurantInfo strong {
          color: #ffffff;
          font-size: 12px;
        }

        .homeRestaurantInfo span,
        .homeRatingBox span {
          color: #9ca3af;
          font-size: 11px;
          margin-top: 2px;
        }

        .homeRestaurantInfo > div:first-child span {
          color: #e96b22;
        }

        .homeRatingBox {
          text-align: right;
        }

        .homeRatingBox b {
          color: #cfb078;
          font-size: 11px;
        }

        .homeFloatBadge {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 150px;
          border-radius: 16px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(24,33,43,0.08);
          box-shadow: 0 18px 44px rgba(17,24,39,0.18), 0 2px 8px rgba(17,24,39,0.06);
          animation: homeWaitFloatBadge 5.4s ease-in-out infinite;
        }

        .homeFloatBadge strong,
        .homeFloatBadge span {
          display: block;
        }

        .homeFloatBadge strong {
          color: #18212b;
          font-size: 11px;
        }

        .homeFloatBadge span {
          color: #6b7280;
          font-size: 10px;
          margin-top: 2px;
        }

        .homeBadgeIcon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
        }

        .homeSuccessIcon {
          color: #16a05a;
          background: rgba(34,197,94,0.12);
        }

        .homeOrangeIcon {
          color: #e96b22;
          background: rgba(233,107,34,0.12);
        }

        .homeBadgeAccepted {
          right: -78px;
          top: 78px;
        }

        .homeBadgeOrder {
          left: -76px;
          bottom: 128px;
          animation-delay: 0.7s;
        }

        .homeBadgeOrder span {
          color: #e96b22;
          font-weight: 800;
        }

        @keyframes homeWaitFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -16px; }
        }

        @keyframes homeWaitFloatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @media (max-width: 768px) {
          .homeHeroGridLayout {
            grid-template-columns: 1fr !important;
          }

          .homePhoneColumn {
            min-height: 700px;
            padding-top: 0;
          }

          .homePhoneScene {
            scale: 0.9;
          }

          .homeBadgeAccepted {
            right: -46px;
          }

          .homeBadgeOrder {
            left: -44px;
          }
        }

        @media (max-width: 440px) {
          .homePhoneColumn {
            min-height: 650px;
          }

          .homePhoneScene {
            scale: 0.84;
          }

          .homePhoneFrame {
            transform: perspective(1400px) rotateY(-3deg) rotateX(0.5deg);
          }
        }
      `}</style>
    </section>
  )
}


