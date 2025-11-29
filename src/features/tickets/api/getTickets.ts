import type { Ticket } from '@entities/ticket'
import { useApi } from '@shared/api/axios'

export const useGetTicketsApi = () => {
  const api = useApi()

  return async (params?: Record<string, any>) => {
    const { data } = await api.get<Ticket[]>('/tickets', { params })
    return data
  }
}
