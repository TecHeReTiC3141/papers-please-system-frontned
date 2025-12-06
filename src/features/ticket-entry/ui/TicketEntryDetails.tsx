import type { Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'
import { Field } from '@/shared/ui'
import { formatTicketDeadlineAt } from '@/entities/ticket/lib'

type Props = {
  ticket: Ticket
}

export function TicketEntryDetails({ ticket }: Props) {
  return (
    <div className="flex-1">
      <TicketSectionWrapper title="Details">
        <div className="flex gap-y-3 flex-col">
          <Field label="Priority" control={ticket.priority} />
          <Field label="Deadline" control={formatTicketDeadlineAt(ticket)} />
        </div>
        <h4 className="text-2xl w-full border-b-2 border-gray-600 mt-8">Related work</h4>
        {/* TODO: list related tickets below */}
      </TicketSectionWrapper>
    </div>
  )
}
