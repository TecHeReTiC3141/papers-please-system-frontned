import { Priority, type Ticket } from '@/entities/ticket'
import { TicketSectionWrapper } from './TicketSectionWrapper'
import { Field, Loader } from '@/shared/ui'
import { formatTicketDeadlineAt } from '@/entities/ticket/lib'
import { useGetTicketRelated } from '../model'
import { useQuery } from '@tanstack/react-query'
import { RelatedTicketCard } from './RelatedTicketCard'
import { useTranslation } from 'react-i18next'

type Props = {
  ticket: Ticket
  priority: Priority
  onPriorityChange: (priority: Priority) => void
}

export function TicketEntryDetails({ ticket, priority, onPriorityChange }: Props) {
  const { t } = useTranslation()
  const fetchTicketRelated = useGetTicketRelated()

  const {
    data: related,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['tickets', 'related', ticket.id],
    queryFn: () => fetchTicketRelated(ticket.id)
  })

  return (
    <div className="flex-1">
      <TicketSectionWrapper title={t('ticket.details.title')}>
        <div className="flex gap-y-3 flex-col">
          <Field
            label={t('ticket.details.priority')}
            control={
              <select
                className="select select-sm select-bordered bg-neutral-800"
                value={priority}
                onChange={(e) => onPriorityChange(e.target.value as Priority)}
              >
                {Object.values(Priority).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            }
          />{' '}
          <Field label={t('ticket.details.deadline')} control={formatTicketDeadlineAt(ticket)} />
        </div>
        <h4 className="text-2xl w-full border-b-2 border-gray-600 mt-8">{t('Related work')}</h4>
        {isLoading && <Loader text={t('ticket.related.loading')} />}

        {isError && <div className="py-6 text-center text-error">{t('ticket.related.error')}</div>}

        {!isLoading && !isError && (!related || related.length === 0) && (
          <div className="py-6 text-center text-base-content/60">{t('ticket.related.empty')}</div>
        )}

        {related && related.length > 0 && (
          <div className="flex flex-col gap-y-3">
            {related.map((ticket) => (
              <RelatedTicketCard ticket={ticket} />
            ))}
          </div>
        )}
      </TicketSectionWrapper>
    </div>
  )
}
