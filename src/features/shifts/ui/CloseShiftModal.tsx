import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useGetShiftById } from '../model'
import { InfoField, Loader, Table, UpkDescription } from '@/shared/ui'
import { formatDate, formatId } from '@/shared/lib'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { ExtendedInspectorParticipation } from '@/entities/shift'
import { useMemo, useState } from 'react'
import classNames from 'classnames'

type EditableFields = {
  wage: number
  penalty: number
}

export function CloseShiftModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const fetchShift = useGetShiftById()

  const shiftId = searchParams.get('closeShift')

  const { data: shiftData, isPending } = useQuery({
    queryKey: ['shift', 'close', shiftId],
    queryFn: () => fetchShift(shiftId ?? ''),
    enabled: !!shiftId
  })

  /** edited values */
  const [edited, setEdited] = useState<Record<string, EditableFields>>({})

  const handleChange = (id: string, field: keyof EditableFields, value: number) => {
    setEdited((prev) => ({
      ...prev,
      [id]: {
        wage: prev[id]?.wage ?? 0,
        penalty: prev[id]?.penalty ?? 0,
        [field]: value
      }
    }))
  }

  const inspectorsWithEdits = useMemo(() => {
    if (!shiftData) return []

    return shiftData.inspectors.map((i) => ({
      ...i,
      wage: edited[i.id]?.wage ?? i.wage,
      penalty: edited[i.id]?.penalty ?? i.penalty
    }))
  }, [shiftData, edited])

  const columns: TableColumn<ExtendedInspectorParticipation>[] = [
    {
      key: 'user',
      label: 'Inspector',
      dataIndex: 'userId',
      isSortable: true
    },
    {
      key: 'specialization',
      label: 'Specialization',
      dataIndex: 'specialization'
    },
    {
      key: 'resolvedTickets',
      label: 'Resolved',
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
      showTotal: true,
      render: (row) => (
        <input
          type="number"
          className="input input-bordered input-sm w-24"
          value={edited[row.id]?.wage ?? row.wage}
          onChange={(e) => handleChange(row.id, 'wage', Number(e.target.value))}
        />
      )
    },
    {
      key: 'penalty',
      label: 'Penalty',
      dataIndex: 'penalty',
      showTotal: true,
      render: (row) => (
        <input
          type="number"
          className="input input-bordered input-sm w-24"
          value={edited[row.id]?.penalty ?? row.penalty}
          onChange={(e) => handleChange(row.id, 'penalty', Number(e.target.value))}
        />
      )
    }
  ]

  const handleApproveAndClose = () => {
    console.log('Edited shift data:', {
      shiftId,
      inspectors: inspectorsWithEdits.map(({ id, wage, penalty }) => ({
        participationId: id,
        wage,
        penalty
      }))
    })
  }

  return (
    <dialog id="close-shift-modal" className={classNames('modal', !!shiftId && 'modal-open')}>
      <div className="modal-box w-2/3 max-w-5xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setSearchParams('')}
          >
            ✕
          </button>
        </form>

        {isPending || !shiftData ? (
          <Loader text="Loading shift..." />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">Close shift №{formatId(shiftData)}</h3>

            <InfoField value={formatDate(shiftData.startTime)} label="Date" />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label="Upk" />
            <InfoField value={<UserPreview user={shiftData.boss} />} label="Boss" />

            <p className="text-2xl mt-4">Inspectors</p>

            <Table<ExtendedInspectorParticipation>
              data={inspectorsWithEdits}
              filterable={false}
              columns={columns}
              emptyMessage="No inspectors in this shift"
            />

            <div className="flex justify-end mt-4">
              <button className="btn btn-success" onClick={handleApproveAndClose}>
                Approve and close shift
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}
