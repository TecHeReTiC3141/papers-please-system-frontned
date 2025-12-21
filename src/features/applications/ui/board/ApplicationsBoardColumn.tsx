import type { Ticket } from '@/entities/ticket'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames'
import { ApplicationStatus } from '@/entities/ticket/types'
import { useTranslation } from 'react-i18next'
import { ApplicationCard } from '../ApplicationCard'

type Props = {
  status: ApplicationStatus
  tickets: Ticket[]
  onCloseApplication: (application: Ticket) => void
}

export const ApplicationsBoardColumn = ({ status, tickets, onCloseApplication }: Props) => {
  const { t } = useTranslation()

  const title = {
    [ApplicationStatus.Active]: t('applications.status.active'),
    [ApplicationStatus.Rejected]: t('applications.status.reject'),
    [ApplicationStatus.Approved]: t('applications.status.approved'),
    [ApplicationStatus.Closed]: t('applications.status.closed')
  }[status]

  return (
    <div className="w-1/3 px-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>

      <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className={classNames('flex flex-col gap-3 min-h-[200px] h-full bg-base-300 p-4 rounded-lg')}>
          {tickets.map((ticket) => (
            <ApplicationCard key={ticket.id} ticket={ticket} onClose={onCloseApplication} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
