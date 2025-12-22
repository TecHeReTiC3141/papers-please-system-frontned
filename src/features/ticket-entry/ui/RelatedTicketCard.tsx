import type { Ticket } from '@/entities/ticket'
import { Link } from 'react-router'
import classNames from 'classnames'
import { formatTicketUpdatedAt, formatTicketId } from '@/entities/ticket/lib'
import { TicketStatusBadge } from '@/features/tickets/ui/TicketStatus'
import { useTranslation } from 'react-i18next'
import { useTypeConfig } from '@/entities/ticket/hooks'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { User } from '@/entities/user'

type Props = {
  ticket: Ticket
}

export const RelatedTicketCard = ({ ticket }: Props) => {
  const { t } = useTranslation()
  const typeConfig = useTypeConfig()
  const { blColor, label } = typeConfig[ticket.ticketType]

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className={classNames('bg-base-200 py-2 px-4 shadow cursor-pointer active:cursor-grabbing border-l-4', blColor)}
    >
      <div className="flex items-center gap-x-2">
        <UserPreview user={ticket.executor as User} showName={false} />
        <div className="font-semibold">{formatTicketId(ticket)}</div>
        <span>{t(label)}</span>
      </div>
      <div className="mt-2 flex gap-x-3 items-center">
        <div className="text-sm">{t('ticket.ticketCard.updatedAt', { date: formatTicketUpdatedAt(ticket) })}</div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="font-semibold">{ticket.description}</div>
    </Link>
  )
}
