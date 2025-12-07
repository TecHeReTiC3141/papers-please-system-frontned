import { TicketStatus, type Ticket } from '@/entities/ticket'
import { ApplicationStatus } from '@/entities/ticket/applications'

export const getApplicationStatus = (ticket: Ticket) => {
  if (ticket.status === TicketStatus.CLOSED) return ApplicationStatus.Approved
  if (ticket.status === TicketStatus.REJECTED) return ApplicationStatus.Rejected

  return ApplicationStatus.Active
}
