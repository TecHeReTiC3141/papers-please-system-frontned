import type { Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'
import { useGetTicketDocuments } from '../model'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/ui'
import { DocumentsAccordion } from '@/features/applications/ui'

type Props = {
  ticket: Ticket
}

export function TicketEntryContent({ ticket }: Props) {
  const fetchTicketDocuments = useGetTicketDocuments()

  const {
    data: documents,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['tickets', 'documents', ticket.id],
    queryFn: () => fetchTicketDocuments(ticket.id)
  })

  return (
    <div className="flex-2">
      <TicketSectionWrapper title="Content">
        {isLoading && <Loader text="Loading attached documents..." />}

        {isError && <div className="py-6 text-center text-error">Failed to load attached documents</div>}

        {!isLoading && !isError && (!documents || documents.length === 0) && (
          <div className="py-6 text-center text-base-content/60">No documents attached to this ticket</div>
        )}

        {documents && documents.length > 0 && (
          <div>
            <p className="text-lg mb-1">Attached documents: </p>
            <DocumentsAccordion documents={documents} inspectorMode />
          </div>
        )}
      </TicketSectionWrapper>
    </div>
  )
}
