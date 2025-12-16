import type { Ticket } from '@/entities/ticket'
import { Link } from 'react-router'

type Props = {
  ticket: Ticket
}

export function TicketTitle({ ticket }: Props) {
  return (
    <Link to={`/tickets/${ticket.id}`} className="link link-hover hover:link-info">
      {ticket.description}
    </Link>
  )
}
