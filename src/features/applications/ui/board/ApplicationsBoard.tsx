import type { Ticket } from '@/entities/ticket'
import { ApplicationsBoardColumn } from './ApplicationsBoardColumn'
import { getApplicationStatus } from '../../model'
import { ApplicationStatus } from '@/entities/ticket/applications'
import { Loader } from '@/shared/ui'

type Props = {
  tickets: Ticket[]
  loading: boolean
}

const columnsConfig = [
  {
    status: ApplicationStatus.Active,
    filter: (t: Ticket) => getApplicationStatus(t) === ApplicationStatus.Active
  },
  {
    status: ApplicationStatus.Rejected,
    filter: (t: Ticket) => getApplicationStatus(t) === ApplicationStatus.Rejected
  },
  {
    status: ApplicationStatus.Approved,
    filter: (t: Ticket) => getApplicationStatus(t) === ApplicationStatus.Approved
  }
]

export const ApplicationsBoard = ({ tickets, loading }: Props) => {
  if (loading || !tickets) return <Loader text="Loading your applications..." />

  return (
    <div className="flex items-stretch w-full gap-4">
      {columnsConfig.map(({ status, filter }) => (
        <ApplicationsBoardColumn status={status} tickets={tickets.filter(filter)} />
      ))}
    </div>
  )
}
