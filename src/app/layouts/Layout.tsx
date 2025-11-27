import { Outlet } from 'react-router'
import { Header } from '@shared/ui/Header'
import { Footer } from '@shared/ui/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
