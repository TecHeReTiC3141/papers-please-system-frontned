import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import type { Ticket } from '@/entities/ticket'
import { TicketStatus } from '@/entities/ticket'
import { TicketsBoardColumn } from './TicketsBoardColumn'
import { useEffect, useState } from 'react'
import { useUpdateTicketStatusMutation } from '../../model/use-update-ticket-status-mutation'

type Props = {
  tickets: Ticket[]
  loading: boolean
}

const columnsConfig = [
  {
    status: TicketStatus.OPEN,
    filter: (t: Ticket) => t.status === TicketStatus.OPEN
  },
  {
    status: TicketStatus.IN_PROGRESS,
    filter: (t: Ticket) => t.status === TicketStatus.IN_PROGRESS || t.status === TicketStatus.NEED_INFO
  },
  {
    status: TicketStatus.CLOSED,
    filter: (t: Ticket) => t.status === TicketStatus.CLOSED || t.status === TicketStatus.REJECTED
  }
]

export const TicketsBoard = ({ tickets, loading }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor))

  // локальное состояние для визуального перемещения
  const [localTickets, setLocalTickets] = useState(tickets)

  useEffect(() => {
    setLocalTickets(tickets)
  }, [tickets])

  const updateStatusMutation = useUpdateTicketStatusMutation()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const newStatus = over.id as TicketStatus

    const ticket = localTickets.find((t) => t.id === active.id)
    if (!ticket) return

    if (ticket.status === newStatus) return

    // обновляем локально
    setLocalTickets((prev) => prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t)))

    // отправляем мутацию
    updateStatusMutation.mutate({ id: active.id as string, status: newStatus })
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex items-stretch w-full gap-4">
        {columnsConfig.map(({ status, filter }) => (
          <TicketsBoardColumn status={status} tickets={localTickets.filter(filter)} loading={loading} />
        ))}
      </div>
    </DndContext>
  )
}
