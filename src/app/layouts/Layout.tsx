import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { ShiftInfoModal } from '@/features/shifts/ui'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 ">
      <Header />

      <main className="flex-1 p-4 container mx-auto">
        <Outlet />
      </main>

      <Footer />
      <ShiftInfoModal />
    </div>
  )
}
