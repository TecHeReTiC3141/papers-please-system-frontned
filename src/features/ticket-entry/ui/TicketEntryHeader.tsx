import { TicketStatus, type Ticket } from '@/entities/ticket'
import type { User } from '@/entities/user'
import { UserPreview } from '@/shared/ui/UserPreview'
import classNames from 'classnames'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Link } from 'react-router'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { FaSave } from 'react-icons/fa'
import { formatTicketId } from '@/entities/ticket/lib'
import { DetailsList } from '@/shared/ui'
import { ApproveModal } from './ApproveModal'
import { RejectModal } from './RejectModal'
import { useState } from 'react'
import { TicketStatusBadge } from '@/features/tickets/ui/TicketStatus'
import { useTranslation } from 'react-i18next'
import { useStatusConfig, useTypeConfig } from '@/entities/ticket/hooks'
import { ArrestModal } from './ArrestModal'

type Props = {
  ticket: Ticket
  status: TicketStatus
  onStatusChange: (status: TicketStatus) => void
  onApprove: () => void
  onReject: (reason: string) => void
  onArrest: (reason: string) => void
}

export function TicketEntryHeader({ ticket, status, onStatusChange, onApprove, onReject, onArrest }: Props) {
  const { t } = useTranslation()
  const userData = useAuthUser<User | null>()
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [arrestOpen, setArrestOpen] = useState(false)

  const typeConfig = useTypeConfig()
  const statusConfig = useStatusConfig()

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
          {Object.values(TicketStatus).map((s) => (
            <option key={s} value={s}>
              <TicketStatusBadge status={s} />
            </option>
          ))}
        </select>
      )
    },
    { label: t('ticket.header.reason'), value: <p className="text-base-content/80">{reason}</p> }
  ]

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
          <UserPreview user={userData} />
          {/* TODO: add executor preview */}
        </div>
        <div className="flex items-center gap-x-6">
          <button className="btn rounded-xl btn-sm btn-success opacity-90" onClick={() => setApproveOpen(true)}>
            <FaCheck />
            {t('common.actions.approve')}
          </button>
          <button className="btn rounded-xl btn-sm btn-error opacity-90" onClick={() => setRejectOpen(true)}>
            <FaXmark />
            {t('common.actions.reject')}
          </button>

          <button className="btn rounded-xl btn-sm btn-warning opacity-90" onClick={() => setArrestOpen(true)}>
            <FaSave />
            {t('ticket.arrest.action')}
          </button>
        </div>
      </div>
      <div className="w-full bg-base-300 p-3">
        <DetailsList items={statusItems} />
      </div>
      <ApproveModal open={approveOpen} onClose={() => setApproveOpen(false)} onConfirm={onApprove} />

      <RejectModal open={rejectOpen} onClose={() => setRejectOpen(false)} onReject={onReject} />

      <ArrestModal open={arrestOpen} onClose={() => setArrestOpen(false)} onArrest={onArrest} />
    </div>
  )
}
