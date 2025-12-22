import { TicketType, type Ticket } from '@/entities/ticket'
import { useApi } from '@/shared/api/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type CreateArrestTicketParams = {
  ticketId: string
  description: string
}

export function useCreateArrestTicketMutation() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ticketId, description }: CreateArrestTicketParams) => {
      const { data } = await api.post<Ticket>(`/tickets/${ticketId}/delegate`, {
        description,
        ticketType: TicketType.ARREST
      })
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
