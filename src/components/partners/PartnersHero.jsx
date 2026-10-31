import Link from 'next/link'
import { ArrowRight, LogIn } from 'lucide-react'

export default function PartnersHero() {
  return (
    <section className="partner-hero">
      <nav className="partner-nav" aria-label="Partner program navigation">
        <Link className="partner-brand" href="/">
          <img className="partner-brand-mark" src="/dineflow-logo.png" alt="" />
          <span>Dineflow <span style={{ color: '#89939c', fontWeight: 500 }}>Partners</span></span>
        </Link>
        <div className="partner-nav-links">
          <a href="#programs">Programs</a>
          <a href="#earnings">Earnings</a>
          <a href="#faq">Questions</a>
          <Link className="partner-nav-cta" href="/partners/login"><LogIn size={15} /> Partner sign in</Link>
        </div>
      </nav>

      <div className="partner-hero-inner">
        <div>
          <span className="partner-eyebrow">Dineflow partner program · Ethiopia</span>
          <h1>Help local food businesses grow. <em>Earn for the impact.</em></h1>
          <p className="partner-hero-copy">Connect restaurants with more customers or share the food you love with your audience. Choose the program that fits the way you work.</p>
          <div className="partner-hero-actions">
            <Link className="partner-button partner-button-primary" href="#programs">Explore the programs <ArrowRight size={16} /></Link>
            <Link className="partner-button partner-button-secondary" href="/partners/login">I’m already a partner</Link>
          </div>
          <p className="partner-hero-note">Clear referral tracking · Local payout options · Support from the Dineflow team</p>
        </div>

        <aside className="partner-hero-panel" aria-label="How the partner program works">
          <div className="partner-hero-panel-head"><strong>A straightforward way to partner</strong><span>HOW IT WORKS</span></div>
          {[
            ['01', 'Choose your program', 'Apply as a student ambassador or content creator.'],
            ['02', 'Get reviewed', 'Our team checks your details and sets up your partner account.'],
            ['03', 'Share and earn', 'Bring a restaurant or customer through your tracked referral.'],
          ].map(([step, title, detail]) => (
            <div className="partner-step" key={step}>
              <span className="partner-step-index">{step}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
            </div>
          ))}
          <div className="partner-panel-rule">You’ll see the program terms and review expectations before submitting an application.</div>
        </aside>
      </div>
    </section>
  )
}
