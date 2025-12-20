import { useGetTicketById } from '@/features/ticket-entry/model'
import { TicketEntry } from '@/features/ticket-entry/ui'
import { Loader } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

export function TicketPage() {
  const { t } = useTranslation()
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

  if (ticketQuery.isPending) return <Loader text={t('ticket.loading')} />

  if (!ticketQuery.data) {
    // TODO: implement shared handler of not-found
    navigate('/not-found')
    return
  }

  return <TicketEntry ticket={ticketQuery.data} />
}
