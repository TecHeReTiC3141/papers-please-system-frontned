import type { ShiftBossExtendedInfo } from '@/entities/shift'
import type { BossExtendedInfo } from '@/entities/user'
import { InfoField, Table, UpkDescription } from '@/shared/ui'
import type { TableColumn } from '@/shared/ui/Table/types'
import { UserPreview } from '@/shared/ui/UserPreview'
import { useNavigate } from 'react-router'

type Props = {
  extendedBossInfo: BossExtendedInfo
}

export function BossSection({ extendedBossInfo }: Props) {
  const navigate = useNavigate()

  const shiftColumns: TableColumn<ShiftBossExtendedInfo>[] = [
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
          {shift.createdAt}
        </button>
      )
    },
    {
      label: 'UPK, Region',
      key: 'upkId',
      dataIndex: 'upkId'
    }
  ]
  return (
    <>
      <InfoField value={<UpkDescription upk={extendedBossInfo.upk} />} label="Upk" />

      <h3 className="text-2xl mt-3">Shift info</h3>
      <Table columns={shiftColumns} data={extendedBossInfo.shifts} emptyMessage="No shifts yet" />

      <h3 className="text-2xl mt-3">Subordinates</h3>
      <div className="w-full grid grid-cols-4 gap-x-4 gap-y-3 auto-cols-fr">
        {extendedBossInfo.subordinates.map((sub) => (
          <UserPreview user={sub} />
        ))}
      </div>
    </>
  )
}
