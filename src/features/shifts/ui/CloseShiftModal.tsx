import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useCloseShiftMutation, useGetShiftById } from '../model'
import { InfoField, Loader, Table, UpkDescription } from '@/shared/ui'
import { formatDate, formatId } from '@/shared/lib'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { ExtendedInspectorParticipation } from '@/entities/shift'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type EditableFields = {
  wage: number
  penalty: number
}

export function CloseShiftModal() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const fetchShift = useGetShiftById()
  const closeShift = useCloseShiftMutation()

  const shiftToCloseId = searchParams.get('closeShift')

  const { data: shiftData, isPending } = useQuery({
    queryKey: ['shift', 'close', shiftToCloseId],
    queryFn: () => fetchShift(shiftToCloseId ?? ''),
    enabled: !!shiftToCloseId
  })

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
      wage: edited[i.userId]?.wage ?? i.wage,
      penalty: edited[i.userId]?.penalty ?? i.penalty
    }))
  }, [shiftData, edited])

  const columns: TableColumn<ExtendedInspectorParticipation>[] = [
    {
      key: 'name',
      label: t('shiftData.name'),
      dataIndex: 'name',
      isSortable: true
    },
    {
      key: 'specialization',
      label: t('shiftData.specialization'),
      dataIndex: 'specialization'
    },
    {
      key: 'resolvedTickets',
      label: t('shiftData.resolvedTickets'),
      dataIndex: 'resolvedTickets',
      showTotal: true
    },
    {
      key: 'passedCrossChecks',
      label: t('shiftData.passedCrossChecks'),
      dataIndex: 'passedCrossChecks',
      showTotal: true
    },
    {
      key: 'wage',
      label: t('shiftData.wage'),
      dataIndex: 'wage',
      showTotal: true,
      render: (row) => (
        <input
          type="number"
          className="input input-bordered input-sm w-24"
          value={edited[row.userId]?.wage ?? row.wage}
          onChange={(e) => handleChange(row.userId, 'wage', Number(e.target.value))}
        />
      )
    },
    {
      key: 'penalty',
      label: t('shiftData.penalty'),
      dataIndex: 'penalty',
      showTotal: true,
      render: (row) => (
        <input
          type="number"
          className="input input-bordered input-sm w-24"
          value={edited[row.userId]?.penalty ?? row.penalty}
          onChange={(e) => handleChange(row.userId, 'penalty', Number(e.target.value))}
        />
      )
    }
  ]

  const handleApproveAndClose = () => {
    if (!shiftToCloseId) return

    toast.promise(closeShift.mutateAsync(shiftToCloseId), {
      pending: t('closeShift.toast.pending'),
      success: {
        render() {
          setSearchParams('')
          return t('closeShift.toast.success')
        }
      },
      error: t('closeShift.toast.error')
    })

    console.log('Edited shift data:', {
      shiftId: shiftToCloseId,
      inspectors: inspectorsWithEdits.map(({ id, wage, penalty }) => ({
        participationId: id,
        wage,
        penalty
      }))
    })
  }

  return (
    <dialog id="close-shift-modal" className={classNames('modal', !!shiftToCloseId && 'modal-open')}>
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
          <Loader text={t('shiftInfo.loading')} />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">{t('closeShift.title', { id: formatId(shiftData) })}</h3>

            <InfoField value={formatDate(shiftData.startTime)} label={t('shiftInfo.date')} />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label={t('shiftInfo.upk')} />
            <InfoField value={<UserPreview user={shiftData.boss} />} label={t('shiftInfo.boss')} />

            <p className="text-2xl mt-4">{t('shiftInfo.inspectors.title')}</p>

            <Table<ExtendedInspectorParticipation>
              data={inspectorsWithEdits}
              filterable={false}
              columns={columns}
              emptyMessage={t('shiftInfo.inspectors.empty')}
            />

            <div className="flex justify-end mt-4">
              <button className="btn btn-success" onClick={handleApproveAndClose}>
                {t('closeShift.closeButton')}
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}
