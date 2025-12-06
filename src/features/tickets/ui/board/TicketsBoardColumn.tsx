// features/tickets/board/ui/TicketsBoardColumn.tsx
import { useDroppable } from '@dnd-kit/core'
import { TicketStatus } from '@/entities/ticket'
import type { Ticket } from '@/entities/ticket'
import { TicketCard } from './TicketCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames'

type Props = {
  status: TicketStatus
  tickets: Ticket[]
  loading: boolean
}

export const TicketsBoardColumn = ({ status, tickets, loading }: Props) => {
  const { setNodeRef } = useDroppable({
    id: status
  })

  const title = {
    [TicketStatus.OPEN]: 'Open',
    [TicketStatus.IN_PROGRESS]: 'In Progress',
    [TicketStatus.NEED_INFO]: 'Need info',
    [TicketStatus.REJECTED]: 'Rejected',
    [TicketStatus.CLOSED]: 'Closed'
  }[status]

  return (
    <div className="w-1/3 px-4 ">
      <h2 className="text-lg font-bold mb-2">{title}</h2>

      <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={classNames(
            'flex flex-col gap-3 min-h-[200px] h-full bg-base-300 p-4 rounded-lg',
            loading && 'skeleton'
          )}
        >
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
