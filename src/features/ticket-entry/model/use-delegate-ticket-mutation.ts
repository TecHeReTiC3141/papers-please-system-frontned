import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TicketStatus, TicketType, type Ticket } from '@/entities/ticket'
import { useApi } from '@/shared/api/axios'
import type { Specialization } from '@/entities/user'

export type DelegateTicketBody = {
  specialization: Specialization
  description: string
}

export type DelegateTicketParams = DelegateTicketBody & {
  ticketId: string
}

export function useDelegateTicketMutation() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ticketId, specialization, description }: DelegateTicketParams) => {
      const { data } = await api.post<Ticket>(`/tickets/${ticketId}/delegate`, {
        ticketType: TicketType.INTERNAL,
        specialization,
        description
      })

      await api.patch<Ticket>(`/tickets/${ticketId}`, {
        status: TicketStatus.NEED_INFO
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
