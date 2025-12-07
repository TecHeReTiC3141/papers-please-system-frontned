import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useGetShiftById } from '../model'
import { InfoField, Loader } from '@/shared/ui'
import { formatDate, formatId } from '@/shared/lib'

export function ShiftInfoModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const fetchShift = useGetShiftById()

  const shiftId = searchParams.get('shift')

  const shiftQuery = useQuery({
    queryKey: ['shift', { shiftId }],
    queryFn: () => fetchShift(shiftId ?? ''),
    enabled: !!shiftId
  })

  return (
    <dialog id="shift-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setSearchParams('')}
          >
            ✕
          </button>
        </form>
        {shiftQuery.isPending || !shiftQuery.data ? (
          <Loader text="Loading shift info..." />
        ) : (
          <div className="flex flex-col gap-y-6">
            <h3 className="font-bold text-lg text-center">Shift №{formatId(shiftQuery.data)}</h3>
            <InfoField value={formatDate(shiftQuery.data.startTime)} label="Date" />
            <InfoField value={shiftQuery.data.upkId} label="Upk" />
            <InfoField value={shiftQuery.data.id} label="Boss" />
          </div>
        )}
      </div>
    </dialog>
  )
}
