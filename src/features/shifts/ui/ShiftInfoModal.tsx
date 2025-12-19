import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useGetShiftById } from '../model'
import { InfoField, Loader, Table, UpkDescription } from '@/shared/ui'
import { formatDate } from '@/shared/lib'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { ExtendedInspectorParticipation } from '@/entities/shift'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export function ShiftInfoModal() {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()
  const fetchShift = useGetShiftById()

  const shiftId = searchParams.get('shift')

  const { data: shiftData, isPending } = useQuery({
    queryKey: ['shift', { shiftId }],
    queryFn: () => fetchShift(shiftId ?? ''),
    enabled: !!shiftId
  })

  const columns: TableColumn<ExtendedInspectorParticipation>[] = [
    {
      key: 'userId',
      label: t('Name'),
      dataIndex: 'userId',
      isSortable: true
    },
    {
      key: 'specialization',
      label: t('Specialization'),
      dataIndex: 'specialization',
      isSortable: true
    },
    {
      key: 'resolvedTickets',
      label: t('Resolved tickets'),
      dataIndex: 'resolvedTickets',
      showTotal: true
    },
    {
      key: 'passedCrossChecks',
      label: t('Cross-checks'),
      dataIndex: 'passedCrossChecks',
      showTotal: true
    },
    {
      key: 'wage',
      label: t('Wage'),
      dataIndex: 'wage',
      showTotal: true
    },
    {
      key: 'penalty',
      label: t('Penalty'),
      dataIndex: 'penalty',
      showTotal: true
    }
  ]

  return (
    <dialog id="shift-modal" className={classNames('modal', !!shiftId && 'modal-open')}>
      <div className="modal-box w-2/3 max-w-4xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setSearchParams('')}
          >
            ✕
          </button>
        </form>
        {isPending || !shiftData ? (
          <Loader text={t('Loading shift info...')} />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">{t('Shift №{formatId(shiftData)}')}</h3>
            <InfoField value={formatDate(shiftData.startTime)} label={t('Date')} />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label={t('Upk')} />
            <InfoField value={<UserPreview user={shiftData.boss} />} label={t('Boss')} />
            <p className="text-2xl mt-2">{t('Inspectors')}</p>
            <Table<ExtendedInspectorParticipation>
              data={shiftData.inspectors}
              loading={isPending}
              filterable={false}
              loadingText={t('Loading shift inspectors...')}
              columns={columns}
              emptyMessage={t('No inspectors in this shift')}
            />
          </div>
        )}
      </div>
    </dialog>
  )
}
