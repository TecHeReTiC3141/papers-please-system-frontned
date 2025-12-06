import type { Ticket } from '../types'

export const formatTicketId = (ticket: Ticket) => ticket.id.split('-').at(-1)
export const formatTicketDeadlineAt = (ticket: Ticket) =>
  ticket.deadlineAt ? new Date(ticket.deadlineAt).toLocaleDateString() : '—'
