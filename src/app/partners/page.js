import PartnersHero from '@/components/partners/PartnersHero'
import PartnerChoices from '@/components/partners/PartnerChoices'
import EarningsCalculator from '@/components/partners/EarningsCalculator'
import PartnersFAQ from '@/components/partners/PartnersFAQ'
import PartnersFooter from '@/components/partners/PartnersFooter'

export const metadata = {
  title: 'Partner with Dineflow — Earn Money as a Student or Creator',
  description: 'Join the Dineflow partner program. Students earn by bringing restaurants on board. Creators earn every time someone orders through their food link.',
}

export default function PartnersPage() {
  return (
    <main>
      <PartnersHero />
      <PartnerChoices />
      <EarningsCalculator />
      <PartnersFAQ />
      <PartnersFooter />
    </main>
  )
}
