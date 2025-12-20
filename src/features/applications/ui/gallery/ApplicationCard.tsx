import type { Ticket } from '@/entities/ticket'
import { ApplicationStatusBadge } from '../ApplicationStatus'
import { getApplicationStatus } from '../../model/get-application-status'
import { ApplicationStatus, statusConfig } from '@/entities/ticket/applications'
import { FaArrowRight, FaPlus, FaTrash } from 'react-icons/fa6'
import { formatDate } from '@/shared/lib'
import classNames from 'classnames'
import { DetailsList } from '@/shared/ui'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

type Props = {
  ticket: Ticket
  onClose: (ticket: Ticket) => void
}

export const ApplicationCard = ({ ticket, onClose }: Props) => {
  const { t } = useTranslation()

  const applicationStatus = getApplicationStatus(ticket)

  const { borderColor } = statusConfig[applicationStatus]

  const dateDetails = [
    { label: t('applications.card.createdAt'), value: formatDate(ticket.createdAt) },
    { label: t('applications.card.updatedAt'), value: formatDate(ticket.updatedAt) }
  ]

  return (
    <Link to={`/applications/${ticket.id}`} className={classNames('card card-border bg-base-100 w-80', borderColor)}>
      <div className="card-body">
        <div className="card-actions justify-between">
          <h2 className="card-title">{t('applications.card.title')}</h2>
        </div>
        <DetailsList items={dateDetails} />
        <div className="card-actions justify-between items-center gap-x-2">
          <ApplicationStatusBadge status={applicationStatus} />
          <div className="flex-1"></div>
          {applicationStatus === ApplicationStatus.Rejected && (
            <button className="btn btn-xs btn-primary">
              <FaPlus />
              {t('applications.card.createAppelation')}
            </button>
          )}
          {applicationStatus !== ApplicationStatus.Approved && (
            <button className="btn btn-xs btn-error" onClick={() => onClose(ticket)}>
              <FaTrash />
              {t('common.actions.close')}
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
