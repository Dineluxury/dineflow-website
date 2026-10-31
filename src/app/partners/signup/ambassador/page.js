import AmbassadorSection from '@/components/partners/AmbassadorSection'
import PartnerSignupShell from '@/components/partners/PartnerSignupShell'

export const metadata = { title: 'Apply as Student Ambassador — Dineflow' }

export default function AmbassadorSignupPage() {
  return (
    <PartnerSignupShell title="Apply as a Student Ambassador" description="Tell us about yourself and your university. Our team will review your application and follow up by email." signupPath="/partners">
      <AmbassadorSection />
    </PartnerSignupShell>
  )
}
