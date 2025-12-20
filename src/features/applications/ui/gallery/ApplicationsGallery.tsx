import { TicketType, type Ticket } from '@/entities/ticket'
import { Loader } from '@/shared/ui'
import { ApplicationCard } from './ApplicationCard'
import { useState } from 'react'
import { CloseApplicationModal } from './CloseApplicationModal'
import { useCloseApplicationMutation } from '../../model'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type Props = {
  tickets: Ticket[] | null
  loading: boolean
}

export function ApplicationsGallery({ tickets, loading }: Props) {
  const { t } = useTranslation()

  const [applicationToDelete, setApplicationToDelete] = useState<Ticket | null>(null)

  const closeMutation = useCloseApplicationMutation()

  if (loading || !tickets) return <Loader text={t('applications.loading')} />
  const applications = tickets.filter((ticket) => ticket.ticketType === TicketType.EXTERNAL)
  const appealations = tickets.filter((ticket) => ticket.ticketType === TicketType.APPEAL)

  const handleCloseCancel = () => setApplicationToDelete(null)

  const handleCloseApplication = async () => {
    if (!applicationToDelete) return

    await toast.promise(closeMutation.mutateAsync(applicationToDelete.id), {
      pending: t('applications.close.pending'),
      success: t('applications.close.success'),
      error: t('applications.close.error')
    })

    setApplicationToDelete(null)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-xl">{t('applications.application.title', { count: applications.length })}</h4>
      <div className="w-full flex items-center flex-wrap gap-x-6 gap-y-4">
        {applications.map((application) => (
          <ApplicationCard ticket={application} onClose={setApplicationToDelete} />
        ))}
      </div>
      <h4 className="text-xl">{t('applications.appelations.title', { count: applications.length })}</h4>
      <div className="w-full flex items-center flex-wrap gap-x-6 gap-y-4">
        {appealations.map((appealations) => (
          <ApplicationCard ticket={appealations} onClose={setApplicationToDelete} />
        ))}
      </div>
      <CloseApplicationModal
        open={!!applicationToDelete}
        onCancel={handleCloseCancel}
        onClose={handleCloseApplication}
      />
    </div>
  )
}
