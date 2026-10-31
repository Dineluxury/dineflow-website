import CreatorSection from '@/components/partners/CreatorSection'
import PartnerSignupShell from '@/components/partners/PartnerSignupShell'

export const metadata = { title: 'Apply as a Content Creator — Dineflow' }

export default function CreatorSignupPage() {
  return (
    <PartnerSignupShell title="Apply as a Content Creator" description="Share your creator profile and social platform so we can review your application." signupPath="/partners">
      <CreatorSection />
    </PartnerSignupShell>
  )
}
