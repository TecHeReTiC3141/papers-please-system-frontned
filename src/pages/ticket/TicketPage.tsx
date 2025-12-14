import { useGetTicketById } from '@/features/ticket-entry/model'
import { TicketEntry } from '@/features/ticket-entry/ui'
import { Loader } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'

export function TicketPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchTicket = useGetTicketById()

  const ticketQuery = useQuery({
    queryKey: ['tickets', [id]],
    queryFn: () => fetchTicket(id ?? '')
  })

  if (!id) {
    navigate('/not-found')

    return
  }

  if (ticketQuery.isPending) return <Loader text="Loading ticket..." />

  if (!ticketQuery.data) {
    // TODO: implement shared handler of not-found
    navigate('/not-found')
    return
  }

  return <TicketEntry ticket={ticketQuery.data} />
}
