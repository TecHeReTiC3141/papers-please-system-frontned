import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useGetDailyAgenda, useGetShiftById } from '../model'
import { InfoField, Loader, Table, UpkDescription } from '@/shared/ui'
import { formatDate, formatId } from '@/shared/lib'
import { UserPreview } from '@/shared/ui/UserPreview'
import type { TableColumn } from '@/shared/ui/Table/types'
import type { ExtendedInspectorParticipation } from '@/entities/shift'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { UserRole, type User } from '@/entities/user'
import { DailyAgendaTable } from './DailyAgendaTable'

export function ShiftInfoModal() {
  const { t } = useTranslation()
  const user = useAuthUser<User>()

  const [searchParams, setSearchParams] = useSearchParams()
  const fetchDailyAgenda = useGetDailyAgenda()
  const fetchShift = useGetShiftById()

  const isActiveShift = !!searchParams.get('activeShift')

  const shiftId = searchParams.get('activeShift') || searchParams.get('shift')

  const { data: shiftData, isPending } = useQuery({
    queryKey: ['shift', { shiftId }],
    queryFn: () => fetchShift(shiftId ?? ''),
    enabled: !!shiftId
  })

  const userParticipation = shiftData?.inspectors.find((inspector) => inspector.userId === user?.id)

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['daily-agenda', userParticipation?.specialization],
    queryFn: () => fetchDailyAgenda(userParticipation?.specialization),
    enabled: !!userParticipation
  })

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
      dataIndex: 'specialization',
      isSortable: true
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
      showTotal: true
    },
    {
      key: 'penalty',
      label: t('shiftData.penalty'),
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
          <Loader text={t('shiftInfo.loading')} />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">{t('shiftInfo.id', { id: formatId(shiftData) })}</h3>
            <InfoField value={formatDate(shiftData.startTime)} label={t('shiftInfo.date')} />
            <InfoField value={<UpkDescription upk={shiftData.upk} />} label={t('shiftInfo.upk')} />
            <InfoField value={<UserPreview user={shiftData.boss} />} label={t('shiftInfo.boss')} />
            {isActiveShift && userParticipation && (
              <InfoField value={userParticipation.specialization} label={t('shiftInfo.specialization')} />
            )}

            <p className="text-2xl mt-2">{t('shiftInfo.inspectors.title')}</p>
            <Table<ExtendedInspectorParticipation>
              data={shiftData.inspectors}
              loading={isPending}
              filterable={false}
              loadingText={t('shiftInfo.inspectors.loading')}
              columns={columns}
              emptyMessage={t('shiftInfo.inspectors.empty')}
            />

            {isActiveShift && user?.role !== UserRole.BOSS && (
              <>
                <p className="text-2xl mt-2">{t('shiftInfo.agenda.title')}</p>
                <DailyAgendaTable data={events ?? []} loading={eventsLoading} />
              </>
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}
