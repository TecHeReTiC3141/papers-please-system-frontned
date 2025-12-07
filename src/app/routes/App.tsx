import { Routes, Route } from 'react-router'
import Layout from '@app/layouts/Layout'
import { LoginPage } from '@pages/login'
import { RegisterPage } from '@pages/register'
import { NotFoundPage } from '@pages/not-found'
import { TicketsPage } from '@pages/tickets'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { ProfilePage } from '@pages/profile'
import { TicketPage } from '@/pages/ticket'
import { ApplicationsPage } from '@/pages/applications/ApplicationsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App layout */}
        <Route index element={<div>Главная</div>} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/:id" element={<TicketPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
