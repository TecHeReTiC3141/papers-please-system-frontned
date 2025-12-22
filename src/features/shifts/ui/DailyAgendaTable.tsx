import { Table } from '@/shared/ui/Table'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { Event } from '@/entities/event'
import { Specialization } from '@/entities/user'
import { useTranslation } from 'react-i18next'

type Props = {
  data: Event[] | null
  loading: boolean
  onSpecializationChange?: (eventId: string, specialization: Specialization | null) => void
}

export function DailyAgendaTable({ data, loading, onSpecializationChange }: Props) {
  const { t } = useTranslation()
  const columns: TableColumn<Event>[] = [
    {
      key: 'time',
      label: t('agenda.data.time'),
      dataIndex: 'time',
      isSortable: true,
      render: (e) => new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      key: 'description',
      label: t('agenda.data.description'),
      dataIndex: 'description',
      isSortable: true
    },
    {
      key: 'priority',
      label: t('agenda.data.priority'),
      dataIndex: 'priority'
    },
    {
      key: 'specialization',
      label: t('agenda.data.specialization.label'),
      dataIndex: 'specialization',
      render: (e) =>
        onSpecializationChange ? (
          <select
            className="select select-bordered select-sm"
            value={e.specialization ?? ''}
            onChange={(ev) =>
              onSpecializationChange(e.id, ev.target.value ? (ev.target.value as Specialization) : null)
            }
          >
            <option value="">{t('agenda.data.specialization.placeholder')}</option>
            {Object.values(Specialization).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <p>{e.specialization}</p>
        )
    }
  ]

  return (
    <Table<Event>
      data={data}
      loading={loading}
      loadingText={t('agenda.loading')}
      columns={columns}
      emptyMessage={t('agenda.empty')}
    />
  )
}
