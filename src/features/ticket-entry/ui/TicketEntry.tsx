import type { Ticket } from '@/entities/ticket'
import { Link } from 'react-router'
import { TicketEntryHeader } from './TicketEntryHeader'
import { TicketEntryContent } from './TicketEntryContent'
import { TicketEntryDetails } from './TicketEntryDetails'
import { FaArrowLeft } from 'react-icons/fa6'
import { useState } from 'react'
import { useUpdateTicketMutation } from '../model/use-update-ticket-mutation'

type Props = {
  ticket: Ticket
}

export function TicketEntry({ ticket }: Props) {
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

    updateTicketMutation.mutate({
      ticketId: ticket.id,
      body
    })

    console.log('Saving ticket changes:', body)
  }

  const handleApprove = () => {
    // call mutation
    console.log('TICKET APPROVED')
  }

  const handleReject = () => {
    // call mutation
    console.log('TICKET REJECTED')
  }

  return (
    <div className="w-full container mx-auto">
      <Link className="link link-hover link-info flex gap-x-2 items-center" to="/tickets">
        <FaArrowLeft /> Back to tickets
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
