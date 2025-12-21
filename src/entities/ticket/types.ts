export enum TicketType {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  ARREST = 'ARREST',
  CROSSCHECK = 'CROSSCHECK',
  APPEAL = 'APPEAL'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  NEED_INFO = 'NEED_INFO',
  CLOSED = 'CLOSED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
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

export type TicketRequest = {
  ticketType: TicketType
  status: TicketStatus
  priority: Priority

  deadlineAt: string | null

  description: string
  resolution: string | null

  authorId: string
  subjectId: string
}

export enum ApplicationStatus {
  Active = 'active',
  Rejected = 'rejected',
  Approved = 'approved',
  Closed = 'closed'
}
