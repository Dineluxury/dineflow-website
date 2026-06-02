import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import About from '@/components/About'
import ForCustomers from '@/components/ForCustomers'
import ForRestaurants from '@/components/ForRestaurants'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientOnly from '@/components/ClientOnly'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <ClientOnly />
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <ForCustomers />
      <ForRestaurants />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}