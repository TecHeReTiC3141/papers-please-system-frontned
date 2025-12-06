import type { Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'

type Props = {
  ticket: Ticket
}

export function TicketEntryContent({ ticket }: Props) {
  return (
    <div className="flex-2">
      <TicketSectionWrapper title="Content">Attached documents:</TicketSectionWrapper>
    </div>
  )
}
