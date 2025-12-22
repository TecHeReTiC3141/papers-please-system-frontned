import { TicketStatus, type Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'
import { useDelegateTicketMutation, useGetTicketDocuments, type DelegateTicketBody } from '../model'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/ui'
import { DocumentsAccordion } from '@/features/applications/ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { DelegateDocumentModal } from './modals'
import { useState } from 'react'
import type { AxiosError } from 'axios'

type Props = {
  ticket: Ticket
  onStatusChange: (status: TicketStatus) => void
}

export function TicketEntryContent({ ticket, onStatusChange }: Props) {
  const { t } = useTranslation()

  const [delegateOpen, setDelegateOpen] = useState(false)

  const fetchTicketDocuments = useGetTicketDocuments()
  const delegateTicketMutation = useDelegateTicketMutation()

  const {
    data: documents,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['tickets', 'documents', ticket.id],
    queryFn: () => fetchTicketDocuments(ticket.id)
  })

  const handleCreateRelatedTicket = (params: DelegateTicketBody) => {
    toast.promise(delegateTicketMutation.mutateAsync({ ...params, ticketId: ticket.id }), {
      pending: t('ticket.create.pending'),
      success: {
        render() {
          onStatusChange(TicketStatus.NEED_INFO)
          return t('ticket.create.success')
        }
      },
      error: {
        render(error: { data: AxiosError }) {
          return error.data.response?.data?.message ?? t('ticket.create.error')
        }
      }
    })
  }

  return (
    <div className="flex-2 h-full">
      <TicketSectionWrapper title={t('ticket.documents.title')}>
        {ticket.resolution && (
          <div>
            <p className="text-lg mb-1 font-semibold">{t('ticket.resolution.title')}</p>
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
            <p className="text-lg mb-1 font-semibold">{t('ticket.documents.title')}</p>
            <DocumentsAccordion documents={documents} inspectorMode onOpenDelegate={() => setDelegateOpen(true)} />
          </div>
        )}
      </TicketSectionWrapper>
      <DelegateDocumentModal
        open={delegateOpen}
        onClose={() => setDelegateOpen(false)}
        onDelegate={handleCreateRelatedTicket}
      />
    </div>
  )
}
