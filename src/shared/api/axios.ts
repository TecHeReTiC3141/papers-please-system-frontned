import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

export const useApi = () => {
  const authHeader = useAuthHeader()

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  api.interceptors.request.use((config) => {
    if (authHeader) {
      config.headers.Authorization = authHeader
    }
    return config
  })

  return api
}
