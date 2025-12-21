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
import { FaSave } from 'react-icons/fa'
import type { AnyDocument } from '@/entities/document/types'

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

  const handleArrest = (reason: string) => {
    toast.promise(Promise.resolve(true), {
      pending: t('ticket.arrest.pending'),
      success: t('ticket.arrest.success'),
      error: t('ticket.arrest.error')
    })
  }

  const handleCreateRelatedTicket = (document: AnyDocument) => {
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          console.log('document', document)
          resolve(0)
        }, 2000)
      ),
      {
        pending: t('ticket.create.pending'),
        success: t('ticket.create.success'),
        error: t('ticket.create.error')
      }
    )
  }

  return (
    <div className="w-full container mx-auto flex flex-col gap-y-2">
      <Link className="link link-hover link-info flex gap-x-2 items-center" to="/tickets">
        <FaArrowLeft /> {t('ticket.backToTickets')}
      </Link>
      <TicketEntryHeader
        ticket={ticket}
        status={draft.status}
        onStatusChange={(v) => updateDraft('status', v)}
        onApprove={handleApprove}
        onReject={handleReject}
        onArrest={handleArrest}
      />
      <div className="w-full flex justify-between gap-x-4 ">
        <TicketEntryContent ticket={ticket} onCreateRelatedTicket={handleCreateRelatedTicket} />
        <TicketEntryDetails
          ticket={ticket}
          priority={draft.priority}
          onPriorityChange={(v) => updateDraft('priority', v)}
        />
      </div>
      <button
        className="btn rounded-xl btn-sm btn-info opacity-90 self-end"
        disabled={!hasChanges}
        onClick={handleSave}
      >
        <FaSave />
        {updateTicketMutation.isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          t('common.actions.save')
        )}
      </button>
    </div>
  )
}
