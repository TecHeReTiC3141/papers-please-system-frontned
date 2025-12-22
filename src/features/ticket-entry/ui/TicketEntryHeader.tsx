import { TicketStatus, type Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { UserPreview } from '@/shared/ui/UserPreview'
import classNames from 'classnames'
import { Link } from 'react-router'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { formatTicketId } from '@/entities/ticket/lib'
import { DetailsList } from '@/shared/ui'
import { ApproveModal, RejectModal, ArrestModal } from './modals'
import { useState } from 'react'
import { TicketStatusBadge } from '@/features/tickets/ui/TicketStatus'
import { useTranslation } from 'react-i18next'
import { useStatusConfig, useTypeConfig } from '@/entities/ticket/hooks'
import { GrUserPolice } from 'react-icons/gr'
import { toast } from 'react-toastify'
import { useCreateArrestTicketMutation, useUpdateTicketMutation } from '../model'

type Props = {
  ticket: Ticket
  status: TicketStatus
  onStatusChange: (status: TicketStatus) => void
}

const POSSIBLE_STATUSES = [TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.NEED_INFO]

export function TicketEntryHeader({ ticket, status, onStatusChange }: Props) {
  const { t } = useTranslation()
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [arrestOpen, setArrestOpen] = useState(false)

  const updateTicketMutation = useUpdateTicketMutation()
  const createArrestTicketMutation = useCreateArrestTicketMutation()

  const typeConfig = useTypeConfig()
  const statusConfig = useStatusConfig()

  const allStatuses = new Set([TicketStatus.OPEN, TicketStatus.IN_PROGRESS, ticket.status])

  const { icon: TypeIcon, blColor, label, iconColor } = typeConfig[ticket.ticketType]
  const { reason } = statusConfig[status]

  const statusItems = [
    {
      label: t('ticket.headersStatus'),
      value: (
        <select
          className="select select-sm select-bordered bg-neutral-800"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as TicketStatus)}
        >
          {[...allStatuses].map((s) => (
            <option key={s} value={s} disabled={!POSSIBLE_STATUSES.includes(s)}>
              <TicketStatusBadge status={s} />
            </option>
          ))}
        </select>
      )
    },
    { label: t('ticket.header.reason'), value: <p className="text-base-content/80">{reason}</p> }
  ]

  const handleApprove = async () => {
    await toast.promise(
      updateTicketMutation.mutateAsync({
        ticketId: ticket.id,
        body: {
          status: TicketStatus.APPROVED
        }
      }),
      {
        pending: t('ticket.approve.pending'),
        success: t('ticket.approve.success'),
        error: t('ticket.approve.error')
      }
    )
    onStatusChange(TicketStatus.APPROVED)
  }

  const handleReject = async (reason: string) => {
    await toast.promise(
      updateTicketMutation.mutateAsync({
        ticketId: ticket.id,
        body: {
          status: TicketStatus.REJECTED,
          resolution: reason
        }
      }),
      {
        pending: t('ticket.reject.pending'),
        success: t('ticket.reject.success'),
        error: t('ticket.reject.error')
      }
    )
    onStatusChange(TicketStatus.REJECTED)
  }

  const handleArrest = (reason: string) => {
    toast.promise(createArrestTicketMutation.mutateAsync({ ticketId: ticket.id, description: reason }), {
      pending: t('ticket.arrest.pending'),
      success: t('ticket.arrest.success'),
      error: t('ticket.arrest.error')
    })
  }

  return (
    <div className="mt-3">
      <div className={classNames('border-l-4 px-2 flex justify-between items-end pb-2', blColor)}>
        <div className="flex flex-col gap-y-1 items-start ">
          <Link to={`/tickets/${ticket.id}`} className="link link-info link-hover">
            {t('ticket.header.id', { id: formatTicketId(ticket) })}
          </Link>
          <div className="flex gap-x-1 items-center">
            <TypeIcon className={`${iconColor}`} />
            <div className="font-semibold text-xl">
              {formatTicketId(ticket)} {t(label)}
            </div>
          </div>
          <UserPreview user={ticket.executor as User} />
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="btn rounded-xl btn-sm btn-success opacity-90"
            onClick={() => setApproveOpen(true)}
            disabled={!POSSIBLE_STATUSES.includes(ticket.status)}
          >
            <FaCheck />
            {t('common.actions.approve')}
          </button>
          <button
            className="btn rounded-xl btn-sm btn-error opacity-90"
            onClick={() => setRejectOpen(true)}
            disabled={!POSSIBLE_STATUSES.includes(ticket.status)}
          >
            <FaXmark />
            {t('common.actions.reject')}
          </button>

          <button className="btn rounded-xl btn-sm btn-warning opacity-90" onClick={() => setArrestOpen(true)}>
            <GrUserPolice />
            {t('ticket.arrest.action')}
          </button>
        </div>
      </div>
      <div className="w-full bg-base-300 p-3">
        <DetailsList items={statusItems} />
      </div>
      <ApproveModal open={approveOpen} onClose={() => setApproveOpen(false)} onConfirm={handleApprove} />

      <RejectModal open={rejectOpen} onClose={() => setRejectOpen(false)} onReject={handleReject} />

      <ArrestModal open={arrestOpen} onClose={() => setArrestOpen(false)} onArrest={handleArrest} />
    </div>
  )
}
