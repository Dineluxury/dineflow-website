import AmbassadorDashboard from '@/components/partners/AmbassadorDashboard'

export const metadata = { title: 'Ambassador Dashboard — Dineflow' }

export default function AmbassadorPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AmbassadorDashboard />
    </main>
  )
}