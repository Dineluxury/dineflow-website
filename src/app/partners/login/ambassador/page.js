import PartnersLogin from '@/components/partners/PartnersLogin'

export const metadata = { title: 'Ambassador Login — Dineflow' }

export default function AmbassadorLoginPage() {
  return <main style={{ background: '#0a0a0a', minHeight: '100vh' }}><PartnersLogin expectedType="ambassador" /></main>
}
