import { useApi } from '@/shared/api/axios'
import type { LoginRequest } from '../model'

export const useLoginApi = () => {
  const api = useApi()
  return (data: LoginRequest) => api.post('/auth/login', data)
}
