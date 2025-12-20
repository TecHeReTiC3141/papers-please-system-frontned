import { TicketStatus, TicketType } from '@/entities/ticket'
import { MdPublic, MdApartment, MdGavel, MdSyncProblem, MdDescription } from 'react-icons/md'

export const typeConfig = {
  [TicketType.EXTERNAL]: {
    label: 'ticket.type.external',
    iconColor: 'text-blue-500',
    blColor: 'border-blue-500',
    icon: MdPublic
  },
  [TicketType.INTERNAL]: {
    label: 'ticket.type.internal',
    iconColor: 'text-green-500',
    blColor: 'border-green-500',
    icon: MdApartment
  },
  [TicketType.ARREST]: {
    label: 'ticket.type.arrest',
    iconColor: 'text-red-500',
    blColor: 'border-red-500',
    icon: MdGavel
  },
  [TicketType.CROSSCHECK]: {
    label: 'ticket.type.crosscheck',
    iconColor: 'text-purple-500',
    blColor: 'border-purple-500',
    icon: MdSyncProblem
  },
  [TicketType.APPEAL]: {
    label: 'ticket.type.appeal',
    iconColor: 'text-yellow-500',
    blColor: 'border-yellow-500',
    icon: MdDescription
  }
}

type TicketStatusConfig = { label: string; className: string; reason: string }

export const statusConfig: Record<TicketStatus, TicketStatusConfig> = {
  [TicketStatus.OPEN]: {
    label: 'ticket.status.open',
    className: '',
    reason: 'ticket.reason.open'
  },
  [TicketStatus.IN_PROGRESS]: {
    label: 'ticket.status.inProgress',
    className: 'status-primary',
    reason: 'ticket.reason.inProgress'
  },
  [TicketStatus.NEED_INFO]: {
    label: 'ticket.status.needInfo',
    className: 'status-warning',
    reason: 'ticket.reason.needInfo'
  },
  [TicketStatus.CLOSED]: {
    label: 'ticket.status.rejected',
    className: 'status-success',
    reason: 'ticket.reason.rejected'
  },
  [TicketStatus.REJECTED]: {
    label: 'ticket.status.closed',
    className: 'status-error',
    reason: 'ticket.reason.closed'
  }
}
