import { Table } from '@/shared/ui/Table'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { Event } from '@/entities/event'
import { Specialization } from '@/entities/user'

type Props = {
  data: Event[] | null
  loading: boolean
  onSpecializationChange: (eventId: string, specialization: Specialization | null) => void
}

export function DailyAgendaTable({ data, loading, onSpecializationChange }: Props) {
  const columns: TableColumn<Event>[] = [
    {
      key: 'time',
      label: 'Time',
      dataIndex: 'time',
      isSortable: true,
      render: (e) => new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      key: 'description',
      label: 'Description',
      dataIndex: 'description',
      isSortable: true
    },
    {
      key: 'priority',
      label: 'Priority',
      dataIndex: 'priority'
    },
    {
      key: 'specialization',
      label: 'Specialization',
      dataIndex: 'specialization',
      render: (e) => (
        <select
          className="select select-bordered select-sm"
          value={e.specialization ?? ''}
          onChange={(ev) => onSpecializationChange(e.id, ev.target.value ? (ev.target.value as Specialization) : null)}
        >
          <option value="">Select specialization</option>
          {Object.values(Specialization).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )
    }
  ]

  return (
    <Table<Event>
      data={data}
      loading={loading}
      loadingText="Loading agenda..."
      columns={columns}
      emptyMessage="No events for today"
    />
  )
}
