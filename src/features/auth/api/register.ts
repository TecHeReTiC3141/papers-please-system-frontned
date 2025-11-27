import { useApi } from '@/shared/api/axios'
import type { RegisterRequest } from '../model'

export const useRegisterApi = () => {
  const api = useApi()
  return (data: RegisterRequest) => api.post('/auth/register', data)
}
