import { LoginForm } from '@/features/auth/ui/LoginForm'

export function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card shadow-xl p-6 w-full max-w-md bg-base-200">
        <h1 className="text-2xl font-bold mb-4">Логин</h1>
        <LoginForm />
      </div>
    </div>
  )
}
