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
import { useTranslation } from 'react-i18next'

type EditableFields = {
  wage: number
  penalty: number
}

export function CloseShiftModal() {
  const { t } = useTranslation()
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
      label: t('Inspector'),
      dataIndex: 'userId',
      isSortable: true
    },
    {
      key: 'specialization',
      label: t('Specialization'),
      dataIndex: 'specialization'
    },
    {
      key: 'resolvedTickets',
      label: t('Resolved'),
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
      label: t('Penalty'),
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
          <Loader text={t('Loading shift...')} />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">{t('Close shift №{formatId(shiftData)}')}</h3>

            <InfoField value={formatDate(shiftData.startTime)} label={t('Date')} />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label={t('Upk')} />
            <InfoField value={<UserPreview user={shiftData.boss} />} label={t('Boss')} />

            <p className="text-2xl mt-4">{t('Inspectors')}</p>

            <Table<ExtendedInspectorParticipation>
              data={inspectorsWithEdits}
              filterable={false}
              columns={columns}
              emptyMessage={t('No inspectors in this shift')}
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
