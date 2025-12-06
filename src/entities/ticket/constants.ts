import { TicketStatus, TicketType } from '@/entities/ticket'
import { MdPublic, MdApartment, MdGavel, MdSyncProblem, MdDescription } from 'react-icons/md'

export const typeConfig = {
  [TicketType.EXTERNAL]: {
    label: 'Application',
    iconColor: 'text-blue-500',
    blColor: 'border-blue-500',
    icon: MdPublic
  },
  [TicketType.INTERNAL]: {
    label: 'Internal',
    iconColor: 'text-green-500',
    blColor: 'border-green-500',
    icon: MdApartment
  },
  [TicketType.ARREST]: {
    label: 'Arrest',
    iconColor: 'text-red-500',
    blColor: 'border-red-500',
    icon: MdGavel
  },
  [TicketType.CROSSCHECK]: {
    label: 'Cross-Check',
    iconColor: 'text-purple-500',
    blColor: 'border-purple-500',
    icon: MdSyncProblem
  },
  [TicketType.APPEAL]: {
    label: 'Appealation',
    iconColor: 'text-yellow-500',
    blColor: 'border-yellow-500',
    icon: MdDescription
  }
}

type TicketStatusConfig = { label: string; className: string; reason: string }

export const statusConfig: Record<TicketStatus, TicketStatusConfig> = {
  [TicketStatus.OPEN]: {
    label: 'Open',
    className: '',
    reason: 'Ticket created and waiting to be processed'
  },
  [TicketStatus.IN_PROGRESS]: {
    label: 'In Progress',
    className: 'status-primary',
    reason: 'Work started'
  },
  [TicketStatus.NEED_INFO]: {
    label: 'Need Info',
    className: 'status-warning',
    reason: 'Additional information required from requester'
  },
  [TicketStatus.CLOSED]: {
    label: 'Closed',
    className: 'status-success',
    reason: 'Issue resolved and ticket completed'
  },
  [TicketStatus.REJECTED]: {
    label: 'Rejected',
    className: 'status-error',
    reason: 'Ticket was declined or does not meet requirements'
  }
}
