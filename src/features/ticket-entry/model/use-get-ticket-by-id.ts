import type { Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const useGetTicketById = () => {
  const userData = useAuthUser<User>()
  const api = useApi()

  if (!userData) {
    throw new Error('Not authorized')
  }

  return async (id: string) => {
    const { data } = await api.get<Ticket>(`/tickets/${id}`)

    return data
  }
}
