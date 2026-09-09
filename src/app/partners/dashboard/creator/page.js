import CreatorDashboard from '@/components/partners/CreatorDashboard'

export const metadata = { title: 'Creator Dashboard — Dineflow' }

export default function CreatorPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <CreatorDashboard />
    </main>
  )
}