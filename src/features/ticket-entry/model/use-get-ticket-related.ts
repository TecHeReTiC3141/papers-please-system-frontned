import type { Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const useGetTicketRelated = () => {
  const userData = useAuthUser<User>()
  const api = useApi()
  const navigate = useNavigate()

  return async (id: string) => {
    if (!userData) {
      toast.info('You are logged out')
      navigate('/login')
      return Promise.reject(new Error('User is not authenticated'))
    }
    const { data } = await api.get<Ticket[]>(`/tickets/${id}/related`)

    return data
  }
}
