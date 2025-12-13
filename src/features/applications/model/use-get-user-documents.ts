import type { AnyDocument } from '@/entities/document/types'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import type { MultipleEntitiesResponse } from '@/shared/api/types'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const useGetUserDocuments = () => {
  const userData = useAuthUser<User>()
  const api = useApi()

  if (!userData) {
    throw new Error('Not authorized')
  }

  return async () => {
    const { data } = await api.get<MultipleEntitiesResponse<AnyDocument>>(`/documents?userId=${userData.id}`)

    return data?.items ?? []
  }
}
