import PartnersLogin from '@/components/partners/PartnersLogin'

export const metadata = {
  title: 'Partner Login — Dineflow',
}

export default function LoginPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <PartnersLogin />
    </main>
  )
}