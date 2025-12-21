import { Routes, Route } from 'react-router'
import Layout from '@app/layouts/Layout'
import { LoginPage } from '@pages/login'
import { RegisterPage } from '@pages/register'
import { NotFoundPage } from '@pages/not-found'
import { TicketsPage } from '@pages/tickets'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { ProfilePage } from '@pages/profile'
import { TicketPage } from '@/pages/ticket'
import { ApplicationsPage } from '@/pages/applications'
import { CreateApplicationPage } from '@/pages/create-application'
import { BasePage } from '../layouts/BasePage'
import { ApplicationPage } from '@/pages/application'
import { OpenShiftPage } from '@/pages/open-shift'
import { CreateAppalationPage } from '@/pages/create-appealation'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route index element={<BasePage />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/:id" element={<TicketPage />} />

          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/:id" element={<ApplicationPage />} />
          <Route path="/applications/create" element={<CreateApplicationPage />} />
          <Route path="/applications/:id/appealation" element={<CreateAppalationPage />} />

          <Route path="/shifts/open" element={<OpenShiftPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
