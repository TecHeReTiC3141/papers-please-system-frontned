import type { Ticket } from '@/entities/ticket'
import { Loader } from '@/shared/ui'
import { useNavigate } from 'react-router'
import { TicketEntryHeader } from './TicketEntryHeader'
import { TicketEntryContent } from './TicketEntryContent'
import { TicketEntryDetails } from './TicketEntryDetails'

type Props = {
  ticket: Ticket | null
  loading: boolean
}

export function TicketEntry({ ticket, loading }: Props) {
  const navigate = useNavigate()
  if (loading) return <Loader text="Loading ticket..." />

  if (!ticket) {
    // TODO: implement shared handler of not-found
    navigate('/not-found')
    return
  }

  return (
    <div className="w-full container mx-auto">
      <TicketEntryHeader ticket={ticket} />
      <div className="w-full flex justify-between gap-x-4">
        <TicketEntryContent ticket={ticket} />
        <TicketEntryDetails ticket={ticket} />
      </div>
    </div>
  )
}
