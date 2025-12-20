import type { ShiftBossExtendedInfo } from '@/entities/shift'
import type { BossExtendedInfo } from '@/entities/user'
import { formatDate } from '@/shared/lib'
import { InfoField, Table, UpkDescription } from '@/shared/ui'
import type { TableColumn } from '@/shared/ui/Table/types'
import { UserPreview } from '@/shared/ui/UserPreview'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

type Props = {
  extendedBossInfo: BossExtendedInfo
}

export function BossSection({ extendedBossInfo }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const shiftColumns: TableColumn<ShiftBossExtendedInfo>[] = [
    {
      label: t('userInfo.shiftData.startTime'),
      dataIndex: 'startTime',
      key: 'startTime',
      render: (shift) => (
        <button
          className="link link-hover link-info"
          onClick={() => {
            navigate({
              search: `?shift=${shift.id}`
            })
          }}
        >
          {formatDate(shift.startTime)}
        </button>
      )
    },
    {
      label: t('userInfo.shiftData.upkId'),
      key: 'upkId',
      dataIndex: 'upkId'
    }
  ]
  return (
    <>
      <InfoField value={<UpkDescription upk={extendedBossInfo.upk} />} label={t('userInfo.upk')} />

      <h3 className="text-2xl mt-3">{t('userInfo.shiftData.title')}</h3>
      <Table
        columns={shiftColumns}
        data={extendedBossInfo.shifts}
        emptyMessage={t('userInfo.shiftData.noShifts')}
        filterable={false}
      />

      <h3 className="text-2xl mt-3">{t('userInfo.subordinates')}</h3>
      <div className="w-full grid grid-cols-4 gap-x-4 gap-y-3 auto-cols-fr">
        {extendedBossInfo.subordinates.map((sub) => (
          <UserPreview user={sub} />
        ))}
      </div>
    </>
  )
}
