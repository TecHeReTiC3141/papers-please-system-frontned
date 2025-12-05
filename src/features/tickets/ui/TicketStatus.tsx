import { TicketStatus } from '@/entities/ticket'
import classNames from 'classnames'

type TicketStatusProps = {
  status: TicketStatus
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  [TicketStatus.OPEN]: {
    label: 'Open',
    className: ''
  },
  [TicketStatus.IN_PROGRESS]: {
    label: 'In Progress',
    className: 'status-primary'
  },
  [TicketStatus.NEED_INFO]: {
    label: 'Need Info',
    className: 'status-warning'
  },
  [TicketStatus.CLOSED]: {
    label: 'Closed',
    className: 'status-success'
  },
  [TicketStatus.REJECTED]: {
    label: 'Rejected',
    className: 'status-error'
  }
}

export const TicketStatusBadge = ({ status }: TicketStatusProps) => {
  const cfg = statusConfig[status]

  if (!cfg) return status

  return (
    <div className="flex items-center gap-x-3">
      <div className={classNames('status', cfg.className)}></div> {cfg.label}
    </div>
  )
}
