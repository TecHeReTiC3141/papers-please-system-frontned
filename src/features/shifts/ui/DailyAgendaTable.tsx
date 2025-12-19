import { Table } from '@/shared/ui/Table'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { Event } from '@/entities/event'
import { Specialization } from '@/entities/user'
import { useTranslation } from 'react-i18next'

type Props = {
  data: Event[] | null
  loading: boolean
  onSpecializationChange: (eventId: string, specialization: Specialization | null) => void
}

export function DailyAgendaTable({ data, loading, onSpecializationChange }: Props) {
  const { t } = useTranslation()
  const columns: TableColumn<Event>[] = [
    {
      key: 'time',
      label: t('Time'),
      dataIndex: 'time',
      isSortable: true,
      render: (e) => new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      key: 'description',
      label: t('Description'),
      dataIndex: 'description',
      isSortable: true
    },
    {
      key: 'priority',
      label: t('Priority'),
      dataIndex: 'priority'
    },
    {
      key: 'specialization',
      label: t('Specialization'),
      dataIndex: 'specialization',
      render: (e) => (
        <select
          className="select select-bordered select-sm"
          value={e.specialization ?? ''}
          onChange={(ev) => onSpecializationChange(e.id, ev.target.value ? (ev.target.value as Specialization) : null)}
        >
          <option value="">{t('Select specialization')}</option>
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
      loadingText={t('Loading agenda...')}
      columns={columns}
      emptyMessage={t('No events for today')}
    />
  )
}
