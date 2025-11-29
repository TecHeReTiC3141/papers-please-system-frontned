import { Priority, TicketStatus, TicketType } from '@/entities/ticket'
import { FiFilter } from 'react-icons/fi'

export function TicketsFilters() {
  return (
    <div className="flex p-3 rounded bg-gray-800 justify-between items-center">
      <div className="flex gap-x-3 items-center">
        <FiFilter size={32} />
        <input type="text" className="input input-ghost w-64" placeholder="Filter by keyword" />
      </div>
      <div className="flex gap-x-3 items-center">
        <select defaultValue="" className="select select-ghost">
          <option value="" disabled>
            Types
          </option>
          {Object.values(TicketType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select defaultValue="" className="select select-ghost">
          <option value="" disabled>
            Status
          </option>
          {Object.values(TicketStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select defaultValue="" className="select select-ghost">
          <option value="" disabled>
            Priority
          </option>
          {Object.values(Priority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
