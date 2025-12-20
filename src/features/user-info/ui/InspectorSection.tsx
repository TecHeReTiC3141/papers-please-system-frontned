import type { ShiftInspectorExtendedInfo } from '@/entities/shift'
import type { InspectorExtendedInfo } from '@/entities/user'
import { InfoField, Table, UpkDescription } from '@/shared/ui'
import type { TableColumn } from '@/shared/ui/Table/types'
import { UserPreview } from '@/shared/ui/UserPreview'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

type Props = {
  extendedInspectorInfo: InspectorExtendedInfo
}

export function InspectorSection({ extendedInspectorInfo }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const shiftColumns: TableColumn<ShiftInspectorExtendedInfo>[] = [
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
          {new Date(shift.startTime).toLocaleDateString()}
        </button>
      )
    },
    {
      label: t('userInfo.shiftData.upk'),
      render: (shift) => <UpkDescription upk={shift.upk} />,
      key: 'upk',
      dataIndex: 'upk'
    },
    {
      label: t('userInfo.shiftData.boss'),
      key: 'boss',
      dataIndex: 'boss.name'
    },
    {
      label: t('userInfo.shiftData.resolvedTickets'),
      key: 'resolvedTickets',
      dataIndex: 'participation.resolvedTickets'
    },
    {
      label: t('userInfo.shiftData.salary'),
      key: 'wage',
      dataIndex: 'participation.wage'
    },
    {
      label: t('userInfo.shiftData.penalty'),
      key: 'penalty',
      dataIndex: 'participation.penalty'
    }
  ]
  return (
    <>
      <InfoField value={<UpkDescription upk={extendedInspectorInfo.upk} />} label={t('userInfo.upk')} />

      <InfoField value={<UserPreview user={extendedInspectorInfo.boss} />} label={t('userInfo.boss')} />

      <h3 className="text-2xl mt-3">{t('userInfo.shiftInfo')}</h3>
      <Table
        columns={shiftColumns}
        data={extendedInspectorInfo.shifts}
        emptyMessage={t('userInfo.shiftData.noShifts')}
        filterable={false}
      />
    </>
  )
}
