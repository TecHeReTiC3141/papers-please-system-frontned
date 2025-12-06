import { type Ticket } from '@/entities/ticket'
import { statusConfig, typeConfig } from '@/entities/ticket/constants'
import type { User } from '@/entities/user'
import { UserPreview } from '@/shared/ui/UserPreview'
import classNames from 'classnames'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Link } from 'react-router'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { FaSave } from 'react-icons/fa'
import { formatTicketId } from '@/entities/ticket/lib'
import { DetailsList } from '@/shared/ui'
import { TicketStatusBadge } from '@/features/tickets/ui/TicketStatus'

type Props = {
  ticket: Ticket
}

export function TicketEntryHeader({ ticket }: Props) {
  const userData = useAuthUser<User | null>()
  const { icon: TypeIcon, blColor, label, iconColor } = typeConfig[ticket.ticketType]
  const { reason } = statusConfig[ticket.status]

  const statusItems = [
    { label: 'Status', value: <TicketStatusBadge status={ticket.status} /> },
    { label: 'Reason', value: reason }
  ]

  return (
    <div>
      <div className={classNames('border-l-4 px-2 flex justify-between items-end pb-2', blColor)}>
        <div className="flex flex-col gap-y-1 items-start ">
          <Link to={`/tickets/${ticket.id}`} className="link link-info link-hover">
            Ticket {formatTicketId(ticket)}
          </Link>
          <div className="flex gap-x-1 items-center">
            <TypeIcon className={`${iconColor}`} />
            <div className="font-semibold text-xl">
              {formatTicketId(ticket)} {label}
            </div>
          </div>
          <UserPreview user={userData} />
          {/* TODO: add executor preview */}
        </div>
        <div className="flex items-center gap-x-6">
          <button className="btn rounded-xl btn-sm btn-success">
            <FaCheck />
            Approve
          </button>
          <button className="btn rounded-xl btn-sm btn-error">
            <FaXmark />
            Reject
          </button>
          <button className="btn rounded-xl btn-sm btn-info">
            <FaSave /> Save
          </button>
        </div>
      </div>
      <div className="w-full bg-base-300 p-3">
        <DetailsList items={statusItems} />
      </div>
    </div>
  )
}
