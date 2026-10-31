import PartnersLogin from '@/components/partners/PartnersLogin'

export const metadata = { title: 'Creator Login — Dineflow' }

export default function CreatorLoginPage() {
  return <main style={{ background: '#0a0a0a', minHeight: '100vh' }}><PartnersLogin expectedType="creator" /></main>
}
