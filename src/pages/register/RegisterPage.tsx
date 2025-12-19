import { RegisterForm } from '@/features/auth/ui/RegisterForm'
import { useTranslation } from 'react-i18next'

export function RegisterPage() {
  const { t } = useTranslation()

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card shadow-xl p-6 w-full max-w-md bg-base-200">
        <h1 className="text-2xl font-bold mb-4">{t('Регистрация')}</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
