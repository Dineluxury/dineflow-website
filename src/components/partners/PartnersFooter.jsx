import Link from 'next/link'

export default function PartnersFooter() {
  return (
    <footer className="partner-footer">
      <div className="partner-brand" style={{ justifyContent: 'center', marginBottom: 10 }}>
        <img className="partner-brand-mark" src="/dineflow-logo.png" alt="" /><span>Dineflow Partners</span>
      </div>
      <p style={{ color: '#65717e', fontSize: 13, margin: '0 0 14px' }}>Questions? Contact <a href="mailto:support@dineflow.et">support@dineflow.et</a></p>
      <Link className="partner-footer-back" href="/">← Back to Dineflow</Link>
    </footer>
  )
}
