'use client'

import { useEffect, useState } from 'react'
import { Bell, CheckCircle2, ChefHat, CreditCard, Smartphone, Star, Utensils, Zap } from 'lucide-react'

const trustItems = [
  { icon: Smartphone, label: 'Android & iOS Soon' },
  { icon: CreditCard, label: 'Chapa Pay' },
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
              Skip the wait. Pre-order from your favorite restaurants, hotels, and cafes, pay with <strong>Chapa</strong>, and walk in to your meal already on the table.
            </p>

            <div className="homeCtas">
              <a className="primaryCta" href="/waitlist">Join App Waitlist</a>
              <a className="secondaryCta" href="#restaurants">For Restaurants, Hotels & Cafes -&gt;</a>
            </div>

            <div className="homeTrustItems">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label}>
                  <Icon size={14} color="#f97316" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="homePhoneColumn">
            <div className={mounted ? 'homePhoneScene' : 'homePhoneScene pausedPhone'}>
              <div className="homePhoneGlow" />
              <div className="homePhoneFrame">
                <div className="homePhoneNotch" />
                <div className="homePhoneStatus">
                  <span>9:41</span>
                  <span className="homeStatusDots">...</span>
                </div>

                <div className="homePhoneContent">
                  <div className="homePhoneTopRow">
                    <div>
                      <p>Good morning</p>
                      <h3>What are you craving?</h3>
                    </div>
                    <div className="homeAvatarBubble">A</div>
                  </div>

                  <div className="homeSearchBar">
                    <Smartphone size={13} />
                    <span>Search restaurants, hotels, cafes...</span>
                  </div>

                  <div className="homeChipRow">
                    {['All', 'Halal', 'Grill', 'Fast'].map((item, index) => (
                      <span className={index === 0 ? 'homeChip homeActiveChip' : 'homeChip'} key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  {[
                    { name: 'Injohi Restaurant', type: 'Traditional', rating: '4.9', distance: '0.3km', icon: Utensils },
                    { name: 'Burqito Hotel Cafe', type: 'Hotel - Cafe', rating: '4.7', distance: '0.8km', icon: ChefHat },
                  ].map(({ icon: Icon, ...restaurant }) => (
                    <div className="homeRestaurantCard" key={restaurant.name}>
                      <div className="homeFoodPreview">
                        <Icon size={36} />
                      </div>
                      <div className="homeRestaurantInfo">
                        <div>
                          <strong>{restaurant.name}</strong>
                          <span>{restaurant.type}</span>
                        </div>
                        <div className="homeRatingBox">
                          <b>* {restaurant.rating}</b>
                          <span>{restaurant.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
          background: radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%);
          filter: blur(80px);
        }

        .homeGlowTwo {
          bottom: -5%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%);
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
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.2);
          margin-bottom: 2rem;
        }

        .homeLiveBadge > span:last-child {
          font-size: 13px;
          font-weight: 600;
          color: #f97316;
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
          color: #111827;
          margin: 0 0 1.5rem;
        }

        .homeCopy h1 span {
          background-image: linear-gradient(135deg, #f97316, #ea6c0a);
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
          color: #f97316;
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
          background: #f97316;
          color: #fff;
          box-shadow: 0 6px 20px rgba(249,115,22,0.35);
        }

        .primaryCta:hover {
          background: #ea6c0a;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(249,115,22,0.45);
        }

        .secondaryCta {
          border: 1.5px solid #e5e7eb;
          color: #374151;
          background: #fff;
        }

        .secondaryCta:hover {
          border-color: #f97316;
          color: #f97316;
          background: rgba(249,115,22,0.04);
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
          min-height: 620px;
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
          background: rgba(249, 115, 22, 0.18);
          filter: blur(58px);
        }

        .homePhoneFrame {
          position: relative;
          width: 294px;
          height: 584px;
          background: linear-gradient(145deg, #171717, #0b0b0b);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          overflow: hidden;
          transform: perspective(1000px) rotateY(-8deg) rotateX(3deg);
          box-shadow: 24px 32px 74px rgba(17,24,39,0.28), 0 0 44px rgba(249,115,22,0.18);
        }

        .homePhoneNotch {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 4;
          width: 104px;
          height: 30px;
          transform: translateX(-50%);
          background: #000;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .homePhoneStatus {
          height: 54px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          padding: 0 24px 9px;
        }

        .homeStatusDots {
          letter-spacing: 3px;
        }

        .homePhoneContent {
          padding: 0 18px;
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
          background: #f97316;
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
          background: #f97316;
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
          color: #ff8a33;
          background: linear-gradient(135deg, rgba(249,115,22,0.18), rgba(96,48,24,0.36));
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
          color: #f97316;
        }

        .homeRatingBox {
          text-align: right;
        }

        .homeRatingBox b {
          color: #fbbf24;
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
          background: #1b1b1b;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 44px rgba(0,0,0,0.34);
          animation: homeWaitFloatBadge 5.4s ease-in-out infinite;
        }

        .homeFloatBadge strong,
        .homeFloatBadge span {
          display: block;
        }

        .homeFloatBadge strong {
          color: #ffffff;
          font-size: 11px;
        }

        .homeFloatBadge span {
          color: #9ca3af;
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
          color: #41dc7e;
          background: rgba(34,197,94,0.15);
        }

        .homeOrangeIcon {
          color: #fb923c;
          background: rgba(249,115,22,0.15);
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
          color: #f97316;
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
            min-height: 570px;
            padding-top: 0;
          }

          .homePhoneScene {
            scale: 0.86;
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
            min-height: 500px;
          }

          .homePhoneScene {
            scale: 0.76;
          }
        }
      `}</style>
    </section>
  )
}
