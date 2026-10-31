'use client'

import Link from 'next/link'

const sections = [
  { id: 'who-we-are', title: '1. Who We Are' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Information' },
  { id: 'legal-grounds', title: '4. Legal Grounds & Choices' },
  { id: 'when-we-share', title: '5. When We Share Information' },
  { id: 'payments', title: '6. Payments & Third Parties' },
  { id: 'cookies', title: '7. Cookies & Similar Tools' },
  { id: 'retention', title: '8. Retention' },
  { id: 'security', title: '9. Security & Incidents' },
  { id: 'your-rights', title: '10. Your Rights' },
  { id: 'children', title: '11. Children & Age-Restricted Products' },
  { id: 'international', title: '12. International Processing' },
  { id: 'changes', title: '13. Changes to This Policy' },
  { id: 'contact', title: '14. Contact Us' },
]

export default function PrivacyContent() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111827', fontFamily: 'inherit' }}>

      {/* Top nav strip */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/dineflow-logo.png" alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '17px', color: '#111827' }}>Dineflow</span>
          </Link>
          <Link href="/" className="back-btn">← Back to Home</Link>
        </div>
      </header>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(to bottom, #fafafa, #fff)',
        borderBottom: '1px solid #f0f0f0',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block', padding: '5px 14px', borderRadius: '999px',
          background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
          color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '1.25rem',
        }}>Legal</span>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, letterSpacing: '-0.02em',
          color: '#111827', margin: '0 0 1rem',
        }}>Privacy Policy</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', color: '#6b7280', fontSize: '13px' }}>
          <span>Effective date: September 2026</span>
          <span style={{ color: '#d1d5db' }}>·</span>
          <span>Version 1.0</span>
          <span style={{ color: '#d1d5db' }}>·</span>
          <span>Future Labs Software Technologies PLC</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 6rem' }} className="privacy-layout">

        {/* Sidebar TOC */}
        <aside className="privacy-toc" style={{ position: 'sticky', top: '84px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af', marginBottom: '12px' }}>
            Contents
          </p>
          <nav>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="toc-link">
                {s.title}
              </a>
            ))}
          </nav>

          <div style={{ marginTop: '2rem', padding: '16px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px', lineHeight: 1.5 }}>
              Questions about your data?
            </p>
            <a href="mailto:support@dineflow.et" style={{ color: '#f97316', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
              support@dineflow.et
            </a>
          </div>
        </aside>

        {/* Content */}
        <article>
          <div style={{
            background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)',
            borderRadius: '12px', padding: '16px 20px', marginBottom: '3rem',
            fontSize: '13px', color: '#6b7280', lineHeight: 1.65,
          }}>
            This policy is written for customers, restaurant users, and other people who interact with Dineflow.
            It should be read together with the Dineflow Terms of Use, Restaurant Partnership & Platform Services
            Agreement, and payment-provider terms.
          </div>

          <Section id="who-we-are" title="1. Who We Are">
            <p>
              Dineflow is a restaurant ordering and management platform operated by <strong>Future Labs Software Technologies
              PLC</strong> ("Dineflow", "we", "us", or "our"), Addis Ababa, Ethiopia. Dineflow provides software that
              helps customers browse menus and place orders, and helps restaurants receive and manage those orders.
            </p>
            <p>
              Restaurants remain responsible for preparing, selling, packaging and, where applicable, delivering food and
              beverages. Dineflow is not the seller or preparer of those products.
            </p>
            <p>
              For most information collected through the customer-facing services, Dineflow decides why and how the
              information is used. A restaurant may separately handle information it receives to fulfil an order, and its own
              privacy practices may also apply. Payment services may be provided by third-party payment providers,
              including LakiPay, under their own terms and privacy notices.
            </p>
          </Section>

          <Section id="information-we-collect" title="2. Information We Collect">
            <p>
              We collect only information reasonably needed to operate, secure and improve the Services. Depending on how
              you use Dineflow, this may include:
            </p>
            <InfoList items={[
              { term: 'Account and contact details', desc: 'Name, phone number, email address, login details and preferences.' },
              { term: 'Orders and transactions', desc: 'Restaurant, items, prices, order status, table or QR-code details, pickup or delivery information, payment status and support history.' },
              { term: 'Location and device information', desc: 'Approximate or precise location if you enable it, IP address, device type, operating system, app version, language, identifiers, crash reports and security logs.' },
              { term: 'Restaurant and business information', desc: 'Licence and registration documents, tax details, owner or authorised representative information, merchant account and settlement details, menu content, staff accounts and platform activity.' },
              { term: 'Messages and support information', desc: 'Communications with Dineflow, restaurants or support teams, feedback, ratings, complaints and records needed to resolve disputes.' },
              { term: 'Usage information', desc: 'Searches, screens or features used, clicks, session times, performance information and aggregated or anonymised analytics.' },
              { term: 'Information from others', desc: 'Information provided by a restaurant, payment provider, service provider, fraud-prevention partner or a person placing an order on your behalf.' },
            ]} />
            <Callout>
              Please do not submit unnecessary sensitive information through the Services. We do not ask for passwords,
              full payment-card numbers or security codes by chat, phone or email.
            </Callout>
          </Section>

          <Section id="how-we-use" title="3. How We Use Information">
            <UsePurpose title="Provide the Services">
              Create and manage accounts, display menus, transmit and track orders, support table ordering,
              coordinate with restaurants and provide customer support.
            </UsePurpose>
            <UsePurpose title="Process payments and settlements">
              Connect transactions to payment providers, reconcile fees and statements, prevent fraud and maintain
              financial records.
            </UsePurpose>
            <UsePurpose title="Keep the Services safe">
              Authenticate users, detect misuse, investigate suspected fraud, enforce our agreements and protect
              people, property and systems.
            </UsePurpose>
            <UsePurpose title="Communicate with you">
              Send order, service, security and account messages; respond to requests; and, where permitted, send
              marketing that you can opt out of.
            </UsePurpose>
            <UsePurpose title="Improve the Services">
              Troubleshoot, measure performance, develop features, personalise content and prepare aggregated or
              anonymised reports.
            </UsePurpose>
            <UsePurpose title="Meet legal obligations">
              Comply with lawful requests, tax and accounting requirements, regulatory duties, dispute processes and
              enforcement of legal rights.
            </UsePurpose>
            <p style={{ marginTop: '1.25rem' }}>
              We do not use customer contact details received through the Platform for unsolicited marketing by a restaurant.
              Restaurants may use information only as necessary to fulfil the relevant order and must protect it and comply
              with applicable data-protection requirements.
            </p>
          </Section>

          <Section id="legal-grounds" title="4. Legal Grounds & Choices">
            <p>
              We process information where it is needed to provide a service you request, to perform or take steps toward a
              contract, to comply with law, to protect legitimate business and safety interests, or where you have given
              consent. Where consent is the basis, you may withdraw it at any time; withdrawal does not affect processing
              already carried out lawfully.
            </p>
            <p>
              You may decline optional information, permissions or marketing. Some information is necessary for an account,
              payment, order, security or legal requirement; without it, we may not be able to provide the relevant feature.
            </p>
          </Section>

          <Section id="when-we-share" title="5. When We Share Information">
            <p>We share information only for the purposes described in this policy and with appropriate safeguards. Recipients may include:</p>
            <InfoList items={[
              { term: 'The restaurant connected to your order', desc: 'To receive, prepare and fulfil it, handle questions and meet legal obligations.' },
              { term: 'Payment and financial-service providers', desc: 'Including LakiPay and relevant banks or wallet providers, to process and reconcile payments.' },
              { term: 'Technology providers', desc: 'That host, secure, analyse, support or maintain the Services, acting under our instructions where they process information for us.' },
              { term: 'Professional advisers, auditors, insurers', desc: 'And other parties where reasonably necessary for business administration or legal advice.' },
              { term: 'Authorities, courts or other parties', desc: 'Where required by law, legal process, public safety or protection of rights.' },
              { term: 'A buyer, successor or transaction adviser', desc: 'If Dineflow is reorganised, merged, financed or sold, subject to appropriate confidentiality and legal safeguards.' },
            ]} />
            <Callout>
              We do not sell personal information for money. We do not allow partners to use customer information
              for unrelated marketing without an appropriate legal basis and, where required, your consent. We may
              publish or share statistics that do not identify individuals.
            </Callout>
          </Section>

          <Section id="payments" title="6. Payments & Third Parties">
            <p>
              Dineflow connects customers and restaurants with third-party payment infrastructure. Payment providers may
              collect and process payment information under their own privacy notices. Dineflow normally receives payment
              status and transaction references rather than the full payment credentials. The Services may also contain links,
              integrations or features provided by others; their privacy practices are separate from ours.
            </p>
          </Section>

          <Section id="cookies" title="7. Cookies & Similar Tools">
            <p>
              Our website and software may use cookies, SDKs, pixels and similar technologies to keep you signed in,
              remember settings, measure performance, prevent fraud and understand use of the Services. You can control
              some technologies through device or browser settings, but disabling essential technologies may affect
              functionality. The app may request location, camera, notifications or other permissions only when the relevant
              feature needs them; you can change permissions in your device settings.
            </p>
          </Section>

          <Section id="retention" title="8. Retention">
            <p>
              We retain information for as long as needed for the purposes described above, including to provide the Services,
              maintain business and financial records, resolve disputes, enforce agreements, prevent fraud and comply with
              legal obligations. Retention periods differ by data type. When information is no longer needed, we delete it,
              anonymise it or securely isolate it unless law requires or permits continued retention.
            </p>
          </Section>

          <Section id="security" title="9. Security & Incidents">
            <p>
              We use reasonable technical, organisational and physical safeguards appropriate to the information and risks,
              including access controls, authentication, monitoring, secure transmission where supported, staff confidentiality
              and vendor controls. No system is completely secure. Please protect your credentials and tell us promptly if you
              suspect unauthorised access.
            </p>
            <p>
              If a security incident affects personal information, we will assess it, take steps to contain and remedy it, and
              make notifications required by applicable law. Ethiopian law may require notification to the competent authority
              within 72 hours after a personal-data breach is discovered; this does not replace any other notification duty.
            </p>
          </Section>

          <Section id="your-rights" title="10. Your Rights">
            <p>Subject to applicable law and reasonable verification, you may ask us to:</p>
            <ul style={{ paddingLeft: '1.25rem', color: '#374151', lineHeight: 2, fontSize: '15px' }}>
              <li>Tell you what personal information we hold and how we use it</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete information where there is no lawful reason to retain it</li>
              <li>Object to or request restriction of certain processing</li>
              <li>Withdraw consent where processing relies on consent</li>
              <li>Receive information in a usable format where the law provides that right</li>
              <li>Close your account, subject to outstanding orders, legal duties and legitimate security or dispute needs</li>
            </ul>
            <p>
              To make a request, email{' '}
              <a href="mailto:support@dineflow.et" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
                support@dineflow.et
              </a>{' '}
              with the subject <strong>"Privacy request"</strong>. We may ask for information to verify your identity and will
              respond within the period required by law. You may also complain to another competent authority if you believe
              your rights have been infringed.
            </p>
          </Section>

          <Section id="children" title="11. Children & Age-Restricted Products">
            <p>
              Dineflow is not directed to children who cannot lawfully use the Services. Do not create an account or place an
              order if you are not legally permitted to do so. A restaurant, not Dineflow, is responsible for checking age and
              identity before handing over alcohol or another age-restricted product. Any age prompt in the app is not a
              substitute for the restaurant's in-person verification.
            </p>
          </Section>

          <Section id="international" title="12. International Processing">
            <p>
              Dineflow may use service providers outside Ethiopia. Before transferring personal information across borders,
              we will use a transfer route and safeguards permitted by Ethiopian law, which may include an adequacy
              decision, informed explicit consent, contractual necessity or another lawful basis. Where required, personal
              information collected in Ethiopia will be stored on infrastructure located in Ethiopia or handled as required by
              the competent authority.
            </p>
          </Section>

          <Section id="changes" title="13. Changes to This Policy">
            <p>
              We may update this policy when the Services, law or our data practices change. We will post the new version
              with its updated date and provide additional notice where the change is material or the law requires it. Your
              continued use after the effective date means the updated policy applies to future processing, subject to your rights.
            </p>
          </Section>

          <Section id="contact" title="14. Contact Us">
            <div style={{
              background: '#f9fafb', border: '1px solid #e5e7eb',
              borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem',
            }}>
              {[
                ['Company', 'Future Labs Software Technologies PLC'],
                ['Address', 'Addis Ababa, Ethiopia'],
                ['Privacy contact', 'support@dineflow.et'],
                ['Website', 'https://www.dineflow.et/'],
              ].map(([label, value], i) => (
                <div key={label} style={{
                  display: 'grid', gridTemplateColumns: '160px 1fr',
                  padding: '14px 20px', gap: '16px',
                  borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                  {label === 'Privacy contact' ? (
                    <a href={`mailto:${value}`} style={{ color: '#f97316', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>{value}</a>
                  ) : label === 'Website' ? (
                    <a href={value} style={{ color: '#f97316', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>{value}</a>
                  ) : (
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: 500 }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.7 }}>
              This policy should be read together with the Dineflow Terms of Use, Restaurant Partnership & Platform
              Services Agreement, payment-provider terms, and any feature-specific notices.
            </p>
          </Section>

          {/* Bottom nav */}
          <div style={{
            marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #f0f0f0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          }}>
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>
              © {new Date().getFullYear()} Dineflow / Future Labs Software Technologies PLC. All rights reserved.
            </p>
            <Link href="/" style={{
              padding: '9px 18px', background: '#f97316', color: '#fff',
              borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
            }}>
              Back to Dineflow →
            </Link>
          </div>
        </article>
      </div>

      <style>{`
        .privacy-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 4rem;
          align-items: start;
        }

        .back-btn {
          padding: 8px 18px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          color: #374151;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .back-btn:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .toc-link {
          display: block;
          padding: 7px 12px;
          font-size: 12.5px;
          color: #6b7280;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          border-left: 2px solid #f0f0f0;
          margin-bottom: 2px;
          line-height: 1.4;
          transition: all 0.15s;
        }

        .toc-link:hover {
          color: #f97316;
          border-left-color: #f97316;
          background: rgba(249,115,22,0.04);
        }

        article p {
          color: #374151;
          font-size: 15px;
          line-height: 1.8;
          margin: 0 0 1rem;
        }

        article strong {
          color: #111827;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .privacy-layout {
            grid-template-columns: 1fr !important;
          }
          .privacy-toc {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom: '3rem', scrollMarginTop: '100px' }}>
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.3rem', fontWeight: 800, color: '#111827',
        letterSpacing: '-0.01em', margin: '0 0 1.25rem',
        paddingBottom: '0.75rem', borderBottom: '1px solid #f0f0f0',
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function InfoList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
      {items.map(({ term, desc }) => (
        <li key={term} style={{
          display: 'flex', gap: '10px', padding: '10px 0',
          borderBottom: '1px solid #f9fafb', alignItems: 'flex-start',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#f97316',
            flexShrink: 0, marginTop: '8px',
          }} />
          <span style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
            <strong style={{ color: '#111827' }}>{term}: </strong>{desc}
          </span>
        </li>
      ))}
    </ul>
  )
}

function UsePurpose({ title, children }) {
  return (
    <div style={{ marginBottom: '1rem', padding: '14px 16px', background: '#f9fafb', borderRadius: '10px', borderLeft: '3px solid #f97316' }}>
      <strong style={{ color: '#111827', fontSize: '14px', display: 'block', marginBottom: '4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</strong>
      <p style={{ color: '#374151', fontSize: '14px', margin: 0, lineHeight: 1.7 }}>{children}</p>
    </div>
  )
}

function Callout({ children }) {
  return (
    <div style={{
      background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)',
      borderRadius: '10px', padding: '14px 18px', margin: '1rem 0',
      fontSize: '14px', color: '#6b7280', lineHeight: 1.65,
    }}>
      <strong style={{ color: '#f97316' }}>Note: </strong>{children}
    </div>
  )
}
