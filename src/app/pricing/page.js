import Navbar from '@/components/Navbar'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Venue Pricing | Dineflow',
  description: 'Explore Dineflow setup packages for restaurants, hotels, and cafes.',
}

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div style={{ paddingTop: '68px' }}>
        <Pricing />
      </div>
      <Footer />
    </main>
  )
}
