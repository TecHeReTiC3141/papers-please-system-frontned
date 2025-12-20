import type { Ticket } from '@/entities/ticket'
import { ApplicationCard } from './ApplicationCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames'
import { ApplicationStatus } from '@/entities/ticket/applications'

type Props = {
  status: ApplicationStatus
  tickets: Ticket[]
}

export const ApplicationsBoardColumn = ({ status, tickets }: Props) => {
  const title = {
    [ApplicationStatus.Active]: 'applications.status.active',
    [ApplicationStatus.Rejected]: 'applications.status.rejeact',
    [ApplicationStatus.Approved]: 'applications.status.approved'
  }[status]

  return (
    <div className="w-1/3 px-4 ">
      <h2 className="text-lg font-bold mb-2">{title}</h2>

      <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className={classNames('flex flex-col gap-3 min-h-[200px] h-full bg-base-300 p-4 rounded-lg')}>
          {tickets.map((ticket) => (
            <ApplicationCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
