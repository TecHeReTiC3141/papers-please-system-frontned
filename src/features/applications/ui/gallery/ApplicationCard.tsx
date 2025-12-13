import type { Ticket } from '@/entities/ticket'
import { ApplicationStatusBadge } from '../ApplicationStatus'
import { getApplicationStatus } from '../../model/get-application-status'
import { ApplicationStatus, statusConfig } from '@/entities/ticket/applications'
import { FaArrowRight, FaPlus, FaTrash } from 'react-icons/fa6'
import { formatDate } from '@/shared/lib'
import classNames from 'classnames'
import { DetailsList } from '@/shared/ui'
import { Link } from 'react-router'

type Props = {
  ticket: Ticket
}

export const ApplicationCard = ({ ticket }: Props) => {
  const applicationStatus = getApplicationStatus(ticket)

  const { borderColor } = statusConfig[applicationStatus]

  const dateDetails = [
    { label: 'Created', value: formatDate(ticket.createdAt) },
    { label: 'Last update', value: formatDate(ticket.updatedAt) }
  ]

  return (
    <div className={classNames('card card-border bg-base-100 w-96', borderColor)}>
      <div className="card-body">
        <div className="card-actions justify-between">
          <h2 className="card-title">Application</h2>
          <Link to={`/applications/${ticket.id}`} className="link link-info link-hover flex gap-x-2 items-center">
            View details <FaArrowRight />
          </Link>
        </div>
        <DetailsList items={dateDetails} />
        <div className="card-actions justify-between items-center gap-x-2">
          <ApplicationStatusBadge status={applicationStatus} />
          <div className="flex-1"></div>
          {applicationStatus === ApplicationStatus.Rejected && (
            <button className="btn btn-xs btn-primary">
              <FaPlus />
              Appealation
            </button>
          )}
          {applicationStatus !== ApplicationStatus.Approved && (
            <button className="btn btn-xs btn-error">
              <FaTrash />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
