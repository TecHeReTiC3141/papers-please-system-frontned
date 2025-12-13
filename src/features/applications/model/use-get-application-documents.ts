import type { AnyDocument } from '@/entities/document/types'
import { useApi } from '@/shared/api/axios'

export const useGetApplicationDocuments = () => {
  const api = useApi()

  return async (id: string) => {
    const { data } = await api.get<AnyDocument[]>(`/tickets/${id}/documents`)

    return data
  }
}
