import type { AnyDocument } from '@/entities/document/types'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const useGetTicketDocuments = () => {
  const userData = useAuthUser<User>()
  const api = useApi()

  if (!userData) {
    throw new Error('Not authorized')
  }

  return async (id: string) => {
    const { data } = await api.get<AnyDocument[]>(`/tickets/${id}/documents`)

    return data
  }
}
