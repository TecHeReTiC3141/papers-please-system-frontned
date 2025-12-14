import type { Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import type { MultipleEntitiesResponse } from '@/shared/api/types'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from 'react-router'

export const useGetTickets = () => {
  const navigate = useNavigate()
  const userData = useAuthUser<User>()
  const api = useApi()

  if (!userData) {
    navigate('/login')

    return
  }

  return async () => {
    const { data } = await api.get<MultipleEntitiesResponse<Ticket>>(`/tickets?executorId=${userData.id}`)

    return data
  }
}
