import type { Ticket } from '@/entities/ticket'

type TicketsTableProps = {
  tickets: Ticket[]
  filters?: any // пока оставим, уточним позже
}

export function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Приоритет</th>
            <th>Дедлайн</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((tickets) => (
            <tr key={tickets.id} className="hover cursor-pointer">
              <td>{tickets.id}</td>

              {/* Title = ticketType + description */}
              <td>
                <div className="font-semibold">{tickets.ticketType}</div>
                <div className="text-sm opacity-70 line-clamp-1">{tickets.description}</div>
              </td>

              <td>
                <span className="badge badge-outline">{tickets.status}</span>
              </td>

              <td>
                <span className="badge badge-primary">{tickets.priority}</span>
              </td>

              <td>
                {tickets.deadlineAt ? (
                  new Date(tickets.deadlineAt).toLocaleDateString()
                ) : (
                  <span className="opacity-50">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
