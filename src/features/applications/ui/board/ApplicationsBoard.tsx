import type { Ticket } from '@/entities/ticket'
import { ApplicationsBoardColumn } from './ApplicationsBoardColumn'
import { getApplicationStatus } from '../../model'
import { Loader } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { ApplicationStatus } from '@/entities/ticket/types'

type Props = {
  tickets: Ticket[]
  loading: boolean
  showClosed: boolean
  onCloseApplication: (application: Ticket) => void
}

export const ApplicationsBoard = ({ tickets, loading, showClosed, onCloseApplication }: Props) => {
  const { t } = useTranslation()

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

  if (showClosed) {
    columnsConfig.push({
      status: ApplicationStatus.Closed,
      filter: (t: Ticket) => getApplicationStatus(t) === ApplicationStatus.Closed
    })
  }

  if (loading || !tickets) return <Loader text={t('applications.loading')} />

  return (
    <div className="flex items-stretch w-full gap-4">
      {columnsConfig.map(({ status, filter }) => (
        <ApplicationsBoardColumn
          status={status}
          tickets={tickets.filter(filter)}
          onCloseApplication={onCloseApplication}
        />
      ))}
    </div>
  )
}
