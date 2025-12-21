import { TicketStatus, type Ticket } from '@/entities/ticket'
import { Link } from 'react-router'
import { TicketEntryHeader } from './TicketEntryHeader'
import { TicketEntryContent } from './TicketEntryContent'
import { TicketEntryDetails } from './TicketEntryDetails'
import { FaArrowLeft } from 'react-icons/fa6'
import { useState } from 'react'
import { useUpdateTicketMutation } from '../model/use-update-ticket-mutation'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type Props = {
  ticket: Ticket
}

export function TicketEntry({ ticket }: Props) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<Pick<Ticket, 'status' | 'priority'>>({
    status: ticket?.status,
    priority: ticket?.priority
  })

  const updateTicketMutation = useUpdateTicketMutation()

  const updateDraft = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  const hasChanges = draft.status !== ticket.status || draft.priority !== ticket.priority

  const handleSave = () => {
    const body: Partial<Ticket> = {
      ...(draft.status !== ticket.status && { status: draft.status }),
      ...(draft.priority !== ticket.priority && { priority: draft.priority })
    }

    toast.promise(
      updateTicketMutation.mutateAsync({
        ticketId: ticket.id,
        body
      }),
      {
        pending: t('ticket.save.pending'),
        success: t('ticket.save.success'),
        error: t('ticket.save.error')
      }
    )
  }

  const handleApprove = () => {
    toast.promise(
      updateTicketMutation.mutateAsync({
        ticketId: ticket.id,
        body: {
          status: TicketStatus.CLOSED
        }
      }),
      {
        pending: t('ticket.approve.pending'),
        success: t('ticket.approve.success'),
        error: t('ticket.approve.error')
      }
    )
  }

  const handleReject = (reason: string) => {
    toast.promise(
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
  }

  return (
    <div className="w-full container mx-auto">
      <Link className="link link-hover link-info flex gap-x-2 items-center" to="/tickets">
        <FaArrowLeft /> {t('ticket.backToTickets')}
      </Link>
      <TicketEntryHeader
        ticket={ticket}
        status={draft.status}
        onStatusChange={(v) => updateDraft('status', v)}
        onSave={handleSave}
        onApprove={handleApprove}
        onReject={handleReject}
        isSaveInProgress={updateTicketMutation.isPending}
        canSave={hasChanges}
      />
      <div className="w-full flex justify-between gap-x-4">
        <TicketEntryContent ticket={ticket} />
        <TicketEntryDetails
          ticket={ticket}
          priority={draft.priority}
          onPriorityChange={(v) => updateDraft('priority', v)}
        />
      </div>
    </div>
  )
}
