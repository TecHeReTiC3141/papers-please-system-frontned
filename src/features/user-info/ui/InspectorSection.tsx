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
      label: t('Date'),
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
      label: t('UPK, Region'),
      render: (shift) => <UpkDescription upk={shift.upk} />,
      key: 'upk',
      dataIndex: 'upk'
    },
    {
      label: t('Boss'),
      key: 'boss',
      dataIndex: 'boss.name'
    },
    {
      label: t('Resolved tickets'),
      key: 'resolvedTickets',
      dataIndex: 'participation.resolvedTickets'
    },
    {
      label: t('Salary'),
      key: 'wage',
      dataIndex: 'participation.wage'
    },
    {
      label: t('Penalty'),
      key: 'penalty',
      dataIndex: 'participation.penalty'
    }
  ]
  return (
    <>
      <InfoField value={<UpkDescription upk={extendedInspectorInfo.upk} />} label={t('Upk')} />

      <InfoField value={<UserPreview user={extendedInspectorInfo.boss} />} label={t('Boss')} />

      <h3 className="text-2xl mt-3">{t('Shift info')}</h3>
      <Table
        columns={shiftColumns}
        data={extendedInspectorInfo.shifts}
        emptyMessage={t('No shifts yet')}
        filterable={false}
      />
    </>
  )
}
