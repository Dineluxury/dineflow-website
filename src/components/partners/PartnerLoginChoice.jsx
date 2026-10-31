import Link from 'next/link'
import { ArrowRight, Clapperboard, GraduationCap } from 'lucide-react'

const partnerTypes = [
  { title: 'Student Ambassador', description: 'Manage restaurant referrals and review your ambassador account.', href: '/partners/login/ambassador', icon: GraduationCap },
  { title: 'Content Creator', description: 'Manage tracked food links and review your creator account.', href: '/partners/login/creator', icon: Clapperboard },
]

export default function PartnerLoginChoice() {
  return (
    <main className="partner-auth">
      <div className="partner-auth-choice">
        <Link className="partner-back-button" href="/partners">← Back to partner program</Link>
        <header className="partner-section-heading">
          <span className="partner-eyebrow">Partner access</span>
          <h1>Choose your account</h1>
          <p>Select the program you joined to continue to its sign-in page.</p>
        </header>
        <div className="partner-program-grid">
          {partnerTypes.map(({ icon: Icon, ...partner }) => (
            <Link className="partner-login-option" key={partner.href} href={partner.href}>
              <span className="partner-program-icon"><Icon size={21} /></span>
              <h2>{partner.title}</h2>
              <p>{partner.description}</p>
              <strong>Continue to sign in <ArrowRight size={15} /></strong>
            </Link>
          ))}
        </div>
        <p className="partner-choice-footnote">New to Dineflow Partners? <Link href="/partners#programs">Explore the programs</Link></p>
      </div>
    </main>
  )
}
