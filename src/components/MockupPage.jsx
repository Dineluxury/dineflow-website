'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home, ListChecks } from 'lucide-react'

const TOTAL_MOCKUPS = 19
const SUPABASE_MOCKUP_BASE_URL =
  'https://owakfjouzvhbtlsygmfw.supabase.co/storage/v1/object/public/images/mockups'

export default function MockupPage() {
  const images = useMemo(
    () => Array.from({ length: TOTAL_MOCKUPS }, (_, index) => ({
      number: index + 1,
      src: `${SUPABASE_MOCKUP_BASE_URL}/pic${index + 1}.jpg`,
      label: `Mockup ${index + 1}`,
    })),
    []
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const current = images[currentIndex]

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length)
  }

  const goPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  }

  return (
    <main className="mockupPage">
      <div className="mockupGlow glowOne" />
      <div className="mockupGlow glowTwo" />

      <header className="mockupTopbar">
        <a className="brandLink" href="/">
          <span>D</span>
          <b>Dineflow</b>
        </a>

        <nav>
          <a href="/"><Home size={16} /> Website</a>
          <a href="/waitlist"><ListChecks size={16} /> Waitlist</a>
        </nav>
      </header>

      <section className="mockupShell">
        <div className="mockupIntro">
          <span>App Screens</span>
          <h1>Mockup gallery</h1>
          <p>View each Dineflow screen clearly. Use the arrows to move one picture at a time from pic1 to pic19.</p>
        </div>

        <div className="viewerWrap">
          <button className="sideArrow leftArrow" onClick={goPrevious} type="button" aria-label="Previous mockup">
            <ChevronLeft size={30} />
          </button>

          <div className="viewerCard">
            <div className="viewerMeta">
              <div>
                <span>Picture {current.number} of {images.length}</span>
                <strong>{current.label}</strong>
              </div>
              <div className="counterPill">{String(current.number).padStart(2, '0')}</div>
            </div>

            <div className="imageStage">
              <img src={current.src} alt={current.label} />
            </div>

            <div className="mobileControls">
              <button onClick={goPrevious} type="button"><ArrowLeft size={18} /> Previous</button>
              <button onClick={goNext} type="button">Next <ArrowRight size={18} /></button>
            </div>
          </div>

          <button className="sideArrow rightArrow" onClick={goNext} type="button" aria-label="Next mockup">
            <ChevronRight size={30} />
          </button>
        </div>

        <div className="thumbnailRail" aria-label="Mockup thumbnails">
          {images.map((image, index) => (
            <button
              className={index === currentIndex ? 'thumbButton activeThumb' : 'thumbButton'}
              key={image.src}
              onClick={() => setCurrentIndex(index)}
              type="button"
              aria-label={`Open ${image.label}`}
            >
              <img src={image.src} alt="" />
              <span>{image.number}</span>
            </button>
          ))}
        </div>
      </section>

      <style>{`
        .mockupPage {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 0%, rgba(249,115,22,0.12), transparent 32%),
            linear-gradient(180deg, #ffffff 0%, #fff7ed 100%);
          color: #111827;
          padding: 24px;
        }

        .mockupGlow {
          position: fixed;
          border-radius: 999px;
          background: rgba(249,115,22,0.16);
          filter: blur(80px);
          pointer-events: none;
        }

        .glowOne {
          width: 360px;
          height: 360px;
          top: -100px;
          right: -80px;
        }

        .glowTwo {
          width: 300px;
          height: 300px;
          bottom: -120px;
          left: -70px;
          opacity: 0.7;
        }

        .mockupTopbar {
          position: relative;
          z-index: 3;
          width: min(1180px, 100%);
          margin: 0 auto 22px;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brandLink,
        .mockupTopbar nav a {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .brandLink {
          gap: 10px;
          color: #111827;
          font-weight: 900;
          font-size: 18px;
        }

        .brandLink span {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #f97316;
          box-shadow: 0 14px 28px rgba(249,115,22,0.25);
        }

        .mockupTopbar nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .mockupTopbar nav a {
          gap: 7px;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 10px 14px;
          color: #4b5563;
          background: rgba(255,255,255,0.78);
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 10px 28px rgba(17,24,39,0.05);
          transition: all 0.2s ease;
        }

        .mockupTopbar nav a:hover {
          color: #f97316;
          border-color: rgba(249,115,22,0.35);
          transform: translateY(-1px);
        }

        .mockupShell {
          position: relative;
          z-index: 2;
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .mockupIntro {
          text-align: center;
          margin-bottom: 22px;
        }

        .mockupIntro span {
          color: #f97316;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .mockupIntro h1 {
          margin: 8px 0 8px;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
          font-weight: 900;
        }

        .mockupIntro p {
          max-width: 560px;
          margin: 0 auto;
          color: #6b7280;
          line-height: 1.65;
          font-size: 15px;
        }

        .viewerWrap {
          position: relative;
          display: grid;
          grid-template-columns: 76px minmax(0, 1fr) 76px;
          align-items: center;
          gap: 16px;
        }

        .viewerCard {
          overflow: hidden;
          border: 1px solid rgba(229,231,235,0.9);
          border-radius: 30px;
          background: rgba(255,255,255,0.84);
          box-shadow: 0 30px 80px rgba(17,24,39,0.13);
          backdrop-filter: blur(18px);
          padding: 18px;
        }

        .viewerMeta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 4px 4px 16px;
        }

        .viewerMeta span,
        .viewerMeta strong {
          display: block;
        }

        .viewerMeta span {
          color: #f97316;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .viewerMeta strong {
          color: #111827;
          font-size: 22px;
          margin-top: 3px;
        }

        .counterPill {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: #111827;
          color: #fff;
          font-weight: 900;
          box-shadow: 0 16px 30px rgba(17,24,39,0.18);
        }

        .imageStage {
          min-height: 64vh;
          max-height: 72vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 24px;
          background:
            linear-gradient(45deg, rgba(17,24,39,0.04) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(17,24,39,0.04) 25%, transparent 25%),
            #0f1115;
          background-size: 28px 28px;
        }

        .imageStage img {
          max-width: 100%;
          max-height: 72vh;
          width: auto;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 26px 70px rgba(0,0,0,0.38);
        }

        .sideArrow {
          width: 62px;
          height: 62px;
          border: 0;
          border-radius: 22px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 18px 36px rgba(249,115,22,0.28);
          transition: all 0.2s ease;
        }

        .sideArrow:hover {
          background: #ea6c0a;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 24px 46px rgba(249,115,22,0.36);
        }

        .mobileControls {
          display: none;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
        }

        .mobileControls button {
          min-height: 46px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background: #fff;
          color: #111827;
          font: inherit;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .thumbnailRail {
          display: grid;
          grid-template-columns: repeat(19, minmax(54px, 1fr));
          gap: 8px;
          margin-top: 16px;
          overflow-x: auto;
          padding: 4px 2px 12px;
        }

        .thumbButton {
          position: relative;
          min-width: 54px;
          height: 74px;
          overflow: hidden;
          border: 2px solid transparent;
          border-radius: 14px;
          background: #fff;
          cursor: pointer;
          padding: 0;
          opacity: 0.7;
          transition: all 0.2s ease;
          box-shadow: 0 8px 20px rgba(17,24,39,0.08);
        }

        .thumbButton img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .thumbButton span {
          position: absolute;
          left: 6px;
          bottom: 6px;
          min-width: 22px;
          height: 22px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          color: #fff;
          background: rgba(17,24,39,0.82);
          font-size: 11px;
          font-weight: 900;
        }

        .thumbButton:hover,
        .activeThumb {
          opacity: 1;
          border-color: #f97316;
          transform: translateY(-2px);
        }

        .activeThumb span {
          background: #f97316;
        }

        @media (max-width: 860px) {
          .mockupPage {
            padding: 18px 14px;
          }

          .mockupTopbar {
            align-items: flex-start;
          }

          .viewerWrap {
            grid-template-columns: 1fr;
          }

          .sideArrow {
            display: none;
          }

          .viewerCard {
            padding: 12px;
            border-radius: 24px;
          }

          .viewerMeta {
            padding: 4px 4px 12px;
          }

          .viewerMeta strong {
            font-size: 18px;
          }

          .imageStage {
            min-height: 58vh;
            max-height: 66vh;
            border-radius: 18px;
          }

          .imageStage img {
            max-height: 66vh;
          }

          .mobileControls {
            display: grid;
          }

          .thumbnailRail {
            grid-template-columns: repeat(19, 58px);
          }
        }

        @media (max-width: 520px) {
          .mockupTopbar {
            display: grid;
          }

          .mockupTopbar nav {
            justify-content: flex-start;
          }

          .mockupIntro {
            text-align: left;
          }

          .mockupIntro p {
            margin-left: 0;
          }

          .counterPill {
            width: 44px;
            height: 44px;
            border-radius: 14px;
          }
        }
      `}</style>
    </main>
  )
}
