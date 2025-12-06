import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TicketStatus } from '@/entities/ticket'
import { useApi } from '@/shared/api/axios'

export const useUpdateTicketStatusMutation = () => {
  const api = useApi()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: { id: string; status: TicketStatus }) => {
      await api.patch(`/tickets/${params.id}`, {
        status: params.status
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}
