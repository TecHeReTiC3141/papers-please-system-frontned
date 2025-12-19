import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useGetShiftById } from '../model'
import { InfoField, Loader, Table, UpkDescription } from '@/shared/ui'
import { formatDate, formatId } from '@/shared/lib'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { ExtendedInspectorParticipation } from '@/entities/shift'
import classNames from 'classnames'

export function ShiftInfoModal() {
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
      label: 'Name',
      dataIndex: 'userId',
      isSortable: true
    },
    {
      key: 'specialization',
      label: 'Specialization',
      dataIndex: 'specialization',
      isSortable: true
    },
    {
      key: 'resolvedTickets',
      label: 'Resolved tickets',
      dataIndex: 'resolvedTickets',
      showTotal: true
    },
    {
      key: 'passedCrossChecks',
      label: 'Cross-checks',
      dataIndex: 'passedCrossChecks',
      showTotal: true
    },
    {
      key: 'wage',
      label: 'Wage',
      dataIndex: 'wage',
      showTotal: true
    },
    {
      key: 'penalty',
      label: 'Penalty',
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
          <Loader text="Loading shift info..." />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">Shift №{formatId(shiftData)}</h3>
            <InfoField value={formatDate(shiftData.startTime)} label="Date" />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label="Upk" />
            <InfoField value={<UserPreview user={shiftData.boss} />} label="Boss" />
            <p className="text-2xl mt-2">Inspectors</p>
            <Table<ExtendedInspectorParticipation>
              data={shiftData.inspectors}
              loading={isPending}
              filterable={false}
              loadingText="Loading shift inspectors..."
              columns={columns}
              emptyMessage="No inspectors in this shift"
            />
          </div>
        )}
      </div>
    </dialog>
  )
}
