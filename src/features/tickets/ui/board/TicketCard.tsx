import type { Ticket } from '@/entities/ticket'
import { TicketStatusBadge } from '../TicketStatus'
import { useDraggable } from '@dnd-kit/core'
import { Link } from 'react-router'
import classNames from 'classnames'
import { formatTicketDeadlineAt, formatTicketId } from '@/entities/ticket/lib'
import { useTranslation } from 'react-i18next'
import { useTypeConfig } from '@/entities/ticket/hooks'

type Props = {
  ticket: Ticket
}

export const TicketCard = ({ ticket }: Props) => {
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  const typeConfig = useTypeConfig()
  const { icon: TypeIcon, blColor, label, iconColor } = typeConfig[ticket.ticketType]

  return (
    <div
      ref={setNodeRef}
      className={classNames('bg-base-200 p-4 shadow cursor-pointer active:cursor-grabbing border-l-4', blColor)}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Link to={`/tickets/${ticket.id}`} className="flex items-center gap-1 link link-hover link-info">
        <TypeIcon className={`${iconColor}`} />
        <div className="font-semibold">{formatTicketId(ticket)}</div>
        <span>{label}</span>
      </Link>
      <div className="font-semibold">{ticket.description}</div>
      {/* TODO: add ticket executor */}
      <div className="mt-2">
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="mt-2 text-sm">{t('ticket.ticketCard.deadline', { date: formatTicketDeadlineAt(ticket) })}</div>
    </div>
  )
}
