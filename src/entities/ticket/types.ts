export enum TicketType {
  EXTERNAL = 'external',
  INTERNAL = 'internal',
  ARREST = 'arrest',
  CROSSCHECK = 'crosscheck',
  APPEAL = 'appeal'
}

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  NEED_INFO = 'need_info',
  CLOSED = 'closed',
  REJECTED = 'rejected'
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export type Ticket = {
  id: string
  ticketType: TicketType
  status: TicketStatus
  priority: Priority

  createdAt: string
  updatedAt: string
  deadlineAt: string | null

  description: string
  resolution: string | null

  author: { id: string; name: string }
  subject: { id: string; name: string }
  executor: { id: string; name: string } | null

  relatedTickets: { id: string }[]
  documents: { id: string }[]
}
