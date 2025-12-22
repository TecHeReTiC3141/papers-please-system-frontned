import { TicketType, type Ticket } from '@/entities/ticket'
import { useApi } from '@/shared/api/axios'

type CreateArrestTicketParams = {
  ticketId: string
}

export function useCreateCrossCheckTicket() {
  const api = useApi()

  return async ({ ticketId }: CreateArrestTicketParams) => {
    const { data } = await api.post<Ticket>(`/tickets/${ticketId}/delegate`, {
      description: 'Ticket cross-check',
      ticketType: TicketType.CROSSCHECK
    })
    return data
  }
}
