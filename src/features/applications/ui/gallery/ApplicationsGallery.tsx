import { TicketType, type Ticket } from '@/entities/ticket'
import { Loader } from '@/shared/ui'
import { ApplicationCard } from './ApplicationCard'

type Props = {
  tickets: Ticket[] | null
  loading: boolean
}

export function ApplicationsGallery({ tickets, loading }: Props) {
  if (loading || !tickets) return <Loader text="Loading your applications..." />
  const applications = tickets.filter((ticket) => ticket.ticketType === TicketType.EXTERNAL)
  const appealations = tickets.filter((ticket) => ticket.ticketType === TicketType.APPEAL)

  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-xl">Current applications ({applications.length})</h4>
      <div className="w-full flex items-center flex-wrap gap-x-6">
        {applications.map((application) => (
          <ApplicationCard ticket={application} />
        ))}
      </div>
      <h4 className="text-xl">Current appealations ({appealations.length})</h4>
      <div className="w-full flex items-center flex-wrap gap-x-6">
        {appealations.map((appealations) => (
          <ApplicationCard ticket={appealations} />
        ))}
      </div>
    </div>
  )
}
