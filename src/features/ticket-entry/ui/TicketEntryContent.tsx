import type { Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'
import { useGetTicketDocuments } from '../model'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/ui'
import { DocumentsAccordion } from '@/features/applications/ui'
import { useTranslation } from 'react-i18next'
import type { AnyDocument } from '@/entities/document/types'

type Props = {
  ticket: Ticket
  onCreateRelatedTicket: (doc: AnyDocument) => void
}

export function TicketEntryContent({ ticket, onCreateRelatedTicket }: Props) {
  const { t } = useTranslation()
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
    <div className="flex-2 h-full">
      <TicketSectionWrapper title={t('ticket.documents.title')}>
        {ticket.resolution && (
          <div>
            <p className="text-lg mb-1">{t('ticket.resolution.title')}</p>
            <p>{ticket.resolution}</p>
          </div>
        )}
        {isLoading && <Loader text={t('ticket.documents.loading')} />}

        {isError && <div className="py-6 text-center text-error">{t('ticket.documents.error')}</div>}

        {!isLoading && !isError && (!documents || documents.length === 0) && (
          <div className="py-6 text-center text-base-content/60">{t('ticket.documents.empty')}</div>
        )}

        {documents && documents.length > 0 && (
          <div>
            <p className="text-lg mb-1">{t('ticket.documents.title')}</p>
            <DocumentsAccordion documents={documents} inspectorMode onCreateRelatedTicket={onCreateRelatedTicket} />
          </div>
        )}
      </TicketSectionWrapper>
    </div>
  )
}
