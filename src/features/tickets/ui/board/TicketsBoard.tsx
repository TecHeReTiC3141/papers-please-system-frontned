import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import type { Ticket } from '@/entities/ticket'
import { TicketStatus, TicketType } from '@/entities/ticket'
import { TicketsBoardColumn } from './TicketsBoardColumn'
import { useEffect, useState } from 'react'
import { useUpdateTicketStatusMutation } from '../../model/use-update-ticket-status-mutation'

type Props = {
  tickets: Ticket[]
  loading: boolean
  showCrossChecks: boolean
}

export const TicketsBoard = ({ tickets, loading, showCrossChecks }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor))

  const [localTickets, setLocalTickets] = useState(tickets)

  useEffect(() => {
    setLocalTickets(tickets)
  }, [tickets])

  const updateStatusMutation = useUpdateTicketStatusMutation()

  const columnsConfig = [
    {
      status: TicketStatus.OPEN,
      type: undefined,
      filter: (t: Ticket) => t.ticketType !== TicketType.CROSSCHECK && t.status === TicketStatus.OPEN
    },
    {
      status: TicketStatus.IN_PROGRESS,
      type: undefined,
      filter: (t: Ticket) =>
        (t.ticketType !== TicketType.CROSSCHECK && t.status === TicketStatus.IN_PROGRESS) ||
        t.status === TicketStatus.NEED_INFO
    },
    {
      status: TicketStatus.CLOSED,
      type: undefined,
      filter: (t: Ticket) =>
        (t.ticketType !== TicketType.CROSSCHECK && t.status === TicketStatus.CLOSED) ||
        t.status === TicketStatus.REJECTED ||
        t.status === TicketStatus.APPROVED
    }
  ]

  if (showCrossChecks) {
    columnsConfig.push({
      status: TicketStatus.CLOSED,
      type: TicketType.CROSSCHECK,
      filter: (t: Ticket) => t.ticketType === TicketType.CROSSCHECK
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const newStatus = over.id as TicketStatus

    const ticket = localTickets.find((t) => t.id === active.id)
    if (!ticket) return

    const statusFilter = columnsConfig.find(({ status }) => status === newStatus)!
    if (statusFilter.filter(ticket)) return

    setLocalTickets((prev) => prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t)))

    updateStatusMutation.mutate({ id: active.id as string, status: newStatus })
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex items-stretch w-full gap-4">
        {columnsConfig.map(({ status, filter, type }) => (
          <TicketsBoardColumn
            key={status}
            status={status}
            tickets={localTickets.filter(filter)}
            loading={loading}
            type={type}
          />
        ))}
      </div>
    </DndContext>
  )
}
