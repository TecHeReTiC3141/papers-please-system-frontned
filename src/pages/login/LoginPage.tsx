import { LoginForm } from '@/features/auth/ui/LoginForm'
import { useMutation } from '@tanstack/react-query'
import { useLogin } from '@/features/auth/model/use-login'
import type { LoginRequest } from '@/features/auth/model'

export function LoginPage() {
  const login = useLogin()

  const mutation = useMutation({
    mutationFn: (values: LoginRequest) => login(values)
  })

  const handleLogin = async (values: LoginRequest) => {
    mutation.mutate(values)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card shadow-xl p-6 w-full max-w-md bg-base-200">
        <h1 className="text-2xl font-bold mb-4">Логин</h1>
        <LoginForm onSubmit={handleLogin} loading={mutation.isPending} />
        {mutation.isError && <p className="text-red-500 text-sm mb-2 text-center">{mutation.error.message}</p>}
      </div>
    </div>
  )
}
