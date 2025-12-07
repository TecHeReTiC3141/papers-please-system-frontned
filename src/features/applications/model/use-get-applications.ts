import type { Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import type { MultipleEntitiesResponse } from '@/shared/api/types'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const useGetApplications = () => {
  const userData = useAuthUser<User>()
  const api = useApi()

  if (!userData) {
    throw new Error('Not authorized')
  }

  return async () => {
    const { data } = await api.get<MultipleEntitiesResponse<Ticket>>(`/tickets?authorId=${userData.id}`)

    return data
  }
}
