export enum TicketType {
  EXTERNAL = 'external',
  INTERNAL = 'internal',
  ARREST = 'arrest',
  CROSSCHECK = 'crosscheck',
  APPEAL = 'appeal'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  NEED_INFO = 'NEED_INFO',
  CLOSED = 'CLOSED',
  REJECTED = 'rejREJECTEDected'
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
