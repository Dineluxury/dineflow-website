import Link from 'next/link'

export default function PartnerSignupShell({ title, description, signupPath, children }) {
  return (
    <main className="partner-signup-page">
      <header className="partner-page-header">
        <Link className="partner-back-button" href="/partners">← Back to partner program</Link>
        <Link href="/partners/login">Already a partner? Sign in</Link>
      </header>
      <div className="partner-signup-intro">
        <span className="partner-eyebrow">Partner application</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="partner-signup-content">
        {children}
      </div>
      <div className="partner-signup-footer">
        Applying for another program? <Link href={signupPath}>Return to the partner program</Link>
      </div>
    </main>
  )
}
