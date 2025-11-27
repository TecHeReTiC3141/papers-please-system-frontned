import { Routes, Route } from 'react-router'
import Layout from '@/app/layouts/Layout'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { NotFoundPage } from '@/pages/not-found'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App layout */}
        <Route index element={<div>Главная</div>} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
