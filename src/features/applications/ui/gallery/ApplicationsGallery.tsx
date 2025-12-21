import { TicketType, type Ticket } from '@/entities/ticket'
import { Loader } from '@/shared/ui'
import { ApplicationCard } from '../ApplicationCard'
import { useTranslation } from 'react-i18next'

type Props = {
  tickets: Ticket[] | null
  loading: boolean
  onCloseApplication: (application: Ticket) => void
}

export function ApplicationsGallery({ tickets, loading, onCloseApplication }: Props) {
  const { t } = useTranslation()

  if (loading || !tickets) return <Loader text={t('applications.loading')} />
  const applications = tickets.filter((ticket) => ticket.ticketType === TicketType.EXTERNAL)
  const appealations = tickets.filter((ticket) => ticket.ticketType === TicketType.APPEAL)

  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-xl">{t('applications.applications.title', { count: applications.length })}</h4>
      <div className="w-full grid grid-cols-4 grid-col items-center gap-x-6 gap-y-4">
        {applications.map((application) => (
          <ApplicationCard ticket={application} onClose={onCloseApplication} />
        ))}
      </div>
      <h4 className="text-xl">{t('applications.appelations.title', { count: applications.length })}</h4>
      <div className="w-full grid grid-cols-4 grid-col items-center gap-x-6 gap-y-4">
        {appealations.map((appealations) => (
          <ApplicationCard ticket={appealations} onClose={onCloseApplication} />
        ))}
      </div>
    </div>
  )
}
