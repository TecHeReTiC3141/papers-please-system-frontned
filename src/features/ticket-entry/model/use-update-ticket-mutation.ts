import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Ticket } from '@/entities/ticket'
import { useApi } from '@/shared/api/axios'

type UpdateTicketArgs = {
  ticketId: string
  body: Partial<Ticket>
}

export function useUpdateTicketMutation() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ticketId, body }: UpdateTicketArgs) => {
      const { data } = await api.patch<Ticket>(`/tickets/${ticketId}`, body)
      return data
    },

    onSuccess: (updatedTicket, { ticketId }) => {
      // 🔹 Update single ticket cache
      queryClient.setQueryData(['tickets', ticketId], updatedTicket)

      // 🔹 Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      queryClient.invalidateQueries({ queryKey: ['tickets', ticketId] })
      queryClient.invalidateQueries({ queryKey: ['tickets', 'documents', ticketId] })
      queryClient.invalidateQueries({ queryKey: ['tickets', 'related', ticketId] })
    }
  })
}
