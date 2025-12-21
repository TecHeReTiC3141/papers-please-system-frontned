import type { Ticket } from '@/entities/ticket'
import { Link } from 'react-router'
import classNames from 'classnames'
import { formatTicketDeadlineAt, formatTicketId } from '@/entities/ticket/lib'
import { TicketStatusBadge } from '@/features/tickets/ui/TicketStatus'
import { useTranslation } from 'react-i18next'
import { useTypeConfig } from '@/entities/ticket/hooks'

type Props = {
  ticket: Ticket
}

export const RelatedTicketCard = ({ ticket }: Props) => {
  const { t } = useTranslation()
  const typeConfig = useTypeConfig()
  const { icon: TypeIcon, blColor, label, iconColor } = typeConfig[ticket.ticketType]

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className={classNames('bg-base-200 p-4 shadow cursor-pointer active:cursor-grabbing border-l-4', blColor)}
    >
      <div className="flex items-center gap-1">
        <TypeIcon className={`${iconColor}`} />
        <div className="font-semibold">{formatTicketId(ticket)}</div>
        <span>{t(label)}</span>
      </div>
      <div className="font-semibold">{ticket.description}</div>
      {/* TODO: add ticket executor */}
      <div className="mt-2">
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="mt-2 text-sm">{t('ticket.ticketCard.deadline', { date: formatTicketDeadlineAt(ticket) })}</div>
    </Link>
  )
}
