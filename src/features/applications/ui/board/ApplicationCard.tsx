import { TicketType, type Ticket } from '@/entities/ticket'
import { ApplicationStatusBadge } from '../ApplicationStatus'
import { Link } from 'react-router'
import classNames from 'classnames'
import { formatTicketId } from '@/entities/ticket/lib'
import { statusConfig } from '@/entities/ticket/applications'
import { getApplicationStatus } from '../../model'
import { formatDate } from '@/shared/lib'
import { DetailsList } from '@/shared/ui'
import { MdDescription, MdPublic } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

type Props = {
  ticket: Ticket
}

export const ApplicationCard = ({ ticket }: Props) => {
  const { t } = useTranslation()
  const applicationStatus = getApplicationStatus(ticket)

  const { borderColor } = statusConfig[applicationStatus]

  const applicationDetails = [
    {
      label: t('Status'),
      value: <ApplicationStatusBadge status={applicationStatus} />
    },
    {
      label: t('Created'),
      value: formatDate(ticket.createdAt)
    },
    {
      label: t('Last updated'),
      value: formatDate(ticket.updatedAt)
    }
  ]

  return (
    <Link
      to={`/applications/${ticket.id}`}
      className={classNames('bg-base-200 p-4 shadow cursor-pointer  border-l-4', borderColor)}
    >
      <div className="flex items-center gap-1">
        {ticket.ticketType === TicketType.EXTERNAL ? (
          <MdPublic className={`${borderColor}`} />
        ) : (
          <MdDescription className={`${borderColor}`} />
        )}

        <div className="font-semibold">{formatTicketId(ticket)}</div>
        <span>{ticket.ticketType === TicketType.EXTERNAL ? 'Application' : 'Appealation'}</span>
      </div>
      <DetailsList items={applicationDetails} />
    </Link>
  )
}
