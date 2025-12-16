import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/shared/api/axios'
import { TicketStatus } from '@/entities/ticket'

export function useCloseApplicationMutation() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ticketId: string) => {
      const { data } = await api.patch(`/tickets/${ticketId}`, {
        status: TicketStatus.CLOSED
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })
}
