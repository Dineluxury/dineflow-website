import PartnersHero from '@/components/partners/PartnersHero'
import PartnerChoices from '@/components/partners/PartnerChoices'
import AmbassadorSection from '@/components/partners/AmbassadorSection'
import CreatorSection from '@/components/partners/CreatorSection'
import EarningsCalculator from '@/components/partners/EarningsCalculator'
import PartnersFAQ from '@/components/partners/PartnersFAQ'
import PartnersFooter from '@/components/partners/PartnersFooter'

export const metadata = {
  title: 'Partner with Dineflow — Earn Money as a Student or Creator',
  description: 'Join the Dineflow partner program. Students earn by bringing restaurants on board. Creators earn every time someone orders through their food link.',
}

export default function PartnersPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <PartnersHero />
      <PartnerChoices />
      <AmbassadorSection />
      <CreatorSection />
      <EarningsCalculator />
      <PartnersFAQ />
      <PartnersFooter />
    </main>
  )
}