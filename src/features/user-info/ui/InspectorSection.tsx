import type { ShiftInspectorExtendedInfo } from '@/entities/shift'
import type { InspectorExtendedInfo } from '@/entities/user'
import { InfoField, Table, UpkDescription } from '@/shared/ui'
import type { TableColumn } from '@/shared/ui/Table/types'
import { UserPreview } from '@/shared/ui/UserPreview'
import { useNavigate } from 'react-router'

type Props = {
  extendedInspectorInfo: InspectorExtendedInfo
}

export function InspectorSection({ extendedInspectorInfo }: Props) {
  const navigate = useNavigate()

  const shiftColumns: TableColumn<ShiftInspectorExtendedInfo>[] = [
    {
      label: 'Date',
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
      label: 'UPK, Region',
      render: (shift) => <UpkDescription upk={shift.upk} />,
      key: 'upk',
      dataIndex: 'upk'
    },
    {
      label: 'Boss',
      key: 'boss',
      dataIndex: 'boss.name'
    },
    {
      label: 'Resolved tickets',
      key: 'resolvedTickets',
      dataIndex: 'participation.resolvedTickets'
    },
    {
      label: 'Salary',
      key: 'wage',
      dataIndex: 'participation.wage'
    },
    {
      label: 'Penalty',
      key: 'penalty',
      dataIndex: 'participation.penalty'
    }
  ]
  return (
    <>
      <InfoField value={<UpkDescription upk={extendedInspectorInfo.upk} />} label="Upk" />

      <InfoField value={<UserPreview user={extendedInspectorInfo.boss} />} label="Boss" />

      <h3 className="text-2xl mt-3">Shift info</h3>
      <Table
        columns={shiftColumns}
        data={extendedInspectorInfo.shifts}
        emptyMessage="No shifts yet"
        filterable={false}
      />
    </>
  )
}
