'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = {
  ambassador: [
    { q: 'Do I need experience to apply?', a: 'No prior experience is required. Ambassadors receive a guide for introducing Dineflow to local restaurants.' },
    { q: 'When do ambassador earnings begin?', a: 'Earnings begin when a referred restaurant is approved and receives eligible orders, according to the partner terms.' },
    { q: 'How are ambassadors paid?', a: 'The program currently lists monthly payout by Telebirr or bank transfer, with a minimum payout request of ETB 200.' },
    { q: 'How long can I earn from a restaurant?', a: 'The stated earning period is three months per referred restaurant. Each new referral has its own period.' },
  ],
  creator: [
    { q: 'Is there a minimum follower count?', a: 'There is no stated minimum. Applications are reviewed based on the creator profile and audience fit.' },
    { q: 'How are creator orders attributed?', a: 'Use a unique food or restaurant link from the creator dashboard. The program states that the link tracks for 30 days.' },
    { q: 'Do clicks or views earn commission?', a: 'No. The stated commission is ETB 3 per completed, paid order attributed to your link.' },
    { q: 'How are creators paid?', a: 'The program currently lists monthly payout by Telebirr or bank transfer, with a minimum withdrawal of ETB 100.' },
  ],
}

export default function PartnersFAQ() {
  const [tab, setTab] = useState('ambassador')
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="partner-section partner-faq">
      <div className="partner-section-inner" style={{ maxWidth: 820 }}>
        <header className="partner-section-heading">
          <span className="partner-eyebrow">Helpful details</span>
          <h2>Questions before you apply?</h2>
          <p>Review the current program guidance. Final eligibility and payment terms should be confirmed in your partner agreement.</p>
        </header>
        <div className="partner-faq-tabs" role="tablist" aria-label="Choose program questions">
          {[['ambassador', 'Student Ambassador'], ['creator', 'Content Creator']].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'partner-faq-tab active' : 'partner-faq-tab'} onClick={() => { setTab(id); setOpen(null) }}>{label}</button>
          ))}
        </div>
        <div className="partner-faq-list">
          {faqs[tab].map((faq, index) => {
            const expanded = open === index
            const answerId = `partner-faq-${tab}-${index}`
            return (
              <article className="partner-faq-item" key={faq.q}>
                <h3><button type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setOpen(expanded ? null : index)}>{faq.q}<ChevronDown size={18} aria-hidden="true" /></button></h3>
                {expanded && <p id={answerId}>{faq.a}</p>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
