import Link from 'next/link'
import { ArrowRight, Clapperboard, GraduationCap } from 'lucide-react'

const programs = [
  {
    title: 'Student Ambassador',
    subtitle: 'For university students',
    icon: GraduationCap,
    what: 'Introduce restaurants and cafes near you to Dineflow, and help them get started.',
    earn: 'Receive 50% of Dineflow’s commission from each referred restaurant for its first three months.',
    example: 'Illustration: ETB 100,000 in monthly orders × 5% platform commission × 50% partner share = ETB 2,500 for that month.',
    href: '/partners/signup/ambassador',
    cta: 'Apply as an ambassador',
  },
  {
    title: 'Content Creator',
    subtitle: 'For social creators and food reviewers',
    icon: Clapperboard,
    what: 'Create food or restaurant content, then share a tracked Dineflow link with your audience.',
    earn: 'Earn ETB 3 for each completed, paid order attributed to your link.',
    example: 'Illustration: 500 completed, paid orders × ETB 3 = ETB 1,500. Views and clicks alone do not generate commission.',
    href: '/partners/signup/creator',
    cta: 'Apply as a creator',
  },
]

export default function PartnerChoices() {
  return (
    <section id="programs" className="partner-section">
      <div className="partner-section-inner">
        <header className="partner-section-heading">
          <span className="partner-eyebrow">Two ways to work together</span>
          <h2>Choose the program that fits you.</h2>
          <p>Both programs reward real outcomes. Review the responsibilities and earnings model, then apply for the path that suits you.</p>
        </header>
        <div className="partner-program-grid">
          {programs.map(({ icon: Icon, ...program }) => (
            <article className="partner-program-card" key={program.title}>
              <div className="partner-program-icon"><Icon size={21} strokeWidth={1.8} /></div>
              <h3>{program.title}</h3>
              <p className="partner-program-subtitle">{program.subtitle}</p>
              <p className="partner-program-detail"><b>Your role</b>{program.what}</p>
              <p className="partner-program-detail"><b>How earnings work</b>{program.earn}</p>
              <p className="partner-program-example"><strong>Example calculation</strong>{program.example}</p>
              <Link className="partner-button partner-button-primary" href={program.href}>{program.cta}<ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
