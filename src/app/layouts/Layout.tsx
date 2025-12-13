import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 ">
      <Header />

      <main className="flex-1 p-4 container mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
